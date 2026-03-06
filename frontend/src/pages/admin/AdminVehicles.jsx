import React, { useState, useContext, useEffect } from "react";
import Heading from "../../containers/admin/common/Heading";
import StatsCards from "../../containers/admin/common/StatsCards";
import Tabs from "../../containers/admin/common/Tabs";
import VehicleTable from "../../containers/admin/vehicles/VehicleTable";
import VehicleRequestsTable from "../../containers/admin/vehicles/VehicleRequestsTable";
import ViewVehiclePopup from "../../containers/admin/vehicles/ViewVehiclePopup";
import VehicleStatusChangePopup from "../../containers/admin/vehicles/VehicleStatusChangePopup";
import VehicleRejectPopup from "../../containers/admin/vehicles/VehicleRejectPopup";
import { VehicleContext } from "../../context/VehicleContext";
import toast from "react-hot-toast";

const AdminVehicles = () => {
    const {
        vehicles,
        fetchVehicles,
        updateVehicle,
        loading: vehicleLoading
    } = useContext(VehicleContext);

    const [activeTab, setActiveTab] = useState("all");
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [vehicleToChangeStatus, setVehicleToChangeStatus] = useState(null);
    const [showVehicleRejectPopup, setShowVehicleRejectPopup] = useState(false);
    const [requestToReject, setRequestToReject] = useState(null);

    // ------------------- FILTERS -------------------

    const allVehicles = vehicles;

    const availableVehicles = vehicles.filter(
        (v) => v.status === "available"
    );

    const bookedVehicles = vehicles.filter(
        (v) => v.status === "booked"
    );

    const unavailableVehicles = vehicles.filter(
        (v) => v.status === "unavailable"
    );

    const rejectedVehicles = vehicles.filter(
        (v) => v.status === "rejected"
    );

    const vehicleRequests = vehicles.filter(
        (v) => v.status === "pending"
    );

    // ------------------- TABS -------------------

    const tabs = [
        {
            id: "all",
            label: "All",
            count: vehicles.length,
        },
        {
            id: "available",
            label: "Available",
            count: availableVehicles.length,
        },
        {
            id: "booked",
            label: "Booked",
            count: bookedVehicles.length,
        },
        {
            id: "unavailable",
            label: "Unavailable",
            count: unavailableVehicles.length,
        },
        {
            id: "rejected",
            label: "Rejected",
            count: rejectedVehicles.length,
        },
        {
            id: "requests",
            label: "Vehicle Requests",
            count: vehicleRequests.length,
        },
    ];

    // ------------------- MEANINGFUL STATS -------------------

    const stats = [
        {
            label: "Total Vehicles",
            icon: "directions_car",
            value: vehicles.length,
            subtext: "Registered in system",
        },
        {
            label: "Pending Requests",
            icon: "hourglass_empty",
            value: vehicleRequests.length,
            subtext: "Waiting for approval",
            subtextColor: "text-yellow-500",
        },
        {
            label: "Rejected Vehicles",
            icon: "cancel",
            value: rejectedVehicles.length,
            subtext: "Not approved",
            subtextColor: "text-red-500",
        },
    ];

    // ------------------- ACTION HANDLERS -------------------

    const handleViewVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowViewPopup(true);
    };

    const handleApproveRequest = async (request) => {
        try {
            const updatePayload = {
                vehicleData: {
                    status: "available",
                    verified: true,
                    reject_reason: null,
                },
            };

            await updateVehicle(request._id, updatePayload);
            toast.success("Vehicle approved and activated");
            await fetchVehicles();
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Approval failed");
        }
    };

    const handleRejectRequest = (request) => {
        setRequestToReject(request);
        setShowVehicleRejectPopup(true);
    };

    const handleConfirmReject = async (reason) => {
        if (!requestToReject) return;

        try {
            const updatePayload = {
                vehicleData: {
                    status: "rejected",
                    reject_reason: reason,
                    verified: false,
                },
            };

            await updateVehicle(requestToReject._id, updatePayload);
            toast.success("Vehicle request rejected");
            setShowVehicleRejectPopup(false);
            setRequestToReject(null);
            await fetchVehicles();
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Reject failed");
        }
    };

    const handleToggleVehicleStatus = (vehicle) => {
        setVehicleToChangeStatus(vehicle);
        setShowStatusPopup(true);
    };

    const handleConfirmStatusChange = async (reason) => {
        if (!vehicleToChangeStatus) return;

        const newStatus =
            vehicleToChangeStatus.status === "available"
                ? "unavailable"
                : "available";

        try {
            const updatePayload = {
                vehicleData: {
                    status: newStatus,
                    reject_reason: newStatus === "unavailable" ? reason : null,
                },
            };

            await updateVehicle(vehicleToChangeStatus._id, updatePayload);

            toast.success(
                `Vehicle ${newStatus === "available" ? "activated" : "deactivated"}`
            );

            await fetchVehicles();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Status update failed");
        } finally {
            setShowStatusPopup(false);
            setVehicleToChangeStatus(null);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    if (vehicleLoading && vehicles.length === 0) {
        return (
            <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-slate-600">
                            Loading vehicles...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">

            {/* Popups */}

            {showViewPopup && selectedVehicle && (
                <ViewVehiclePopup
                    vehicle={selectedVehicle}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedVehicle(null);
                    }}
                    isAdmin={true}
                />
            )}

            {showStatusPopup && vehicleToChangeStatus && (
                <VehicleStatusChangePopup
                    vehicle={vehicleToChangeStatus}
                    currentStatus={vehicleToChangeStatus.status}
                    onClose={() => {
                        setShowStatusPopup(false);
                        setVehicleToChangeStatus(null);
                    }}
                    onConfirm={handleConfirmStatusChange}
                />
            )}

            {showVehicleRejectPopup && requestToReject && (
                <VehicleRejectPopup
                    request={requestToReject}
                    onClose={() => {
                        setShowVehicleRejectPopup(false);
                        setRequestToReject(null);
                    }}
                    onConfirm={handleConfirmReject}
                />
            )}

            <Heading
                title="Admin Vehicle Management"
                subtitle="Manage campus transportation vehicles and review new vehicle submissions."
                showButton={false}
            />

            <StatsCards stats={stats} />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "all" && (
                <VehicleTable
                    title="All Vehicles"
                    vehicles={allVehicles}
                    onView={handleViewVehicle}
                    onToggleStatus={handleToggleVehicleStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "available" && (
                <VehicleTable
                    title="Available Vehicles"
                    vehicles={availableVehicles}
                    onView={handleViewVehicle}
                    onToggleStatus={handleToggleVehicleStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "booked" && (
                <VehicleTable
                    title="Booked Vehicles"
                    vehicles={bookedVehicles}
                    onView={handleViewVehicle}
                    onToggleStatus={handleToggleVehicleStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "unavailable" && (
                <VehicleTable
                    title="Unavailable Vehicles"
                    vehicles={unavailableVehicles}
                    onView={handleViewVehicle}
                    onToggleStatus={handleToggleVehicleStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "rejected" && (
                <VehicleTable
                    title="Rejected Vehicles"
                    vehicles={rejectedVehicles}
                    onView={handleViewVehicle}
                    onToggleStatus={handleToggleVehicleStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "requests" && (
                <VehicleRequestsTable
                    vehicleRequests={vehicleRequests}
                    onViewRequest={handleViewVehicle}
                    onApproveRequest={handleApproveRequest}
                    onRejectRequest={handleRejectRequest}
                />
            )}

        </main>
    );
};

export default AdminVehicles;