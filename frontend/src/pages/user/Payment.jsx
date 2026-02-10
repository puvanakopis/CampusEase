import React, { useState } from 'react';
import SecureCheckout from '../../containers/user/payment/SecureCheckout';
import OrderSummary from '../../containers/user/payment/OrderSummary';
import BookingSuccess from '../../containers/user/payment/BookingSuccess';

const Payment = () => {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleConfirm = () => {
        setShowSuccess(true);
    };

    const handleCloseModal = () => {
        setShowSuccess(false);
    };

    return (
        <div className="bg-[#f6f7f8] pb-16 relative">
            <div className='px-4 pt-10 md:px-24 max-w-8xl mx-auto gap-6'>
                <h1 className="text-3xl font-bold text-slate-900 mb-6">
                    Secure Checkout
                </h1>
                <div className='grid grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto gap-6'>
                    <SecureCheckout />
                    <OrderSummary onConfirm={handleConfirm} />
                </div>
            </div>

            {/* Booking Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
                        >
                            ✕
                        </button>
                        <BookingSuccess />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;