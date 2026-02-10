import React, { useState } from "react";
import Heading from "../../containers/admin/Heading";
import StatsCards from "../../containers/admin/StatsCards";
import Tabs from "../../containers/admin/accommodation/Tabs";

import PropertyTable from "../../containers/admin/accommodation/PropertyTable";
import ViewAccommodationPopup from "../../containers/admin/accommodation/ViewAccommodationPopup";
import PropertyRequestsTable from "../../containers/admin/accommodation/PropertyRequestsTable";

const AdminAccommodation = () => {
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [activeTab, setActiveTab] = useState("current");

    const [allProperties, setAllProperties] = useState([
        {
            id: "SUSL-2938",
            name: "Riverview Annex",
            location: "Pambahinna Junction",
            type: "Annex",
            price: 8000,
            status: "Active",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI5BnAKspEOg_BzW-S6Bd0vthfJXCjNSmdAVzbeMnGiInqD4TBHKDoOIHCmS6Wl_-j8cyilhjlemCGKvQ-n1wgYe3NuA5MtA0thgik4PnK2zwWjlnCbBZ78oO7XVGNhOz1W-LTZM9dUrEmHJdqLrWTK0vkuLsWIRRToS00v0JSqQOamGhp7nchxCb_OwNQdbrecjCejjwZb_mCzQrFoeONrze74vZ6eI97C-ewlMUlmKffkx1wty73DzxgB2LgNXqzWmGTURPZbsw",
            description: "Modern annex with river view, perfect for students seeking quiet environment near university.",
            amenities: ["WiFi", "24/7 Security", "Laundry", "Study Room", "Parking"],
            rooms: 7,
            occupied: 6,
            owner: "Mr. Perera",
            ownerContact: "+94 77 123 4567",
            ownerId: "OWN-001",
            ownerEmail: "perera@gmail.com",
            createdAt: "2024-01-15",
            lastUpdated: "2024-10-20",
            approvedBy: "Admin User",
            approvedDate: "2024-01-20"
        },
        {
            id: "SUSL-1102",
            name: "Hilltop Girls' Hostel",
            location: "Belihuloya Town",
            type: "Hostel",
            price: 6500,
            status: "Active",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwOUPIKoOHaAM_E-TBru2zCVRI3Ssm_LYBqy9OohQOx9fZ7bJFKvFZeXYP-TL5_hnUPQRzHpFmqXIkmL594Z2YVtMNyZ6adghT3SaAi0Q29G-yRY1dWnDXX4DuymdYSw76W9egefXCZ7WnVcqqgYIreJXZ9-WdrrDNT-ZVxNJlTNElTURfj5tpQpeMRuNJtM2fGiyxD9VRg_Si88XLJUgR7cYjdntOdqJg3Yo4z7js1y1HXXZkV1FJXr76YpQn-c4zmKy77-uQ4bI",
            description: "Exclusive girls' hostel with 24/7 security and study facilities.",
            amenities: ["WiFi", "Security", "Common Room", "CCTV", "Mess"],
            rooms: 12,
            occupied: 10,
            owner: "Ms. Fernando",
            ownerContact: "+94 76 234 5678",
            ownerId: "OWN-002",
            ownerEmail: "fernando@gmail.com",
            createdAt: "2024-02-10",
            lastUpdated: "2024-10-18",
            approvedBy: "Admin User",
            approvedDate: "2024-02-15"
        },
        {
            id: "SUSL-3401",
            name: "Old University Hostel",
            location: "University Premises",
            type: "Hostel",
            price: 5000,
            status: "Inactive",
            image: "https://via.placeholder.com/400x300?text=Inactive+Property",
            description: "Old hostel under renovation. Currently not accepting new students.",
            amenities: ["Basic Furniture", "Shared Bathroom", "Study Hall"],
            rooms: 20,
            occupied: 0,
            owner: "University Management",
            ownerContact: "+94 81 238 5000",
            ownerId: "UNIV-001",
            ownerEmail: "hostels@susl.lk",
            createdAt: "2023-08-01",
            lastUpdated: "2024-09-15",
            approvedBy: "Admin User",
            approvedDate: "2023-08-05",
            inactiveReason: "Under renovation until December 2024"
        }
    ]);

    const [propertyRequests, setPropertyRequests] = useState([
        {
            id: "REQ-001",
            name: "Campus Edge Apartments",
            location: "SUSL Main Gate Road",
            type: "Apartment",
            price: 7500,
            status: "Pending",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj70YCtt3xEQ41nzjit8EF3C5db8W9u5nFJ41O6tsQNQZ32UUuM0r-fKYxfvOefR7TyBkFee4rs8YZDVYTwXyeF5-2LN0ZZz3qRbc401qQBKu3-BLoGjavC3RQ8ElCf3xEA10qYwUGCWQ1qjTe0HQcnYP4a5EZfsLO31qfm3KcCDHNTpgkFbw3QYArc_yLM9k66cLBfwfJkDiVYNLjmY74jn02DsNtzcc-1VEe-oQxzEqhZKUDlPatpomI-ZActGKMR5Msq05n_iI",
            description: "New apartment building with modern facilities, close to campus.",
            amenities: ["WiFi", "AC", "Parking", "Security", "Study Room"],
            rooms: 15,
            owner: "Mr. Silva",
            ownerContact: "+94 71 345 6789",
            ownerId: "OWN-003",
            ownerEmail: "silva@gmail.com",
            requestedDate: "2024-10-22",
            reason: "Owner wants to expand their property listings",
            currentProperties: 3,
            maxProperties: 5
        },
        {
            id: "REQ-002",
            name: "Green Valley Hostel",
            location: "Pambahinna Road",
            type: "Hostel",
            price: 6000,
            status: "Pending",
            image: "https://via.placeholder.com/400x300?text=Property+Image",
            description: "Eco-friendly hostel with garden and study areas.",
            amenities: ["WiFi", "Garden", "Common Kitchen", "Laundry"],
            rooms: 8,
            owner: "Ms. Jayasinghe",
            ownerContact: "+94 76 456 7890",
            ownerId: "OWN-004",
            ownerEmail: "jayasinghe@gmail.com",
            requestedDate: "2024-10-21",
            reason: "New property owner registration",
            currentProperties: 0,
            maxProperties: 3
        },
    ]);

    const tabs = [
        { id: "current", label: "Active Properties", count: allProperties.filter(p => p.status === "Active").length },
        { id: "requests", label: "Property Requests", count: propertyRequests.length },
        { id: "inactive", label: "Inactive Properties", count: allProperties.filter(p => p.status === "Inactive").length }
    ];

    const stats = [
        {
            label: "Total Properties",
            icon: "apartment",
            value: allProperties.length,
            subtext: `${allProperties.filter(p => p.status === "Active").length} active`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Total Occupancy",
            icon: "group",
            value: `${((allProperties.reduce((sum, prop) => sum + prop.occupied, 0) / allProperties.reduce((sum, prop) => sum + prop.rooms, 0)) * 100).toFixed(1)}%`,
            subtext: `${allProperties.reduce((sum, prop) => sum + prop.occupied, 0)} of ${allProperties.reduce((sum, prop) => sum + prop.rooms, 0)} rooms`
        },
        {
            label: "Monthly Revenue",
            icon: "payments",
            value: `LKR ${(allProperties.reduce((sum, prop) => sum + (prop.price * prop.occupied), 0)).toLocaleString()}`,
            subtext: "From active properties"
        }
    ];

    const handleViewProperty = (property) => {
        setSelectedProperty(property);
        setShowViewPopup(true);
    };

    const handleDeleteProperty = (propertyId) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            setAllProperties(allProperties.filter(prop => prop.id !== propertyId));
        }
    };

    const handleApproveRequest = (requestId) => {
        const request = propertyRequests.find(req => req.id === requestId);
        if (!request) return;

        const newProperty = {
            ...request,
            id: `SUSL-${Math.floor(1000 + Math.random() * 9000)}`,
            status: "Active",
            occupied: 0,
            createdAt: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0],
            approvedBy: "Admin User",
            approvedDate: new Date().toISOString().split('T')[0]
        };

        setAllProperties([...allProperties, newProperty]);
        setPropertyRequests(propertyRequests.filter(req => req.id !== requestId));

        alert(`Property "${request.name}" has been approved and listed. Owner has been notified.`);
    };

    const handleRejectRequest = (requestId) => {
        const request = propertyRequests.find(req => req.id === requestId);
        if (window.confirm(`Are you sure you want to reject "${request?.name}"?`)) {
            setPropertyRequests(propertyRequests.filter(req => req.id !== requestId));
            alert(`Property request for "${request?.name}" has been rejected. Owner has been notified.`);
        }
    };

    const handleTogglePropertyStatus = (propertyId, currentStatus) => {
        const property = allProperties.find(p => p.id === propertyId);
        if (!property) return;

        const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
        const reason = newStatus === "Inactive"
            ? prompt("Please provide reason for deactivation:")
            : null;

        setAllProperties(allProperties.map(prop =>
            prop.id === propertyId ? {
                ...prop,
                status: newStatus,
                lastUpdated: new Date().toISOString().split('T')[0],
                ...(newStatus === "Inactive" && { inactiveReason: reason })
            } : prop
        ));

        alert(`Property "${property.name}" has been ${newStatus.toLowerCase()}.`);
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            {/* Popups */}
            {showViewPopup && selectedProperty && (
                <ViewAccommodationPopup
                    property={selectedProperty}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedProperty(null);
                    }}
                    isAdmin={true}
                />
            )}

            <Heading
                title="Admin Accommodation Management"
                subtitle="Manage existing properties and review new property submissions from owners."
                showButton={false}
            />

            <StatsCards stats={stats} />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "current" && (
                <PropertyTable
                    properties={allProperties.filter(prop => prop.status === "Active")}
                    onView={handleViewProperty}
                    onDelete={handleDeleteProperty}
                    onToggleStatus={handleTogglePropertyStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "requests" && (
                <PropertyRequestsTable
                    propertyRequests={propertyRequests}
                    onViewRequest={handleViewProperty}
                    onApproveRequest={handleApproveRequest}
                    onRejectRequest={handleRejectRequest}
                />
            )}

            {activeTab === "inactive" && (
                <PropertyTable
                    properties={allProperties.filter(prop => prop.status === "Inactive")}
                    onView={handleViewProperty}
                    onDelete={handleDeleteProperty}
                    onToggleStatus={handleTogglePropertyStatus}
                    isAdmin={true}
                />
            )}
        </main>
    );
};

export default AdminAccommodation;