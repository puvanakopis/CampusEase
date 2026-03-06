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
import LoadingSpinner from "../../components/common/Loading";

import { AccommodationContext } from "../../context/AccommodationContext";
import { AuthContext } from "../../context/AuthContext";

const OwnerAccommodation = () => {
    const {
        accommodations,
        accoLoading,
        createAccommodation,
        updateAccommodation,
        deleteAccommodation,
        fetchAccommodations
    } = useContext(AccommodationContext);

    const { currentUser } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState("all");
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [resubmitMode, setResubmitMode] = useState(false);

    useEffect(() => {
        fetchAccommodations();
    }, []);

    const getStatus = (accommodation) => accommodation?.status?.toLowerCase() || '';

    // ------------ Tabs with all statuses ------------
    const allList = useMemo(() => accommodations, [accommodations]);
    const pendingList = useMemo(() => accommodations.filter(a => getStatus(a) === "pending"), [accommodations]);
    const availableList = useMemo(() => accommodations.filter(a => getStatus(a) === "available"), [accommodations]);
    const bookedList = useMemo(() => accommodations.filter(a => getStatus(a) === "booked"), [accommodations]);
    const unavailableList = useMemo(() => accommodations.filter(a => getStatus(a) === "unavailable"), [accommodations]);
    const rejectedList = useMemo(() => accommodations.filter(a => getStatus(a) === "rejected"), [accommodations]);

    const tabs = [
        { id: "all", label: "All Accommodations", count: allList.length },
        { id: "available", label: "Available", count: availableList.length },
        { id: "pending", label: "Pending", count: pendingList.length },
        { id: "booked", label: "Booked", count: bookedList.length },
        { id: "unavailable", label: "Unavailable", count: unavailableList.length },
        { id: "rejected", label: "Rejected", count: rejectedList.length },
    ];

    // ------------ Stats ------------
    const stats = useMemo(() => {
        const totalAccommodations = accommodations.length;

        return [
            {
                label: "Total Accommodations",
                icon: "apartment",
                value: totalAccommodations,
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
                label: "Pending / Rejected Accommodations",
                icon: "hourglass_empty",
                value: pendingList.length + rejectedList.length,
                subtext: `${pendingList.length} pending, ${rejectedList.length} rejected`,
            },
        ];
    }, [accommodations, availableList.length, bookedList.length, pendingList.length, rejectedList.length]);

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
        if (window.confirm("Are you sure you want to delete this accommodation?")) {
            try {
                await deleteAccommodation(id);
            } catch (error) {
                console.error("Failed to delete accommodation:", error);
            }
        }
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

    // ------------ Render ------------
    if (accoLoading && accommodations.length === 0) {
        return <LoadingSpinner />;
    }

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
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
                    activeTab={activeTab}
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
                    activeTab={activeTab}
                    resubmitMode={resubmitMode}
                />
            )}

            {/* Header */}
            <Heading
                title="Accommodation Management"
                subtitle="Manage your Sabaragamuwa University area listings."
                buttonText="Add New Accommodation"
                onButtonClick={() => setShowAddPopup(true)}
            />

            {/* Stats Cards */}
            <StatsCards stats={stats} />

            {/* Tabs with all statuses */}
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            {activeTab === "pending" && (
                <PendingAccommodationTable
                    accommodations={pendingList}
                    onView={handleViewAccommodation}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteAccommodation}
                />
            )}

            {activeTab === "rejected" && (
                <RejectedAccommodationTable
                    accommodations={rejectedList}
                    onView={handleViewAccommodation}
                    onEditBeforeResubmit={handleEditBeforeResubmit}
                    onDelete={handleDeleteAccommodation}
                />
            )}

            {(activeTab === "all" ||
                activeTab === "available" ||
                activeTab === "booked" ||
                activeTab === "unavailable") && (
                    <AccommodationTable
                        accommodations={
                            activeTab === "available"
                                ? availableList
                                : activeTab === "booked"
                                    ? bookedList
                                    : activeTab === "unavailable"
                                        ? unavailableList
                                        : allList
                        }
                        onView={handleViewAccommodation}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteAccommodation}
                        onToggleAvailability={handleToggleAvailability}
                        showEditDelete={true}
                    />
                )}
        </main>
    );
};

export default OwnerAccommodation;