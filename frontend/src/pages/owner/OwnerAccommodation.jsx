import React, { useState, useEffect } from "react";
import Heading from "../../containers/owner/accommodation/Heading";
import PropertyTable from "../../containers/owner/accommodation/PropertyTable";
import PendingPropertyTable from "../../containers/owner/accommodation/PendingPropertyTable";
import RejectedPropertyTable from "../../containers/owner/accommodation/RejectedPropertyTable";
import StatsCards from "../../containers/owner/accommodation/StatsCards";
import Tabs from "../../containers/owner/accommodation/Tabs";
import AddAccommodationPopup from "../../containers/owner/accommodation/AddAccommodationPopup";
import ViewAccommodationPopup from "../../containers/owner/accommodation/ViewAccommodationPopup";
import EditAccommodationPopup from "../../containers/owner/accommodation/EditAccommodationPopup";
import PermissionPopup from "../../containers/owner/accommodation/PermissionPopup";

const OwnerAccommodation = () => {
    const [activeTab, setActiveTab] = useState("active");
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showPermissionPopup, setShowPermissionPopup] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const [properties, setProperties] = useState({
        active: [
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
            }
        ],
        pending: [
            {
                id: "PEND-001",
                name: "Green Valley Hostel",
                location: "Pambahinna Road",
                type: "Hostel",
                price: 6000,
                status: "Pending",
                image: "https://via.placeholder.com/400x300?text=Pending+Property",
                description: "Eco-friendly hostel with garden and study areas.",
                amenities: ["WiFi", "Garden", "Common Kitchen", "Laundry"],
                rooms: 8,
                owner: "Ms. Jayasinghe",
                ownerContact: "+94 76 456 7890",
                submittedDate: "2024-10-21",
                adminNotes: "Under review by admin",
                expectedResponseDate: "2024-10-25"
            },
            {
                id: "PEND-002",
                name: "Campus Edge Apartments",
                location: "SUSL Main Gate Road",
                type: "Apartment",
                price: 7500,
                status: "Pending",
                image: "https://via.placeholder.com/400x300?text=Pending+Property",
                description: "New apartment building with modern facilities.",
                amenities: ["WiFi", "AC", "Parking", "Security"],
                rooms: 15,
                owner: "Mr. Silva",
                ownerContact: "+94 71 345 6789",
                submittedDate: "2024-10-22",
                adminNotes: "Awaiting verification",
                expectedResponseDate: "2024-10-26"
            }
        ],
        rejected: [
            {
                id: "REJ-001",
                name: "Old Town Hostel",
                location: "Belihuloya Town",
                type: "Hostel",
                price: 4500,
                status: "Rejected",
                image: "https://via.placeholder.com/400x300?text=Rejected+Property",
                description: "Basic hostel with shared facilities.",
                amenities: ["Basic Furniture", "Shared Bathroom"],
                rooms: 10,
                owner: "Mr. Fernando",
                ownerContact: "+94 77 987 6543",
                submittedDate: "2024-10-15",
                rejectedDate: "2024-10-18",
                rejectionReason: "Incomplete documentation. Please provide property ownership proof.",
                adminRemarks: "Missing ownership certificate and utility bills"
            },
            {
                id: "REJ-002",
                name: "City View Rooms",
                location: "Pambahinna Junction",
                type: "Single Room",
                price: 5500,
                status: "Rejected",
                image: "https://via.placeholder.com/400x300?text=Rejected+Property",
                description: "Single rooms with attached bathrooms.",
                amenities: ["WiFi", "Attached Bathroom"],
                rooms: 5,
                owner: "Ms. Perera",
                ownerContact: "+94 76 123 4567",
                submittedDate: "2024-10-10",
                rejectedDate: "2024-10-14",
                rejectionReason: "Property does not meet minimum safety standards.",
                adminRemarks: "Fire safety equipment missing, inadequate emergency exits"
            }
        ]
    });

    const [userPermissions, setUserPermissions] = useState({
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canViewDetails: true,
        maxProperties: 5,
        currentProperties: 2
    });

    const tabs = [
        { id: "active", label: "Active Properties", count: properties.active.length },
        { id: "pending", label: "Property Pending", count: properties.pending.length },
        { id: "rejected", label: "Property Rejected", count: properties.rejected.length }
    ];

    const stats = [
        {
            label: "Total Properties",
            icon: "apartment",
            value: properties.active.length + properties.pending.length + properties.rejected.length,
            subtext: `${properties.active.length} active, ${properties.pending.length} pending`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Total Occupancy",
            icon: "group",
            value: `${((properties.active.reduce((sum, prop) => sum + prop.occupied, 0) / properties.active.reduce((sum, prop) => sum + prop.rooms, 0)) * 100).toFixed(1)}%`,
            subtext: `${properties.active.reduce((sum, prop) => sum + prop.occupied, 0)} of ${properties.active.reduce((sum, prop) => sum + prop.rooms, 0)} rooms occupied`
        },
        {
            label: "Monthly Revenue",
            icon: "payments",
            value: `LKR ${(properties.active.reduce((sum, prop) => sum + (prop.price * prop.occupied), 0)).toLocaleString()}`,
            subtext: "From active properties"
        }
    ];

    useEffect(() => {
        checkUserPermissions();
    }, [properties.active]);

    const checkUserPermissions = () => {
        const hasPermission = properties.active.length < userPermissions.maxProperties;
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
            id: `PEND-${Math.floor(1000 + Math.random() * 9000)}`,
            status: "Pending",
            submittedDate: new Date().toISOString().split('T')[0],
            adminNotes: "Awaiting admin review",
            expectedResponseDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };

        setProperties(prev => ({
            ...prev,
            pending: [...prev.pending, propertyWithId]
        }));
        setShowAddPopup(false);
        alert("Property submitted for review. You will be notified once approved.");
    };

    const handleEditProperty = (updatedProperty) => {
        if (activeTab === "active") {
            setProperties(prev => ({
                ...prev,
                active: prev.active.map(prop =>
                    prop.id === updatedProperty.id ? {
                        ...updatedProperty,
                        lastUpdated: new Date().toISOString().split('T')[0]
                    } : prop
                )
            }));
        } else if (activeTab === "pending") {
            setProperties(prev => ({
                ...prev,
                pending: prev.pending.map(prop =>
                    prop.id === updatedProperty.id ? {
                        ...updatedProperty,
                        lastUpdated: new Date().toISOString().split('T')[0]
                    } : prop
                )
            }));
        }
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
            if (activeTab === "active") {
                setProperties(prev => ({
                    ...prev,
                    active: prev.active.filter(prop => prop.id !== propertyId)
                }));
                setUserPermissions(prev => ({
                    ...prev,
                    currentProperties: prev.currentProperties - 1,
                    canAdd: prev.currentProperties - 1 < prev.maxProperties
                }));
            } else if (activeTab === "pending") {
                setProperties(prev => ({
                    ...prev,
                    pending: prev.pending.filter(prop => prop.id !== propertyId)
                }));
            } else if (activeTab === "rejected") {
                setProperties(prev => ({
                    ...prev,
                    rejected: prev.rejected.filter(prop => prop.id !== propertyId)
                }));
            }
        }
    };

    const handleResubmitProperty = (property) => {
        const updatedProperty = {
            ...property,
            id: `PEND-${Math.floor(1000 + Math.random() * 9000)}`,
            status: "Pending",
            submittedDate: new Date().toISOString().split('T')[0],
            adminNotes: "Resubmitted for review",
            expectedResponseDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            rejectionReason: null,
            adminRemarks: null,
            rejectedDate: null
        };

        setProperties(prev => ({
            ...prev,
            pending: [...prev.pending, updatedProperty],
            rejected: prev.rejected.filter(prop => prop.id !== property.id)
        }));

        alert("Property resubmitted for review. You will be notified once approved.");
    };

    const handleRequestMoreProperties = () => {
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
                    activeTab={activeTab}
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
                    activeTab={activeTab}
                />
            )}

            {showPermissionPopup && (
                <PermissionPopup
                    currentCount={properties.active.length}
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

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "active" && (
                <PropertyTable
                    properties={properties.active}
                    onView={handleViewProperty}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteProperty}
                    showEditDelete={true}
                />
            )}

            {activeTab === "pending" && (
                <PendingPropertyTable
                    properties={properties.pending}
                    onView={handleViewProperty}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteProperty}
                />
            )}

            {activeTab === "rejected" && (
                <RejectedPropertyTable
                    properties={properties.rejected}
                    onView={handleViewProperty}
                    onResubmit={handleResubmitProperty}
                    onDelete={handleDeleteProperty}
                />
            )}
        </main>
    );
};

export default OwnerAccommodation;