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
        (a) => a.status === "Available"
    );

    const inactiveAccommodations = accommodations.filter(
        (a) => a.status === "Unavailable" || a.status === "Rejected"
    );

    const accommodationRequests = accommodations.filter(
        (a) => a.status === "Pending"
    );

    // ------------------- TABS -------------------
    const tabs = [
        {
            id: "current",
            label: "All  Accommodations",
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
        (sum, a) => sum + a.total_users,
        0
    );

    const occupiedUsers = accommodations.reduce(
        (sum, a) => sum + (a.total_users - a.available_users),
        0
    );

    const monthlyRevenue = accommodations.reduce(
        (sum, a) => sum + a.month_rent * (a.total_users - a.available_users),
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
            await updateAccommodation(request._id, {
                status: "Available",
                verified: true,
                reject_reason: null,
            });

            toast.success("Accommodation approved and activated");
        } catch (error) {
            console.log(error)
            toast.error("Approval failed");
        }
    };

    const handleRejectRequest = (request) => {
        setRequestToReject(request);
        setShowRejectPopup(true);
    };

    const handleConfirmReject = async (reason) => {
        if (!requestToReject) return;

        try {
            await updateAccommodation(requestToReject._id, {
                status: "Rejected",
                reject_reason: reason,
            });

            toast.success("Accommodation request rejected");
            setShowRejectPopup(false);
            setRequestToReject(null);
        } catch (error) {
            console.log(error)
            toast.error("Reject failed");
        }
    };

    const handleToggleAccommodationStatus = (accommodation) => {
        setAccommodationToChangeStatus(accommodation);
        setShowStatusPopup(true);
    };

    const handleConfirmStatusChange = async (reason) => {
        if (!accommodationToChangeStatus) return;

        const newStatus = accommodationToChangeStatus.status === "Available"
            ? "Unavailable"
            : "Available";

        try {
            await updateAccommodation(accommodationToChangeStatus._id, {
                status: newStatus,
                reject_reason: newStatus === "Unavailable" ? reason : null,
            });
            toast.success(`Accommodation ${newStatus === "Available" ? "activated" : "deactivated"}`);
        } catch (error) {
            console.error(error);
            toast.error("Status update failed");
        } finally {
            setShowStatusPopup(false);
            setAccommodationToChangeStatus(null);
        }
    };

    useEffect(() => {
        fetchAccommodations();
    }, []);

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
                    a
                />
            )}

            {activeTab === "requests" && (
                <AccommodationRequestsTable
                    accommodationRequests={accommodationRequests}
                    onViewRequest={handleViewAccommodation}
                    onApproveRequest={(id) =>
                        handleApproveRequest(
                            accommodationRequests.find((r) => r._id === id)
                        )
                    }
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
