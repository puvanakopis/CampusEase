import React, { useState, useEffect } from "react";
import Heading from "../../containers/owner/vehicle/Heading";
import StatsCards from "../../containers/owner/vehicle/StatsCards";
import Tabs from "../../containers/owner/vehicle/Tabs";
import ActiveVehicleTable from "../../containers/owner/vehicle/ActiveVehicleTable";
import PendingVehicleTable from "../../containers/owner/vehicle/PendingVehicleTable";
import RejectedVehicleTable from "../../containers/owner/vehicle/RejectedVehicleTable";
import AddVehiclePopup from "../../containers/owner/vehicle/AddVehiclePopup";
import EditVehiclePopup from "../../containers/owner/vehicle/EditVehiclePopup";
import ViewVehiclePopup from "../../containers/owner/vehicle/ViewVehiclePopup";
import PermissionPopup from "../../containers/owner/vehicle/PermissionPopup";

const OwnerVehicle = () => {
    const [activeTab, setActiveTab] = useState("active");
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showPermissionPopup, setShowPermissionPopup] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [resubmitMode, setResubmitMode] = useState(false);

    const [vehicles, setVehicles] = useState({
        active: [
            {
                id: "VEH-9021",
                name: "Toyota Axio",
                type: "Car",
                price: 8500,
                status: "Active",
                location: "Belihuloya Town",
                image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
                description: "2018 Toyota Axio in excellent condition with fuel efficiency. Perfect for students needing reliable transportation.",
                amenities: ["AC", "Bluetooth", "Power Steering", "Airbags", "Fuel Efficient"],
                seats: 5,
                transmission: "Automatic",
                fuelType: "Petrol",
                year: 2018,
                mileage: "45,000 km",
                currentlyRented: true,
                rentedTo: "John Silva",
                rentedFrom: "2024-10-15",
                rentedUntil: "2024-11-15",
                owner: "Mr. Perera",
                ownerContact: "+94 77 123 4567",
                createdAt: "2024-01-15",
                lastUpdated: "2024-10-20",
                features: ["AC", "Power Windows", "Central Locking", "Reverse Camera", "GPS"]
            },
            {
                id: "VEH-4410",
                name: "Honda Dio",
                type: "Scooter",
                price: 2500,
                status: "Active",
                location: "Pambahinna Junction",
                image: "https://images.pexels.com/photos/2527935/pexels-photo-2527935.jpeg",
                description: "2020 Honda Dio scooter, well-maintained with great mileage. Ideal for campus commuting.",
                amenities: ["Storage Space", "Digital Meter", "LED Lights", "Disc Brake"],
                seats: 2,
                transmission: "Automatic",
                fuelType: "Petrol",
                year: 2020,
                mileage: "12,000 km",
                currentlyRented: false,
                owner: "Ms. Fernando",
                ownerContact: "+94 76 234 5678",
                createdAt: "2024-02-10",
                lastUpdated: "2024-10-18",
                features: ["Digital Display", "Mobile Charger", "Boot Space", "Kick Start"]
            }
        ],
        pending: [
            {
                id: "PEND-V001",
                name: "Suzuki Swift",
                type: "Car",
                price: 7500,
                status: "Pending",
                location: "SUSL Main Gate",
                image: "https://images.pexels.com/photos/1088622/pexels-photo-1088622.jpeg",
                description: "2019 Suzuki Swift, fuel-efficient and perfect for city driving.",
                amenities: ["AC", "Power Steering", "Bluetooth", "Airbags"],
                seats: 5,
                transmission: "Manual",
                fuelType: "Petrol",
                year: 2019,
                mileage: "35,000 km",
                owner: "Mr. Kumara",
                ownerContact: "+94 77 888 9999",
                submittedDate: "2024-10-21",
                adminNotes: "Under review - verifying documents",
                expectedResponseDate: "2024-10-25",
                features: ["AC", "Power Windows", "Airbags", "ABS"]
            },
            {
                id: "PEND-V002",
                name: "Yamaha FZ v3",
                type: "Motorcycle",
                price: 3500,
                status: "Pending",
                location: "Belihuloya Town",
                image: "https://images.pexels.com/photos/1486328/pexels-photo-1486328.jpeg",
                description: "2021 Yamaha FZ v3, sporty look with excellent mileage.",
                amenities: ["LED Lights", "Digital Console", "ABS", "Fuel Efficient"],
                seats: 2,
                transmission: "Manual",
                fuelType: "Petrol",
                year: 2021,
                mileage: "8,000 km",
                owner: "Mr. Weerasinghe",
                ownerContact: "+94 71 222 3333",
                submittedDate: "2024-10-22",
                adminNotes: "Awaiting insurance verification",
                expectedResponseDate: "2024-10-26",
                features: ["ABS", "Digital Speedometer", "LED Headlight", "Disc Brakes"]
            }
        ],
        rejected: [
            {
                id: "REJ-V001",
                name: "Bajaj Pulsar",
                type: "Motorcycle",
                price: 3000,
                status: "Rejected",
                location: "Pambahinna Junction",
                image: "https://images.pexels.com/photos/1486328/pexels-photo-1486328.jpeg",
                description: "2017 Bajaj Pulsar, needs minor repairs.",
                amenities: ["Basic", "Kick Start"],
                seats: 2,
                transmission: "Manual",
                fuelType: "Petrol",
                year: 2017,
                mileage: "65,000 km",
                owner: "Mr. Jayasuriya",
                ownerContact: "+94 76 555 6666",
                submittedDate: "2024-10-15",
                rejectedDate: "2024-10-18",
                rejectionReason: "Vehicle condition doesn't meet safety standards",
                adminRemarks: "Multiple mechanical issues reported. Please service and resubmit.",
                features: ["Basic Model", "Kick Start"]
            },
            {
                id: "REJ-V002",
                name: "Tata Nano",
                type: "Car",
                price: 5000,
                status: "Rejected",
                location: "SUSL Sports Complex",
                image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
                description: "2015 Tata Nano, economical car for students.",
                amenities: ["AC", "Power Steering"],
                seats: 4,
                transmission: "Manual",
                fuelType: "Petrol",
                year: 2015,
                mileage: "85,000 km",
                owner: "Ms. Perera",
                ownerContact: "+94 77 444 7777",
                submittedDate: "2024-10-10",
                rejectedDate: "2024-10-14",
                rejectionReason: "Insurance expired and incomplete documentation",
                adminRemarks: "Please provide valid insurance and vehicle registration documents",
                features: ["AC", "Power Steering"]
            }
        ]
    });

    const [userPermissions, setUserPermissions] = useState({
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canViewDetails: true,
        maxVehicles: 8,
        currentVehicles: 2
    });

    const tabs = [
        { id: "active", label: "Active Vehicles", count: vehicles.active.length },
        { id: "pending", label: "Pending Vehicles", count: vehicles.pending.length },
        { id: "rejected", label: "Rejected Vehicles", count: vehicles.rejected.length }
    ];

    const stats = [
        {
            label: "Total Bookings",
            icon: "event_available",
            value: vehicles.active.filter(v => v.currentlyRented).length,
            subtext: `+${Math.floor(((vehicles.active.filter(v => v.currentlyRented).length / vehicles.active.length) * 100) / 10) * 10}% from last month`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Active Vehicles",
            icon: "directions_car",
            value: vehicles.active.length,
            subtext: `${vehicles.active.filter(v => v.currentlyRented).length} currently rented out`,
            subtextColor: "text-blue-500"
        },
        {
            label: "Monthly Revenue",
            icon: "payments",
            value: `LKR ${vehicles.active.reduce((acc, vehicle) => acc + (vehicle.currentlyRented ? vehicle.price : 0), 0).toLocaleString()}`,
            subtext: `Next payout: 28th Oct`,
            subtextColor: "text-slate-500"
        }
    ];

    useEffect(() => {
        checkUserPermissions();
    }, [vehicles.active]);

    const checkUserPermissions = () => {
        const hasPermission = vehicles.active.length < userPermissions.maxVehicles;
        setUserPermissions(prev => ({
            ...prev,
            canAdd: hasPermission,
            currentVehicles: vehicles.active.length
        }));
    };

    const handleAddVehicleClick = () => {
        if (!userPermissions.canAdd) {
            setShowPermissionPopup(true);
            return;
        }
        setShowAddPopup(true);
    };

    const handleAddVehicle = (newVehicle) => {
        const vehicleWithId = {
            ...newVehicle,
            id: `PEND-V${Math.floor(1000 + Math.random() * 9000)}`,
            status: "Pending",
            submittedDate: new Date().toISOString().split('T')[0],
            adminNotes: "Awaiting admin review",
            expectedResponseDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            createdAt: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0],
            currentlyRented: false,
            price: parseInt(newVehicle.price),
            seats: parseInt(newVehicle.seats),
            year: parseInt(newVehicle.year)
        };

        setVehicles(prev => ({
            ...prev,
            pending: [...prev.pending, vehicleWithId]
        }));
        setShowAddPopup(false);
        alert("Vehicle submitted for review. You will be notified once approved.");
    };

    const handleEditBeforeResubmit = (vehicle) => {
        setSelectedVehicle(vehicle);
        setResubmitMode(true);
        setShowEditPopup(true);
    };

    const handleEditVehicle = (updatedVehicle) => {

        // === RESUBMIT MODE ===
        if (resubmitMode) {
            const resubmitted = {
                ...updatedVehicle,
                id: `PEND-V${Math.floor(1000 + Math.random() * 9000)}`,
                status: "Pending",
                submittedDate: new Date().toISOString().split("T")[0],
                adminNotes: "Resubmitted for review",
                expectedResponseDate: new Date(Date.now() + 3 * 86400000)
                    .toISOString()
                    .split("T")[0],
                rejectionReason: null,
                adminRemarks: null,
                rejectedDate: null,
                lastUpdated: new Date().toISOString().split("T")[0],
                price: parseInt(updatedVehicle.price),
                seats: parseInt(updatedVehicle.seats),
                year: parseInt(updatedVehicle.year)
            };

            setVehicles(prev => ({
                ...prev,
                pending: [...prev.pending, resubmitted],
                rejected: prev.rejected.filter(v => v.id !== updatedVehicle.id)
            }));

            setResubmitMode(false);
            setShowEditPopup(false);
            setSelectedVehicle(null);

            alert("Vehicle updated and resubmitted for admin review.");
            return;
        }

        // === NORMAL EDIT LOGIC ===
        if (activeTab === "active") {
            setVehicles(prev => ({
                ...prev,
                active: prev.active.map(vehicle =>
                    vehicle.id === updatedVehicle.id
                        ? {
                            ...updatedVehicle,
                            lastUpdated: new Date().toISOString().split("T")[0],
                            price: parseInt(updatedVehicle.price),
                            seats: parseInt(updatedVehicle.seats),
                            year: parseInt(updatedVehicle.year)
                        }
                        : vehicle
                )
            }));
        } else if (activeTab === "pending") {
            setVehicles(prev => ({
                ...prev,
                pending: prev.pending.map(vehicle =>
                    vehicle.id === updatedVehicle.id
                        ? {
                            ...updatedVehicle,
                            lastUpdated: new Date().toISOString().split("T")[0],
                            price: parseInt(updatedVehicle.price),
                            seats: parseInt(updatedVehicle.seats),
                            year: parseInt(updatedVehicle.year)
                        }
                        : vehicle
                )
            }));
        }

        setShowEditPopup(false);
        setSelectedVehicle(null);
    };


    const handleViewVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowViewPopup(true);
    };

    const handleEditClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowEditPopup(true);
    };

    const handleDeleteVehicle = (vehicleId) => {
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            if (activeTab === "active") {
                setVehicles(prev => ({
                    ...prev,
                    active: prev.active.filter(vehicle => vehicle.id !== vehicleId)
                }));
            } else if (activeTab === "pending") {
                setVehicles(prev => ({
                    ...prev,
                    pending: prev.pending.filter(vehicle => vehicle.id !== vehicleId)
                }));
            } else if (activeTab === "rejected") {
                setVehicles(prev => ({
                    ...prev,
                    rejected: prev.rejected.filter(vehicle => vehicle.id !== vehicleId)
                }));
            }
        }
    };

    const handleResubmitVehicle = (vehicle) => {
        const updatedVehicle = {
            ...vehicle,
            id: `PEND-V${Math.floor(1000 + Math.random() * 9000)}`,
            status: "Pending",
            submittedDate: new Date().toISOString().split('T')[0],
            adminNotes: "Resubmitted for review",
            expectedResponseDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            rejectionReason: null,
            adminRemarks: null,
            rejectedDate: null,
            lastUpdated: new Date().toISOString().split('T')[0]
        };

        setVehicles(prev => ({
            ...prev,
            pending: [...prev.pending, updatedVehicle],
            rejected: prev.rejected.filter(v => v.id !== vehicle.id)
        }));

        alert("Vehicle resubmitted for review. You will be notified once approved.");
    };

    const handleRequestMoreVehicles = () => {
        alert("Request sent to admin for more vehicle slots. You will be notified when approved.");
        setShowPermissionPopup(false);
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
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
                    setShowViewPopup={setShowViewPopup}
                    setShowEditPopup={setShowEditPopup}
                    setSelectedVehicle={setSelectedVehicle}
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
                />
            )}

            {showPermissionPopup && (
                <PermissionPopup
                    setShowPermissionPopup={setShowPermissionPopup}
                    userPermissions={userPermissions}
                    handleRequestMoreVehicles={handleRequestMoreVehicles}
                />
            )}

            {/* Main Content */}
            <Heading
                handleAddVehicleClick={handleAddVehicleClick}
                userPermissions={userPermissions}
            />

            <StatsCards stats={stats} />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "active" && (
                <ActiveVehicleTable
                    vehicles={vehicles.active}
                    handleViewVehicle={handleViewVehicle}
                    handleEditClick={handleEditClick}
                    handleDeleteVehicle={handleDeleteVehicle}
                />
            )}

            {activeTab === "pending" && (
                <PendingVehicleTable
                    vehicles={vehicles.pending}
                    handleViewVehicle={handleViewVehicle}
                    handleEditClick={handleEditClick}
                    handleDeleteVehicle={handleDeleteVehicle}
                />
            )}

            {activeTab === "rejected" && (
                <RejectedVehicleTable
                    vehicles={vehicles.rejected}
                    handleViewVehicle={handleViewVehicle}
                    handleEditBeforeResubmit={handleEditBeforeResubmit}
                    handleDeleteVehicle={handleDeleteVehicle}
                />
            )}
        </main>
    );
};

export default OwnerVehicle;