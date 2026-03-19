import React, { useState, useContext, useEffect, useMemo } from "react";
import Heading from "../../containers/admin/common/Heading";
import StatsCards from "../../containers/admin/common/StatsCards";
import Tabs from "../../containers/admin/common/Tabs";
import BookingTable from "../../containers/admin/booking/BookingTable";
import ViewBookingPopup from "../../containers/admin/booking/ViewBookingPopup";
import EditBookingPopup from "../../containers/admin/booking/EditBookingPopup";
import Pagination from "../../components/common/Pagination";
import { ADMIN_ITEMS_PER_PAGE } from "../../constants/pagination";
import { BookingContext } from "../../context/BookingContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdminBookingManagement = () => {
    const { bookings, loading, getAllBookings, updateBooking, deleteBooking } = useContext(BookingContext);
    const { currentUser } = useContext(AuthContext);

    const [availableTab, setAvailableTab] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);

    useEffect(() => {
        if (currentUser?.role === "admin") {
            getAllBookings();
        }
    }, [currentUser]);

    useEffect(() => {
        setCurrentPage(1);
    }, [availableTab]);

    // ------------------- FILTER BOOKINGS -------------------
    const allList = useMemo(() => bookings, [bookings]);
    const pendingList = useMemo(() => bookings.filter(b => b.status === "pending"), [bookings]);
    const confirmedList = useMemo(() => bookings.filter(b => b.status === "confirmed"), [bookings]);
    const availableList = useMemo(() => bookings.filter(b => b.status === "available"), [bookings]);
    const completedList = useMemo(() => bookings.filter(b => b.status === "completed"), [bookings]);
    const canceledList = useMemo(() => bookings.filter(b => b.status === "canceled"), [bookings]);

    const getCurrentList = () => {
        switch (availableTab) {
            case "pending": return pendingList;
            case "confirmed": return confirmedList;
            case "available": return availableList;
            case "completed": return completedList;
            case "canceled": return canceledList;
            default: return allList;
        }
    };

    const currentList = getCurrentList();
    const totalPages = Math.ceil(currentList.length / ADMIN_ITEMS_PER_PAGE);

    const paginatedList = useMemo(() => {
        const startIndex = (currentPage - 1) * ADMIN_ITEMS_PER_PAGE;
        const endIndex = startIndex + ADMIN_ITEMS_PER_PAGE;
        return currentList.slice(startIndex, endIndex);
    }, [currentList, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ------------------- TABS -------------------
    const tabs = [
        { id: "all", label: "All", count: allList.length },
        { id: "pending", label: "Pending", count: pendingList.length },
        { id: "confirmed", label: "Confirmed", count: confirmedList.length },
        { id: "available", label: "Available", count: availableList.length },
        { id: "completed", label: "Completed", count: completedList.length },
        { id: "canceled", label: "Canceled", count: canceledList.length },
    ];

    // ------------------- STATS -------------------
    const stats = [
        {
            label: "Total Bookings",
            icon: "receipt_long",
            value: allList.length,
            subtext: `${availableList.length} available, ${pendingList.length} pending`,
            subtextColor: "text-green-600",
        },
        {
            label: "Completed Bookings",
            icon: "check_circle",
            value: completedList.length,
            subtext: `${completedList.length} bookings completed`,
            subtextColor: "text-blue-500",
        },
        {
            label: "Pending Actions",
            icon: "hourglass_bottom",
            value: pendingList.length,
            subtext: `${pendingList.filter(b => {
                const created = new Date(b.created_at || b.createdAt);
                return created.toDateString() === new Date().toDateString();
            }).length} new today`,
            subtextColor: "text-orange-500",
        },
    ];

    // ------------------- ACTION HANDLERS -------------------
    const handleViewBooking = (booking) => {
        setSelectedBooking(booking);
        setShowViewPopup(true);
    };

    const handleEditBooking = (booking) => {
        setSelectedBooking(booking);
        setShowEditPopup(true);
    };

    const handleDeleteBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to delete this booking?")) return;
        try {
            await deleteBooking(bookingId);
            toast.success("Booking deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete booking");
        }
    };

    const handleConfirmEdit = async (updatedData) => {
        if (!selectedBooking) return;
        try {
            await updateBooking(selectedBooking._id, updatedData);
            toast.success("Booking updated successfully");
            setShowEditPopup(false);
            setSelectedBooking(null);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update booking");
        }
    };

    const getItemName = () => {
        switch (availableTab) {
            case "pending": return "pending bookings";
            case "confirmed": return "confirmed bookings";
            case "available": return "available bookings";
            case "completed": return "completed bookings";
            case "canceled": return "canceled bookings";
            default: return "bookings";
        }
    };

    if (loading && bookings.length === 0) {
        return (
            <main className="flex justify-center items-center min-h-screen bg-[#f6f7f8]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-slate-600">Loading bookings...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto">
            {/* Popups */}
            {showViewPopup && selectedBooking && (
                <ViewBookingPopup
                    booking={selectedBooking}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedBooking(null);
                    }}
                    onEdit={() => {
                        setShowViewPopup(false);
                        setShowEditPopup(true);
                    }}
                />
            )}

            {showEditPopup && selectedBooking && (
                <EditBookingPopup
                    booking={selectedBooking}
                    onClose={() => {
                        setShowEditPopup(false);
                        setSelectedBooking(null);
                    }}
                    onSave={handleConfirmEdit}
                />
            )}

            {/* Header */}
            <Heading
                title="Admin Booking Management"
                subtitle="Manage all bookings, review requests, and handle booking statuses."
            />

            {/* Stats */}
            <StatsCards stats={stats} />

            {/* Tabs */}
            <Tabs tabs={tabs} availableTab={availableTab} onTabChange={setAvailableTab} />

            {/* Booking Table */}
            <BookingTable
                length={currentList.length}
                bookings={paginatedList}
                availableTab={availableTab}
                onView={handleViewBooking}
                onEdit={handleEditBooking}
                onDelete={handleDeleteBooking}
            />

            {/* Pagination */}
            {currentList.length > ADMIN_ITEMS_PER_PAGE && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={currentList.length}
                    itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                    onPageChange={handlePageChange}
                    itemName={getItemName()}
                />
            )}
        </main>
    );
};

export default AdminBookingManagement;