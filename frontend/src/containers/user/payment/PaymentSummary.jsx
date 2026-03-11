import React from "react";
import { CURRENCY, PAYMENT } from "../../../constants/constants";

const PaymentSummary = ({ tempBooking }) => {
    if (!tempBooking) return null;

    const currency = CURRENCY;
    const serviceFee = tempBooking.total_price * PAYMENT.SERVICE_FEE_RATE;
    const securityFee = PAYMENT.SECURITY_FEE;
    const totalWithFees = tempBooking.total_price + serviceFee + securityFee;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const getPropertyName = () => {
        return tempBooking.booking_type === "accommodation"
            ? "Accommodation Booking"
            : "Vehicle Booking";
    };

    const getDetailText = () => {
        if (tempBooking.booking_type === "accommodation") {
            return `${tempBooking.duration} month${tempBooking.duration > 1 ? 's' : ''}`;
        } else {
            return `${tempBooking.duration} day${tempBooking.duration > 1 ? 's' : ''}`;
        }
    };

    return (
        <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-5">
                {/* Header */}
                <h3 className="text-base font-bold text-slate-900">Order Summary</h3>

                {/* Property Info */}
                <div className="flex gap-3 items-center">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200 bg-slate-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400 text-3xl">
                            {tempBooking.booking_type === "accommodation" ? "home" : "directions_car"}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-sm font-bold text-slate-900">{getPropertyName()}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{getDetailText()} </p>
                    </div>
                </div>

                {/* Date Range */}
                <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="grid grid-cols-2 gap-2 text-center">
                        <div>
                            <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">From</p>
                            <p className="text-xs font-medium text-slate-800">{formatDate(tempBooking.start_date)}</p>
                        </div>
                        <div>
                            <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">To</p>
                            <p className="text-xs font-medium text-slate-800">{formatDate(tempBooking.end_date)}</p>
                        </div>
                    </div>
                </div>

                {/* Fees */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Base Price</span>
                        <span className="font-medium text-slate-900">
                            {currency} {tempBooking.total_price.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Service Fee ({PAYMENT.SERVICE_FEE_RATE * 100}%)</span>
                        <span className="font-medium text-slate-900">
                            {currency} {serviceFee.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Security Fee</span>
                        <span className="font-medium text-slate-900">
                            {currency} {securityFee.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Total */}
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-900">Total Amount</span>
                    <div className="text-right">
                        <span className="text-lg font-black text-primary">
                            {currency} {totalWithFees.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                        <p className="text-[9px] text-slate-400 uppercase font-medium tracking-wider mt-0.5">
                            Includes all taxes
                        </p>
                    </div>
                </div>

                {/* Stay/Booking Info */}
                <div className="bg-primary/5 p-3 rounded-lg">
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined text-primary text-base">verified</span>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-wider">
                                {tempBooking.booking_type === "accommodation" ? "Stay Info" : "Booking Info"}
                            </p>
                            <p className="text-xs text-slate-600">
                                Duration: {tempBooking.duration} {tempBooking.booking_type === "accommodation" ? "month(s)" : "day(s)"}
                            </p>
                            <p className="text-xs text-slate-600">
                                Guest Type: {tempBooking.user_id ? "SUSL Student" : "Guest"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Agreement Text */}
                <p className="text-center text-[10px] text-slate-500 leading-relaxed">
                    By clicking "Confirm and Pay" you agree to the{" "}
                    <a className="text-primary hover:underline font-medium">
                        {tempBooking.booking_type === "accommodation" ? "Tenancy Agreement" : "Rental Terms"}
                    </a>.
                </p>
            </div>
        </div>
    );
};

export default PaymentSummary;