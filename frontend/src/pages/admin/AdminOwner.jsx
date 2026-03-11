import React, { useState, useContext, useEffect, useMemo } from "react";
import { OwnerContext } from "../../context/OwnerContext";
import Heading from "../../containers/admin/common/Heading";
import StatsCards from "../../containers/admin/common/StatsCards";
import Tabs from "../../containers/admin/common/Tabs";
import OwnerTable from "../../containers/admin/owner/OwnerTable";
import OwnerRequestsTable from "../../containers/admin/owner/OwnerRequestsTable";
import ViewOwnerPopup from "../../containers/admin/owner/ViewOwnerPopup";
import StatusChangePopup from "../../containers/admin/owner/StatusChangePopup";
import RejectPopup from "../../containers/admin/owner/RejectPopup";
import Pagination from "../../components/common/Pagination";
import { ADMIN_ITEMS_PER_PAGE } from "../../constants/pagination";
import toast from "react-hot-toast";

const AdminOwnerManagement = () => {
    const { owners, fetchOwners, updateOwner, loading } = useContext(OwnerContext);

    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [ownerToChangeStatus, setOwnerToChangeStatus] = useState(null);
    const [showRejectPopup, setShowRejectPopup] = useState(false);
    const [requestToReject, setRequestToReject] = useState(null);

    useEffect(() => {
        fetchOwners();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    // ------------------- FILTERS -------------------

    const allOwners = owners;

    const activeOwners = owners.filter(
        (o) => o.status === "Active"
    );

    const inactiveOwners = owners.filter(
        (o) => o.status === "Inactive"
    );

    const pendingOwners = owners.filter(
        (o) => o.status === "Pending Approval"
    );

    const declinedOwners = owners.filter(
        (o) => o.status === "Declined Approval"
    );

    // Get current list based on active tab
    const getCurrentList = () => {
        switch (activeTab) {
            case "Active":
                return activeOwners;
            case "Inactive":
                return inactiveOwners;
            case "Pending Approval":
                return pendingOwners;
            case "Declined Approval":
                return declinedOwners;
            default:
                return allOwners;
        }
    };

    const currentList = getCurrentList();
    const totalPages = Math.ceil(currentList.length / ADMIN_ITEMS_PER_PAGE);

    const paginatedList = useMemo(() => {
        const startIndex = (currentPage - 1) * ADMIN_ITEMS_PER_PAGE;
        const endIndex = startIndex + ADMIN_ITEMS_PER_PAGE;
        return currentList.slice(startIndex, endIndex);
    }, [currentList, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Get item name for pagination based on active tab
    const getItemName = () => {
        switch (activeTab) {
            case "Active":
                return "active owners";
            case "Inactive":
                return "inactive owners";
            case "Pending Approval":
                return "pending owners";
            case "Declined Approval":
                return "declined owners";
            default:
                return "owners";
        }
    };

    // ------------------- TABS -------------------

    const tabs = [
        {
            id: "all",
            label: "All",
            count: owners.length,
        },
        {
            id: "Active",
            label: "Active",
            count: activeOwners.length,
        },
        {
            id: "Inactive",
            label: "Inactive",
            count: inactiveOwners.length,
        },
        {
            id: "Pending Approval",
            label: "Pending Approval",
            count: pendingOwners.length,
        },
        {
            id: "Declined Approval",
            label: "Declined",
            count: declinedOwners.length,
        },
    ];

    // ------------------- STATS -------------------

    const stats = [
        {
            label: "Total Owners",
            icon: "group",
            value: owners.length,
            subtext: "Registered in system",
        },
        {
            label: "Pending Approvals",
            icon: "pending_actions",
            value: pendingOwners.length,
            subtext: "Awaiting review",
            subtextColor: "text-yellow-500",
        },
        {
            label: "Declined Owners",
            icon: "cancel",
            value: declinedOwners.length,
            subtext: "Not approved",
            subtextColor: "text-red-500",
        },
    ];

    // ------------------- ACTION HANDLERS -------------------

    const handleViewOwner = (owner) => {
        setSelectedOwner(owner);
        setShowViewPopup(true);
    };

    const handleApproveRequest = async (request) => {
        try {
            const updatePayload = {
                status: "Active",
                verified: true,
                decline_reason: null,
            };

            await updateOwner(request._id, updatePayload);
            toast.success("Owner approved successfully");
            await fetchOwners();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Approval failed");
        }
    };

    const handleRejectRequest = (request) => {
        setRequestToReject(request);
        setShowRejectPopup(true);
    };

    const handleConfirmReject = async (reason) => {
        if (!requestToReject) return;

        try {
            const updatePayload = {
                status: "Declined Approval",
                decline_reason: reason,
                verified: false,
            };

            await updateOwner(requestToReject._id, updatePayload);
            toast.success("Owner request rejected");
            setShowRejectPopup(false);
            setRequestToReject(null);
            await fetchOwners();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Reject failed");
        }
    };

    const handleToggleOwnerStatus = (owner) => {
        setOwnerToChangeStatus(owner);
        setShowStatusPopup(true);
    };

    const handleConfirmStatusChange = async (reason) => {
        if (!ownerToChangeStatus) return;

        const newStatus = ownerToChangeStatus.status === "Active" ? "Inactive" : "Active";

        try {
            const updatePayload = {
                status: newStatus,
                decline_reason: newStatus === "Inactive" ? reason : null,
            };

            await updateOwner(ownerToChangeStatus._id, updatePayload);
            toast.success(
                `Owner ${newStatus === "Active" ? "activated" : "deactivated"} successfully`
            );
            await fetchOwners();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Status update failed");
        } finally {
            setShowStatusPopup(false);
            setOwnerToChangeStatus(null);
        }
    };

    if (loading && owners.length === 0) {
        return (
            <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-slate-600">
                            Loading owners...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto">

            {showViewPopup && selectedOwner && (
                <ViewOwnerPopup
                    owner={selectedOwner}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedOwner(null);
                    }}
                    isAdmin={true}
                />
            )}

            {showStatusPopup && ownerToChangeStatus && (
                <StatusChangePopup
                    owner={ownerToChangeStatus}
                    currentStatus={ownerToChangeStatus.status}
                    onClose={() => {
                        setShowStatusPopup(false);
                        setOwnerToChangeStatus(null);
                    }}
                    onConfirm={handleConfirmStatusChange}
                />
            )}

            {showRejectPopup && requestToReject && (
                <RejectPopup
                    request={requestToReject}
                    onClose={() => {
                        setShowRejectPopup(false);
                        setRequestToReject(null);
                    }}
                    onConfirm={handleConfirmReject}
                />
            )}

            <Heading
                title="Admin Owner Management"
                subtitle="Manage property owners and review new registration requests."
                showButton={false}
            />

            <StatsCards stats={stats} />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "all" && (
                <>
                    <OwnerTable
                        length={owners.length}
                        title="All Owners"
                        owners={paginatedList}
                        onView={handleViewOwner}
                        onToggleStatus={handleToggleOwnerStatus}
                        isAdmin={true}
                    />
                    {currentList.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={currentList.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {activeTab === "Active" && (
                <>
                    <OwnerTable
                        length={activeOwners.length}
                        title="Active Owners"
                        owners={paginatedList}
                        onView={handleViewOwner}
                        onToggleStatus={handleToggleOwnerStatus}
                        isAdmin={true}
                    />
                    {currentList.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={currentList.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {activeTab === "Inactive" && (
                <>
                    <OwnerTable
                        length={inactiveOwners.length}
                        title="Inactive Owners"
                        owners={paginatedList}
                        onView={handleViewOwner}
                        onToggleStatus={handleToggleOwnerStatus}
                        isAdmin={true}
                    />
                    {currentList.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={currentList.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {activeTab === "Declined Approval" && (
                <>
                    <OwnerTable
                        length={declinedOwners.length}
                        title="Declined Owners"
                        owners={paginatedList}
                        onView={handleViewOwner}
                        onToggleStatus={handleToggleOwnerStatus}
                        isAdmin={true}
                    />
                    {currentList.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={currentList.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {activeTab === "Pending Approval" && (
                <>
                    <OwnerRequestsTable
                        length={pendingOwners.length}
                        ownerRequests={paginatedList}
                        onViewRequest={handleViewOwner}
                        onApproveRequest={handleApproveRequest}
                        onRejectRequest={handleRejectRequest}
                    />
                    {pendingOwners.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={pendingOwners.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

        </main>
    );
};

export default AdminOwnerManagement;