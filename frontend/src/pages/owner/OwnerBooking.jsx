import React, { useState } from "react";
import StatsCards from "../../containers/owner/booking/StatsCards";
import OrderTable from "../../containers/owner/booking/BookingTable";
import OrderTabs from "../../containers/owner/booking/BookingTabs";
import Pagination from "../../containers/owner/booking/Pagination";
import AcceptPopup from "../../containers/owner/booking/AcceptPopup";
import DeclinePopup from "../../containers/owner/booking/DeclinePopup";
import ViewDetailsPopup from "../../containers/owner/booking/ViewDetailsPopup";
import ViewInvoicePopup from "../../containers/owner/booking/ViewInvoicePopup";
import EditOrderPopup from "../../containers/owner/booking/EditOrderPopup";

const OrderManagement = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showAcceptPopup, setShowAcceptPopup] = useState(false);
    const [showDeclinePopup, setShowDeclinePopup] = useState(false);
    const [showViewDetailsPopup, setShowViewDetailsPopup] = useState(false);
    const [showViewInvoicePopup, setShowViewInvoicePopup] = useState(false);
    const [showEditOrderPopup, setShowEditOrderPopup] = useState(false);
    const [declineReason, setDeclineReason] = useState("");
    const [editedOrder, setEditedOrder] = useState(null);

    const [pendingOrders, setPendingOrders] = useState([
        {
            id: "#ORD-8821",
            customer: {
                initials: "KM",
                name: "Kasun Madushanka",
                studentId: "19/AS/042",
                email: "kasun.m@example.com",
                phone: "+94 77 123 4567",
                faculty: "Applied Sciences",
                year: "3rd Year"
            },
            service: {
                icon: "apartment",
                type: "Accommodation",
                title: "Lakeside Villa - Single Room",
                details: "Pambahinna, Belihuloya",
                provider: "Lakeside Properties",
                providerContact: "+94 11 234 5678",
                amenities: ["WiFi", "Laundry", "24/7 Security", "Study Room"]
            },
            period: {
                main: "Aug 15 - Dec 15",
                sub: "1 Semester",
                startDate: "2024-08-15",
                endDate: "2024-12-15",
                duration: "4 months"
            },
            amount: "LKR 45,000",
            paymentStatus: "Paid",
            paymentMethod: "Bank Transfer",
            status: "pending",
            submitted: "2 hours ago",
            priority: "High"
        },
        {
            id: "#ORD-8819",
            customer: {
                initials: "SN",
                name: "S. Nirmala",
                studentId: "20/BS/015",
                email: "nirmala.s@example.com",
                phone: "+94 76 234 5678",
                faculty: "Biological Sciences",
                year: "2nd Year"
            },
            service: {
                icon: "directions_bus",
                type: "Transport",
                title: "Campus Shuttle - Monthly Pass",
                details: "Route A: Hostel to Uni",
                provider: "UniShuttle Services",
                providerContact: "+94 11 345 6789",
                amenities: ["AC Bus", "WiFi", "GPS Tracking", "Student Discount"]
            },
            period: {
                main: "Sept 01 - Sept 30",
                sub: "Daily 7:30 AM",
                startDate: "2024-09-01",
                endDate: "2024-09-30",
                duration: "1 month"
            },
            amount: "LKR 3,500",
            paymentStatus: "Pending",
            paymentMethod: "Credit Card",
            status: "pending",
            submitted: "4 hours ago",
            priority: "Medium"
        },
        {
            id: "#ORD-8815",
            customer: {
                initials: "RP",
                name: "Roshini Perera",
                studentId: "21/SS/112",
                email: "roshini.p@example.com",
                phone: "+94 71 345 6789",
                faculty: "Social Sciences",
                year: "1st Year"
            },
            service: {
                icon: "apartment",
                type: "Accommodation",
                title: "Greenwood Annexe",
                details: "Non-AC Double Room",
                provider: "Greenwood Hostels",
                providerContact: "+94 11 456 7890",
                amenities: ["Shared Kitchen", "Study Area", "Security", "Cleaning Service"]
            },
            period: {
                main: "Aug 20 - Nov 20",
                sub: "3 Months",
                startDate: "2024-08-20",
                endDate: "2024-11-20",
                duration: "3 months"
            },
            amount: "LKR 12,000",
            paymentStatus: "Paid",
            paymentMethod: "Online Banking",
            status: "pending",
            submitted: "1 day ago",
            priority: "Low"
        },
        {
            id: "#ORD-8813",
            customer: {
                initials: "DJ",
                name: "Dinesh Jayasuriya",
                studentId: "22/CS/078",
                email: "dinesh.j@example.com",
                phone: "+94 72 456 7890",
                faculty: "Computer Science",
                year: "1st Year"
            },
            service: {
                icon: "apartment",
                type: "Accommodation",
                title: "Hilltop Hostel - Triple",
                details: "Belihuloya Town",
                provider: "Hilltop Accommodation",
                providerContact: "+94 11 567 8901",
                amenities: ["WiFi", "Common Room", "Laundry", "24/7 Reception"]
            },
            period: {
                main: "Sep 01 - Jan 31",
                sub: "5 Months",
                startDate: "2024-09-01",
                endDate: "2025-01-31",
                duration: "5 months"
            },
            amount: "LKR 25,000",
            paymentStatus: "Partial",
            paymentMethod: "Cash",
            status: "pending",
            submitted: "2 days ago",
            priority: "Medium"
        }
    ]);

    const [activeOrders, setActiveOrders] = useState([
        {
            id: "#ORD-8805",
            customer: {
                initials: "AS",
                name: "Amal Silva",
                studentId: "19/ENG/045",
                email: "amal.s@example.com",
                phone: "+94 77 567 8901",
                faculty: "Engineering",
                year: "4th Year"
            },
            service: {
                icon: "apartment",
                type: "Accommodation",
                title: "University Hostel - Block B",
                details: "Single Room with AC",
                provider: "University Housing",
                providerContact: "+94 11 678 9012",
                amenities: ["AC", "Private Bathroom", "Study Desk", "Wardrobe"]
            },
            period: {
                main: "Jul 15 - Dec 15",
                sub: "5 Months",
                startDate: "2024-07-15",
                endDate: "2024-12-15",
                duration: "5 months"
            },
            amount: "LKR 40,000",
            paymentStatus: "Paid",
            paymentMethod: "Bank Transfer",
            status: "active",
            activatedDate: "2024-07-10",
            progress: 60,
            nextPayment: "2024-10-15",
            manager: "Mr. Perera"
        },
        {
            id: "#ORD-8798",
            customer: {
                initials: "NK",
                name: "Nadeesha Kumari",
                studentId: "20/MED/112",
                email: "nadeesha.k@example.com",
                phone: "+94 76 678 9012",
                faculty: "Medicine",
                year: "3rd Year"
            },
            service: {
                icon: "directions_bus",
                type: "Transport",
                title: "Student Bus Pass",
                details: "Route B: City to Campus",
                provider: "City Transit",
                providerContact: "+94 11 789 0123",
                amenities: ["Monthly Pass", "Student ID Required", "Route Flexibility"]
            },
            period: {
                main: "Aug 01 - Aug 31",
                sub: "Monthly",
                startDate: "2024-08-01",
                endDate: "2024-08-31",
                duration: "1 month"
            },
            amount: "LKR 4,500",
            paymentStatus: "Paid",
            paymentMethod: "Credit Card",
            status: "active",
            activatedDate: "2024-07-28",
            progress: 30,
            nextPayment: "2024-09-01",
            manager: "Ms. Fernando"
        }
    ]);

    const [completedOrders, setCompletedOrders] = useState([
        {
            id: "#ORD-8789",
            customer: {
                initials: "RS",
                name: "Ravi Sandaruwan",
                studentId: "18/CS/089",
                email: "ravi.s@example.com",
                phone: "+94 77 789 0123",
                faculty: "Computer Science",
                year: "Graduated"
            },
            service: {
                icon: "apartment",
                type: "Accommodation",
                title: "City Apartments",
                details: "Studio Apartment",
                provider: "City Living Ltd",
                providerContact: "+94 11 890 1234",
                amenities: ["Fully Furnished", "Kitchenette", "Parking", "Security"]
            },
            period: {
                main: "Jan 15 - Jun 15",
                sub: "Completed",
                startDate: "2024-01-15",
                endDate: "2024-06-15",
                duration: "5 months"
            },
            amount: "LKR 35,000",
            paymentStatus: "Paid",
            paymentMethod: "Online Banking",
            status: "completed",
            completionDate: "2024-06-15",
            rating: 4.5,
            feedback: "Excellent service, very responsive management.",
            invoiceNumber: "INV-2024-0879",
            invoiceDate: "2024-06-10",
            totalPaid: "LKR 175,000"
        },
        {
            id: "#ORD-8775",
            customer: {
                initials: "MP",
                name: "Malini Perera",
                studentId: "19/BUS/034",
                email: "malini.p@example.com",
                phone: "+94 76 890 1234",
                faculty: "Business",
                year: "4th Year"
            },
            service: {
                icon: "directions_bus",
                type: "Transport",
                title: "Semester Bus Pass",
                details: "Route C: Suburbs to Uni",
                provider: "Suburban Transport",
                providerContact: "+94 11 901 2345",
                amenities: ["Semester Pass", "Unlimited Rides", "Student Discount"]
            },
            period: {
                main: "Feb 01 - May 31",
                sub: "Completed",
                startDate: "2024-02-01",
                endDate: "2024-05-31",
                duration: "4 months"
            },
            amount: "LKR 15,000",
            paymentStatus: "Paid",
            paymentMethod: "Credit Card",
            status: "completed",
            completionDate: "2024-05-31",
            rating: 5.0,
            feedback: "Very convenient and reliable service.",
            invoiceNumber: "INV-2024-0755",
            invoiceDate: "2024-05-25",
            totalPaid: "LKR 60,000"
        }
    ]);

    const tabs = [
        { id: "pending", label: "Pending Requests", count: pendingOrders.length },
        { id: "active", label: "Active Orders", count: activeOrders.length },
        { id: "completed", label: "Completed Orders", count: completedOrders.length }
    ];

    const stats = [
        {
            label: "Pending Orders",
            icon: "hourglass_bottom",
            value: pendingOrders.length.toString(),
            subtext: `${pendingOrders.filter(o => o.submitted.includes('hour')).length} new today`,
            subtextColor: "text-orange-500",
            trendIcon: "trending_up"
        },
        {
            label: "Active Orders",
            icon: "assignment_turned_in",
            value: activeOrders.length.toString(),
            subtext: "Stable this week",
            subtextColor: "text-green-600",
            trendIcon: "trending_flat"
        },
        {
            label: "Completed Orders",
            icon: "check_circle",
            value: completedOrders.length.toString(),
            subtext: "2 completed this week",
            subtextColor: "text-green-600",
            trendIcon: "trending_up"
        }
    ];


    const handleAccept = (order) => {
        setSelectedOrder(order);
        setShowAcceptPopup(true);
    };

    const handleDecline = (order) => {
        setSelectedOrder(order);
        setShowDeclinePopup(true);
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowViewDetailsPopup(true);
    };

    const handleViewInvoice = (order) => {
        setSelectedOrder(order);
        setShowViewInvoicePopup(true);
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setEditedOrder({ ...order });
        setShowEditOrderPopup(true);
    };

    const confirmAccept = () => {
        if (!selectedOrder) return;

        const updatedPending = pendingOrders.filter(order => order.id !== selectedOrder.id);
        const acceptedOrder = {
            ...selectedOrder,
            status: "active",
            activatedDate: new Date().toISOString().split('T')[0],
            progress: 0,
            manager: "John Doe",
            nextPayment: calculateNextPayment(selectedOrder.period.startDate)
        };

        setPendingOrders(updatedPending);
        setActiveOrders([...activeOrders, acceptedOrder]);
        setShowAcceptPopup(false);
        setSelectedOrder(null);
    };

    const confirmDecline = () => {
        if (!selectedOrder || !declineReason.trim()) {
            alert("Please provide a reason for declining");
            return;
        }

        const updatedPending = pendingOrders.filter(order => order.id !== selectedOrder.id);
        const declinedOrder = {
            ...selectedOrder,
            status: "declined",
            declineReason: declineReason,
            declinedDate: new Date().toISOString().split('T')[0]
        };

        setPendingOrders(updatedPending);
        setCompletedOrders([...completedOrders, declinedOrder]);
        setShowDeclinePopup(false);
        setSelectedOrder(null);
        setDeclineReason("");
    };

    const confirmEdit = () => {
        if (!editedOrder) return;

        const updateOrders = (orders) =>
            orders.map(order => order.id === editedOrder.id ? editedOrder : order);

        if (editedOrder.status === "pending") {
            setPendingOrders(updateOrders(pendingOrders));
        } else if (editedOrder.status === "active") {
            setActiveOrders(updateOrders(activeOrders));
        } else {
            setCompletedOrders(updateOrders(completedOrders));
        }

        setShowEditOrderPopup(false);
        setSelectedOrder(null);
        setEditedOrder(null);
    };

    const calculateNextPayment = (startDate) => {
        const date = new Date(startDate);
        date.setMonth(date.getMonth() + 1);
        return date.toISOString().split('T')[0];
    };

    const getCurrentOrders = () => {
        switch (activeTab) {
            case "pending": return pendingOrders;
            case "active": return activeOrders;
            case "completed": return completedOrders;
            default: return pendingOrders;
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: { class: "bg-yellow-100 text-yellow-800", text: "Pending" },
            active: { class: "bg-green-100 text-green-800", text: "Active" },
            completed: { class: "bg-blue-100 text-blue-800", text: "Completed" },
            declined: { class: "bg-red-100 text-red-800", text: "Declined" }
        };
        const badge = badges[status] || badges.pending;
        return <span className={`${badge.class} text-xs px-2 py-1 rounded-full`}>{badge.text}</span>;
    };

    const getPriorityBadge = (priority) => {
        const badges = {
            High: { class: "bg-red-100 text-red-800", icon: "priority_high" },
            Medium: { class: "bg-yellow-100 text-yellow-800", icon: "remove" },
            Low: { class: "bg-green-100 text-green-800", icon: "low_priority" }
        };
        const badge = badges[priority] || badges.Medium;
        return (
            <span className={`${badge.class} text-xs px-2 py-1 rounded-full flex items-center gap-1`}>
                <span className="material-symbols-outlined text-xs">{badge.icon}</span>
                {priority}
            </span>
        );
    };

    const getActionButtons = (order) => {
        switch (order.status) {
            case "pending":
                return (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleAccept(order); }}
                            className="bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                        >
                            Accept
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleDecline(order); }}
                            className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                        >
                            Decline
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleEditOrder(order); }}
                            className="bg-green-600 hover:bg-green-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                        >
                            Edit
                        </button>
                    </div>
                );
            case "active":
                return (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleViewDetails(order); }}
                            className="bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                        >
                            View Details
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleEditOrder(order); }}
                            className="border border-slate-200 hover:bg-slate-100 text-slate-600 text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                        >
                            Edit
                        </button>
                    </div>
                );
            case "completed":
                return (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleViewInvoice(order); }}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                        >
                            View Invoice
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleViewDetails(order); }}
                            className="border border-slate-200 hover:bg-slate-100 text-slate-600 text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                        >
                            Details
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8 min-h-screen">
            {/* Popups */}
            {showAcceptPopup && (
                <AcceptPopup
                    selectedOrder={selectedOrder}
                    onClose={() => setShowAcceptPopup(false)}
                    onConfirm={confirmAccept}
                    getPriorityBadge={getPriorityBadge}
                />
            )}

            {showDeclinePopup && (
                <DeclinePopup
                    selectedOrder={selectedOrder}
                    declineReason={declineReason}
                    onDeclineReasonChange={setDeclineReason}
                    onClose={() => { setShowDeclinePopup(false); setDeclineReason(""); }}
                    onConfirm={confirmDecline}
                />
            )}

            {showViewDetailsPopup && (
                <ViewDetailsPopup
                    selectedOrder={selectedOrder}
                    onClose={() => setShowViewDetailsPopup(false)}
                    onEdit={() => { setShowViewDetailsPopup(false); handleEditOrder(selectedOrder); }}
                />
            )}

            {showViewInvoicePopup && (
                <ViewInvoicePopup
                    selectedOrder={selectedOrder}
                    onClose={() => setShowViewInvoicePopup(false)}
                />
            )}

            {showEditOrderPopup && (
                <EditOrderPopup
                    editedOrder={editedOrder}
                    onEditedOrderChange={setEditedOrder}
                    onClose={() => setShowEditOrderPopup(false)}
                    onConfirm={confirmEdit}
                />
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Order Management</h1>
                    <p className="text-slate-500 mt-1">Review and manage all student service requests.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <StatsCards stats={stats} />

            {/* Main Content */}
            <div className="flex-1">
                {/* Tabs */}
                <OrderTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                {/* Table */}
                <OrderTable
                    orders={getCurrentOrders()}
                    getStatusBadge={getStatusBadge}
                    getPriorityBadge={getPriorityBadge}
                    getActionButtons={getActionButtons}
                />

                {/* Pagination */}
                <Pagination
                    currentCount={getCurrentOrders().length}
                    totalCount={getCurrentOrders().length}
                />
            </div>
        </main>
    );
};

export default OrderManagement;