import React, { useState, useContext, useEffect } from "react";
import Heading from "../../containers/owner/common/Heading";
import StatsCards from "../../containers/owner/common/StatsCards";
import AcceptPopup from "../../containers/owner/booking/AcceptPopup";
import BookingTabs from "../../containers/owner/common/Tabs";
import BookingTable from "../../containers/owner/booking/BookingTable";
import DeclinePopup from "../../containers/owner/booking/DeclinePopup";
import EditBookingPopup from "../../containers/owner/booking/EditBookingPopup";
import BookingPagination from "../../containers/owner/booking/Pagination";
import ViewDetailsPopup from "../../containers/owner/booking/ViewDetailsPopup";
import { BookingContext } from "../../context/BookingContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const OwnerBooking = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showAcceptPopup, setShowAcceptPopup] = useState(false);
    const [showDeclinePopup, setShowDeclinePopup] = useState(false);
    const [showViewDetailsPopup, setShowViewDetailsPopup] = useState(false);
    const [showEditBookingPopup, setShowEditBookingPopup] = useState(false);
    const [declineReason, setDeclineReason] = useState("");
    const [editedBooking, setEditedBooking] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { bookings, loading, updateBooking, getOwnerBookings, refreshBookings } = useContext(BookingContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser && currentUser.role === "owner") {
            getOwnerBookings(currentUser._id);
        }
    }, [currentUser, getOwnerBookings]);

    // Filter bookings by status
    const pendingBookings = bookings.filter(b => b.status === "pending");
    const activeBookings = bookings.filter(b => b.status === "confirmed");
    const completedBookings = bookings.filter(b => b.status === "completed");
    const canceledBookings = bookings.filter(b => b.status === "canceled");

    const tabs = [
        { id: "pending", label: "Pending Requests", count: pendingBookings.length },
        { id: "active", label: "Active Bookings", count: activeBookings.length },
        { id: "completed", label: "Completed Bookings", count: completedBookings.length },
        { id: "canceled", label: "Canceled Bookings", count: canceledBookings.length }
    ];

    const stats = [
        {
            label: "Pending Bookings",
            icon: "hourglass_bottom",
            value: pendingBookings.length.toString(),
            subtext: `${pendingBookings.filter(b => {
                const submittedDate = new Date(b.createdAt || b.created_at);
                const today = new Date();
                return submittedDate.toDateString() === today.toDateString();
            }).length} new today`,
            subtextColor: "text-orange-500",
            trendIcon: "trending_up"
        },
        {
            label: "Active Bookings",
            icon: "assignment_turned_in",
            value: activeBookings.length.toString(),
            subtext: "Currently ongoing",
            subtextColor: "text-green-600",
            trendIcon: "trending_flat"
        },
        {
            label: "Completed Bookings",
            icon: "check_circle",
            value: completedBookings.length.toString(),
            subtext: `${completedBookings.filter(b => {
                const completedDate = new Date(b.updatedAt || b.last_updated);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return completedDate >= weekAgo;
            }).length} completed this week`,
            subtextColor: "text-green-600",
            trendIcon: "trending_up"
        }
    ];

    const handleAccept = (booking) => {
        setSelectedBooking(booking);
        setShowAcceptPopup(true);
    };

    const handleDecline = (booking) => {
        setSelectedBooking(booking);
        setShowDeclinePopup(true);
    };

    const handleViewDetails = (booking) => {
        setSelectedBooking(booking);
        setShowViewDetailsPopup(true);
    };

    const handleEditBooking = (booking) => {
        setSelectedBooking(booking);
        setEditedBooking({ ...booking });
        setShowEditBookingPopup(true);
    };

    const confirmAccept = async () => {
        if (!selectedBooking) return;

        try {
            await updateBooking(selectedBooking._id || selectedBooking.id, {
                status: "confirmed",
                payment: {
                    ...selectedBooking.payment,
                    paid: true
                }
            });

            toast.success("Booking accepted successfully");
            setShowAcceptPopup(false);
            setSelectedBooking(null);
            await refreshBookings();
        } catch (error) {
            toast.error(error.message || "Failed to accept booking");
        }
    };

    const confirmDecline = async () => {
        if (!selectedBooking || !declineReason.trim()) {
            toast.error("Please provide a reason for declining");
            return;
        }

        try {
            await updateBooking(selectedBooking._id || selectedBooking.id, {
                status: "canceled",
                payment: {
                    ...selectedBooking.payment,
                    paid: false
                }
            });

            toast.success("Booking declined successfully");
            setShowDeclinePopup(false);
            setSelectedBooking(null);
            setDeclineReason("");
            await refreshBookings();
        } catch (error) {
            toast.error(error.message || "Failed to decline booking");
        }
    };

    const confirmEdit = async () => {
        if (!editedBooking) return;

        try {
            const updateData = {
                status: editedBooking.status,
                startDate: editedBooking.startDate || editedBooking.start_date,
                endDate: editedBooking.endDate || editedBooking.end_date,
                duration: editedBooking.duration,
                totalPrice: editedBooking.totalPrice || editedBooking.total_price,
                unitPrice: editedBooking.unitPrice || editedBooking.unit_price
            };

            await updateBooking(editedBooking._id || editedBooking.id, updateData);

            toast.success("Booking updated successfully");
            setShowEditBookingPopup(false);
            setSelectedBooking(null);
            setEditedBooking(null);
            await refreshBookings();
        } catch (error) {
            toast.error(error.message || "Failed to update booking");
        }
    };

    const getCurrentBookings = () => {
        let filteredBookings = [];
        switch (activeTab) {
            case "pending":
                filteredBookings = pendingBookings;
                break;
            case "active":
                filteredBookings = activeBookings;
                break;
            case "completed":
                filteredBookings = completedBookings;
                break;
            case "canceled":
                filteredBookings = canceledBookings;
                break;
            default:
                filteredBookings = pendingBookings;
        }

        // Pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredBookings.slice(startIndex, endIndex);
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: { class: "bg-yellow-100 text-yellow-800", text: "Pending" },
            confirmed: { class: "bg-green-100 text-green-800", text: "Confirmed" },
            completed: { class: "bg-blue-100 text-primary", text: "Completed" },
            canceled: { class: "bg-red-100 text-red-800", text: "Canceled" }
        };
        const badge = badges[status] || badges.pending;
        return <span className={`${badge.class} text-xs px-2 py-1 rounded-full`}>{badge.text}</span>;
    };

    const getPriorityBadge = (booking) => {
        // Calculate priority based on date or amount
        const amount = booking.totalPrice || booking.total_price;
        const startDate = booking.startDate || booking.start_date;
        const daysUntilStart = Math.ceil((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24));

        let priority = "Medium";
        let badgeClass = "bg-yellow-100 text-yellow-800";
        let icon = "remove";

        if (daysUntilStart <= 2 || amount > 50000) {
            priority = "High";
            badgeClass = "bg-red-100 text-red-800";
            icon = "priority_high";
        } else if (daysUntilStart > 7 && amount < 10000) {
            priority = "Low";
            badgeClass = "bg-green-100 text-green-800";
            icon = "low_priority";
        }

        return (
            <span className={`${badgeClass} text-xs px-2 py-1 rounded-full flex items-center gap-1`}>
                <span className="material-symbols-outlined text-xs">{icon}</span>
                {priority}
            </span>
        );
    };

    const getActionButtons = (booking) => {
        switch (booking.status) {
            case "pending":
                return (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleAccept(booking); }}
                            className="bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                        >
                            Accept
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleDecline(booking); }}
                            className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                        >
                            Decline
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleEditBooking(booking); }}
                            className="bg-green-600 hover:bg-green-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                        >
                            Edit
                        </button>
                    </div>
                );
            case "confirmed":
                return (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleViewDetails(booking); }}
                            className="bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                        >
                            View Details
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleEditBooking(booking); }}
                            className="border border-slate-200 hover:bg-slate-100 text-slate-600 text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                        >
                            Edit
                        </button>
                    </div>
                );
            case "completed":
            case "canceled":
                return (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleViewDetails(booking); }}
                            className="border border-slate-200 hover:bg-slate-100 text-slate-600 text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                        >
                            Details
                        </button>
                    </div>
                );
            default:
                return (
                    <button
                        onClick={(e) => { e.stopPropagation(); handleViewDetails(booking); }}
                        className="border border-slate-200 hover:bg-slate-100 text-slate-600 text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                    >
                        View Details
                    </button>
                );
        }
    };

    const totalPages = Math.ceil(
        (activeTab === "pending" ? pendingBookings.length :
         activeTab === "active" ? activeBookings.length :
         activeTab === "completed" ? completedBookings.length :
         canceledBookings.length) / itemsPerPage
    );

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto">
            {/* Popups */}
            {showAcceptPopup && (
                <AcceptPopup
                    selectedBooking={selectedBooking}
                    onClose={() => setShowAcceptPopup(false)}
                    onConfirm={confirmAccept}
                    getPriorityBadge={getPriorityBadge}
                />
            )}

            {showDeclinePopup && (
                <DeclinePopup
                    selectedBooking={selectedBooking}
                    declineReason={declineReason}
                    onDeclineReasonChange={setDeclineReason}
                    onClose={() => { setShowDeclinePopup(false); setDeclineReason(""); }}
                    onConfirm={confirmDecline}
                />
            )}

            {showViewDetailsPopup && (
                <ViewDetailsPopup
                    selectedBooking={selectedBooking}
                    onClose={() => setShowViewDetailsPopup(false)}
                    onEdit={() => { setShowViewDetailsPopup(false); handleEditBooking(selectedBooking); }}
                />
            )}

            {showEditBookingPopup && (
                <EditBookingPopup
                    editedBooking={editedBooking}
                    onEditedBookingChange={setEditedBooking}
                    onClose={() => setShowEditBookingPopup(false)}
                    onConfirm={confirmEdit}
                />
            )}

            <Heading
                title="Booking Management"
                subtitle="Review and manage all student service requests."
            />

            <StatsCards stats={stats} />

            <BookingTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={(tabId) => {
                    setActiveTab(tabId);
                    setCurrentPage(1);
                }}
            />

            <BookingTable
                bookings={getCurrentBookings()}
                // loading={loading}
                getStatusBadge={getStatusBadge}
                getPriorityBadge={getPriorityBadge}
                getActionButtons={getActionButtons}
            />

            <BookingPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={
                    activeTab === "pending" ? pendingBookings.length :
                    activeTab === "active" ? activeBookings.length :
                    activeTab === "completed" ? completedBookings.length :
                    canceledBookings.length
                }
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                itemName="bookings"
            />
        </main>
    );
};

export default OwnerBooking;