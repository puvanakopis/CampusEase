import React, { useState } from "react";
import Heading from "../../containers/admin/Heading";
import StatsCards from "../../containers/admin/StatsCards";
import Tabs from "../../containers/admin/booking/Tabs";
import BookingTable from "../../containers/admin/booking/BookingTable";
import ViewBookingPopup from "../../containers/admin/booking/ViewBookingPopup";
import StatusChangePopup from "../../containers/admin/booking/StatusChangePopup";
import EditBookingPopup from "../../containers/admin/booking/EditBookingPopup";

const AdminBookingManagement = () => {
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [bookingToChangeStatus, setBookingToChangeStatus] = useState(null);
    const [showEditBooking, setShowEditBooking] = useState(false);
    const [bookingToEdit, setBookingToEdit] = useState(null);

    const [allBookings, setAllBookings] = useState([
        {
            id: "ORD-001",
            bookingNumber: "#ORD-8821",
            customer: {
                name: "Kasun Madushanka",
                studentId: "19/AS/042",
                email: "kasun.m@example.com",
                phone: "+94 77 123 4567",
                faculty: "Applied Sciences",
                year: "3rd Year",
                profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            owner: {
                name: "John Properties Ltd",
                email: "john@properties.com",
                phone: "+94 11 234 5678",
                rating: 4.2
            },
            service: {
                type: "Accommodation",
                title: "Lakeside Villa - Single Room",
                details: "Pambahinna, Belihuloya",
                category: "Hostel",
                amenities: ["WiFi", "Laundry", "24/7 Security", "Study Room"]
            },
            period: {
                main: "Aug 15 - Dec 15",
                sub: "1 Semester",
                startDate: "2024-08-15",
                endDate: "2024-12-15",
                duration: "4 months"
            },
            amount: 45000,
            totalAmount: "LKR 180,000",
            paymentStatus: "Paid",
            paymentMethod: "Bank Transfer",
            bookingStatus: "Confirmed",
            submitted: "2024-08-01 14:30",
            priority: "High",
            commission: 2250,
            studentDocuments: {
                studentIdVerified: true,
                nicVerified: true,
                addressVerified: true
            },
            notes: "Student requires early check-in"
        },
        {
            id: "ORD-002",
            bookingNumber: "#ORD-8819",
            customer: {
                name: "S. Nirmala",
                studentId: "20/BS/015",
                email: "nirmala.s@example.com",
                phone: "+94 76 234 5678",
                faculty: "Biological Sciences",
                year: "2nd Year",
                profileImage: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            owner: {
                name: "UniShuttle Services",
                email: "info@unishuttle.com",
                phone: "+94 11 345 6789",
                rating: 4.5
            },
            service: {
                type: "Transport",
                title: "Campus Shuttle - Monthly Pass",
                details: "Route A: Hostel to Uni",
                category: "Transport",
                amenities: ["AC Bus", "WiFi", "GPS Tracking", "Student Discount"]
            },
            period: {
                main: "Sept 01 - Sept 30",
                sub: "Daily 7:30 AM",
                startDate: "2024-09-01",
                endDate: "2024-09-30",
                duration: "1 month"
            },
            amount: 3500,
            totalAmount: "LKR 3,500",
            paymentStatus: "Pending",
            paymentMethod: "Credit Card",
            bookingStatus: "Pending",
            submitted: "2024-08-02 09:15",
            priority: "Medium",
            commission: 175,
            studentDocuments: {
                studentIdVerified: true,
                nicVerified: true,
                addressVerified: false
            },
            notes: "Payment verification required"
        },
        {
            id: "ORD-003",
            bookingNumber: "#ORD-8815",
            customer: {
                name: "Roshini Perera",
                studentId: "21/SS/112",
                email: "roshini.p@example.com",
                phone: "+94 71 345 6789",
                faculty: "Social Sciences",
                year: "1st Year",
                profileImage: "https://randomuser.me/api/portraits/women/33.jpg"
            },
            owner: {
                name: "Greenwood Hostels",
                email: "contact@greenwood.com",
                phone: "+94 11 456 7890",
                rating: 4.0
            },
            service: {
                type: "Accommodation",
                title: "Greenwood Annexe",
                details: "Non-AC Double Room",
                category: "Hostel",
                amenities: ["Shared Kitchen", "Study Area", "Security", "Cleaning Service"]
            },
            period: {
                main: "Aug 20 - Nov 20",
                sub: "3 Months",
                startDate: "2024-08-20",
                endDate: "2024-11-20",
                duration: "3 months"
            },
            amount: 12000,
            totalAmount: "LKR 36,000",
            paymentStatus: "Paid",
            paymentMethod: "Online Banking",
            bookingStatus: "Active",
            submitted: "2024-07-25 11:45",
            priority: "Low",
            commission: 1800,
            studentDocuments: {
                studentIdVerified: true,
                nicVerified: true,
                addressVerified: true
            },
            progress: 40,
            nextPayment: "2024-09-20",
            manager: "Mr. Perera"
        },
        {
            id: "ORD-004",
            bookingNumber: "#ORD-8813",
            customer: {
                name: "Dinesh Jayasuriya",
                studentId: "22/CS/078",
                email: "dinesh.j@example.com",
                phone: "+94 72 456 7890",
                faculty: "Computer Science",
                year: "1st Year",
                profileImage: "https://randomuser.me/api/portraits/men/55.jpg"
            },
            owner: {
                name: "Hilltop Accommodation",
                email: "hilltop@accommodation.com",
                phone: "+94 11 567 8901",
                rating: 3.8
            },
            service: {
                type: "Accommodation",
                title: "Hilltop Hostel - Triple",
                details: "Belihuloya Town",
                category: "Hostel",
                amenities: ["WiFi", "Common Room", "Laundry", "24/7 Reception"]
            },
            period: {
                main: "Sep 01 - Jan 31",
                sub: "5 Months",
                startDate: "2024-09-01",
                endDate: "2025-01-31",
                duration: "5 months"
            },
            amount: 25000,
            totalAmount: "LKR 125,000",
            paymentStatus: "Partial",
            paymentMethod: "Cash",
            bookingStatus: "Cancelled",
            submitted: "2024-07-20 16:20",
            priority: "Medium",
            commission: 6250,
            studentDocuments: {
                studentIdVerified: true,
                nicVerified: true,
                addressVerified: false
            },
            cancellationReason: "Student found alternative accommodation"
        },
        {
            id: "ORD-005",
            bookingNumber: "#ORD-8805",
            customer: {
                name: "Amal Silva",
                studentId: "19/ENG/045",
                email: "amal.s@example.com",
                phone: "+94 77 567 8901",
                faculty: "Engineering",
                year: "4th Year",
                profileImage: "https://randomuser.me/api/portraits/men/67.jpg"
            },
            owner: {
                name: "University Housing",
                email: "housing@university.edu",
                phone: "+94 11 678 9012",
                rating: 4.7
            },
            service: {
                type: "Accommodation",
                title: "University Hostel - Block B",
                details: "Single Room with AC",
                category: "Hostel",
                amenities: ["AC", "Private Bathroom", "Study Desk", "Wardrobe"]
            },
            period: {
                main: "Jul 15 - Dec 15",
                sub: "5 Months",
                startDate: "2024-07-15",
                endDate: "2024-12-15",
                duration: "5 months"
            },
            amount: 40000,
            totalAmount: "LKR 200,000",
            paymentStatus: "Paid",
            paymentMethod: "Bank Transfer",
            bookingStatus: "Completed",
            submitted: "2024-06-10 08:10",
            priority: "High",
            commission: 10000,
            studentDocuments: {
                studentIdVerified: true,
                nicVerified: true,
                addressVerified: true
            },
            completionDate: "2024-12-15",
            rating: 4.5,
            feedback: "Excellent service, very responsive management."
        },
        {
            id: "ORD-006",
            bookingNumber: "#ORD-8798",
            customer: {
                name: "Nadeesha Kumari",
                studentId: "20/MED/112",
                email: "nadeesha.k@example.com",
                phone: "+94 76 678 9012",
                faculty: "Medicine",
                year: "3rd Year",
                profileImage: "https://randomuser.me/api/portraits/women/28.jpg"
            },
            owner: {
                name: "City Transit",
                email: "transit@city.com",
                phone: "+94 11 789 0123",
                rating: 4.3
            },
            service: {
                type: "Transport",
                title: "Student Bus Pass",
                details: "Route B: City to Campus",
                category: "Transport",
                amenities: ["Monthly Pass", "Student ID Required", "Route Flexibility"]
            },
            period: {
                main: "Aug 01 - Aug 31",
                sub: "Monthly",
                startDate: "2024-08-01",
                endDate: "2024-08-31",
                duration: "1 month"
            },
            amount: 4500,
            totalAmount: "LKR 4,500",
            paymentStatus: "Paid",
            paymentMethod: "Credit Card",
            bookingStatus: "Active",
            submitted: "2024-07-28 19:30",
            priority: "Medium",
            commission: 225,
            studentDocuments: {
                studentIdVerified: true,
                nicVerified: true,
                addressVerified: true
            },
            progress: 30,
            nextPayment: "2024-09-01",
            manager: "Ms. Fernando"
        }
    ]);

    const tabs = [
        { id: "all", label: "All Bookings", count: allBookings.length },
        { id: "pending", label: "Pending", count: allBookings.filter(b => b.bookingStatus === "Pending").length },
        { id: "confirmed", label: "Confirmed", count: allBookings.filter(b => b.bookingStatus === "Confirmed").length },
        { id: "active", label: "Active", count: allBookings.filter(b => b.bookingStatus === "Active").length },
        { id: "completed", label: "Completed", count: allBookings.filter(b => b.bookingStatus === "Completed").length },
        { id: "cancelled", label: "Cancelled", count: allBookings.filter(b => b.bookingStatus === "Cancelled").length }
    ];

    const stats = [
        {
            label: "Total Bookings",
            icon: "receipt_long",
            value: allBookings.length,
            subtext: `${allBookings.filter(b => b.bookingStatus === "Active").length} active`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Total Revenue",
            icon: "payments",
            value: `LKR ${allBookings.reduce((sum, booking) => sum + booking.amount, 0).toLocaleString()}`,
            subtext: `${allBookings.reduce((sum, booking) => sum + booking.commission, 0).toLocaleString()} commission`,
            subtextColor: "text-blue-500"
        },
        {
            label: "Pending Actions",
            icon: "hourglass_bottom",
            value: allBookings.filter(b => b.bookingStatus === "Pending").length,
            subtext: `${allBookings.filter(b => b.paymentStatus === "Pending").length} pending payments`,
            subtextColor: "text-orange-500"
        }
    ];

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking);
        setShowViewPopup(true);
    };

    const handleDeleteBooking = (bookingId) => {
        if (window.confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
            setAllBookings(allBookings.filter(booking => booking.id !== bookingId));
        }
    };

    const handleEditBooking = (booking) => {
        setBookingToEdit(booking);
        setShowEditBooking(true);
    };

    const handleUpdateBooking = (updatedBooking) => {
        setAllBookings(allBookings.map(booking =>
            booking.id === updatedBooking.id ? updatedBooking : booking
        ));
        setShowEditBooking(false);
        setBookingToEdit(null);
        alert("Booking updated successfully!");
    };

    const handleToggleBookingStatus = (bookingId, currentStatus) => {
        const booking = allBookings.find(b => b.id === bookingId);
        if (!booking) return;

        setBookingToChangeStatus({ ...booking, currentStatus });
        setShowStatusPopup(true);
    };

    const handleConfirmStatusChange = async (reason) => {
        if (!bookingToChangeStatus) return;

        const statusOptions = ["Pending", "Confirmed", "Active", "Completed", "Cancelled"];
        const currentIndex = statusOptions.indexOf(bookingToChangeStatus.currentStatus);
        const newStatus = statusOptions[(currentIndex + 1) % statusOptions.length];

        setAllBookings(allBookings.map(booking =>
            booking.id === bookingToChangeStatus.id ? {
                ...booking,
                bookingStatus: newStatus,
                ...(newStatus === "Cancelled" ? { cancellationReason: reason } : {}),
                ...(newStatus === "Active" ? {
                    progress: 0,
                    activatedDate: new Date().toISOString().split('T')[0],
                    manager: "Admin"
                } : {}),
                ...(newStatus === "Completed" ? {
                    completionDate: new Date().toISOString().split('T')[0]
                } : {})
            } : booking
        ));

        alert(`Booking "${bookingToChangeStatus.bookingNumber}" status changed to ${newStatus}.`);

        setShowStatusPopup(false);
        setBookingToChangeStatus(null);
    };

    const getFilteredBookings = () => {
        switch (activeTab) {
            case "pending":
                return allBookings.filter(booking => booking.bookingStatus === "Pending");
            case "confirmed":
                return allBookings.filter(booking => booking.bookingStatus === "Confirmed");
            case "active":
                return allBookings.filter(booking => booking.bookingStatus === "Active");
            case "completed":
                return allBookings.filter(booking => booking.bookingStatus === "Completed");
            case "cancelled":
                return allBookings.filter(booking => booking.bookingStatus === "Cancelled");
            default:
                return allBookings;
        }
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            {/* Popups */}
            {showViewPopup && selectedBooking && (
                <ViewBookingPopup
                    booking={selectedBooking}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedBooking(null);
                    }}
                />
            )}

            {showStatusPopup && bookingToChangeStatus && (
                <StatusChangePopup
                    booking={bookingToChangeStatus}
                    currentStatus={bookingToChangeStatus.currentStatus}
                    onClose={() => {
                        setShowStatusPopup(false);
                        setBookingToChangeStatus(null);
                    }}
                    onConfirm={handleConfirmStatusChange}
                />
            )}

            {showEditBooking && bookingToEdit && (
                <EditBookingPopup
                    booking={bookingToEdit}
                    onClose={() => {
                        setShowEditBooking(false);
                        setBookingToEdit(null);
                    }}
                    onUpdate={handleUpdateBooking}
                />
            )}

            <Heading
                title="Booking Management"
                subtitle="Manage all bookings, review requests, and handle booking statuses."
            />

            <StatsCards stats={stats} />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <BookingTable
                bookings={getFilteredBookings()}
                onView={handleViewBooking}
                onEdit={handleEditBooking}
                onDelete={handleDeleteBooking}
                onToggleStatus={handleToggleBookingStatus}
            />
        </main>
    );
};

export default AdminBookingManagement;