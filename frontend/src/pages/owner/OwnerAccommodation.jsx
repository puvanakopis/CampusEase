import React, { useState, useContext, useMemo } from "react";
import Heading from "../../containers/owner/common/Heading";
import StatsCards from "../../containers/owner/common/StatsCards";
import Tabs from "../../containers/owner/common/Tabs";
import AccommodationTable from "../../containers/owner/accommodation/AccommodationTable";
import AddAccommodationPopup from "../../containers/owner/accommodation/AddAccommodationPopup";
import EditAccommodationPopup from "../../containers/owner/accommodation/EditAccommodationPopup";
import PendingAccommodationTable from "../../containers/owner/accommodation/PendingAccommodationTable";
import RejectedAccommodationTable from "../../containers/owner/accommodation/RejectedAccommodationTable";
import ViewAccommodationPopup from "../../containers/owner/accommodation/ViewAccommodationPopup";

import { AccommodationContext } from "../../context/AccommodationContext";

const OwnerAccommodation = () => {
    const {
        accommodations,
        createAccommodation,
        updateAccommodation,
        deleteAccommodation,
    } = useContext(AccommodationContext);

    const [activeTab, setActiveTab] = useState("active");
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [resubmitMode, setResubmitMode] = useState(false);


    // ------------ Tabs ------------
    const activeList = useMemo(
        () => accommodations.filter((a) => a.status === "Available"),
        [accommodations]
    );
    const pendingList = useMemo(
        () => accommodations.filter((a) => a.status === "Pending"),
        [accommodations]
    );
    const rejectedList = useMemo(
        () => accommodations.filter((a) => a.status === "Rejected"),
        [accommodations]
    );

    const tabs = [
        { id: "active", label: "Active Accommodations", count: activeList.length },
        { id: "pending", label: "Accommodation Pending", count: pendingList.length },
        { id: "rejected", label: "Accommodation Rejected", count: rejectedList.length },
    ];


    // ------------ Stats ------------
    const stats = [
        {
            label: "Total Accommodations",
            icon: "apartment",
            value: accommodations.length,
            subtext: `${activeList.length} active, ${pendingList.length} pending`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500",
        },
        {
            label: "Total Occupancy",
            icon: "group",
            value:
                activeList.length > 0
                    ? `${(
                        (activeList.reduce(
                            (sum, prop) => sum + (prop.total_users - prop.available_users),
                            0
                        ) /
                            activeList.reduce((sum, prop) => sum + prop.total_users, 0)) *
                        100
                    ).toFixed(1)}%`
                    : "0%",
            subtext: `${activeList.reduce(
                (sum, prop) => sum + (prop.total_users - prop.available_users),
                0
            )} of ${activeList.reduce((sum, prop) => sum + prop.total_users, 0)} rooms occupied`,
        },
        {
            label: "Monthly Revenue",
            icon: "payments",
            value: `LKR ${activeList
                .reduce(
                    (sum, prop) =>
                        sum + prop.month_rent * (prop.total_users - prop.available_users),
                    0
                )
                .toLocaleString()}`,
            subtext: "From active accommodations",
        },
    ];


    // ADD
    const handleAddAccommodation = async (newAccommodation) => {
        await createAccommodation(newAccommodation);
        setShowAddPopup(false);
    };

    // EDIT / RESUBMIT
    const handleEditAccommodation = async (updatedAccommodation) => {
        if (resubmitMode) {
            await updateAccommodation(updatedAccommodation._id, {
                ...updatedAccommodation,
                status: "Pending",
                reject_reason: null,
            });

            setResubmitMode(false);
            setShowEditPopup(false);
            setSelectedAccommodation(null);
            return;
        }

        await updateAccommodation(updatedAccommodation._id, updatedAccommodation);
        setShowEditPopup(false);
        setSelectedAccommodation(null);
    };

    // DELETE
    const handleDeleteAccommodation = async (id) => {
        if (window.confirm("Are you sure you want to delete this accommodation?")) {
            await deleteAccommodation(id);
        }
    };

    // VIEW / EDIT HANDLERS
    const handleViewAccommodation = (acc) => {
        setSelectedAccommodation(acc);
        setShowViewPopup(true);
    };

    const handleEditClick = (acc) => {
        setSelectedAccommodation(acc);
        setShowEditPopup(true);
    };

    const handleEditBeforeResubmit = (acc) => {
        setSelectedAccommodation(acc);
        setShowEditPopup(true);
        setResubmitMode(true);
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            {showAddPopup && (
                <AddAccommodationPopup
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
                    }}
                    onSave={handleEditAccommodation}
                    activeTab={activeTab}
                />
            )}

            <Heading
                title="Accommodation Management"
                subtitle="Manage your Sabaragamuwa University area listings."
                buttonText="Add New Accommodation"
                onButtonClick={() => setShowAddPopup(true)}
            />

            <StatsCards stats={stats} />

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "active" && (
                <AccommodationTable
                    accommodations={activeList}
                    onView={handleViewAccommodation}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteAccommodation}
                    showEditDelete={true}
                />
            )}

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
        </main>
    );
};

export default OwnerAccommodation;