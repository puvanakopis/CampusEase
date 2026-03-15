import React, { useContext, useEffect } from "react";
import MyBookingsPage from "../../containers/user/account/MyBookingsPage";
import Sidebar from "../../components/user/Sidebar";
import { BookingContext } from "../../context/BookingContext";
import { AuthContext } from "../../context/AuthContext";
import { AccommodationContext } from "../../context/AccommodationContext";
import { VehicleContext } from "../../context/VehicleContext";

function MyBookings() {
    const { bookings, getUserBookings, updateBooking, loading } = useContext(BookingContext);
    const { currentUser, authLoading } = useContext(AuthContext);
    const { addAccommodationReview } = useContext(AccommodationContext);
    const { addVehicleReview } = useContext(VehicleContext);

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

    const handleReviewSubmit = async (booking, reviewData) => {
        try {
            if (booking.booking_type === "accommodation") {
                await addAccommodationReview(booking.accommodation._id, reviewData);
            } else if (booking.booking_type === "vehicle") {
                await addVehicleReview(booking.vehicle._id, reviewData);
            }
            await updateBooking(booking._id, { status: "completed" });
        } catch (err) {
            console.error("Failed to submit review and complete booking:", err);
            throw err;
        }
    };

    if (authLoading) {
        return (
            <div className="bg-[#f6f7f8] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 border-4 border-primary border-r-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-slate-500 mt-2">Loading... </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f6f7f8] min-h-screen">
            <div className="px-4 py-16 md:px-24 max-w-8xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">

                    <Sidebar />

                    <main className="flex-1">
                        <MyBookingsPage
                            bookings={bookings}
                            loading={loading}
                            onStatusUpdate={handleStatusUpdate}
                            onReviewSubmit={handleReviewSubmit}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default MyBookings;