import React, { useState, useEffect } from "react";
import Heading from "../../containers/owner/accommodation/Heading";
import PropertyTable from "../../containers/owner/accommodation/PropertyTable";
import StatsCards from "../../containers/owner/accommodation/StatsCards";
import AddAccommodationPopup from "../../containers/owner/accommodation/AddAccommodationPopup";
import ViewAccommodationPopup from "../../containers/owner/accommodation/ViewAccommodationPopup";
import EditAccommodationPopup from "../../containers/owner/accommodation/EditAccommodationPopup";
import PermissionPopup from "../../containers/owner/accommodation/PermissionPopup";

const OwnerAccommodation = () => {
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showPermissionPopup, setShowPermissionPopup] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [properties, setProperties] = useState([
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
            createdAt: "2024-01-15",
            lastUpdated: "2024-10-20"
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
            createdAt: "2024-02-10",
            lastUpdated: "2024-10-18"
        },
        {
            id: "SUSL-4491",
            name: "Campus Edge Single",
            location: "SUSL Main Gate",
            type: "Single Room",
            price: 5000,
            status: "Inactive",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj70YCtt3xEQ41nzjit8EF3C5db8W9u5nFJ41O6tsQNQZ32UUuM0r-fKYxfvOefR7TyBkFee4rs8YZDVYTwXyeF5-2LN0ZZz3qRbc401qQBKu3-BLoGjavC3RQ8ElCf3xEA10qYwUGCWQ1qjTe0HQcnYP4a5EZfsLO31qfm3KcCDHNTpgkFbw3QYArc_yLM9k66cLBfwfJkDiVYNLjmY74jn02DsNtzcc-1VEe-oQxzEqhZKUDlPatpomI-ZActGKMR5Msq05n_iI",
            description: "Single rooms with basic amenities near campus main gate.",
            amenities: ["WiFi", "Fan", "Study Table", "Attached Bathroom"],
            rooms: 5,
            occupied: 0,
            owner: "Mr. Silva",
            ownerContact: "+94 71 345 6789",
            createdAt: "2024-03-05",
            lastUpdated: "2024-09-30",
            inactiveReason: "Under renovation"
        },
    ]);

    const [userPermissions, setUserPermissions] = useState({
        canAdd: false,
        canEdit: true,
        canDelete: true,
        canViewDetails: true,
        maxProperties: 5,
        currentProperties: 3
    });

    const stats = [
        {
            label: "Total Bookings",
            icon: "event_available",
            value: 312,
            subtext: "+5% from last month",
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Active Vehicles",
            icon: "directions_car",
            value: 12,
            subtext: "8 currently rented out"
        },
        {
            label: "Monthly Revenue",
            icon: "payments",
            value: "LKR 185k",
            subtext: "Next payout: 28th Oct"
        }
    ];


    useEffect(() => {
        checkUserPermissions();
    }, []);

    const checkUserPermissions = () => {
        const hasPermission = userPermissions.currentProperties < userPermissions.maxProperties;
        setUserPermissions(prev => ({
            ...prev,
            canAdd: hasPermission
        }));
    };

    const handleAddPropertyClick = () => {
        if (!userPermissions.canAdd) {
            setShowPermissionPopup(true);
            return;
        }
        setShowAddPopup(true);
    };

    const handleAddProperty = (newProperty) => {
        const propertyWithId = {
            ...newProperty,
            id: `SUSL-${Math.floor(1000 + Math.random() * 9000)}`,
            createdAt: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0],
            status: "Active",
            occupied: 0
        };

        setProperties([...properties, propertyWithId]);
        setUserPermissions(prev => ({
            ...prev,
            currentProperties: prev.currentProperties + 1,
            canAdd: prev.currentProperties + 1 < prev.maxProperties
        }));
        setShowAddPopup(false);
    };

    const handleEditProperty = (updatedProperty) => {
        setProperties(properties.map(prop =>
            prop.id === updatedProperty.id ? {
                ...updatedProperty,
                lastUpdated: new Date().toISOString().split('T')[0]
            } : prop
        ));
        setShowEditPopup(false);
        setSelectedProperty(null);
    };

    const handleViewProperty = (property) => {
        setSelectedProperty(property);
        setShowViewPopup(true);
    };

    const handleEditClick = (property) => {
        setSelectedProperty(property);
        setShowEditPopup(true);
    };

    const handleDeleteProperty = (propertyId) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            setProperties(properties.filter(prop => prop.id !== propertyId));
            setUserPermissions(prev => ({
                ...prev,
                currentProperties: prev.currentProperties - 1,
                canAdd: prev.currentProperties - 1 < prev.maxProperties
            }));
        }
    };

    const handleRequestMoreProperties = () => {
        // Simulate API call to request more properties
        alert("Request sent to admin for more property slots. You will be notified when approved.");
        setShowPermissionPopup(false);
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            {/* Popups */}
            {showAddPopup && (
                <AddAccommodationPopup
                    onClose={() => setShowAddPopup(false)}
                    onSave={handleAddProperty}
                />
            )}

            {showViewPopup && selectedProperty && (
                <ViewAccommodationPopup
                    property={selectedProperty}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedProperty(null);
                    }}
                    onEdit={() => {
                        setShowViewPopup(false);
                        setShowEditPopup(true);
                    }}
                />
            )}

            {showEditPopup && selectedProperty && (
                <EditAccommodationPopup
                    property={selectedProperty}
                    onClose={() => {
                        setShowEditPopup(false);
                        setSelectedProperty(null);
                    }}
                    onSave={handleEditProperty}
                />
            )}

            {showPermissionPopup && (
                <PermissionPopup
                    currentCount={userPermissions.currentProperties}
                    maxLimit={userPermissions.maxProperties}
                    onClose={() => setShowPermissionPopup(false)}
                    onRequestMore={handleRequestMoreProperties}
                />
            )}

            <Heading
                title="Accommodation Management"
                subtitle="Manage your Sabaragamuwa University area listings."
                buttonText="Add New Property"
                onButtonClick={handleAddPropertyClick}
                buttonDisabled={!userPermissions.canAdd}
            />

            <StatsCards stats={stats} />

            <PropertyTable
                properties={properties}
                onView={handleViewProperty}
                onEdit={handleEditClick}
                onDelete={handleDeleteProperty}
            />
        </main>
    );
};

export default OwnerAccommodation;