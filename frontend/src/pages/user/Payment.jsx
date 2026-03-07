import React, { useState } from "react";
import SecureCheckout from "../../containers/user/payment/SecureCheckout";
import OrderSummary from "../../containers/user/payment/OrderSummary";
import BookingSuccess from "../../containers/user/payment/BookingSuccess";

const Payment = () => {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleConfirm = () => {
        setShowSuccess(true);
    };

    const handleCloseModal = () => {
        setShowSuccess(false);
    };

    return (
        <div className="bg-[#f6f7f8] min-h-screen px-4 py-10 md:px-24 max-w-8xl mx-auto">

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    Secure Checkout
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2">
                    <SecureCheckout />
                </div>

                <div className="lg:col-span-1">
                    <OrderSummary onConfirm={handleConfirm} />
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
                            <BookingSuccess />
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