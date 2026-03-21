import React, { useState, useContext, useEffect, useMemo } from "react";
import Heading from "../../containers/admin/common/Heading";
import StatsCards from "../../containers/admin/common/StatsCards";
import Tabs from "../../containers/admin/common/Tabs";
import VehicleTable from "../../containers/admin/vehicles/VehicleTable";
import VehicleRequestsTable from "../../containers/admin/vehicles/VehicleRequestsTable";
import ViewVehiclePopup from "../../containers/admin/vehicles/ViewVehiclePopup";
import VehicleStatusChangePopup from "../../containers/admin/vehicles/VehicleStatusChangePopup";
import VehicleRejectPopup from "../../containers/admin/vehicles/VehicleRejectPopup";
import LoadingSpinner from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import { ADMIN_ITEMS_PER_PAGE } from "../../constants/pagination";
import { VehicleContext } from "../../context/VehicleContext";
import toast from "react-hot-toast";

const AdminVehicles = () => {
    const {
        vehicles,
        fetchVehicles,
        updateVehicle,
        loading: vehicleLoading
    } = useContext(VehicleContext);

    const [availableTab, setAvailableTab] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [vehicleToChangeStatus, setVehicleToChangeStatus] = useState(null);
    const [showVehicleRejectPopup, setShowVehicleRejectPopup] = useState(false);
    const [requestToReject, setRequestToReject] = useState(null);

    useEffect(() => {
        fetchVehicles();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [availableTab]);

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

    const requestVehicles = vehicles.filter(
        (v) => v.status === "pending"
    );

    // Get current list based on available tab
    const getCurrentList = () => {
        switch (availableTab) {
            case "available": return availableVehicles;
            case "booked": return bookedVehicles;
            case "unavailable": return unavailableVehicles;
            case "rejected": return rejectedVehicles;
            case "requests": return requestVehicles;
            default: return allVehicles;
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

    // Get item name for pagination based on available tab
    const getItemName = () => {
        switch (availableTab) {
            case "available": return "available vehicles";
            case "booked": return "booked vehicles";
            case "unavailable": return "unavailable vehicles";
            case "rejected": return "rejected vehicles";
            case "requests": return "vehicle requests";
            default: return "vehicles";
        }
    };

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
            label: "unavailable",
            count: unavailableVehicles.length,
        },
        {
            id: "rejected",
            label: "Rejected",
            count: rejectedVehicles.length,
        },
        {
            id: "requests",
            label: "Requests",
            count: requestVehicles.length,
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
            value: requestVehicles.length,
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
            console.error(error);
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
            console.error(error);
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

    if (vehicleLoading) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto">
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
                availableTab={availableTab}
                onTabChange={setAvailableTab}
            />

            {/* All Vehicles Tab */}
            {availableTab === "all" && (
                <>
                    <VehicleTable
                        length={vehicles.length}
                        title="All Vehicles"
                        vehicles={paginatedList}
                        onView={handleViewVehicle}
                        onToggleStatus={handleToggleVehicleStatus}
                        isAdmin={true}
                    />
                    {allVehicles.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={allVehicles.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {/* Available Vehicles Tab */}
            {availableTab === "available" && (
                <>
                    <VehicleTable
                        length={availableVehicles.length}
                        title="Available Vehicles"
                        vehicles={paginatedList}
                        onView={handleViewVehicle}
                        onToggleStatus={handleToggleVehicleStatus}
                        isAdmin={true}
                    />
                    {availableVehicles.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={availableVehicles.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {/* Booked Vehicles Tab */}
            {availableTab === "booked" && (
                <>
                    <VehicleTable
                        length={bookedVehicles.length}
                        title="Booked Vehicles"
                        vehicles={paginatedList}
                        onView={handleViewVehicle}
                        onToggleStatus={handleToggleVehicleStatus}
                        isAdmin={true}
                    />
                    {bookedVehicles.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={bookedVehicles.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {/* unavailable Vehicles Tab */}
            {availableTab === "unavailable" && (
                <>
                    <VehicleTable
                        length={unavailableVehicles.length}
                        title="unavailable Vehicles"
                        vehicles={paginatedList}
                        onView={handleViewVehicle}
                        onToggleStatus={handleToggleVehicleStatus}
                        isAdmin={true}
                    />
                    {unavailableVehicles.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={unavailableVehicles.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {/* Rejected Vehicles Tab */}
            {availableTab === "rejected" && (
                <>
                    <VehicleTable
                        length={rejectedVehicles.length}
                        title="Rejected Vehicles"
                        vehicles={paginatedList}
                        onView={handleViewVehicle}
                        onToggleStatus={handleToggleVehicleStatus}
                        isAdmin={true}
                    />
                    {rejectedVehicles.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={rejectedVehicles.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {/* Vehicle Requests Tab */}
            {availableTab === "requests" && (
                <>
                    <VehicleRequestsTable
                        length={requestVehicles.length}
                        requestVehicles={paginatedList}
                        onViewRequest={handleViewVehicle}
                        onApproveRequest={handleApproveRequest}
                        onRejectRequest={handleRejectRequest}
                    />
                    {requestVehicles.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={requestVehicles.length}
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

export default AdminVehicles;