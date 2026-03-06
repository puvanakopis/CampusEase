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
import LoadingSpinner from "../../components/common/Loading";

import { VehicleContext } from "../../context/VehicleContext";
import { AuthContext } from "../../context/AuthContext";

const OwnerVehicle = () => {
    const {
        vehicles,
        vehicleLoading,
        createVehicle,
        updateVehicle,
        deleteVehicle,
        fetchVehicles
    } = useContext(VehicleContext);

    const { currentUser } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState("all");
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [resubmitMode, setResubmitMode] = useState(false);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const getStatus = (vehicle) => vehicle?.status?.toLowerCase() || '';

    // ------------ Tabs with all statuses ------------
    const allList = useMemo(() => vehicles, [vehicles]);
    const pendingList = useMemo(() => vehicles.filter(v => getStatus(v) === "pending"), [vehicles]);
    const availableList = useMemo(() => vehicles.filter(v => getStatus(v) === "available"), [vehicles]);
    const bookedList = useMemo(() => vehicles.filter(v => getStatus(v) === "booked"), [vehicles]);
    const unavailableList = useMemo(() => vehicles.filter(v => getStatus(v) === "unavailable"), [vehicles]);
    const rejectedList = useMemo(() => vehicles.filter(v => getStatus(v) === "rejected"), [vehicles]);

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
        const totalVehicles = vehicles.length;

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
    }, [vehicles, availableList.length, bookedList.length, pendingList.length, rejectedList.length]);

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
                    removedImages: payload.removedImages || []
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
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            try {
                await deleteVehicle(id);
            } catch (error) {
                console.error("Failed to delete vehicle:", error);
            }
        }
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
        const newStatus = currentStatus === "available" ? "unavailable" : "available";

        try {
            await updateVehicle(vehicle._id, {
                vehicleData: { status: newStatus },
                imageFiles: [],
                removedImages: []
            });
        } catch (error) {
            console.error("Failed to toggle availability:", error);
        }
    };

    // ------------ Render ------------
    if (vehicleLoading && vehicles.length === 0) {
        return <LoadingSpinner />;
    }

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
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

            {/* Header */}
            <Heading
                title="Vehicle Management"
                subtitle="Manage your transportation rentals around Sabaragamuwa University."
                buttonText="Add New Vehicle"
                onButtonClick={() => setShowAddPopup(true)}
            />

            {/* Stats Cards */}
            <StatsCards stats={stats} />

            {/* Tabs with all statuses */}
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            {activeTab === "pending" && (
                <PendingVehicleTable
                    vehicles={pendingList}
                    onView={handleViewVehicle}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteVehicle}
                />
            )}

            {activeTab === "rejected" && (
                <RejectedVehicleTable
                    vehicles={rejectedList}
                    onView={handleViewVehicle}
                    onEditBeforeResubmit={handleEditBeforeResubmit}
                    onDelete={handleDeleteVehicle}
                />
            )}

            {(activeTab === "all" ||
                activeTab === "available" ||
                activeTab === "booked" ||
                activeTab === "unavailable") && (
                    <VehicleTable
                        vehicles={
                            activeTab === "available"
                                ? availableList
                                : activeTab === "booked"
                                    ? bookedList
                                    : activeTab === "unavailable"
                                        ? unavailableList
                                        : allList
                        }
                        onView={handleViewVehicle}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteVehicle}
                        onToggleAvailability={handleToggleAvailability}
                        showEditDelete={true}
                    />
                )}
        </main>
    );
};

export default OwnerVehicle;