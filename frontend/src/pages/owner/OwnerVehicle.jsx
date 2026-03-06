import React, { useState, useContext, useMemo } from "react";
import { VehicleContext } from "../../context/VehicleContext";
import { AuthContext } from "../../context/AuthContext";
import Heading from "../../containers/owner/common/Heading";
import StatsCards from "../../containers/owner/common/StatsCards";
import Tabs from "../../containers/owner/common/Tabs";
import ActiveVehicleTable from "../../containers/owner/vehicle/ActiveVehicleTable";
import PendingVehicleTable from "../../containers/owner/vehicle/PendingVehicleTable";
import RejectedVehicleTable from "../../containers/owner/vehicle/RejectedVehicleTable";
import AddVehiclePopup from "../../containers/owner/vehicle/AddVehiclePopup";
import EditVehiclePopup from "../../containers/owner/vehicle/EditVehiclePopup";
import ViewVehiclePopup from "../../containers/owner/vehicle/ViewVehiclePopup";

const OwnerVehicle = () => {
    const { vehicles, loading, fetchVehicles, createVehicle, updateVehicle, deleteVehicle } = useContext(VehicleContext);
    const { currentUser } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState("active");
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [resubmitMode, setResubmitMode] = useState(false);

    // Filter vehicles by status and owner
    const ownerVehicles = useMemo(() => {
        if (!vehicles.length || !currentUser) return [];
        return vehicles.filter(v => v.owner?._id === currentUser.id || v.owner_id === currentUser.id);
    }, [vehicles, currentUser]);

    const activeVehicles = useMemo(() => ownerVehicles.filter(v => v.status === "available" || v.status === "booked"), [ownerVehicles]);
    const pendingVehicles = useMemo(() => ownerVehicles.filter(v => v.status === "pending"), [ownerVehicles]);
    const rejectedVehicles = useMemo(() => ownerVehicles.filter(v => v.status === "rejected" || v.status === "unavailable"), [ownerVehicles]);

    // Stats calculation
    const stats = useMemo(() => {
        const rentedVehicles = activeVehicles.filter(v => v.status === "booked");
        const totalRevenue = rentedVehicles.reduce((acc, v) => acc + (v.day_rent || 0), 0);

        return [
            {
                label: "Total Bookings",
                icon: "event_available",
                value: rentedVehicles.length,
                subtext: `${rentedVehicles.length} of ${activeVehicles.length} vehicles rented`,
                subtextColor: "text-blue-500"
            },
            {
                label: "Active Vehicles",
                icon: "directions_car",
                value: activeVehicles.length,
                subtext: `${rentedVehicles.length} currently rented out`,
                subtextColor: "text-blue-500"
            },
            {
                label: "Monthly Revenue",
                icon: "payments",
                value: `LKR ${totalRevenue.toLocaleString()}`,
                subtext: "Based on current rentals",
                subtextColor: "text-slate-500"
            }
        ];
    }, [activeVehicles]);

    // Tabs
    const tabs = [
        { id: "active", label: "Active Vehicles", count: activeVehicles.length },
        { id: "pending", label: "Pending Vehicles", count: pendingVehicles.length },
        { id: "rejected", label: "Rejected Vehicles", count: rejectedVehicles.length }
    ];

    // Handlers
    const handleAddVehicle = async (formData, imageFiles) => {
        try {
            await createVehicle({ vehicleData: formData, imageFiles });
            setShowAddPopup(false);
            await fetchVehicles();
        } catch (error) {
            console.error("Error adding vehicle:", error);
        }
    };

    const handleEditVehicle = async (vehicleData, imageFiles, removedImages = []) => {
        try {
            const payload = {
                vehicleData: {
                    ...vehicleData,
                    status: resubmitMode ? "pending" : vehicleData.status,
                    reject_reason: resubmitMode ? null : vehicleData.reject_reason
                },
                imageFiles,
                removedImages
            };
            await updateVehicle(vehicleData._id || vehicleData.id, payload);
            setResubmitMode(false);
            setShowEditPopup(false);
            setSelectedVehicle(null);
            await fetchVehicles();
        } catch (error) {
            console.error("Error updating vehicle:", error);
        }
    };

    const handleDeleteVehicle = async (vehicleId) => {
        if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
        try {
            await deleteVehicle(vehicleId);
            await fetchVehicles();
        } catch (error) {
            console.error("Error deleting vehicle:", error);
        }
    };

    const handleViewVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowViewPopup(true);
    };

    const handleEditClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setResubmitMode(false);
        setShowEditPopup(true);
    };

    const handleEditBeforeResubmit = (vehicle) => {
        setSelectedVehicle(vehicle);
        setResubmitMode(true);
        setShowEditPopup(true);
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            {/* Loading */}
            {loading && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2 text-sm text-gray-600">Loading...</p>
                    </div>
                </div>
            )}

            {/* Popups */}
            {showAddPopup && (
                <AddVehiclePopup
                    setShowAddPopup={setShowAddPopup}
                    handleAddVehicle={handleAddVehicle}
                />
            )}
            {showViewPopup && selectedVehicle && (
                <ViewVehiclePopup
                    selectedVehicle={selectedVehicle}
                    onClose={() => setShowViewPopup(false)}
                    activeTab={activeTab}
                />
            )}
            {showEditPopup && selectedVehicle && (
                <EditVehiclePopup
                    selectedVehicle={selectedVehicle}
                    setShowEditPopup={setShowEditPopup}
                    setSelectedVehicle={setSelectedVehicle}
                    handleEditVehicle={handleEditVehicle}
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

            {/* Stats */}
            <StatsCards stats={stats} />

            {/* Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tables */}
            {activeTab === "active" && (
                <ActiveVehicleTable
                    vehicles={activeVehicles}
                    handleViewVehicle={handleViewVehicle}
                    handleEditClick={handleEditClick}
                    handleDeleteVehicle={handleDeleteVehicle}
                    loading={loading}
                />
            )}

            {activeTab === "pending" && (
                <PendingVehicleTable
                    vehicles={pendingVehicles}
                    handleViewVehicle={handleViewVehicle}
                    handleEditClick={handleEditClick}
                    handleDeleteVehicle={handleDeleteVehicle}
                    loading={loading}
                />
            )}

            {activeTab === "rejected" && (
                <RejectedVehicleTable
                    vehicles={rejectedVehicles}
                    handleViewVehicle={handleViewVehicle}
                    handleEditBeforeResubmit={handleEditBeforeResubmit}
                    handleDeleteVehicle={handleDeleteVehicle}
                    loading={loading}
                />
            )}
        </main>
    );
};

export default OwnerVehicle;