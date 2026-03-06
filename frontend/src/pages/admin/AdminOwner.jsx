import React, { useState, useContext } from "react";
import { OwnerContext } from "../../context/OwnerContext";
import Heading from "../../containers/admin/common/Heading";
import StatsCards from "../../containers/admin/common/StatsCards";
import Tabs from "../../containers/admin/common/Tabs";
import OwnerTable from "../../containers/admin/owner/OwnerTable";
import ViewOwnerPopup from "../../containers/admin/owner/ViewOwnerPopup";
import StatusChangePopup from "../../containers/admin/owner/StatusChangePopup";

const OWNER_STATUS_TABS = [
    { id: "all", label: "All Owners" },
    { id: "Pending Approval", label: "Pending Approval" },
    { id: "Active", label: "Active Owners" },
    { id: "Inactive", label: "Inactive Owners" },
    { id: "Declined Approval", label: "Declined Owners" }
];

const AdminOwnerManagement = () => {
    const { owners, loading, updateOwner, deleteOwner } = useContext(OwnerContext);

    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [activeTab, setActiveTab] = useState(OWNER_STATUS_TABS[0].id);
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [ownerToChangeStatus, setOwnerToChangeStatus] = useState(null);

    // Group owners by status
    const ownersByStatus = OWNER_STATUS_TABS.reduce((acc, tab) => {
        if (tab.id === "all") acc[tab.id] = owners; // all owners
        else acc[tab.id] = owners.filter(owner => owner.status === tab.id);
        return acc;
    }, {});

    // Generate tabs with counts
    const tabs = OWNER_STATUS_TABS.map(tab => ({
        ...tab,
        count: ownersByStatus[tab.id]?.length || 0
    }));

    // Stats
    const stats = [
        {
            label: "Total Owners",
            icon: "group",
            value: owners.length,
            subtext: `${ownersByStatus["Active"]?.length || 0} active`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Pending Approvals",
            icon: "pending_actions",
            value: ownersByStatus["Pending Approval"]?.length || 0,
            subtext: "Awaiting review",
            trendIcon: "hourglass_empty",
            subtextColor: "text-yellow-600"
        },
        {
            label: "Avg. Owner Rating",
            icon: "star",
            value: owners.length > 0
                ? (owners.reduce((sum, owner) => sum + (owner.rating || 0), 0) / owners.length).toFixed(1)
                : "0.0",
            subtext: `${owners.filter(o => (o.rating || 0) >= 4).length} owners rated 4+`,
            subtextColor: "text-yellow-600"
        }
    ];

    const handleViewOwner = (owner) => {
        setSelectedOwner(owner);
        setShowViewPopup(true);
    };

    const handleDeleteOwner = async (ownerId) => {
        if (window.confirm("Are you sure you want to delete this owner? This will also remove all their properties.")) {
            try {
                await deleteOwner(ownerId);
            } catch (error) {
                console.error("Error deleting owner:", error);
            }
        }
    };

    const handleApproveRequest = async (requestId) => {
        try {
            await updateOwner(requestId, {
                status: "Active",
                verified: true
            });
        } catch (error) {
            console.error("Error approving owner:", error);
        }
    };

    const handleRejectRequest = async (requestId) => {
        const reason = window.prompt("Please provide a reason for rejection:");
        if (reason) {
            try {
                await updateOwner(requestId, {
                    status: "Declined Approval",
                    decline_reason: reason,
                    verified: false
                });
            } catch (error) {
                console.error("Error rejecting owner:", error);
            }
        }
    };

    const handleToggleOwnerStatus = (ownerId, currentStatus) => {
        const owner = owners.find(o => o.id === ownerId || o._id === ownerId);
        if (!owner) return;

        setOwnerToChangeStatus({ ...owner, currentStatus });
        setShowStatusPopup(true);
    };

    const handleConfirmStatusChange = async (reason) => {
        if (!ownerToChangeStatus) return;

        const newStatus = ownerToChangeStatus.currentStatus === "Active" ? "Inactive" : "Active";
        const updateData = {
            status: newStatus,
            last_updated: new Date().toISOString()
        };

        if (newStatus === "Inactive" && reason) {
            updateData.decline_reason = reason;
        }

        try {
            await updateOwner(ownerToChangeStatus._id || ownerToChangeStatus.id, updateData);
            setShowStatusPopup(false);
            setOwnerToChangeStatus(null);
        } catch (error) {
            console.error("Error updating owner status:", error);
        }
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            {/* Popups */}
            {showViewPopup && selectedOwner && (
                <ViewOwnerPopup
                    owner={selectedOwner}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedOwner(null);
                    }}
                />
            )}

            {showStatusPopup && ownerToChangeStatus && (
                <StatusChangePopup
                    owner={ownerToChangeStatus}
                    currentStatus={ownerToChangeStatus.currentStatus}
                    onClose={() => {
                        setShowStatusPopup(false);
                        setOwnerToChangeStatus(null);
                    }}
                    onConfirm={handleConfirmStatusChange}
                />
            )}

            <Heading
                title="Admin Owner Management"
                subtitle="Manage property owners, review registration requests, and handle owner accounts."
                showButton={false}
            />

            <StatsCards stats={stats} />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {loading ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-slate-600 mt-4">Loading owners...</p>
                </div>
            ) : (
                <>
                    {OWNER_STATUS_TABS.map(tab => (
                        activeTab === tab.id && (
                            <OwnerTable
                                key={tab.id}
                                owners={ownersByStatus[tab.id] || []}
                                onView={handleViewOwner}
                                onDelete={handleDeleteOwner}
                                onToggleStatus={handleToggleOwnerStatus}
                                onApproveRequest={tab.id === "Pending Approval" ? handleApproveRequest : undefined}
                                onRejectRequest={tab.id === "Pending Approval" ? handleRejectRequest : undefined}
                            />
                        )
                    ))}
                </>
            )}
        </main>
    );
};

export default AdminOwnerManagement;