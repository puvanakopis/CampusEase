import React, { useContext, useEffect } from "react";
import MyBookingsPage from "../../containers/user/account/MyBookingsPage";
import Sidebar from "../../components/user/Sidebar";
import { BookingContext } from "../../context/BookingContext";
import { AuthContext } from "../../context/AuthContext";

function MyBookings() {

    const { bookings, getUserBookings, updateBooking } = useContext(BookingContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            getUserBookings(currentUser._id);
        }
    }, [currentUser]);

    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            await updateBooking(bookingId, { status: newStatus });
        } catch (err) {
            console.error("Failed to update booking status:", err);
        }
    };

    return (
        <div className="bg-[#f6f7f8]">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />

                <MyBookingsPage
                    bookings={bookings}
                    // loading={loading}
                    onStatusUpdate={handleStatusUpdate}
                />
            </div>
        </div>
    );
}

export default MyBookings;