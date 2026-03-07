import React, { useState, useContext, useEffect } from "react";
import { OwnerContext } from "../../context/OwnerContext";
import Heading from "../../containers/admin/common/Heading";
import StatsCards from "../../containers/admin/common/StatsCards";
import Tabs from "../../containers/admin/common/Tabs";
import OwnerTable from "../../containers/admin/owner/OwnerTable";
import OwnerRequestsTable from "../../containers/admin/owner/OwnerRequestsTable";
import ViewOwnerPopup from "../../containers/admin/owner/ViewOwnerPopup";
import StatusChangePopup from "../../containers/admin/owner/StatusChangePopup";
import RejectPopup from "../../containers/admin/owner/RejectPopup";
import toast from "react-hot-toast";

const AdminOwnerManagement = () => {
    const { owners, fetchOwners, updateOwner, loading } = useContext(OwnerContext);

    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [ownerToChangeStatus, setOwnerToChangeStatus] = useState(null);
    const [showRejectPopup, setShowRejectPopup] = useState(false);
    const [requestToReject, setRequestToReject] = useState(null);

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

    useEffect(() => {
        fetchOwners();
    }, []);

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
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">

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
                <OwnerTable
                    title="All Owners"
                    owners={allOwners}
                    onView={handleViewOwner}
                    onToggleStatus={handleToggleOwnerStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "Active" && (
                <OwnerTable
                    title="Active Owners"
                    owners={activeOwners}
                    onView={handleViewOwner}
                    onToggleStatus={handleToggleOwnerStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "Inactive" && (
                <OwnerTable
                    title="Inactive Owners"
                    owners={inactiveOwners}
                    onView={handleViewOwner}
                    onToggleStatus={handleToggleOwnerStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "Declined Approval" && (
                <OwnerTable
                    title="Declined Owners"
                    owners={declinedOwners}
                    onView={handleViewOwner}
                    onToggleStatus={handleToggleOwnerStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "Pending Approval" && (
                <OwnerRequestsTable
                    ownerRequests={pendingOwners}
                    onViewRequest={handleViewOwner}
                    onApproveRequest={handleApproveRequest}
                    onRejectRequest={handleRejectRequest}
                />
            )}

        </main>
    );
};

export default AdminOwnerManagement;