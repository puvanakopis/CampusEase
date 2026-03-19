import React, { useState, useContext, useMemo, useEffect } from "react";
import Heading from "../../containers/owner/common/Heading";
import StatsCards from "../../containers/owner/common/StatsCards";
import Tabs from "../../containers/owner/common/Tabs";
import AccommodationTable from "../../containers/owner/accommodation/AccommodationTable";
import AddAccommodationPopup from "../../containers/owner/accommodation/AddAccommodationPopup";
import EditAccommodationPopup from "../../containers/owner/accommodation/EditAccommodationPopup";
import PendingAccommodationTable from "../../containers/owner/accommodation/PendingAccommodationTable";
import RejectedAccommodationTable from "../../containers/owner/accommodation/RejectedAccommodationTable";
import ViewAccommodationPopup from "../../containers/owner/accommodation/ViewAccommodationPopup";
import DeleteAccommodationPopup from "../../containers/owner/accommodation/DeleteAccommodationPopup";
import LoadingSpinner from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import { OWNER_ITEMS_PER_PAGE } from "../../constants/pagination";

import { AccommodationContext } from "../../context/AccommodationContext";
import { AuthContext } from "../../context/AuthContext";

const OwnerAccommodation = () => {
    const {
        ownerAccommodations,
        accoLoading,
        createAccommodation,
        updateAccommodation,
        deleteAccommodation,
        fetchMyAccommodations
    } = useContext(AccommodationContext);

    const { currentUser } = useContext(AuthContext);

    const [availableTab, setAvailableTab] = useState("all");
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [resubmitMode, setResubmitMode] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchMyAccommodations();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [availableTab]);

    const getStatus = (accommodation) =>
        accommodation?.status?.toLowerCase() || "";

    // ------------ Filter Lists ------------
    const allList = useMemo(() => ownerAccommodations, [ownerAccommodations]);

    const pendingList = useMemo(
        () => ownerAccommodations.filter(a => getStatus(a) === "pending"),
        [ownerAccommodations]
    );

    const availableList = useMemo(
        () => ownerAccommodations.filter(a => getStatus(a) === "available"),
        [ownerAccommodations]
    );

    const bookedList = useMemo(
        () => ownerAccommodations.filter(a => getStatus(a) === "booked"),
        [ownerAccommodations]
    );

    const unavailableList = useMemo(
        () => ownerAccommodations.filter(a => getStatus(a) === "unavailable"),
        [ownerAccommodations]
    );

    const rejectedList = useMemo(
        () => ownerAccommodations.filter(a => getStatus(a) === "rejected"),
        [ownerAccommodations]
    );

    // Get current list based on available tab
    const getCurrentList = () => {
        switch (availableTab) {
            case "pending": return pendingList;
            case "rejected": return rejectedList;
            case "available": return availableList;
            case "booked": return bookedList;
            case "unavailable": return unavailableList;
            default: return allList;
        }
    };

    const currentList = getCurrentList();
    const totalPages = Math.ceil(currentList.length / OWNER_ITEMS_PER_PAGE);

    const paginatedList = useMemo(() => {
        const startIndex = (currentPage - 1) * OWNER_ITEMS_PER_PAGE;
        const endIndex = startIndex + OWNER_ITEMS_PER_PAGE;
        return currentList.slice(startIndex, endIndex);
    }, [currentList, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ------------ Tabs ------------
    const tabs = [
        { id: "all", label: "All Accommodations", count: allList.length },
        { id: "available", label: "Available", count: availableList.length },
        { id: "pending", label: "Pending", count: pendingList.length },
        { id: "booked", label: "Booked", count: bookedList.length },
        { id: "unavailable", label: "unavailable", count: unavailableList.length },
        { id: "rejected", label: "Rejected", count: rejectedList.length },
    ];

    // ------------ Stats ------------
    const stats = useMemo(() => {
        const total = ownerAccommodations.length;

        return [
            {
                label: "Total Accommodations",
                icon: "apartment",
                value: total,
                subtext: `${availableList.length} available, ${bookedList.length} booked`,
                trendIcon: "trending_up",
                subtextColor: "text-green-500",
            },
            {
                label: "Available Accommodations",
                icon: "check_circle",
                value: availableList.length,
                subtext: `${availableList.length} accommodations ready`,
            },
            {
                label: "Pending / Rejected",
                icon: "hourglass_empty",
                value: pendingList.length + rejectedList.length,
                subtext: `${pendingList.length} pending, ${rejectedList.length} rejected`,
            },
        ];
    }, [
        ownerAccommodations,
        availableList.length,
        bookedList.length,
        pendingList.length,
        rejectedList.length
    ]);

    // ------------ Handlers ------------
    const handleAddAccommodation = async (payload) => {
        try {
            await createAccommodation(payload);
            setShowAddPopup(false);
        } catch (error) {
            console.error("Failed to create accommodation:", error);
        }
    };

    const handleEditAccommodation = async (payload) => {
        try {
            if (resubmitMode) {
                await updateAccommodation(selectedAccommodation._id, {
                    accommodationData: {
                        ...payload.accommodationData,
                        status: "pending",
                        reject_reason: null,
                    },
                    imageFiles: payload.imageFiles || []
                });
                setResubmitMode(false);
            } else {
                await updateAccommodation(selectedAccommodation._id, payload);
            }

            setShowEditPopup(false);
            setSelectedAccommodation(null);

        } catch (error) {
            console.error("Failed to update accommodation:", error);
        }
    };

    const handleDeleteAccommodation = async (id) => {
        try {
            await deleteAccommodation(id);
            setShowDeletePopup(false);
            setSelectedAccommodation(null);
        } catch (error) {
            console.error("Failed to delete accommodation:", error);
        }
    };

    const handleDeleteClick = (id) => {
        const acc = allList.find(a => a._id === id);
        setSelectedAccommodation(acc);
        setShowDeletePopup(true);
    };

    const handleViewAccommodation = (acc) => {
        setSelectedAccommodation(acc);
        setShowViewPopup(true);
    };

    const handleEditClick = (acc) => {
        setSelectedAccommodation(acc);
        setShowEditPopup(true);
        setResubmitMode(false);
    };

    const handleEditBeforeResubmit = (acc) => {
        setSelectedAccommodation(acc);
        setShowEditPopup(true);
        setResubmitMode(true);
    };

    const handleToggleAvailability = async (acc) => {
        const currentStatus = getStatus(acc);
        const newStatus = currentStatus === "available" ? "unavailable" : "available";

        try {
            await updateAccommodation(acc._id, {
                accommodationData: { status: newStatus },
                imageFiles: []
            });
        } catch (error) {
            console.error("Failed to toggle availability:", error);
        }
    };

    // Get item name for pagination based on available tab
    const getItemName = () => {
        switch (availableTab) {
            case "pending": return "pending accommodations";
            case "rejected": return "rejected accommodations";
            case "available": return "available accommodations";
            case "booked": return "booked accommodations";
            case "unavailable": return "unavailable accommodations";
            default: return "accommodations";
        }
    };

    if (accoLoading && ownerAccommodations.length === 0) {
        return <LoadingSpinner />;
    }

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto">
            {/* Popups */}
            {showAddPopup && (
                <AddAccommodationPopup
                    currentUser={currentUser}
                    onClose={() => setShowAddPopup(false)}
                    onSave={handleAddAccommodation}
                />
            )}

            {showViewPopup && selectedAccommodation && (
                <ViewAccommodationPopup
                    accommodation={selectedAccommodation}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedAccommodation(null);
                    }}
                    onEdit={() => {
                        setShowViewPopup(false);
                        setShowEditPopup(true);
                    }}
                    availableTab={availableTab}
                />
            )}

            {showEditPopup && selectedAccommodation && (
                <EditAccommodationPopup
                    accommodation={selectedAccommodation}
                    onClose={() => {
                        setShowEditPopup(false);
                        setSelectedAccommodation(null);
                        setResubmitMode(false);
                    }}
                    onSave={handleEditAccommodation}
                    availableTab={availableTab}
                    resubmitMode={resubmitMode}
                />
            )}

            {showDeletePopup && selectedAccommodation && (
                <DeleteAccommodationPopup
                    accommodation={selectedAccommodation}
                    onClose={() => {
                        setShowDeletePopup(false);
                        setSelectedAccommodation(null);
                    }}
                    onConfirm={handleDeleteAccommodation}
                />
            )}

            {/* Header */}
            <Heading
                title="Accommodation Management"
                subtitle="Manage your Sabaragamuwa University area listings."
                buttonText="Add New Accommodation"
                onButtonClick={() => setShowAddPopup(true)}
            />

            {/* Stats */}
            <StatsCards stats={stats} />

            {/* Tabs */}
            <Tabs tabs={tabs} availableTab={availableTab} onTabChange={setAvailableTab} />

            {/* Tab Content */}

            {availableTab === "all" && (
                <>
                    <AccommodationTable
                        length={allList.length}
                        accommodations={paginatedList}
                        heading="All Accommodations"
                        onView={handleViewAccommodation}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        onToggleAvailability={handleToggleAvailability}
                        showEditDelete={true}
                    />

                    {allList.length > OWNER_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={allList.length}
                            itemsPerPage={OWNER_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName="accommodations"
                        />
                    )}
                </>
            )}

            {availableTab === "available" && (
                <>
                    <AccommodationTable
                        length={availableList.length}
                        accommodations={paginatedList}
                        heading="Available Accommodations"
                        onView={handleViewAccommodation}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        onToggleAvailability={handleToggleAvailability}
                        showEditDelete={true}
                    />

                    {availableList.length > OWNER_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={availableList.length}
                            itemsPerPage={OWNER_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName="available accommodations"
                        />
                    )}
                </>
            )}

            {availableTab === "pending" && (
                <>
                    <PendingAccommodationTable
                        length={pendingList.length}
                        accommodations={paginatedList}
                        onView={handleViewAccommodation}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />
                    {pendingList.length > OWNER_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={pendingList.length}
                            itemsPerPage={OWNER_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {availableTab === "booked" && (
                <>
                    <AccommodationTable
                        length={bookedList.length}
                        accommodations={paginatedList}
                        heading="Booked Accommodations"
                        onView={handleViewAccommodation}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        onToggleAvailability={handleToggleAvailability}
                        showEditDelete={true}
                    />

                    {bookedList.length > OWNER_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={bookedList.length}
                            itemsPerPage={OWNER_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName="booked accommodations"
                        />
                    )}
                </>
            )}

            {availableTab === "unavailable" && (
                <>
                    <AccommodationTable
                        length={unavailableList.length}
                        accommodations={paginatedList}
                        heading="unavailable Accommodations"
                        onView={handleViewAccommodation}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        onToggleAvailability={handleToggleAvailability}
                        showEditDelete={true}
                    />

                    {unavailableList.length > OWNER_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={unavailableList.length}
                            itemsPerPage={OWNER_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName="unavailable accommodations"
                        />
                    )}
                </>
            )}

            {availableTab === "rejected" && (
                <>
                    <RejectedAccommodationTable
                        length={rejectedList.length}
                        accommodations={paginatedList}
                        onView={handleViewAccommodation}
                        onEditBeforeResubmit={handleEditBeforeResubmit}
                        onDelete={handleDeleteClick}
                    />
                    {rejectedList.length > OWNER_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={rejectedList.length}
                            itemsPerPage={OWNER_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

        </main>
    );
};

export default OwnerAccommodation;