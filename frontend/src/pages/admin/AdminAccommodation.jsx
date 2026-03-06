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

    const [activeTab, setActiveTab] = useState("all");

    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);

    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [accommodationToChangeStatus, setAccommodationToChangeStatus] =
        useState(null);

    const [showRejectPopup, setShowRejectPopup] = useState(false);
    const [requestToReject, setRequestToReject] = useState(null);

    // ------------------- FILTERS -------------------

    const allAccommodations = accommodations;

    const availableAccommodations = accommodations.filter(
        (a) => a.status === "available"
    );

    const bookedAccommodations = accommodations.filter(
        (a) => a.status === "booked"
    );

    const unavailableAccommodations = accommodations.filter(
        (a) => a.status === "unavailable"
    );

    const rejectedAccommodations = accommodations.filter(
        (a) => a.status === "rejected"
    );

    const accommodationRequests = accommodations.filter(
        (a) => a.status === "pending"
    );

    // ------------------- TABS -------------------

    const tabs = [
        {
            id: "all",
            label: "All",
            count: accommodations.length,
        },
        {
            id: "available",
            label: "Available",
            count: availableAccommodations.length,
        },
        {
            id: "booked",
            label: "Booked",
            count: bookedAccommodations.length,
        },
        {
            id: "unavailable",
            label: "Unavailable",
            count: unavailableAccommodations.length,
        },
        {
            id: "rejected",
            label: "Rejected",
            count: rejectedAccommodations.length,
        },
        {
            id: "requests",
            label: "Accommodation Requests",
            count: accommodationRequests.length,
        },
    ];

    // ------------------- ADMIN STATS (MATCH VEHICLES) -------------------

    const stats = [
        {
            label: "Total Accommodations",
            icon: "apartment",
            value: accommodations.length,
            subtext: "Registered in system",
        },
        {
            label: "Pending Requests",
            icon: "hourglass_empty",
            value: accommodationRequests.length,
            subtext: "Waiting for approval",
            subtextColor: "text-yellow-500",
        },
        {
            label: "Rejected Accommodations",
            icon: "cancel",
            value: rejectedAccommodations.length,
            subtext: "Not approved",
            subtextColor: "text-red-500",
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
                },
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
                    verified: false,
                },
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

        const newStatus =
            accommodationToChangeStatus.status === "available"
                ? "unavailable"
                : "available";

        try {

            const updatePayload = {
                accommodationData: {
                    status: newStatus,
                    reject_reason:
                        newStatus === "unavailable" ? reason : null,
                },
            };

            await updateAccommodation(
                accommodationToChangeStatus._id,
                updatePayload
            );

            toast.success(
                `Accommodation ${newStatus === "available" ? "activated" : "deactivated"}`
            );

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
                        <p className="mt-4 text-slate-600">
                            Loading accommodations...
                        </p>
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
                subtitle="Manage accommodations and review new submissions."
                showButton={false}
            />

            <StatsCards stats={stats} />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "all" && (
                <AccommodationTable
                    title="All Accommodations"
                    accommodations={allAccommodations}
                    onView={handleViewAccommodation}
                    onToggleStatus={handleToggleAccommodationStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "available" && (
                <AccommodationTable
                    title="Available Accommodations"
                    accommodations={availableAccommodations}
                    onView={handleViewAccommodation}
                    onToggleStatus={handleToggleAccommodationStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "booked" && (
                <AccommodationTable
                    title="Booked Accommodations"
                    accommodations={bookedAccommodations}
                    onView={handleViewAccommodation}
                    onToggleStatus={handleToggleAccommodationStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "unavailable" && (
                <AccommodationTable
                    title="Unavailable Accommodations"
                    accommodations={unavailableAccommodations}
                    onView={handleViewAccommodation}
                    onToggleStatus={handleToggleAccommodationStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "rejected" && (
                <AccommodationTable
                    title="Rejected Accommodations"
                    accommodations={rejectedAccommodations}
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

        </main>
    );
};

export default AdminAccommodation;