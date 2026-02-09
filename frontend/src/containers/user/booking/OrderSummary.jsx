import React from "react";
import PrimaryButton from '../../../components/common/PrimaryButton'
import useNavigateTo from "../../../hooks/useNavigateTo";

const OrderSummary = () => {
    const navigateTo = useNavigateTo();

    return (
        <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-600">
                        <span>Monthly Rent</span>
                        <span className="font-medium text-slate-900">LKR 8,500.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Security Deposit (Refundable)</span>
                        <span className="font-medium text-slate-900">LKR 10,000.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Service Fee</span>
                        <span className="font-medium text-slate-900">LKR 500.00</span>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-lg font-bold">Total Amount</span>
                        <div className="text-right">
                            <span className="text-2xl font-black text-primary">LKR 19,000.00</span>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Initial Payment</p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl mb-6">
                    <div className="flex gap-3">
                        <span className="material-symbols-outlined text-primary">verified</span>
                        <div>
                            <p className="text-xs font-bold text-primary uppercase">CampusEase Guarantee</p>
                            <p className="text-xs text-slate-600">
                                Your payment is held securely until you move in and verify the property.
                            </p>
                        </div>
                    </div>
                </div>

                <PrimaryButton
                    className="w-full py-4 flex items-center justify-center gap-2 group"
                    onClick={() => navigateTo("/payment")}
                >
                    Confirm and Pay
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                        arrow_forward
                    </span>
                </PrimaryButton>


                <p className="text-center text-xs text-slate-500 mt-4">
                    By clicking "Confirm and Pay" you agree to the{" "}
                    <a className="text-primary hover:underline" href="#">
                        Hostel Tenancy Agreement
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default OrderSummary;