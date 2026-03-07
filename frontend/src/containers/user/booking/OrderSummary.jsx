import React from "react";
import PrimaryButton from '../../../components/common/PrimaryButton'
import useNavigateTo from "../../../hooks/useNavigateTo";

const OrderSummary = () => {
    const navigateTo = useNavigateTo();

    return (
        <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-base font-bold text-slate-900 mb-4">Order Summary</h3>

                <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Monthly Rent</span>
                        <span className="font-medium text-slate-900">LKR 8,500.00</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Security Deposit (Refundable)</span>
                        <span className="font-medium text-slate-900">LKR 10,000.00</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Service Fee</span>
                        <span className="font-medium text-slate-900">LKR 500.00</span>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-900">Total Amount</span>
                        <div className="text-right">
                            <span className="text-lg font-black text-primary">LKR 19,000.00</span>
                            <p className="text-[9px] text-slate-400 uppercase font-medium tracking-wider mt-0.5">Initial Payment</p>
                        </div>
                    </div>
                </div>

                <div className="bg-primary/5 p-3 rounded-lg mb-5">
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined text-primary text-base">verified</span>
                        <div>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-0.5">CampusEase Guarantee</p>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Your payment is held securely until you move in and verify the property.
                            </p>
                        </div>
                    </div>
                </div>

                <PrimaryButton
                    className="w-full py-3.5 flex items-center justify-center gap-2 group text-sm"
                    onClick={() => navigateTo("/payment")}
                >
                    Confirm and Pay
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                        arrow_forward
                    </span>
                </PrimaryButton>

                <p className="text-center text-[10px] text-slate-500 mt-3 leading-relaxed">
                    By clicking "Confirm and Pay" you agree to the{" "}
                    <a className="text-primary hover:underline font-medium" href="#">
                        Hostel Tenancy Agreement
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default OrderSummary;