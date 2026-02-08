import React from 'react';
import PrimaryButton from '../../../components/common/PrimaryButton';

const BookingCard = ({ price, currency, period, rating, paymentDetails, hostName }) => {
    return (
        <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                <div className="flex items-baseline justify-between mb-6">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-900">{currency} {price.toLocaleString()}</span>
                        <span className="text-slate-500">/ {period}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                        <span className="material-symbols-outlined text-primary text-sm fill-current">star</span>
                        <span className="font-bold">{rating}</span>
                    </div>
                </div>

                <div className="border border-slate-300 rounded-lg mb-4 overflow-hidden">
                    <div className="flex border-b border-slate-300">
                        <div className="w-1/2 p-3 border-r border-slate-300 hover:bg-slate-50 cursor-pointer">
                            <label className="block text-[10px] uppercase font-bold text-slate-800 tracking-wider">
                                Start Semester
                            </label>
                            <div className="text-sm text-slate-600 mt-0.5">Select date</div>
                        </div>
                        <div className="w-1/2 p-3 hover:bg-slate-50 cursor-pointer">
                            <label className="block text-[10px] uppercase font-bold text-slate-800 tracking-wider">
                                Duration
                            </label>
                            <div className="text-sm text-slate-600 mt-0.5">Full Year</div>
                        </div>
                    </div>
                    <div className="p-3 hover:bg-slate-50 cursor-pointer">
                        <label className="block text-[10px] uppercase font-bold text-slate-800 tracking-wider">
                            Tenant
                        </label>
                        <div className="text-sm text-slate-600 mt-0.5">1 SUSL Student</div>
                    </div>
                </div>

                <PrimaryButton
                 className="w-full py-3.5 text-lg mb-4"
                 >
                    Request Booking
                </PrimaryButton>

                <p className="text-center text-xs text-slate-500 mb-6 font-medium">
                    Your request will be sent to {hostName}
                </p>

                <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex justify-between">
                        <span className="underline decoration-slate-300">{paymentDetails.rentalType}</span>
                        <span>{currency} {paymentDetails.rentalRate}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="underline decoration-slate-300">Key Money (Refundable)</span>
                        <span>{currency} {paymentDetails.keyMoney}</span>
                    </div>
                </div>

                <div className="my-4 border-t border-slate-200"></div>

                <div className="flex justify-between font-bold text-lg text-slate-900">
                    <span>Initial Payment</span>
                    <span>{currency} {paymentDetails.initialPayment.toLocaleString()}</span>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary">airport_shuttle</span>
                        <div>
                            <h4 className="font-semibold text-sm mb-1 text-primary">Moving to Belihuloya?</h4>
                            <p className="text-xs text-slate-600 mb-2">
                                Book a CampusEase van to move your furniture and luggage to SUSL.
                            </p>
                            <a className="text-xs font-bold text-primary hover:underline flex items-center gap-1" href="#">
                                Get a Quote <span className="material-symbols-outlined text-xs">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;