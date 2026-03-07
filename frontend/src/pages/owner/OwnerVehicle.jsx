import React, { useState, useContext, useMemo, useEffect } from "react";
import Heading from "../../containers/owner/common/Heading";
import StatsCards from "../../containers/owner/common/StatsCards";
import Tabs from "../../containers/owner/common/Tabs";
import VehicleTable from "../../containers/owner/vehicle/VehicleTable";
import PendingVehicleTable from "../../containers/owner/vehicle/PendingVehicleTable";
import RejectedVehicleTable from "../../containers/owner/vehicle/RejectedVehicleTable";
import AddVehiclePopup from "../../containers/owner/vehicle/AddVehiclePopup";
import EditVehiclePopup from "../../containers/owner/vehicle/EditVehiclePopup";
import ViewVehiclePopup from "../../containers/owner/vehicle/ViewVehiclePopup";
import DeleteVehiclePopup from "../../containers/owner/vehicle/DeleteVehiclePopup";
import LoadingSpinner from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import { OWNER_ITEMS_PER_PAGE } from "../../constants/pagination";

import { VehicleContext } from "../../context/VehicleContext";
import { AuthContext } from "../../context/AuthContext";

const OwnerVehicle = () => {
    const {
        ownerVehicles,
        loading,
        createVehicle,
        updateVehicle,
        deleteVehicle,
        fetchMyVehicles,
    } = useContext(VehicleContext);

    const { currentUser } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState("all");
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [resubmitMode, setResubmitMode] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchMyVehicles();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    const getStatus = (vehicle) => vehicle?.status?.toLowerCase() || "";

    // ------------ Filter Lists ------------
    const allList = useMemo(() => ownerVehicles, [ownerVehicles]);
    const pendingList = useMemo(
        () => ownerVehicles.filter((v) => getStatus(v) === "pending"),
        [ownerVehicles]
    );
    const availableList = useMemo(
        () => ownerVehicles.filter((v) => getStatus(v) === "available"),
        [ownerVehicles]
    );
    const bookedList = useMemo(
        () => ownerVehicles.filter((v) => getStatus(v) === "booked"),
        [ownerVehicles]
    );
    const unavailableList = useMemo(
        () => ownerVehicles.filter((v) => getStatus(v) === "unavailable"),
        [ownerVehicles]
    );
    const rejectedList = useMemo(
        () => ownerVehicles.filter((v) => getStatus(v) === "rejected"),
        [ownerVehicles]
    );

    const getCurrentList = () => {
        switch (activeTab) {
            case "pending":
                return pendingList;
            case "rejected":
                return rejectedList;
            case "available":
                return availableList;
            case "booked":
                return bookedList;
            case "unavailable":
                return unavailableList;
            default:
                return allList;
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
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ------------ Tabs ------------
    const tabs = [
        { id: "all", label: "All Vehicles", count: allList.length },
        { id: "available", label: "Available", count: availableList.length },
        { id: "pending", label: "Pending", count: pendingList.length },
        { id: "booked", label: "Booked", count: bookedList.length },
        { id: "unavailable", label: "Unavailable", count: unavailableList.length },
        { id: "rejected", label: "Rejected", count: rejectedList.length },
    ];

    // ------------ Stats ------------
    const stats = useMemo(() => {
        const totalVehicles = ownerVehicles.length;

        return [
            {
                label: "Total Vehicles",
                icon: "directions_car",
                value: totalVehicles,
                subtext: `${availableList.length} available, ${bookedList.length} booked`,
                trendIcon: "trending_up",
                subtextColor: "text-green-500",
            },
            {
                label: "Available Vehicles",
                icon: "check_circle",
                value: availableList.length,
                subtext: `${availableList.length} vehicles ready`,
            },
            {
                label: "Pending / Rejected Vehicles",
                icon: "hourglass_empty",
                value: pendingList.length + rejectedList.length,
                subtext: `${pendingList.length} pending, ${rejectedList.length} rejected`,
            },
        ];
    }, [
        ownerVehicles,
        availableList.length,
        bookedList.length,
        pendingList.length,
        rejectedList.length,
    ]);

    // ------------ Handlers ------------
    const handleAddVehicle = async (payload) => {
        try {
            await createVehicle(payload);
            setShowAddPopup(false);
        } catch (error) {
            console.error("Failed to create vehicle:", error);
        }
    };

    const handleEditVehicle = async (payload) => {
        try {
            if (resubmitMode) {
                await updateVehicle(selectedVehicle._id, {
                    vehicleData: {
                        ...payload.vehicleData,
                        status: "pending",
                        reject_reason: null,
                    },
                    imageFiles: payload.imageFiles || [],
                    removedImages: payload.removedImages || [],
                });
                setResubmitMode(false);
            } else {
                await updateVehicle(selectedVehicle._id, payload);
            }

            setShowEditPopup(false);
            setSelectedVehicle(null);
        } catch (error) {
            console.error("Failed to update vehicle:", error);
        }
    };

    const handleDeleteVehicle = async (id) => {
        try {
            await deleteVehicle(id);
            setShowDeletePopup(false);
            setSelectedVehicle(null);
        } catch (error) {
            console.error("Failed to delete vehicle:", error);
        }
    };

    const handleDeleteClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowDeletePopup(true);
    };

    const handleViewVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowViewPopup(true);
    };

    const handleEditClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowEditPopup(true);
        setResubmitMode(false);
    };

    const handleEditBeforeResubmit = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowEditPopup(true);
        setResubmitMode(true);
    };

    const handleToggleAvailability = async (vehicle) => {
        const currentStatus = getStatus(vehicle);
        const newStatus =
            currentStatus === "available" ? "unavailable" : "available";

        try {
            await updateVehicle(vehicle._id, {
                vehicleData: { status: newStatus },
                imageFiles: [],
                removedImages: [],
            });
        } catch (error) {
            console.error("Failed to toggle availability:", error);
        }
    };

    const getItemName = () => {
        switch (activeTab) {
            case "pending":
                return "pending vehicles";
            case "rejected":
                return "rejected vehicles";
            case "available":
                return "available vehicles";
            case "booked":
                return "booked vehicles";
            case "unavailable":
                return "unavailable vehicles";
            default:
                return "vehicles";
        }
    };

    if (loading && ownerVehicles.length === 0) {
        return <LoadingSpinner />;
    }

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto">
            {/* Popups */}
            {showAddPopup && (
                <AddVehiclePopup
                    currentUser={currentUser}
                    onClose={() => setShowAddPopup(false)}
                    onSave={handleAddVehicle}
                />
            )}

            {showViewPopup && selectedVehicle && (
                <ViewVehiclePopup
                    vehicle={selectedVehicle}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedVehicle(null);
                    }}
                    onEdit={() => {
                        setShowViewPopup(false);
                        setShowEditPopup(true);
                    }}
                    activeTab={activeTab}
                />
            )}

            {showEditPopup && selectedVehicle && (
                <EditVehiclePopup
                    vehicle={selectedVehicle}
                    onClose={() => {
                        setShowEditPopup(false);
                        setSelectedVehicle(null);
                        setResubmitMode(false);
                    }}
                    onSave={handleEditVehicle}
                    activeTab={activeTab}
                    resubmitMode={resubmitMode}
                />
            )}

            {showDeletePopup && selectedVehicle && (
                <DeleteVehiclePopup
                    vehicle={selectedVehicle}
                    onClose={() => {
                        setShowDeletePopup(false);
                        setSelectedVehicle(null);
                    }}
                    onConfirm={handleDeleteVehicle}
                />
            )}

            {/* Header */}
            <Heading
                title="Vehicle Management"
                subtitle="Manage your transportation rentals around Sabaragamuwa University."
                buttonText="Add New Vehicle"
                onButtonClick={() => setShowAddPopup(true)}
            />

            {/* Stats */}
            <StatsCards stats={stats} />

            {/* Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}

            {activeTab === "all" && (
                <>
                    <VehicleTable
                        length={allList.length}
                        vehicles={paginatedList}
                        heading="All Vehicles"
                        onView={handleViewVehicle}
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
                            itemName="vehicles"
                        />
                    )}
                </>
            )}

            {activeTab === "available" && (
                <>
                    <VehicleTable
                        length={availableList.length}
                        vehicles={paginatedList}
                        heading="Available Vehicles"
                        onView={handleViewVehicle}
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
                            itemName="available vehicles"
                        />
                    )}
                </>
            )}

            {activeTab === "pending" && (
                <>
                    <PendingVehicleTable
                        length={pendingList.length}
                        vehicles={paginatedList}
                        onView={handleViewVehicle}
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

            {activeTab === "booked" && (
                <>
                    <VehicleTable
                        length={bookedList.length}
                        vehicles={paginatedList}
                        heading="Booked Vehicles"
                        onView={handleViewVehicle}
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
                            itemName="booked vehicles"
                        />
                    )}
                </>
            )}

            {activeTab === "unavailable" && (
                <>
                    <VehicleTable
                        length={unavailableList.length}
                        vehicles={paginatedList}
                        heading="Unavailable Vehicles"
                        onView={handleViewVehicle}
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
                            itemName="unavailable vehicles"
                        />
                    )}
                </>
            )}

            {activeTab === "rejected" && (
                <>
                    <RejectedVehicleTable
                        length={rejectedList.length}
                        vehicles={paginatedList}
                        onView={handleViewVehicle}
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

export default OwnerVehicle;