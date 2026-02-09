import React from "react";
import PrimaryButton from '../../../components/common/PrimaryButton';

const OrderSummary = () => {
    return (
        <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">

                {/* Header */}
                <h3 className="text-xl font-bold">Order Summary</h3>

                {/* Hostel Info */}
                <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            alt="Hostel"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_tkLtkH1vaYU_ReMiRCIarNLNs09ZENFSuSARKfD8Rf9z5qnO-Kh6fZlY-9w0G6F7yi_ukFlFTwS0a9Q8bhbSyNBBWXuc8i34Fy4XK7adDr1mlsOK9zL0n2y_PqjpQnC9GS4DVqNPJMu3v0uNtiOuJnkNXesTypBDeitAwq7tF1A_1AcEKK1lzm-hxqB0GunpGjBxEhRyBXOp50rHF741u2hy6dfY4wV15AADfdSxROYMM44XohjyjBuHGMQvXW9dHAbfZa-xUpM"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-bold text-slate-900">Riverview Annex</h4>
                        <p className="text-slate-500 text-sm mt-1">Single Room - 1 Month</p>
                        <p className="text-primary font-semibold text-sm mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">location_on</span>
                            Belihuloya
                        </p>
                    </div>
                </div>

                {/* Fees */}
                <div className="space-y-3">
                    <div className="flex justify-between text-slate-600">
                        <span>Base Rent</span>
                        <span className="font-medium text-slate-900">LKR 18,000.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Service Fee (2.5%)</span>
                        <span className="font-medium text-slate-900">LKR 450.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Security Fee</span>
                        <span className="font-medium text-slate-900">LKR 50.00</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>
                    <div className="text-right">
                        <span className="text-2xl font-black text-primary">LKR 18,500</span>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Includes all taxes</p>
                    </div>
                </div>

                {/* Stay Info */}
                <div className="bg-blue-50 p-4 rounded-xl mb-6">
                    <div className="flex gap-3">
                        <span className="material-symbols-outlined text-primary">verified</span>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-bold text-primary uppercase">Stay Info</p>
                            <p className="text-xs text-slate-600">
                                Stay From: 01 Oct 2023
                            </p>
                            <p className="text-xs text-slate-600">
                                Guest Type: SUSL Student
                            </p>
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <PrimaryButton className="w-full py-4 flex items-center justify-center gap-2 group">
                    Confirm and Pay
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                        arrow_forward
                    </span>
                </PrimaryButton>

                <p className="text-center text-xs text-slate-500 mt-4">
                    By clicking "Confirm and Pay" you agree to the{" "}
                    <a className="text-primary hover:underline">Hostel Tenancy Agreement</a>.
                </p>
            </div>
        </div>
    );
};

export default OrderSummary;