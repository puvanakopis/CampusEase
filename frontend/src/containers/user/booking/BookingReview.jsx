import React from "react";

const BookingReview = () => {
    return (
        <div className="lg:col-span-2 space-y-8">
            {/* Review Section */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm">
                <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden">
                    <img
                        alt="Green View Bodim"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_tkLtkH1vaYU_ReMiRCIarNLNs09ZENFSuSARKfD8Rf9z5qnO-Kh6fZlY-9w0G6F7yi_ukFlFTwS0a9Q8bhbSyNBBWXuc8i34Fy4XK7adDr1mlsOK9zL0n2y_PqjpQnC9GS4DVqNPJMu3v0uNtiOuJnkNXesTypBDeitAwq7tF1A_1AcEKK1lzm-hxqB0GunpGjBxEhRyBXOp50rHF741u2hy6dfY4wV15AADfdSxROYMM44XohjyjBuHGMQvXW9dHAbfZa-xUpM"
                    />
                </div>
                <div className="p-6 flex-1">
                    <div className="flex flex-col gap-1 mb-4">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">
                            Shared Annex
                        </span>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Green View Bodim
                        </h2>
                        <p className="text-slate-500 text-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">
                                location_on
                            </span>
                            50m to SUSL Main Gate, Pambahinna
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <span className="material-symbols-outlined text-primary">bed</span>
                            Single Bed
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <span className="material-symbols-outlined text-primary">wifi</span>
                            Free WiFi
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <span className="material-symbols-outlined text-primary">
                                shower
                            </span>
                            Attached Bath
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Your Stay */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">
                                calendar_today
                            </span>
                            Your Stay
                        </h3>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">
                                    Check-in Date
                                </label>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-medium">
                                    October 15, 2023
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">
                                    Academic Semester
                                </label>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-medium">
                                    Semester 1 - 2023/2024
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Guest Information */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">person</span>
                            Guest Information
                        </h3>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">
                                    Full Name
                                </label>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-medium">
                                    Ravindu Perera
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">
                                    SUSL Index Number
                                </label>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-medium">
                                    SUSL/AS/2021/104
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Things to keep in mind */}
                <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-lg font-bold mb-4">Things to keep in mind</h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex gap-2">
                            <span className="material-symbols-outlined text-green-500 text-lg">
                                check_circle
                            </span>
                            <span>Electricity and water bills are included in the monthly rent.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="material-symbols-outlined text-green-500 text-lg">
                                check_circle
                            </span>
                            <span>Security deposit is fully refundable at the end of the stay.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="material-symbols-outlined text-orange-400 text-lg">info</span>
                            <span>Visitors are allowed until 8:00 PM with prior notice to the landlord.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BookingReview;