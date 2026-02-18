import React, { useState } from "react";
import Heading from "../../containers/admin/common/Heading";
import StatsCards from "../../containers/admin/common/StatsCards";
import Tabs from "../../containers/admin/common/Tabs";
import AccommodationTable from "../../containers/admin/accommodation/AccommodationTable";
import ViewAccommodationPopup from "../../containers/admin/accommodation/ViewAccommodationPopup";
import AccommodationRequestsTable from "../../containers/admin/accommodation/AccommodationRequestsTable";
import StatusChangePopup from "../../containers/admin/accommodation/StatusChangePopup";
import RejectPopup from "../../containers/admin/accommodation/RejectPopup";

const AdminAccommodation = () => {
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [activeTab, setActiveTab] = useState("current");
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [accommodationToChangeStatus, setAccommodationToChangeStatus] = useState(null);
    const [showRejectPopup, setShowRejectPopup] = useState(false);
    const [requestToReject, setRequestToReject] = useState(null);

    const [allAccommodations, setAllAccommodations] = useState([
        {
            _id: "SUSL-2938",
            name: "Riverview Annex",
            accommodation_type: "Apartment",
            no_of_rooms: 7,
            no_of_beds: 7,
            no_of_bathrooms: 3,
            verified: true,
            highly_rated: true,
            description: "Modern annex with river view, perfect for students seeking quiet environment near university.",
            owner_id: "OWN-001",
            month_rent: 8000,
            status: "Available",
            reject_reason: null,
            images: [{
                filename: "riverview.jpg",
                content_type: "image/jpeg",
                size: 1024000
            }],
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
                city: "Pambahinna",
                postal_code: "70100",
                country: "Sri Lanka"
            },
            location: {
                latitude: 6.7167,
                longitude: 80.7833
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
            accommodation_type: "Hostel",
            no_of_rooms: 12,
            no_of_beds: 24,
            no_of_bathrooms: 6,
            verified: true,
            highly_rated: true,
            description: "Exclusive girls' hostel with 24/7 security and study facilities.",
            owner_id: "OWN-002",
            month_rent: 6500,
            status: "Available",
            reject_reason: null,
            images: [{
                filename: "hilltop.jpg",
                content_type: "image/jpeg",
                size: 2048000
            }],
            reviews: [],
            amenities: [
                { name: "WiFi" },
                { name: "Security" },
                { name: "Common Room" },
                { name: "CCTV" },
                { name: "Mess" }
            ],
            available_users: 14,
            total_users: 24,
            address: {
                street: "Belihuloya Town",
                city: "Belihuloya",
                postal_code: "70140",
                country: "Sri Lanka"
            },
            location: {
                latitude: 6.7167,
                longitude: 80.7833
            },
            time_from_uni: {
                walking: "10 mins",
                driving: "3 mins"
            },
            created_at: "2024-02-10T00:00:00Z",
            last_updated: "2024-10-18T00:00:00Z"
        },
        {
            _id: "SUSL-3401",
            name: "Old University Hostel",
            accommodation_type: "Hostel",
            no_of_rooms: 20,
            no_of_beds: 40,
            no_of_bathrooms: 10,
            verified: true,
            highly_rated: false,
            description: "Old hostel under renovation. Currently not accepting new students.",
            owner_id: "UNIV-001",
            month_rent: 5000,
            status: "unavailable",
            reject_reason: "Under renovation until December 2024",
            images: [{
                filename: "old_hostel.jpg",
                content_type: "image/jpeg",
                size: 512000
            }],
            reviews: [],
            amenities: [
                { name: "Basic Furniture" },
                { name: "Shared Bathroom" },
                { name: "Study Hall" }
            ],
            available_users: 0,
            total_users: 40,
            address: {
                street: "University Premises",
                city: "Belihuloya",
                postal_code: "70140",
                country: "Sri Lanka"
            },
            location: {
                latitude: 6.7167,
                longitude: 80.7833
            },
            time_from_uni: {
                walking: "2 mins",
                driving: "1 min"
            },
            created_at: "2023-08-01T00:00:00Z",
            last_updated: "2024-09-15T00:00:00Z"
        }
    ]);

    const [accommodationRequests, setAccommodationRequests] = useState([
        {
            _id: "REQ-001",
            name: "Campus Edge Apartments",
            accommodation_type: "Apartment",
            no_of_rooms: 15,
            no_of_beds: 30,
            no_of_bathrooms: 8,
            verified: false,
            highly_rated: false,
            description: "New apartment building with modern facilities, close to campus.",
            owner_id: "OWN-003",
            month_rent: 7500,
            status: "pending",
            reject_reason: null,
            images: [{
                filename: "campus_edge.jpg",
                content_type: "image/jpeg",
                size: 1536000
            }],
            reviews: [],
            amenities: [
                { name: "WiFi" },
                { name: "AC" },
                { name: "Parking" },
                { name: "Security" },
                { name: "Study Room" }
            ],
            available_users: 0,
            total_users: 30,
            address: {
                street: "SUSL Main Gate Road",
                city: "Belihuloya",
                postal_code: "70140",
                country: "Sri Lanka"
            },
            location: {
                latitude: 6.7167,
                longitude: 80.7833
            },
            time_from_uni: {
                walking: "5 mins",
                driving: "2 mins"
            },
            created_at: "2024-10-22T00:00:00Z",
            last_updated: "2024-10-22T00:00:00Z"
        },
        {
            _id: "REQ-002",
            name: "Green Valley Hostel",
            accommodation_type: "Hostel",
            no_of_rooms: 8,
            no_of_beds: 16,
            no_of_bathrooms: 4,
            verified: false,
            highly_rated: false,
            description: "Eco-friendly hostel with garden and study areas.",
            owner_id: "OWN-004",
            month_rent: 6000,
            status: "pending",
            reject_reason: null,
            images: [{
                filename: "green_valley.jpg",
                content_type: "image/jpeg",
                size: 1024000
            }],
            reviews: [],
            amenities: [
                { name: "WiFi" },
                { name: "Garden" },
                { name: "Common Kitchen" },
                { name: "Laundry" }
            ],
            available_users: 0,
            total_users: 16,
            address: {
                street: "Pambahinna Road",
                city: "Pambahinna",
                postal_code: "70100",
                country: "Sri Lanka"
            },
            location: {
                latitude: 6.7167,
                longitude: 80.7833
            },
            time_from_uni: {
                walking: "20 mins",
                driving: "7 mins"
            },
            created_at: "2024-10-21T00:00:00Z",
            last_updated: "2024-10-21T00:00:00Z"
        },
    ]);

    const tabs = [
        { id: "current", label: "Active Accommodations", count: allAccommodations.filter(p => p.status === "Available" || p.status === "Available").length },
        { id: "requests", label: "Accommodation Requests", count: accommodationRequests.length },
        { id: "inactive", label: "Inactive Accommodations", count: allAccommodations.filter(p => p.status === "unavailable" || p.status === "Rejected").length }
    ];

    const stats = [
        {
            label: "Total Accommodations",
            icon: "apartment",
            value: allAccommodations.length,
            subtext: `${allAccommodations.filter(p => p.status === "Available" || p.status === "Available").length} active`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Total Occupancy",
            icon: "group",
            value: `${((allAccommodations.reduce((sum, prop) => sum + (prop.total_users - prop.available_users), 0) / allAccommodations.reduce((sum, prop) => sum + prop.total_users, 0)) * 100).toFixed(1)}%`,
            subtext: `${allAccommodations.reduce((sum, prop) => sum + (prop.total_users - prop.available_users), 0)} of ${allAccommodations.reduce((sum, prop) => sum + prop.total_users, 0)} users`
        },
        {
            label: "Monthly Revenue",
            icon: "payments",
            value: `LKR ${(allAccommodations.reduce((sum, prop) => sum + (prop.month_rent * (prop.total_users - prop.available_users)), 0)).toLocaleString()}`,
            subtext: "From active accommodations"
        }
    ];

    const handleViewAccommodation = (accommodation) => {
        setSelectedAccommodation(accommodation);
        setShowViewPopup(true);
    };

    const handleDeleteAccommodation = (accommodationId) => {
        if (window.confirm("Are you sure you want to delete this accommodation?")) {
            setAllAccommodations(allAccommodations.filter(prop => prop._id !== accommodationId));
        }
    };

    const handleApproveRequest = (requestId) => {
        const request = accommodationRequests.find(req => req._id === requestId);
        if (!request) return;

        const newAccommodation = {
            ...request,
            _id: `SUSL-${Math.floor(1000 + Math.random() * 9000)}`,
            status: "Available",
            verified: true,
            created_at: new Date().toISOString(),
            last_updated: new Date().toISOString()
        };

        setAllAccommodations([...allAccommodations, newAccommodation]);
        setAccommodationRequests(accommodationRequests.filter(req => req._id !== requestId));

        alert(`Accommodation "${request.name}" has been approved and listed. Owner has been notified.`);
    };

    const handleRejectRequest = (request) => {
        setRequestToReject(request);
        setShowRejectPopup(true);
    };

    const handleConfirmReject = (reason) => {
        if (!requestToReject) return;

        setAccommodationRequests(accommodationRequests.filter(req => req._id !== requestToReject._id));

        console.log(`Rejected "${requestToReject.name}" for reason: ${reason}`);

        alert(`Accommodation request for "${requestToReject.name}" has been rejected.\nReason: ${reason}`);

        setShowRejectPopup(false);
        setRequestToReject(null);
    };

    const handleToggleAccommodationStatus = (accommodationId, currentStatus) => {
        const accommodation = allAccommodations.find(p => p._id === accommodationId);
        if (!accommodation) return;

        setAccommodationToChangeStatus({ ...accommodation, currentStatus });
        setShowStatusPopup(true);
    };

    const handleConfirmStatusChange = async (reason) => {
        if (!accommodationToChangeStatus) return;

        const newStatus = accommodationToChangeStatus.currentStatus === "Available" ? "unavailable" : "Available";

        setAllAccommodations(allAccommodations.map(prop =>
            prop._id === accommodationToChangeStatus._id ? {
                ...prop,
                status: newStatus,
                last_updated: new Date().toISOString(),
                ...(newStatus === "unavailable" ? { reject_reason: reason } : { reject_reason: null })
            } : prop
        ));

        alert(`Accommodation "${accommodationToChangeStatus.name}" has been ${newStatus === "Available" ? "activated" : "deactivated"}.`);

        setShowStatusPopup(false);
        setAccommodationToChangeStatus(null);
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            {/* Popups */}
            {showViewPopup && selectedAccommodation && (
                <ViewAccommodationPopup
                    accommodation={selectedAccommodation}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedAccommodation(null);
                    }}
                    isAdmin={true}
                />
            )}

            {/* Status Change Popup */}
            {showStatusPopup && accommodationToChangeStatus && (
                <StatusChangePopup
                    accommodation={accommodationToChangeStatus}
                    currentStatus={accommodationToChangeStatus.currentStatus}
                    onClose={() => {
                        setShowStatusPopup(false);
                        setAccommodationToChangeStatus(null);
                    }}
                    onConfirm={handleConfirmStatusChange}
                />
            )}

            {showRejectPopup && requestToReject && (
                <RejectPopup
                    request={requestToReject}
                    onClose={() => {
                        setShowRejectPopup(false);
                        setRequestToReject(null);
                    }}
                    onConfirm={handleConfirmReject}
                />
            )}

            <Heading
                title="Admin Accommodation Management"
                subtitle="Manage existing accommodations and review new accommodation submissions from owners."
                showButton={false}
            />

            <StatsCards stats={stats} />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "current" && (
                <AccommodationTable
                    accommodations={allAccommodations.filter(prop => prop.status === "Available" || prop.status === "Available")}
                    onView={handleViewAccommodation}
                    onDelete={handleDeleteAccommodation}
                    onToggleStatus={handleToggleAccommodationStatus}
                    isAdmin={true}
                />
            )}

            {activeTab === "requests" && (
                <AccommodationRequestsTable
                    accommodationRequests={accommodationRequests}
                    onViewRequest={handleViewAccommodation}
                    onApproveRequest={handleApproveRequest}
                    onRejectRequest={handleRejectRequest}
                />
            )}

            {activeTab === "inactive" && (
                <AccommodationTable
                    accommodations={allAccommodations.filter(prop => prop.status === "unavailable" || prop.status === "Rejected")}
                    onView={handleViewAccommodation}
                    onDelete={handleDeleteAccommodation}
                    onToggleStatus={handleToggleAccommodationStatus}
                    isAdmin={true}
                />
            )}
        </main>
    );
};

export default AdminAccommodation;