import React, { useState, useEffect } from "react";
import Heading from "../../containers/owner/vehicle/Heading";
import StatsCards from "../../containers/owner/vehicle/StatsCards";
import VehicleTable from "../../containers/owner/vehicle/VehicleTable";
import AddVehiclePopup from "../../containers/owner/vehicle/AddVehiclePopup";
import EditVehiclePopup from "../../containers/owner/vehicle/EditVehiclePopup";
import ViewVehiclePopup from "../../containers/owner/vehicle/ViewVehiclePopup";
import PermissionPopup from "../../containers/owner/vehicle/PermissionPopup";

const OwnerVehicle = () => {
    // State for vehicles
    const [vehicles, setVehicles] = useState([
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
        },
        {
            id: "VEH-7712",
            name: "Nissan Caravan",
            type: "Van",
            price: 12000,
            status: "Inactive",
            location: "SUSL Main Gate",
            image: "https://images.pexels.com/photos/417312/pexels-photo-417312.jpeg",
            description: "12-seater van suitable for group travel. Regular maintenance with full service history.",
            amenities: ["AC", "Power Steering", "Power Windows", "Music System", "Spacious"],
            seats: 12,
            transmission: "Manual",
            fuelType: "Diesel",
            year: 2015,
            mileage: "120,000 km",
            currentlyRented: false,
            owner: "Mr. Silva",
            ownerContact: "+94 71 345 6789",
            createdAt: "2024-03-05",
            lastUpdated: "2024-09-30",
            inactiveReason: "Under maintenance",
            features: ["Power Steering", "AC", "Music System", "Roof Rack", "Spare Tire"]
        },
        {
            id: "VEH-6534",
            name: "Yamaha YZF R15",
            type: "Motorcycle",
            price: 4000,
            status: "Active",
            location: "SUSL Sports Complex",
            image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
            description: "Sport motorcycle in perfect condition. Well-suited for enthusiasts and long rides.",
            amenities: ["Sport Mode", "Digital Console", "ABS", "LED Lights"],
            seats: 2,
            transmission: "Manual",
            fuelType: "Petrol",
            year: 2019,
            mileage: "18,000 km",
            currentlyRented: true,
            rentedTo: "Kamal Perera",
            rentedFrom: "2024-10-10",
            rentedUntil: "2024-11-10",
            owner: "Mr. Rajapaksa",
            ownerContact: "+94 77 987 6543",
            createdAt: "2024-04-20",
            lastUpdated: "2024-10-15",
            features: ["ABS", "Digital Speedometer", "Sport Exhaust", "Adjustable Suspension"]
        }
    ]);

    // State for popups
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showPermissionPopup, setShowPermissionPopup] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    // State for user permissions
    const [userPermissions, setUserPermissions] = useState({
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canViewDetails: true,
        maxVehicles: 8,
        currentVehicles: 4
    });

    // Check permissions on component mount
    useEffect(() => {
        checkUserPermissions();
    }, []);

    // Permission checking function
    const checkUserPermissions = () => {
        const hasPermission = userPermissions.currentVehicles < userPermissions.maxVehicles;
        setUserPermissions(prev => ({
            ...prev,
            canAdd: hasPermission
        }));
    };

    // Event handlers
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
            id: `VEH-${Math.floor(1000 + Math.random() * 9000)}`,
            createdAt: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0],
            status: "Active",
            currentlyRented: false,
            price: parseInt(newVehicle.price),
            seats: parseInt(newVehicle.seats),
            year: parseInt(newVehicle.year)
        };

        setVehicles([...vehicles, vehicleWithId]);
        setUserPermissions(prev => ({
            ...prev,
            currentVehicles: prev.currentVehicles + 1,
            canAdd: prev.currentVehicles + 1 < prev.maxVehicles
        }));
        setShowAddPopup(false);
    };

    const handleEditVehicle = (updatedVehicle) => {
        setVehicles(vehicles.map(vehicle =>
            vehicle.id === updatedVehicle.id ? {
                ...updatedVehicle,
                lastUpdated: new Date().toISOString().split('T')[0],
                price: parseInt(updatedVehicle.price),
                seats: parseInt(updatedVehicle.seats),
                year: parseInt(updatedVehicle.year)
            } : vehicle
        ));
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
            setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
            setUserPermissions(prev => ({
                ...prev,
                currentVehicles: prev.currentVehicles - 1,
                canAdd: prev.currentVehicles - 1 < prev.maxVehicles
            }));
        }
    };

    const handleRequestMoreVehicles = () => {
        alert("Request sent to admin for more vehicle slots. You will be notified when approved.");
        setShowPermissionPopup(false);
    };

    const stats = [
        {
            label: "Total Bookings",
            icon: "event_available",
            value: `${vehicles.filter(v => v.currentlyRented).length}`,
            subtext: `+${Math.floor(((vehicles.filter(v => v.currentlyRented).length / vehicles.length) * 100) / 10) * 10}% from last month`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Active Vehicles",
            icon: "directions_car",
            value: `${vehicles.filter(v => v.status === "Active").length}`,
            subtext: `${vehicles.filter(v => v.status === "Active").length} currently active`,
            subtextColor: "text-blue-500"
        },
        {
            label: "Monthly Revenue",
            icon: "payments",
            value: `LKR ${vehicles.reduce((acc, vehicle) => acc + (vehicle.status === "Active" && vehicle.currentlyRented ? vehicle.price : 0), 0).toLocaleString()}`,
            subtext: `Next payout: 28th Oct`,
            subtextColor: "text-slate-500"
        }
    ];


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
                />
            )}

            {showEditPopup && selectedVehicle && (
                <EditVehiclePopup
                    selectedVehicle={selectedVehicle}
                    setShowEditPopup={setShowEditPopup}
                    setSelectedVehicle={setSelectedVehicle}
                    handleEditVehicle={handleEditVehicle}
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

            <VehicleTable
                vehicles={vehicles}
                handleViewVehicle={handleViewVehicle}
                handleEditClick={handleEditClick}
                handleDeleteVehicle={handleDeleteVehicle}
            />
        </main>
    );
};

export default OwnerVehicle;