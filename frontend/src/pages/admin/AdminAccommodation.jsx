import React, { useState, useContext, useEffect, useMemo } from "react";
import Heading from "../../containers/admin/common/Heading";
import StatsCards from "../../containers/admin/common/StatsCards";
import Tabs from "../../containers/admin/common/Tabs";

import AccommodationTable from "../../containers/admin/accommodation/AccommodationTable";
import AccommodationRequestsTable from "../../containers/admin/accommodation/AccommodationRequestsTable";

import ViewAccommodationPopup from "../../containers/admin/accommodation/ViewAccommodationPopup";
import StatusChangePopup from "../../containers/admin/accommodation/StatusChangePopup";
import RejectPopup from "../../containers/admin/accommodation/RejectPopup";

import Pagination from "../../components/common/Pagination";
import { ADMIN_ITEMS_PER_PAGE } from "../../constants/pagination";

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
    const [currentPage, setCurrentPage] = useState(1);

    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);

    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [accommodationToChangeStatus, setAccommodationToChangeStatus] =
        useState(null);

    const [showRejectPopup, setShowRejectPopup] = useState(false);
    const [requestToReject, setRequestToReject] = useState(null);

    useEffect(() => {
        fetchAccommodations();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

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

    // Get current list based on active tab
    const getCurrentList = () => {
        switch (activeTab) {
            case "available": return availableAccommodations;
            case "booked": return bookedAccommodations;
            case "unavailable": return unavailableAccommodations;
            case "rejected": return rejectedAccommodations;
            case "requests": return accommodationRequests;
            default: return allAccommodations;
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
            case "available": return "available accommodations";
            case "booked": return "booked accommodations";
            case "unavailable": return "unavailable accommodations";
            case "rejected": return "rejected accommodations";
            case "requests": return "accommodation requests";
            default: return "accommodations";
        }
    };

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
            label: "Requests",
            count: accommodationRequests.length,
        },
    ];

    // ------------------- ADMIN STATS -------------------
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
            console.error(error);
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
                    reject_reason: newStatus === "unavailable" ? reason : null,
                },
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
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto">
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

            {/* All Accommodations Tab */}
            {activeTab === "all" && (
                <>
                    <AccommodationTable
                        length={accommodations.length}
                        title="All Accommodations"
                        accommodations={paginatedList}
                        onView={handleViewAccommodation}
                        onToggleStatus={handleToggleAccommodationStatus}
                        isAdmin={true}
                    />
                    {allAccommodations.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={allAccommodations.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {/* Available Accommodations Tab */}
            {activeTab === "available" && (
                <>
                    <AccommodationTable
                        length={availableAccommodations.length}
                        title="Available Accommodations"
                        accommodations={paginatedList}
                        onView={handleViewAccommodation}
                        onToggleStatus={handleToggleAccommodationStatus}
                        isAdmin={true}
                    />
                    {availableAccommodations.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={availableAccommodations.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {/* Booked Accommodations Tab */}
            {activeTab === "booked" && (
                <>
                    <AccommodationTable
                        length={bookedAccommodations.length}
                        title="Booked Accommodations"
                        accommodations={paginatedList}
                        onView={handleViewAccommodation}
                        onToggleStatus={handleToggleAccommodationStatus}
                        isAdmin={true}
                    />
                    {bookedAccommodations.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={bookedAccommodations.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {/* Unavailable Accommodations Tab */}
            {activeTab === "unavailable" && (
                <>
                    <AccommodationTable
                        length={unavailableAccommodations.length}
                        title="Unavailable Accommodations"
                        accommodations={paginatedList}
                        onView={handleViewAccommodation}
                        onToggleStatus={handleToggleAccommodationStatus}
                        isAdmin={true}
                    />
                    {unavailableAccommodations.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={unavailableAccommodations.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {/* Rejected Accommodations Tab */}
            {activeTab === "rejected" && (
                <>
                    <AccommodationTable
                        length={rejectedAccommodations.length}
                        title="Rejected Accommodations"
                        accommodations={paginatedList}
                        onView={handleViewAccommodation}
                        onToggleStatus={handleToggleAccommodationStatus}
                        isAdmin={true}
                    />
                    {rejectedAccommodations.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={rejectedAccommodations.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {/* Accommodation Requests Tab */}
            {activeTab === "requests" && (
                <>
                    <AccommodationRequestsTable
                        length={accommodationRequests.length}
                        accommodationRequests={paginatedList}
                        onViewRequest={handleViewAccommodation}
                        onApproveRequest={handleApproveRequest}
                        onRejectRequest={handleRejectRequest}
                    />
                    {accommodationRequests.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={accommodationRequests.length}
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

export default AdminAccommodation;