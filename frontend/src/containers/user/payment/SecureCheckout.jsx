import React, { useState } from "react";
import { CURRENCY, PAYMENT } from "../../../constants/constants";

const SecureCheckout = ({ tempBooking, onConfirm, processing }) => {
    const [paymentType, setPaymentType] = useState("card");
    const [cardDetails, setCardDetails] = useState({
        cardholderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: ""
    });

    const handleCardInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "cardNumber") {
            const formatted = value
                .replace(/\s/g, "")
                .replace(/(\d{4})/g, "$1 ")
                .trim()
                .slice(0, 19);
            setCardDetails(prev => ({ ...prev, [name]: formatted }));
        }
        else if (name === "expiryDate") {
            const formatted = value
                .replace(/\s/g, "")
                .replace(/(\d{2})(\d{0,2})/, "$1/$2")
                .slice(0, 5);
            setCardDetails(prev => ({ ...prev, [name]: formatted }));
        }
        else if (name === "cvv") {
            const formatted = value.replace(/\D/g, "").slice(0, 4);
            setCardDetails(prev => ({ ...prev, [name]: formatted }));
        }
        else {
            setCardDetails(prev => ({ ...prev, [name]: value }));
        }
    };

    const maskCardNumber = (cardNumber) => {
        const cleaned = cardNumber.replace(/\s/g, "");
        const last4 = cleaned.slice(-4);
        return `**** **** **** ${last4}`;
    };

    const handleCardSubmit = (e) => {
        e.preventDefault();

        if (!cardDetails.cardholderName || !cardDetails.cardNumber ||
            !cardDetails.expiryDate || !cardDetails.cvv) {
            return;
        }

        const paymentData = {
            method: "credit_card",
            amount: tempBooking?.total_price || 0,
            cardholder_name: cardDetails.cardholderName,
            card_number_masked: maskCardNumber(cardDetails.cardNumber),
            expiry_date: cardDetails.expiryDate,
            cvv_masked: "***",
            paid: true,
            created_at: new Date().toISOString()
        };

        onConfirm(paymentData);
    };

    const handleCashPayment = () => {
        const paymentData = {
            method: "pay_on_hand",
            amount: tempBooking?.total_price || 0,
            paid: false,
            created_at: new Date().toISOString()
        };
        onConfirm(paymentData);
    };

    if (!tempBooking) return null;

    const totalWithFees = tempBooking.total_price +
        (tempBooking.total_price * PAYMENT.SERVICE_FEE_RATE) +
        PAYMENT.SECURITY_FEE;

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
                                <span className="text-xs font-bold text-slate-400">VISA</span>
                                <span className="text-xs font-bold text-slate-400">MC</span>
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
                    {/* Card Details Form */}
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

                    <form className="space-y-4" onSubmit={handleCardSubmit}>
                        {/* Cardholder Name */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1 uppercase tracking-wider">
                                Cardholder Name
                            </label>
                            <input
                                name="cardholderName"
                                value={cardDetails.cardholderName}
                                onChange={handleCardInputChange}
                                className="w-full h-12 px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                placeholder="As printed on card"
                                type="text"
                                required
                            />
                        </div>

                        {/* Card Number */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1 uppercase tracking-wider">
                                Card Number
                            </label>
                            <div className="relative">
                                <input
                                    name="cardNumber"
                                    value={cardDetails.cardNumber}
                                    onChange={handleCardInputChange}
                                    className="w-full h-12 px-4 py-3 pr-12 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    placeholder="0000 0000 0000 0000"
                                    type="text"
                                    inputMode="numeric"
                                    required
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
                                    name="expiryDate"
                                    value={cardDetails.expiryDate}
                                    onChange={handleCardInputChange}
                                    className="w-full h-12 px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    placeholder="MM/YY"
                                    type="text"
                                    inputMode="numeric"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1 uppercase tracking-wider">
                                    CVV
                                </label>
                                <div className="relative">
                                    <input
                                        name="cvv"
                                        value={cardDetails.cvv}
                                        onChange={handleCardInputChange}
                                        className="w-full h-12 px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        placeholder="***"
                                        type="password"
                                        inputMode="numeric"
                                        required
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
                            type="submit"
                            disabled={processing}
                            className={`w-full h-14 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex items-center justify-center gap-2 ${processing ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {processing ? (
                                <>
                                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-base">verified</span>
                                    Pay {CURRENCY} {totalWithFees.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </>
                            )}
                        </button>
                    </form>
                </div>
            )}

            {paymentType === "cash" && (
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-2xl">
                                payments
                            </span>
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Payment on Hand</h3>
                            <p className="text-xs text-slate-500">Pay at the university cashier</p>
                        </div>
                    </div>

                    <button
                        onClick={handleCashPayment}
                        disabled={processing}
                        className={`w-full h-14 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex items-center justify-center gap-2 ${processing ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {processing ? (
                            <>
                                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                                Processing...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-base">check_circle</span>
                                Confirm Cash Payment
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default SecureCheckout;