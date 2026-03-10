import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SecureCheckout from "../../containers/user/payment/SecureCheckout";
import PaymentSummary from "../../containers/user/payment/PaymentSummary";
import BookingSuccess from "../../containers/user/payment/BookingSuccess";
import { TempBookingContext } from "../../context/TempBookingContext";
import { BookingContext } from "../../context/BookingContext";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/user/Loading";
import { CURRENCY, PAYMENT } from "../../constants/constants"; 

const Payment = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [createdBooking, setCreatedBooking] = useState(null);
    const navigate = useNavigate();

    const { tempBooking, fetchTempBooking, loading: tempLoading } = useContext(TempBookingContext);
    const { createBooking } = useContext(BookingContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            fetchTempBooking();
        }
    }, [currentUser]);

    useEffect(() => {
        if (!tempLoading && !tempBooking && currentUser) {
            console.error("No active booking found. Please select a property first.");
            navigate("/");
        }
    }, [tempBooking, tempLoading, currentUser, navigate]);

    const handleConfirm = async (paymentData) => {
        if (!tempBooking) {
            console.error("No booking data found");
            return;
        }

        setProcessing(true);

        try {
            const bookingPayload = {
                booking_type: tempBooking.booking_type,
                resource_id: tempBooking.resource_id,
                owner_id: tempBooking.owner_id,
                user_id: tempBooking.user_id,
                unit_price: tempBooking.unit_price,
                start_date: tempBooking.start_date,
                end_date: tempBooking.end_date,
                duration: tempBooking.duration,
                total_price: tempBooking.total_price,
                status: "pending",
                payment: paymentData
            };

            const newBooking = await createBooking(bookingPayload);

            if (newBooking) {
                setCreatedBooking(newBooking);
                setShowSuccess(true);
            }
        } catch (error) {
            console.error("Payment confirmation error:", error);
        } finally {
            setProcessing(false);
        }
    };

    const handleCloseModal = () => {
        setShowSuccess(false);
        navigate("/");
    };

    if (tempLoading) {
        return <Loading mainText="Loading booking details..." subText="Please wait" />;
    }

    if (!tempBooking && !tempLoading) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-semibold text-gray-700">No Active Booking</h2>
                <p className="text-gray-500 mt-2">Please select a property to book first.</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
                >
                    Browse Properties
                </button>
            </div>
        );
    }



    return (
        <div className="bg-[#f6f7f8] min-h-screen px-4 py-10 md:px-24 max-w-8xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    Secure Checkout
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <SecureCheckout
                        tempBooking={tempBooking}
                        onConfirm={handleConfirm}
                        processing={processing}
                        currency={CURRENCY}        
                        paymentConstants={PAYMENT} 
                    />
                </div>

                <div className="lg:col-span-1">
                    <PaymentSummary
                        tempBooking={tempBooking}
                        onConfirm={handleConfirm}
                        processing={processing}
                        currency={CURRENCY}
                        paymentConstants={PAYMENT}
                    />
                </div>
            </div>

            {/* SUCCESS MODAL */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-lg shadow-lg relative">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-900">
                                    Booking Confirmed
                                </h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl">
                                        close
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 py-4">
                            <BookingSuccess
                                booking={createdBooking || tempBooking}
                                currency={CURRENCY}         
                                paymentConstants={PAYMENT}  
                            />
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;