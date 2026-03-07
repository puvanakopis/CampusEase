import React from "react";
import PrimaryButton from '../../../components/common/PrimaryButton';

const OrderSummary = ({ onConfirm }) => {
    return (
        <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-5">
                {/* Header */}
                <h3 className="text-base font-bold text-slate-900">Order Summary</h3>

                {/* Hostel Info */}
                <div className="flex gap-3 items-center">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                        <img
                            alt="Hostel"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_tkLtkH1vaYU_ReMiRCIarNLNs09ZENFSuSARKfD8Rf9z5qnO-Kh6fZlY-9w0G6F7yi_ukFlFTwS0a9Q8bhbSyNBBWXuc8i34Fy4XK7adDr1mlsOK9zL0n2y_PqjpQnC9GS4DVqNPJMu3v0uNtiOuJnkNXesTypBDeitAwq7tF1A_1AcEKK1lzm-hxqB0GunpGjBxEhRyBXOp50rHF741u2hy6dfY4wV15AADfdSxROYMM44XohjyjBuHGMQvXW9dHAbfZa-xUpM"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-sm font-bold text-slate-900">Riverview Annex</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Single Room - 1 Month</p>
                        <p className="text-primary text-xs font-medium mt-0.5 flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">location_on</span>
                            Belihuloya
                        </p>
                    </div>
                </div>

                {/* Fees */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Base Rent</span>
                        <span className="font-medium text-slate-900">LKR 18,000.00</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Service Fee (2.5%)</span>
                        <span className="font-medium text-slate-900">LKR 450.00</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Security Fee</span>
                        <span className="font-medium text-slate-900">LKR 50.00</span>
                    </div>
                </div>

                {/* Total */}
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-900">Total Amount</span>
                    <div className="text-right">
                        <span className="text-lg font-black text-primary">LKR 18,500</span>
                        <p className="text-[9px] text-slate-400 uppercase font-medium tracking-wider mt-0.5">
                            Includes all taxes
                        </p>
                    </div>
                </div>

                {/* Stay Info */}
                <div className="bg-primary/5 p-3 rounded-lg">
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined text-primary text-base">verified</span>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Stay Info</p>
                            <p className="text-xs text-slate-600">Stay From: 01 Oct 2023</p>
                            <p className="text-xs text-slate-600">Guest Type: SUSL Student</p>
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <PrimaryButton
                    onClick={onConfirm}
                    className="w-full py-3.5 flex items-center justify-center gap-2 group text-sm"
                >
                    Confirm and Pay
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                        arrow_forward
                    </span>
                </PrimaryButton>

                {/* Agreement Text */}
                <p className="text-center text-[10px] text-slate-500 leading-relaxed">
                    By clicking "Confirm and Pay" you agree to the{" "}
                    <a className="text-primary hover:underline font-medium">Hostel Tenancy Agreement</a>.
                </p>
            </div>
        </div>
    );
};

export default OrderSummary;