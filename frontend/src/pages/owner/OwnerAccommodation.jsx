import React, { useState } from "react";
import Heading from "../../containers/owner/common/Heading";
import StatsCards from "../../containers/owner/common/StatsCards";
import Tabs from "../../containers/owner/common/Tabs";
import AccommodationTable from "../../containers/owner/accommodation/AccommodationTable";
import AddAccommodationPopup from "../../containers/owner/accommodation/AddAccommodationPopup";
import EditAccommodationPopup from "../../containers/owner/accommodation/EditAccommodationPopup";
import PendingAccommodationTable from "../../containers/owner/accommodation/PendingAccommodationTable";
import RejectedAccommodationTable from "../../containers/owner/accommodation/RejectedAccommodationTable";
import ViewAccommodationPopup from "../../containers/owner/accommodation/ViewAccommodationPopup";

const OwnerAccommodation = () => {
    const [activeTab, setActiveTab] = useState("active");
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [resubmitMode, setResubmitMode] = useState(false);

    const [accommodations, setAccommodations] = useState({
        active: [
            {
                _id: "SUSL-2938",
                name: "Riverview Annex",
                accommodation_type: "house",
                no_of_rooms: 7,
                no_of_beds: 14,
                no_of_bathrooms: 3,
                verified: true,
                highly_rated: true,
                description: "Modern annex with river view, perfect for students seeking quiet environment near university.",
                owner_id: "owner123",
                month_rent: 8000,
                status: "Available",
                reject_reason: null,
                images: [
                    {
                        filename: "riverview-annex.jpg",
                        content_type: "image/jpeg",
                        size: 2048576
                    }
                ],
                reviews: [],
                amenities: [
                    { name: "WiFi" },
                    { name: "24/7 Security" },
                    { name: "Laundry" },
                    { name: "Study Room" },
                    { name: "Parking" }
                ],
                available_users: 1,
                total_users: 7,
                address: {
                    street: "Pambahinna Junction",
                    city: "Belihuloya",
                    postal_code: "70140",
                    country: "Sri Lanka"
                },
                location: {
                    latitude: 6.8333,
                    longitude: 80.8667
                },
                time_from_uni: {
                    walking: "15 mins",
                    driving: "5 mins"
                },
                created_at: "2024-01-15T00:00:00Z",
                last_updated: "2024-10-20T00:00:00Z"
            },
            {
                _id: "SUSL-1102",
                name: "Hilltop Girls' Hostel",
                accommodation_type: "hostel",
                no_of_rooms: 12,
                no_of_beds: 24,
                no_of_bathrooms: 6,
                verified: true,
                highly_rated: true,
                description: "Exclusive girls' hostel with 24/7 security and study facilities.",
                owner_id: "owner123",
                month_rent: 6500,
                status: "Available",
                reject_reason: null,
                images: [
                    {
                        filename: "hilltop-hostel.jpg",
                        content_type: "image/jpeg",
                        size: 1948576
                    }
                ],
                reviews: [],
                amenities: [
                    { name: "WiFi" },
                    { name: "Security" },
                    { name: "Common Room" },
                    { name: "CCTV" },
                    { name: "Mess" }
                ],
                available_users: 2,
                total_users: 12,
                address: {
                    street: "Belihuloya Town",
                    city: "Belihuloya",
                    postal_code: "70140",
                    country: "Sri Lanka"
                },
                location: {
                    latitude: 6.8335,
                    longitude: 80.8670
                },
                time_from_uni: {
                    walking: "20 mins",
                    driving: "8 mins"
                },
                created_at: "2024-02-10T00:00:00Z",
                last_updated: "2024-10-18T00:00:00Z"
            }
        ],
        pending: [
            {
                _id: "PEND-001",
                name: "Green Valley Hostel",
                accommodation_type: "hostel",
                no_of_rooms: 8,
                no_of_beds: 16,
                no_of_bathrooms: 4,
                verified: false,
                highly_rated: false,
                description: "Eco-friendly hostel with garden and study areas.",
                owner_id: "owner123",
                month_rent: 6000,
                status: "pending",
                reject_reason: null,
                images: [
                    {
                        filename: "green-valley.jpg",
                        content_type: "image/jpeg",
                        size: 1848576
                    }
                ],
                reviews: [],
                amenities: [
                    { name: "WiFi" },
                    { name: "Garden" },
                    { name: "Common Kitchen" },
                    { name: "Laundry" }
                ],
                available_users: 8,
                total_users: 8,
                address: {
                    street: "Pambahinna Road",
                    city: "Belihuloya",
                    postal_code: "70140",
                    country: "Sri Lanka"
                },
                location: {
                    latitude: 6.8340,
                    longitude: 80.8680
                },
                time_from_uni: {
                    walking: "10 mins",
                    driving: "3 mins"
                },
                created_at: "2024-10-21T00:00:00Z",
                last_updated: "2024-10-21T00:00:00Z"
            },
            {
                _id: "PEND-002",
                name: "Campus Edge Apartments",
                accommodation_type: "apartment",
                no_of_rooms: 15,
                no_of_beds: 30,
                no_of_bathrooms: 8,
                verified: false,
                highly_rated: false,
                description: "New apartment building with modern facilities.",
                owner_id: "owner123",
                month_rent: 7500,
                status: "pending",
                reject_reason: null,
                images: [
                    {
                        filename: "campus-edge.jpg",
                        content_type: "image/jpeg",
                        size: 2148576
                    }
                ],
                reviews: [],
                amenities: [
                    { name: "WiFi" },
                    { name: "AC" },
                    { name: "Parking" },
                    { name: "Security" }
                ],
                available_users: 15,
                total_users: 15,
                address: {
                    street: "SUSL Main Gate Road",
                    city: "Belihuloya",
                    postal_code: "70140",
                    country: "Sri Lanka"
                },
                location: {
                    latitude: 6.8325,
                    longitude: 80.8660
                },
                time_from_uni: {
                    walking: "5 mins",
                    driving: "2 mins"
                },
                created_at: "2024-10-22T00:00:00Z",
                last_updated: "2024-10-22T00:00:00Z"
            }
        ],
        rejected: [
            {
                _id: "REJ-001",
                name: "Old Town Hostel",
                accommodation_type: "hostel",
                no_of_rooms: 10,
                no_of_beds: 20,
                no_of_bathrooms: 3,
                verified: false,
                highly_rated: false,
                description: "Basic hostel with shared facilities.",
                owner_id: "owner123",
                month_rent: 4500,
                status: "rejected",
                reject_reason: "Incomplete documentation. Please provide accommodation ownership proof.",
                images: [
                    {
                        filename: "old-town.jpg",
                        content_type: "image/jpeg",
                        size: 1648576
                    }
                ],
                reviews: [],
                amenities: [
                    { name: "Basic Furniture" },
                    { name: "Shared Bathroom" }
                ],
                available_users: 10,
                total_users: 10,
                address: {
                    street: "Belihuloya Town",
                    city: "Belihuloya",
                    postal_code: "70140",
                    country: "Sri Lanka"
                },
                location: {
                    latitude: 6.8345,
                    longitude: 80.8675
                },
                time_from_uni: {
                    walking: "25 mins",
                    driving: "10 mins"
                },
                created_at: "2024-10-15T00:00:00Z",
                last_updated: "2024-10-18T00:00:00Z"
            },
            {
                _id: "REJ-002",
                name: "City View Rooms",
                accommodation_type: "house",
                no_of_rooms: 5,
                no_of_beds: 10,
                no_of_bathrooms: 2,
                verified: false,
                highly_rated: false,
                description: "Single rooms with attached bathrooms.",
                owner_id: "owner123",
                month_rent: 5500,
                status: "rejected",
                reject_reason: "Accommodation does not meet minimum safety standards.",
                images: [
                    {
                        filename: "city-view.jpg",
                        content_type: "image/jpeg",
                        size: 1748576
                    }
                ],
                reviews: [],
                amenities: [
                    { name: "WiFi" },
                    { name: "Attached Bathroom" }
                ],
                available_users: 5,
                total_users: 5,
                address: {
                    street: "Pambahinna Junction",
                    city: "Belihuloya",
                    postal_code: "70140",
                    country: "Sri Lanka"
                },
                location: {
                    latitude: 6.8338,
                    longitude: 80.8665
                },
                time_from_uni: {
                    walking: "15 mins",
                    driving: "5 mins"
                },
                created_at: "2024-10-10T00:00:00Z",
                last_updated: "2024-10-14T00:00:00Z"
            }
        ]
    });

    const tabs = [
        { id: "active", label: "Active Accommodations", count: accommodations.active.length },
        { id: "pending", label: "Accommodation Pending", count: accommodations.pending.length },
        { id: "rejected", label: "Accommodation Rejected", count: accommodations.rejected.length }
    ];

    const stats = [
        {
            label: "Total Accommodations",
            icon: "apartment",
            value: accommodations.active.length + accommodations.pending.length + accommodations.rejected.length,
            subtext: `${accommodations.active.length} active, ${accommodations.pending.length} pending`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Total Occupancy",
            icon: "group",
            value: `${((accommodations.active.reduce((sum, prop) => sum + (prop.total_users - prop.available_users), 0) / accommodations.active.reduce((sum, prop) => sum + prop.total_users, 0)) * 100).toFixed(1)}%`,
            subtext: `${accommodations.active.reduce((sum, prop) => sum + (prop.total_users - prop.available_users), 0)} of ${accommodations.active.reduce((sum, prop) => sum + prop.total_users, 0)} rooms occupied`
        },
        {
            label: "Monthly Revenue",
            icon: "payments",
            value: `LKR ${(accommodations.active.reduce((sum, prop) => sum + (prop.month_rent * (prop.total_users - prop.available_users)), 0)).toLocaleString()}`,
            subtext: "From active accommodations"
        }
    ];

    const handleAddAccommodationClick = () => {
        setShowAddPopup(true);
    };

    const handleAddAccommodation = (newAccommodation) => {
        const accommodationWithId = {
            ...newAccommodation,
            _id: `PEND-${Math.floor(1000 + Math.random() * 9000)}`,
            status: "pending",
            verified: false,
            highly_rated: false,
            owner_id: "owner123",
            reject_reason: null,
            reviews: [],
            available_users: newAccommodation.no_of_rooms,
            total_users: newAccommodation.no_of_rooms,
            created_at: new Date().toISOString(),
            last_updated: new Date().toISOString()
        };

        setAccommodations(prev => ({
            ...prev,
            pending: [...prev.pending, accommodationWithId]
        }));
        setShowAddPopup(false);
    };

    const handleEditAccommodation = (updatedAccommodation) => {
        if (resubmitMode) {
            const resubmitted = {
                ...updatedAccommodation,
                _id: `PEND-${Math.floor(1000 + Math.random() * 9000)}`,
                status: "pending",
                verified: false,
                highly_rated: false,
                reject_reason: null,
                available_users: updatedAccommodation.no_of_rooms,
                created_at: new Date().toISOString(),
                last_updated: new Date().toISOString()
            };

            setAccommodations(prev => ({
                ...prev,
                pending: [...prev.pending, resubmitted],
                rejected: prev.rejected.filter(prop => prop._id !== updatedAccommodation._id)
            }));

            setResubmitMode(false);
            setShowEditPopup(false);
            setSelectedAccommodation(null);
            return;
        }

        if (activeTab === "active") {
            setAccommodations(prev => ({
                ...prev,
                active: prev.active.map(prop =>
                    prop._id === updatedAccommodation._id ? {
                        ...updatedAccommodation,
                        last_updated: new Date().toISOString()
                    } : prop
                )
            }));
        } else if (activeTab === "pending") {
            setAccommodations(prev => ({
                ...prev,
                pending: prev.pending.map(prop =>
                    prop._id === updatedAccommodation._id ? {
                        ...updatedAccommodation,
                        last_updated: new Date().toISOString()
                    } : prop
                )
            }));
        }

        setShowEditPopup(false);
        setSelectedAccommodation(null);
    };

    const handleViewAccommodation = (accommodation) => {
        setSelectedAccommodation(accommodation);
        setShowViewPopup(true);
    };

    const handleEditClick = (accommodation) => {
        setSelectedAccommodation(accommodation);
        setShowEditPopup(true);
    };

    const handleDeleteAccommodation = (accommodationId) => {
        if (window.confirm("Are you sure you want to delete this accommodation?")) {
            if (activeTab === "active") {
                setAccommodations(prev => ({
                    ...prev,
                    active: prev.active.filter(prop => prop._id !== accommodationId)
                }));
            } else if (activeTab === "pending") {
                setAccommodations(prev => ({
                    ...prev,
                    pending: prev.pending.filter(prop => prop._id !== accommodationId)
                }));
            } else if (activeTab === "rejected") {
                setAccommodations(prev => ({
                    ...prev,
                    rejected: prev.rejected.filter(prop => prop._id !== accommodationId)
                }));
            }
        }
    };

    const handleEditBeforeResubmit = (accommodation) => {
        setSelectedAccommodation(accommodation);
        setShowEditPopup(true);
        setResubmitMode(true);
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            {showAddPopup && (
                <AddAccommodationPopup
                    onClose={() => setShowAddPopup(false)}
                    onSave={handleAddAccommodation}
                />
            )}

            {showViewPopup && selectedAccommodation && (
                <ViewAccommodationPopup
                    accommodation={selectedAccommodation}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedAccommodation(null);
                    }}
                    onEdit={() => {
                        setShowViewPopup(false);
                        setShowEditPopup(true);
                    }}
                    activeTab={activeTab}
                />
            )}

            {showEditPopup && selectedAccommodation && (
                <EditAccommodationPopup
                    accommodation={selectedAccommodation}
                    onClose={() => {
                        setShowEditPopup(false);
                        setSelectedAccommodation(null);
                    }}
                    onSave={handleEditAccommodation}
                    activeTab={activeTab}
                />
            )}

            <Heading
                title="Accommodation Management"
                subtitle="Manage your Sabaragamuwa University area listings."
                buttonText="Add New Accommodation"
                onButtonClick={handleAddAccommodationClick}
            />

            <StatsCards stats={stats} />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "active" && (
                <AccommodationTable
                    accommodations={accommodations.active}
                    onView={handleViewAccommodation}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteAccommodation}
                    showEditDelete={true}
                />
            )}

            {activeTab === "pending" && (
                <PendingAccommodationTable
                    accommodations={accommodations.pending}
                    onView={handleViewAccommodation}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteAccommodation}
                />
            )}

            {activeTab === "rejected" && (
                <RejectedAccommodationTable
                    accommodations={accommodations.rejected}
                    onView={handleViewAccommodation}
                    onEditBeforeResubmit={handleEditBeforeResubmit}
                    onDelete={handleDeleteAccommodation}
                />
            )}
        </main>
    );
};

export default OwnerAccommodation;