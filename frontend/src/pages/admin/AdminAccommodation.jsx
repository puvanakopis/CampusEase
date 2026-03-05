import React, { useState, useContext, useEffect } from "react";
import Heading from "../../containers/admin/common/Heading";
import StatsCards from "../../containers/admin/common/StatsCards";
import Tabs from "../../containers/admin/common/Tabs";

import AccommodationTable from "../../containers/admin/accommodation/AccommodationTable";
import AccommodationRequestsTable from "../../containers/admin/accommodation/AccommodationRequestsTable";

import ViewAccommodationPopup from "../../containers/admin/accommodation/ViewAccommodationPopup";
import StatusChangePopup from "../../containers/admin/accommodation/StatusChangePopup";
import RejectPopup from "../../containers/admin/accommodation/RejectPopup";

import { AccommodationContext } from "../../context/AccommodationContext";
import toast from "react-hot-toast";

const AdminAccommodation = () => {
    const {
        accommodations,
        fetchAccommodations,
        updateAccommodation,
        accoLoading
    } = useContext(AccommodationContext);

    const [activeTab, setActiveTab] = useState("current");

    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);

    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [accommodationToChangeStatus, setAccommodationToChangeStatus] =
        useState(null);

    const [showRejectPopup, setShowRejectPopup] = useState(false);
    const [requestToReject, setRequestToReject] = useState(null);

    // ------------------- FILTERS -------------------
    const activeAccommodations = accommodations.filter(
        (a) => a.status === "available"
    );

    const inactiveAccommodations = accommodations.filter(
        (a) => a.status === "unavailable" || a.status === "rejected"
    );

    const accommodationRequests = accommodations.filter(
        (a) => a.status === "pending"
    );

    // ------------------- TABS -------------------
    const tabs = [
        {
            id: "current",
            label: "All Accommodations",
            count: activeAccommodations.length,
        },
        {
            id: "requests",
            label: "Accommodation Requests",
            count: accommodationRequests.length,
        },
        {
            id: "inactive",
            label: "Inactive Accommodations",
            count: inactiveAccommodations.length,
        },
    ];

    // ------------------- STATS -------------------
    const totalUsers = accommodations.reduce(
        (sum, a) => sum + (a.total_users || 0),
        0
    );

    const occupiedUsers = accommodations.reduce(
        (sum, a) => sum + ((a.total_users || 0) - (a.available_users || 0)),
        0
    );

    const monthlyRevenue = accommodations.reduce(
        (sum, a) => sum + (a.month_rent || 0) * ((a.total_users || 0) - (a.available_users || 0)),
        0
    );

    const stats = [
        {
            label: "Total Accommodations",
            icon: "apartment",
            value: accommodations.length,
            subtext: `${activeAccommodations.length} active`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500",
        },
        {
            label: "Total Occupancy",
            icon: "group",
            value:
                totalUsers > 0
                    ? `${((occupiedUsers / totalUsers) * 100).toFixed(1)}%`
                    : "0%",
            subtext: `${occupiedUsers} of ${totalUsers} users`,
        },
        {
            label: "Monthly Revenue",
            icon: "payments",
            value: `LKR ${monthlyRevenue.toLocaleString()}`,
            subtext: "From active accommodations",
        },
    ];

    // ------------------- ACTION HANDLERS -------------------
    const handleViewAccommodation = (accommodation) => {
        setSelectedAccommodation(accommodation);
        setShowViewPopup(true);
    };

    const handleApproveRequest = async (request) => {
        try {
            const updatePayload = {
                accommodationData: {
                    status: "available",
                    verified: true,
                    reject_reason: null,
                }
            };
            
            await updateAccommodation(request._id, updatePayload);
            toast.success("Accommodation approved and activated");
            await fetchAccommodations(); 
        } catch (error) {
            console.log(error);
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
                accommodationData: {
                    status: "rejected",
                    reject_reason: reason,
                    verified: false
                }
            };

            await updateAccommodation(requestToReject._id, updatePayload);
            toast.success("Accommodation request rejected");
            setShowRejectPopup(false);
            setRequestToReject(null);
            await fetchAccommodations();
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Reject failed");
        }
    };

    const handleToggleAccommodationStatus = (accommodation) => {
        setAccommodationToChangeStatus(accommodation);
        setShowStatusPopup(true);
    };

    const handleConfirmStatusChange = async (reason) => {
        if (!accommodationToChangeStatus) return;

        const newStatus = accommodationToChangeStatus.status === "available"
            ? "unavailable"
            : "available";

        try {
            const updatePayload = {
                accommodationData: {
                    status: newStatus,
                    reject_reason: newStatus === "unavailable" ? reason : null,
                }
            };

            await updateAccommodation(accommodationToChangeStatus._id, updatePayload);
            toast.success(`Accommodation ${newStatus === "available" ? "activated" : "deactivated"}`);
            await fetchAccommodations(); 
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Status update failed");
        } finally {
            setShowStatusPopup(false);
            setAccommodationToChangeStatus(null);
        }
    };

    useEffect(() => {
        fetchAccommodations();
    }, []);

    if (accoLoading && accommodations.length === 0) {
        return (
            <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-slate-600">Loading accommodations...</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            {showViewPopup && selectedAccommodation && (
                <ViewAccommodationPopup
                    accommodation={selectedAccommodation}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedAccommodation(null);
                    }}
                    isAdmin={true}
                />
            )}

            {showStatusPopup && accommodationToChangeStatus && (
                <StatusChangePopup
                    accommodation={accommodationToChangeStatus}
                    currentStatus={accommodationToChangeStatus.status}
                    onClose={() => {
                        setShowStatusPopup(false);
                        setAccommodationToChangeStatus(null);
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
                title="Admin Accommodation Management"
                subtitle="Manage existing accommodations and review new accommodation submissions from owners."
                showButton={false}
            />

            <StatsCards stats={stats} />

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "current" && (
                <AccommodationTable
                    title='All Accommodations'
                    accommodations={activeAccommodations}
                    onView={handleViewAccommodation}
                    onToggleStatus={handleToggleAccommodationStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "requests" && (
                <AccommodationRequestsTable
                    accommodationRequests={accommodationRequests}
                    onViewRequest={handleViewAccommodation}
                    onApproveRequest={handleApproveRequest}
                    onRejectRequest={handleRejectRequest}
                />
            )}

            {activeTab === "inactive" && (
                <AccommodationTable
                    title='Inactive Accommodations'
                    accommodations={inactiveAccommodations}
                    onView={handleViewAccommodation}
                    onToggleStatus={handleToggleAccommodationStatus}
                    isAdmin={true}
                />
            )}
        </main>
    );
};

export default AdminAccommodation;