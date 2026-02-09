import React from "react";

const BookingSuccess = () => {
    return (
        <div className="flex flex-col items-center text-center mb-12">

            {/* Success Icon */}
            <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-success text-6xl font-bold">
                    check_circle
                </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                Booking Confirmed!
            </h1>

            {/* Subtext */}
            <p className="text-slate-500 text-lg mb-8">
                Your reservation at Sabaragamuwa University is all set.
            </p>

            {/* Card */}
            <div className="flex flex-col bg-white w-full rounded-2xl p-6 border border-slate-100 shadow-sm items-center justify-between gap-6">

                {/* Reference */}
                <div className="text-center w-full">
                    <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">
                        Booking Reference
                    </p>
                    <p className="text-xl font-mono font-bold text-slate-900">
                        SUSL-7829-XQ
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex  gap-3 w-full md:w-auto">

                    <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-xl">download</span>
                        Download Receipt
                    </button>

                    <button className="px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                        Go to Dashboard
                    </button>
                </div>
            </div>

        </div>
    );
};

export default BookingSuccess;