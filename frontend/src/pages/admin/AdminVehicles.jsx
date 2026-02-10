import React, { useState } from "react";
import Heading from "../../containers/admin/Heading";
import StatsCards from "../../containers/admin/StatsCards";
import Tabs from "../../containers/admin/vehicles/Tabs";
import VehicleTable from "../../containers/admin/vehicles/VehicleTable";
import ViewVehiclePopup from "../../containers/admin/vehicles/ViewVehiclePopup";
import VehicleRequestsTable from "../../containers/admin/vehicles/VehicleRequestsTable";

const AdminVehicles = () => {
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [activeTab, setActiveTab] = useState("current");

    const [allVehicles, setAllVehicles] = useState([
        {
            id: "V-SUSL-1001",
            name: "Campus Express Shuttle",
            type: "Shuttle",
            route: "Main Gate - Library - Science Block",
            capacity: 20,
            price: 50,
            status: "Active",
            driver: "Mr. Kamal Perera",
            driverContact: "+94 77 111 2233",
            driverLicense: "DL-3456789",
            schedule: "7:00 AM - 7:00 PM (30 min intervals)",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI5BnAKspEOg_BzW-S6Bd0vthfJXCjNSmdAVzbeMnGiInqD4TBHKDoOIHCmS6Wl_-j8cyilhjlemCGKvQ-n1wgYe3NuA5MtA0thgik4PnK2zwWjlnCbBZ78oO7XVGNhOz1W-LTZM9dUrEmHJdqLrWTK0vkuLsWIRRToS00v0JSqQOamGhp7nchxCb_OwNQdbrecjCejjwZb_mCzQrFoeONrze74vZ6eI97C-ewlMUlmKffkx1wty73DzxgB2LgNXqzWmGTURPZbsw",
            description: "Main campus shuttle service connecting key locations within university premises.",
            amenities: ["AC", "WiFi", "USB Charging", "CCTV"],
            registration: "CAB-7890",
            insurance: "Valid until 2025-12-31",
            lastService: "2024-10-15",
            nextService: "2025-01-15",
            owner: "University Transport Division",
            ownerContact: "+94 81 238 5001",
            ownerId: "UTD-001",
            ownerEmail: "transport@susl.lk",
            createdAt: "2024-01-10",
            lastUpdated: "2024-10-25",
            approvedBy: "Admin User",
            approvedDate: "2024-01-12",
            averageRating: 4.5,
            totalTrips: 1250
        },
        {
            id: "V-SUSL-1002",
            name: "Night Rider Van",
            type: "Van",
            route: "Hostel Zone - Town Center - Hospital",
            capacity: 12,
            price: 80,
            status: "Active",
            driver: "Mr. Sunil Fernando",
            driverContact: "+94 76 222 3344",
            driverLicense: "DL-4567890",
            schedule: "6:00 PM - 11:00 PM (1 hour intervals)",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwOUPIKoOHaAM_E-TBru2zCVRI3Ssm_LYBqy9OohQOx9fZ7bJFKvFZeXYP-TL5_hnUPQRzHpFmqXIkmL594Z2YVtMNyZ6adghT3SaAi0Q29G-yRY1dWnDXX4DuymdYSw76W9egefXCZ7WnVcqqgYIreJXZ9-WdrrDNT-ZVxNJlTNElTURfj5tpQpeMRuNJtM2fGiyxD9VRg_Si88XLJUgR7cYjdntOdqJg3Yo4z7js1y1HXXZkV1FJXr76YpQn-c4zmKy77-uQ4bI",
            description: "Safe and reliable night service for students traveling after classes.",
            amenities: ["AC", "Security Cam", "GPS Tracking", "First Aid Kit"],
            registration: "CA-5678",
            insurance: "Valid until 2025-10-31",
            lastService: "2024-10-10",
            nextService: "2025-01-10",
            owner: "Mr. Rajapakse",
            ownerContact: "+94 71 333 4455",
            ownerId: "PVT-002",
            ownerEmail: "rajapakse.transport@gmail.com",
            createdAt: "2024-02-15",
            lastUpdated: "2024-10-20",
            approvedBy: "Admin User",
            approvedDate: "2024-02-18",
            averageRating: 4.2,
            totalTrips: 890
        },
        {
            id: "V-SUSL-1003",
            name: "Old Campus Bus",
            type: "Bus",
            route: "University - Belihuloya - Balangoda",
            capacity: 40,
            price: 120,
            status: "Inactive",
            image: "https://via.placeholder.com/400x300?text=Inactive+Vehicle",
            description: "Large capacity bus for inter-city travel. Currently under maintenance.",
            amenities: ["AC", "Restroom", "Luggage Storage", "Reclining Seats"],
            registration: "CA-9012",
            insurance: "Valid until 2025-08-31",
            lastService: "2024-09-01",
            nextService: "2024-12-01",
            driver: "Mr. Bandara",
            driverContact: "+94 77 444 5566",
            driverLicense: "DL-5678901",
            schedule: "Suspended",
            owner: "University Transport Division",
            ownerContact: "+94 81 238 5001",
            ownerId: "UTD-001",
            ownerEmail: "transport@susl.lk",
            createdAt: "2023-11-01",
            lastUpdated: "2024-10-01",
            approvedBy: "Admin User",
            approvedDate: "2023-11-05",
            inactiveReason: "Engine overhaul and major repairs",
            averageRating: 4.0,
            totalTrips: 2100
        }
    ]);

    const [vehicleRequests, setVehicleRequests] = useState([
        {
            id: "V-REQ-001",
            name: "Green Campus EV",
            type: "Electric Van",
            route: "Main Campus - Hostel Zone - Sports Complex",
            capacity: 15,
            price: 60,
            status: "Pending",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj70YCtt3xEQ41nzjit8EF3C5db8W9u5nFJ41O6tsQNQZ32UUuM0r-fKYxfvOefR7TyBkFee4rs8YZDVYTwXyeF5-2LN0ZZz3qRbc401qQBKu3-BLoGjavC3RQ8ElCf3xEA10qYwUGCWQ1qjTe0HQcnYP4a5EZfsLO31qfm3KcCDHNTpgkFbw3QYArc_yLM9k66cLBfwfJkDiVYNLjmY74jn02DsNtzcc-1VEe-oQxzEqhZKUDlPatpomI-ZActGKMR5Msq05n_iI",
            description: "Environmentally friendly electric vehicle for campus transportation.",
            amenities: ["Zero Emissions", "WiFi", "USB Charging", "Digital Display"],
            registration: "EV-2024",
            insurance: "Valid until 2026-12-31",
            driver: "Mr. Nimal Silva",
            driverContact: "+94 76 555 6677",
            driverLicense: "DL-6789012",
            schedule: "8:00 AM - 6:00 PM (20 min intervals)",
            owner: "Green Transport Solutions",
            ownerContact: "+94 71 666 7788",
            ownerId: "PVT-003",
            ownerEmail: "green.transport@gmail.com",
            requestedDate: "2024-10-24",
            reason: "Introducing eco-friendly transport option to campus",
            currentVehicles: 2,
            maxVehicles: 5,
            vehicleAge: "New",
            emissions: "Zero"
        },
        {
            id: "V-REQ-002",
            name: "Student Carpool Service",
            type: "Car",
            route: "Flexible - Based on demand",
            capacity: 4,
            price: 100,
            status: "Pending",
            image: "https://via.placeholder.com/400x300?text=Vehicle+Image",
            description: "Premium car service for small group transportation and special trips.",
            amenities: ["Premium AC", "WiFi", "Refreshments", "Privacy Glass"],
            registration: "CAR-7891",
            insurance: "Valid until 2025-11-30",
            driver: "Ms. Anoma Ratnayake",
            driverContact: "+94 77 777 8888",
            driverLicense: "DL-7890123",
            schedule: "On-demand booking system",
            owner: "Campus Premium Services",
            ownerContact: "+94 76 888 9999",
            ownerId: "PVT-004",
            ownerEmail: "premium.campus@gmail.com",
            requestedDate: "2024-10-23",
            reason: "New service for executive transport needs",
            currentVehicles: 1,
            maxVehicles: 3,
            vehicleAge: "2 years",
            emissions: "Euro 6"
        },
    ]);

    const tabs = [
        { id: "current", label: "Active Vehicles", count: allVehicles.filter(v => v.status === "Active").length },
        { id: "requests", label: "Vehicle Requests", count: vehicleRequests.length },
        { id: "inactive", label: "Inactive Vehicles", count: allVehicles.filter(v => v.status === "Inactive").length }
    ];

    const stats = [
        {
            label: "Total Vehicles",
            icon: "directions_car",
            value: allVehicles.length,
            subtext: `${allVehicles.filter(v => v.status === "Active").length} active`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Total Capacity",
            icon: "group",
            value: allVehicles.reduce((sum, vehicle) => sum + vehicle.capacity, 0),
            subtext: `${allVehicles.filter(v => v.status === "Active").reduce((sum, v) => sum + v.capacity, 0)} active seats`
        },
        {
            label: "Daily Revenue",
            icon: "payments",
            value: `LKR ${(allVehicles.reduce((sum, vehicle) => sum + (vehicle.price * 20), 0)).toLocaleString()}`,
            subtext: "Estimated from active vehicles"
        }
    ];

    const handleViewVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowViewPopup(true);
    };

    const handleDeleteVehicle = (vehicleId) => {
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            setAllVehicles(allVehicles.filter(vehicle => vehicle.id !== vehicleId));
        }
    };

    const handleApproveRequest = (requestId) => {
        const request = vehicleRequests.find(req => req.id === requestId);
        if (!request) return;

        const newVehicle = {
            ...request,
            id: `V-SUSL-${Math.floor(1000 + Math.random() * 9000)}`,
            status: "Active",
            totalTrips: 0,
            averageRating: 0,
            createdAt: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0],
            approvedBy: "Admin User",
            approvedDate: new Date().toISOString().split('T')[0],
            lastService: new Date().toISOString().split('T')[0],
            nextService: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0]
        };

        setAllVehicles([...allVehicles, newVehicle]);
        setVehicleRequests(vehicleRequests.filter(req => req.id !== requestId));

        alert(`Vehicle "${request.name}" has been approved and listed. Owner has been notified.`);
    };

    const handleRejectRequest = (requestId) => {
        const request = vehicleRequests.find(req => req.id === requestId);
        if (window.confirm(`Are you sure you want to reject "${request?.name}"?`)) {
            setVehicleRequests(vehicleRequests.filter(req => req.id !== requestId));
            alert(`Vehicle request for "${request?.name}" has been rejected. Owner has been notified.`);
        }
    };

    const handleToggleVehicleStatus = (vehicleId, currentStatus) => {
        const vehicle = allVehicles.find(v => v.id === vehicleId);
        if (!vehicle) return;

        const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
        const reason = newStatus === "Inactive"
            ? prompt("Please provide reason for deactivation:")
            : null;

        setAllVehicles(allVehicles.map(v =>
            v.id === vehicleId ? {
                ...v,
                status: newStatus,
                lastUpdated: new Date().toISOString().split('T')[0],
                ...(newStatus === "Inactive" && { inactiveReason: reason })
            } : v
        ));

        alert(`Vehicle "${vehicle.name}" has been ${newStatus.toLowerCase()}.`);
    };

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

            {activeTab === "current" && (
                <VehicleTable
                    vehicles={allVehicles.filter(vehicle => vehicle.status === "Active")}
                    onView={handleViewVehicle}
                    onDelete={handleDeleteVehicle}
                    onToggleStatus={handleToggleVehicleStatus}
                    isAdmin={true}
                />
            )}


        </main>
    );
};

export default AdminVehicles;