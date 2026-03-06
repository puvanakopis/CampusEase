import React, { useState } from 'react';
import PrimaryButton from '../../../components/common/PrimaryButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingCard = ({ day_rent, rating, owner }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [withDriver, setWithDriver] = useState(false);

    const currency = "LKR";

    const getTotalDays = () => {
        if (!startDate || !endDate) return 0;
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays + 1; 
    };

    const calculateDuration = () => {
        const days = getTotalDays();
        if (days > 0) {
            return `${days} day${days > 1 ? "s" : ""}`;
        }
        return "Select dates";
    };

    const calculateTotal = () => {
        const days = getTotalDays();
        if (days === 0) return 0;
        return days * day_rent;
    };

    const calculateDriverFee = () => {
        if (!withDriver) return 0;
        const days = getTotalDays();
        return days * 1500;
    };

    const totalWithDriver = calculateTotal() + calculateDriverFee();

    return (
        <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-slate-200 rounded-xl shadow-sm p-6">

                {/* Price */}
                <div className="flex items-baseline justify-between mb-6">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-900">
                            {currency} {day_rent.toLocaleString()}
                        </span>
                        <span className="text-slate-500">/ day</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-slate-600">
                        <span className="material-symbols-outlined text-primary text-sm fill-current">
                            star
                        </span>
                        <span className="font-bold">{rating}</span>
                    </div>
                </div>

                <div className="border border-slate-300 rounded-lg mb-4 overflow-hidden">

                    {/* Start & End Date */}
                    <div className="flex border-b border-slate-300">
                        <div className="w-1/2 p-3 border-r border-slate-300 hover:bg-slate-50">
                            <label className="block text-[10px] uppercase font-bold text-slate-800 tracking-wider">
                                Pickup Date
                            </label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd MMM yyyy"
                                placeholderText="Select date"
                                minDate={new Date()}
                                className="mt-0.5 text-sm text-slate-600 w-full border-none p-0 focus:ring-0 focus:outline-none bg-transparent cursor-pointer"
                                calendarClassName="rounded-lg border border-slate-200 shadow-lg"
                            />
                        </div>

                        <div className="w-1/2 p-3 hover:bg-slate-50">
                            <label className="block text-[10px] uppercase font-bold text-slate-800 tracking-wider">
                                Return Date
                            </label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd MMM yyyy"
                                placeholderText="Select date"
                                minDate={startDate || new Date()}
                                className="mt-0.5 text-sm text-slate-600 w-full border-none p-0 focus:ring-0 focus:outline-none bg-transparent cursor-pointer"
                                calendarClassName="rounded-lg border border-slate-200 shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="p-3 border-b border-slate-300">
                        <label className="block text-[10px] uppercase font-bold text-slate-800 tracking-wider">
                            Duration
                        </label>
                        <div className="text-sm text-slate-600 mt-0.5">
                            {calculateDuration()}
                        </div>
                    </div>

                    {/* Driver Option */}
                    <div className="p-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={withDriver}
                                onChange={(e) => setWithDriver(e.target.checked)}
                                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-slate-700">
                                Hire driver (LKR 1,500/day)
                            </span>
                        </label>
                        <p className="text-xs text-slate-500 mt-1 ml-6">
                            Professional driver familiar with the area
                        </p>
                    </div>
                </div>

                {/* Booking Button */}
                <PrimaryButton
                    disabled={!startDate || !endDate}
                    className="w-full py-3.5 text-lg mb-4"
                >
                    Request Booking
                </PrimaryButton>

                <p className="text-center text-xs text-slate-500 mb-6 font-medium">
                    Your request will be sent to {owner?.first_name || 'the owner'}
                </p>

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex justify-between">
                        <span className="underline decoration-slate-300">Daily rate</span>
                        <span>{currency} {day_rent.toLocaleString()} × {getTotalDays()} days</span>
                    </div>

                    {withDriver && getTotalDays() > 0 && (
                        <div className="flex justify-between">
                            <span className="underline decoration-slate-300">Driver fee</span>
                            <span>{currency} 1,500 × {getTotalDays()} days</span>
                        </div>
                    )}
                </div>

                <div className="my-4 border-t border-slate-200"></div>

                {/* Total */}
                <div className="flex justify-between text-base font-semibold text-slate-900">
                    <span>Total</span>
                    <span>{currency} {(withDriver ? totalWithDriver : calculateTotal()).toLocaleString()}</span>
                </div>

                {/* Promotion */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary">
                            local_gas_station
                        </span>
                        <div>
                            <h4 className="font-semibold text-sm mb-1 text-primary">
                                Need fuel delivery?
                            </h4>
                            <p className="text-xs text-slate-600 mb-2">
                                Get fuel delivered to your vehicle location through CampusEase.
                            </p>
                            <a
                                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                                href="#"
                            >
                                Learn More
                                <span className="material-symbols-outlined text-xs">
                                    arrow_forward
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;