import React from "react";

const BookingSuccess = () => {
    return (
        <div className="flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-green-600 text-5xl">
                    check_circle
                </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-slate-900 mb-1">
                Booking Confirmed!
            </h2>

            {/* Subtitle */}
            <p className="text-sm text-slate-500 mb-5">
                Your reservation at Sabaragamuwa University is all set.
            </p>

            {/* Booking Details Card */}
            <div className="w-full bg-white border border-slate-200 rounded-xl p-5 mb-5">
                <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wider font-medium text-slate-400 mb-1">
                        Booking Reference
                    </p>
                    <p className="text-base font-bold text-slate-900 font-mono">
                        SUSL-7829-XQ
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button className="flex-1 border border-slate-200 text-slate-700 py-2.5 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors text-xs flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">download</span>
                    Download Receipt
                </button>

                <button className="flex-1 bg-primary text-white py-2.5 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors text-xs flex items-center justify-center gap-1.5">
                    Go to Dashboard
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default BookingSuccess;