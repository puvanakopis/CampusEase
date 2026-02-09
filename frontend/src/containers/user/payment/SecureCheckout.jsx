import React, { useState } from "react";

const SecureCheckout = () => {
    const [paymentType, setPaymentType] = useState("card");

    return (
        <div className="lg:col-span-2 space-y-8">
            {/* Payment Method Section */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        account_balance_wallet
                    </span>
                    Select Payment Method
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Credit/Debit Card */}
                    <div className="relative">
                        <input
                            checked={paymentType === "card"}
                            className="hidden peer"
                            id="card"
                            name="payment_type"
                            type="radio"
                            onChange={() => setPaymentType("card")}
                        />
                        <label
                            htmlFor="card"
                            className="flex flex-col items-center justify-center p-4 border-2 border-slate-100 rounded-xl cursor-pointer hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 transition-all h-full"
                        >
                            <span className="material-symbols-outlined text-3xl mb-2">
                                credit_card
                            </span>
                            <span className="font-bold text-sm">Credit/Debit Card</span>
                            <div className="flex gap-1 mt-2">
                                <div className="w-6 h-4 bg-slate-200 rounded-sm"></div>
                                <div className="w-6 h-4 bg-slate-300 rounded-sm"></div>
                            </div>
                        </label>
                    </div>

                    {/* Payment on Hand */}
                    <div className="relative">
                        <input
                            checked={paymentType === "cash"}
                            className="hidden peer"
                            id="cash"
                            name="payment_type"
                            type="radio"
                            onChange={() => setPaymentType("cash")}
                        />
                        <label
                            htmlFor="cash"
                            className="flex flex-col items-center justify-center p-4 border-2 border-slate-100 rounded-xl cursor-pointer hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 transition-all h-full"
                        >
                            <span className="material-symbols-outlined text-3xl mb-2">
                                paid
                            </span>
                            <span className="font-bold text-sm">Payment on Hand</span>
                            <span className="text-[10px] text-slate-500 mt-1 uppercase">
                                Pay at University
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Card Details Section (only show if card is selected) */}
            {paymentType === "card" && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold">Card Details</h3>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-500 text-sm">
                                lock
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Secure TLS Encryption
                            </span>
                        </div>
                    </div>

                    <form className="space-y-6">
                        {/* Cardholder Name */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">
                                Cardholder Name
                            </label>
                            <input
                                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary text-sm p-3"
                                placeholder="As printed on card"
                                type="text"
                            />
                        </div>

                        {/* Card Number */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">
                                Card Number
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary text-sm pr-12 p-3"
                                    placeholder="0000 0000 0000 0000"
                                    type="text"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                    <span className="material-symbols-outlined text-slate-400">
                                        credit_card
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Expiry Date & CVV */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">
                                    Expiry Date
                                </label>
                                <input
                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary text-sm p-3"
                                    placeholder="MM / YY"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">
                                    CVV
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full h-12 bg-slate-50 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary text-sm p-3"
                                        placeholder="***"
                                        type="password"
                                    />
                                    <span
                                        className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-help"
                                        title="3-digit security code on the back of your card"
                                    >
                                        help
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Save Card Checkbox */}
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                                id="save_card"
                                type="checkbox"
                            />
                            <label className="text-sm text-slate-600" htmlFor="save_card">
                                Save this card for future SUSL bookings
                            </label>
                        </div>

                        {/* Pay Button */}
                        <button
                            className="w-full h-14 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-4"
                            type="submit"
                        >
                            <span className="material-symbols-outlined">verified</span>
                            Pay LKR 18,500.00
                        </button>
                    </form>

                    {/* Security Info */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex items-center gap-2 opacity-60">
                            <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
                                    Verified Provider
                                </span>
                                <span className="text-[11px] font-medium">Sabaragamuwa Univ.</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-60">
                            <span className="material-symbols-outlined text-green-500 text-3xl">security</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
                                    256-bit AES
                                </span>
                                <span className="text-[11px] font-medium">SSL Encryption</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-60">
                            <span className="material-symbols-outlined text-orange-500 text-3xl">shield_person</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
                                    Safe Payments
                                </span>
                                <span className="text-[11px] font-medium">PCI-DSS Compliant</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecureCheckout;