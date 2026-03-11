import React, { useState, useContext, useEffect } from "react";
import Heading from "../../containers/owner/common/Heading";
import StatsCards from "../../containers/owner/common/StatsCards";
import BookingTabs from "../../containers/owner/common/Tabs";
import BookingTable from "../../containers/owner/booking/BookingTable";
import AcceptPopup from "../../containers/owner/booking/AcceptPopup";
import DeclinePopup from "../../containers/owner/booking/DeclinePopup";
import EditBookingPopup from "../../containers/owner/booking/EditBookingPopup";
import ViewDetailsPopup from "../../containers/owner/booking/ViewDetailsPopup";
import Pagination from "../../components/common/Pagination";
import { OWNER_ITEMS_PER_PAGE } from "../../constants/pagination";
import { BookingContext } from "../../context/BookingContext";
import { AuthContext } from "../../context/AuthContext";

const OwnerBooking = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showAcceptPopup, setShowAcceptPopup] = useState(false);
    const [showDeclinePopup, setShowDeclinePopup] = useState(false);
    const [showViewDetailsPopup, setShowViewDetailsPopup] = useState(false);
    const [showEditBookingPopup, setShowEditBookingPopup] = useState(false);
    const [declineReason, setDeclineReason] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const { bookings, loading, updateBooking, getOwnerBookings } = useContext(BookingContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser && currentUser.role === "owner") {
            getOwnerBookings(currentUser._id);
        }
    }, [currentUser, getOwnerBookings]);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    // Filter bookings by status
    const pendingList = bookings.filter(b => b.status === "pending");
    const activeList = bookings.filter(b => b.status === "confirmed");
    const completedList = bookings.filter(b => b.status === "completed");
    const canceledList = bookings.filter(b => b.status === "canceled");

    const getCurrentList = () => {
        switch (activeTab) {
            case "pending": return pendingList;
            case "active": return activeList;
            case "completed": return completedList;
            case "canceled": return canceledList;
            default: return pendingList;
        }
    };

    const currentList = getCurrentList();
    const totalPages = Math.ceil(currentList.length / OWNER_ITEMS_PER_PAGE);

    const paginatedList = React.useMemo(() => {
        const startIndex = (currentPage - 1) * OWNER_ITEMS_PER_PAGE;
        const endIndex = startIndex + OWNER_ITEMS_PER_PAGE;
        return currentList.slice(startIndex, endIndex);
    }, [currentList, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const tabs = [
        { id: "pending", label: "Pending Requests", count: pendingList.length },
        { id: "active", label: "Active Bookings", count: activeList.length },
        { id: "completed", label: "Completed Bookings", count: completedList.length },
        { id: "canceled", label: "Canceled Bookings", count: canceledList.length }
    ];

    const stats = [
        {
            label: "Pending Bookings",
            icon: "hourglass_empty",
            value: pendingList.length,
            subtext: `${pendingList.filter(b => {
                const submittedDate = new Date(b.created_at || b.createdAt);
                const today = new Date();
                return submittedDate.toDateString() === today.toDateString();
            }).length} new today`,
            subtextColor: "text-orange-500",
            trendIcon: "trending_up"
        },
        {
            label: "Active Bookings",
            icon: "assignment_turned_in",
            value: activeList.length,
            subtext: "Currently ongoing",
            subtextColor: "text-green-600",
            trendIcon: "trending_flat"
        },
        {
            label: "Completed Bookings",
            icon: "check_circle",
            value: completedList.length,
            subtext: `${completedList.filter(b => {
                const completedDate = new Date(b.updated_at || b.updatedAt || b.last_updated);
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
        setShowEditBookingPopup(true);
    };

    const confirmAccept = async () => {
        if (!selectedBooking) return;
        try {
            await updateBooking(selectedBooking._id, {
                status: "confirmed",
                payment: {
                    ...selectedBooking.payment,
                    paid: true
                }
            });
            setShowAcceptPopup(false);
            setSelectedBooking(null);
        } catch (error) {
            console.error("Failed to accept booking:", error);
        }
    };

    const confirmDecline = async () => {
        if (!selectedBooking || !declineReason.trim()) return;
        try {
            await updateBooking(selectedBooking._id, {
                status: "canceled",
                payment: {
                    ...selectedBooking.payment,
                    paid: false
                }
            });
            setShowDeclinePopup(false);
            setSelectedBooking(null);
            setDeclineReason("");
        } catch (error) {
            console.error("Failed to decline booking:", error);
        }
    };

    const confirmEdit = async (updatedData) => {
        if (!selectedBooking) return;
        try {
            await updateBooking(selectedBooking._id, updatedData);
            setShowEditBookingPopup(false);
            setSelectedBooking(null);
        } catch (error) {
            console.error("Failed to update booking:", error);
        }
    };

    const getItemName = () => {
        switch (activeTab) {
            case "pending": return "pending bookings";
            case "active": return "active bookings";
            case "completed": return "completed bookings";
            case "canceled": return "canceled bookings";
            default: return "bookings";
        }
    };

    if (loading && bookings.length === 0) {
        // return <LoadingSpinner />;
    }

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto">
            {/* Popups */}
            {showAcceptPopup && selectedBooking && (
                <AcceptPopup
                    booking={selectedBooking}
                    onClose={() => {
                        setShowAcceptPopup(false);
                        setSelectedBooking(null);
                    }}
                    onConfirm={confirmAccept}
                />
            )}

            {showDeclinePopup && selectedBooking && (
                <DeclinePopup
                    booking={selectedBooking}
                    declineReason={declineReason}
                    onDeclineReasonChange={setDeclineReason}
                    onClose={() => {
                        setShowDeclinePopup(false);
                        setSelectedBooking(null);
                        setDeclineReason("");
                    }}
                    onConfirm={confirmDecline}
                />
            )}

            {showViewDetailsPopup && selectedBooking && (
                <ViewDetailsPopup
                    booking={selectedBooking}
                    onClose={() => {
                        setShowViewDetailsPopup(false);
                        setSelectedBooking(null);
                    }}
                    onEdit={() => {
                        setShowViewDetailsPopup(false);
                        setShowEditBookingPopup(true);
                    }}
                />
            )}

            {showEditBookingPopup && selectedBooking && (
                <EditBookingPopup
                    booking={selectedBooking}
                    onClose={() => {
                        setShowEditBookingPopup(false);
                        setSelectedBooking(null);
                    }}
                    onSave={confirmEdit}
                />
            )}

            {/* Header */}
            <Heading
                title="Booking Management"
                subtitle="Review and manage all student service requests."
            />

            {/* Stats */}
            <StatsCards stats={stats} />

            {/* Tabs */}
            <BookingTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            <BookingTable
                length={currentList.length}
                bookings={paginatedList}
                activeTab={activeTab}
                onView={handleViewDetails}
                onAccept={handleAccept}
                onDecline={handleDecline}
                onEdit={handleEditBooking}
            />

            {currentList.length > OWNER_ITEMS_PER_PAGE && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={currentList.length}
                    itemsPerPage={OWNER_ITEMS_PER_PAGE}
                    onPageChange={handlePageChange}
                    itemName={getItemName()}
                />
            )}
        </main>
    );
};

export default OwnerBooking;