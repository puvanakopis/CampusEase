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
import LoadingSpinner from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import { ADMIN_ITEMS_PER_PAGE } from "../../constants/pagination";
import toast from "react-hot-toast";

const AdminOwnerManagement = () => {
    const { owners, fetchOwners, updateOwner, loading } = useContext(OwnerContext);

    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [availableTab, setavailableTab] = useState("all");
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
    }, [availableTab]);

    // ------------------- FILTERS -------------------

    const allOwners = owners;

    const availableOwners = owners.filter(
        (o) => o.status === "available"
    );

    const unavailableOwners = owners.filter(
        (o) => o.status === "unavailable"
    );

    const pendingOwners = owners.filter(
        (o) => o.status === "pending"
    );

    const rejectedOwners = owners.filter(
        (o) => o.status === "rejected"
    );

    // Get current list based on available tab
    const getCurrentList = () => {
        switch (availableTab) {
            case "available":
                return availableOwners;
            case "unavailable":
                return unavailableOwners;
            case "Pending Approval":
                return pendingOwners;
            case "rejected":
                return rejectedOwners;
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

    // Get item name for pagination based on available tab
    const getItemName = () => {
        switch (availableTab) {
            case "available":
                return "available owners";
            case "unavailable":
                return "unavailable owners";
            case "Pending Approval":
                return "pending owners";
            case "rejected":
                return "rejected owners";
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
            id: "available",
            label: "available",
            count: availableOwners.length,
        },
        {
            id: "unavailable",
            label: "unavailable",
            count: unavailableOwners.length,
        },
        {
            id: "Pending Approval",
            label: "Pending Approval",
            count: pendingOwners.length,
        },
        {
            id: "rejected",
            label: "Declined",
            count: rejectedOwners.length,
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
            value: rejectedOwners.length,
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
                status: "available",
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
                status: "rejected",
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

        const newStatus = ownerToChangeStatus.status === "available" ? "unavailable" : "available";

        try {
            const updatePayload = {
                status: newStatus,
                decline_reason: newStatus === "unavailable" ? reason : null,
            };

            await updateOwner(ownerToChangeStatus._id, updatePayload);
            toast.success(
                `Owner ${newStatus === "available" ? "activated" : "deactivated"} successfully`
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

    if (loading) {
        return (
            <LoadingSpinner />
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
                availableTab={availableTab}
                onTabChange={setavailableTab}
            />

            {availableTab === "all" && (
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

            {availableTab === "available" && (
                <>
                    <OwnerTable
                        length={availableOwners.length}
                        title="available Owners"
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

            {availableTab === "unavailable" && (
                <>
                    <OwnerTable
                        length={unavailableOwners.length}
                        title="unavailable Owners"
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

            {availableTab === "rejected" && (
                <>
                    <OwnerTable
                        length={rejectedOwners.length}
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

            {availableTab === "Pending Approval" && (
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