import React, { useState } from "react";

const SecureCheckout = () => {
    const [paymentType, setPaymentType] = useState("card");

    return (
        <div className="space-y-6">
            {/* Payment Method Section */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary text-lg">
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
                            className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5 transition-all h-full"
                        >
                            <span className="material-symbols-outlined text-2xl mb-2 text-slate-600">
                                credit_card
                            </span>
                            <span className="font-medium text-xs text-slate-700">Credit/Debit Card</span>
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
                            className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5 transition-all h-full"
                        >
                            <span className="material-symbols-outlined text-2xl mb-2 text-slate-600">
                                paid
                            </span>
                            <span className="font-medium text-xs text-slate-700">Payment on Hand</span>
                            <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
                                Pay at University
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {paymentType === "card" && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-slate-900">Card Details</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-green-500 text-sm">
                                lock
                            </span>
                            <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">
                                Secure TLS Encryption
                            </span>
                        </div>
                    </div>

                    <form className="space-y-4">
                        {/* Cardholder Name */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1 uppercase tracking-wider">
                                Cardholder Name
                            </label>
                            <input
                                className="w-full h-12 px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                placeholder="As printed on card"
                                type="text"
                            />
                        </div>

                        {/* Card Number */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1 uppercase tracking-wider">
                                Card Number
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full h-12 px-4 py-3 pr-12 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    placeholder="0000 0000 0000 0000"
                                    type="text"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <span className="material-symbols-outlined text-slate-400 text-lg">
                                        credit_card
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Expiry Date & CVV */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1 uppercase tracking-wider">
                                    Expiry Date
                                </label>
                                <input
                                    className="w-full h-12 px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    placeholder="MM / YY"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1 uppercase tracking-wider">
                                    CVV
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full h-12 px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        placeholder="***"
                                        type="password"
                                    />
                                    <span
                                        className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg cursor-help"
                                        title="3-digit security code on the back of your card"
                                    >
                                        help
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Pay Button */}
                        <button
                            className="w-full h-14 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex items-center justify-center gap-2"
                            type="submit"
                        >
                            <span className="material-symbols-outlined text-base">verified</span>
                            Pay LKR 18,500.00
                        </button>
                    </form>

                    {/* Security Info */}
                    <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                                    Verified Provider
                                </span>
                                <span className="text-[10px] text-slate-400">Sabaragamuwa Univ.</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-500 text-2xl">security</span>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                                    256-bit AES
                                </span>
                                <span className="text-[10px] text-slate-400">SSL Encryption</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-orange-500 text-2xl">shield_person</span>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                                    Safe Payments
                                </span>
                                <span className="text-[10px] text-slate-400">PCI-DSS Compliant</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecureCheckout;