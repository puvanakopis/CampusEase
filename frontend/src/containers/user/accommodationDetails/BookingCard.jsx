import React, { useState } from 'react';
import PrimaryButton from '../../../components/common/PrimaryButton';
import DatePicker from 'react-datepicker';
import useNavigateTo from "../../../hooks/useNavigateTo";
import 'react-datepicker/dist/react-datepicker.css';

const BookingCard = ({ month_rent, rating, owner }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const navigateTo = useNavigateTo();
    const currency = "LKR";

    const currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    const getTotalMonths = () => {
        if (!startDate || !endDate) return 0;

        const diffYears = endDate.getFullYear() - startDate.getFullYear();
        const diffMonths = endDate.getMonth() - startDate.getMonth();

        return diffYears * 12 + diffMonths + 1;
    };

    const calculateDuration = () => {
        const months = getTotalMonths();

        if (months > 0) {
            return `${months} month${months > 1 ? "s" : ""}`;
        }

        return "Select duration";
    };

    const calculateTotal = () => {
        const months = getTotalMonths();
        if (months === 0) return 0;
        return months * month_rent;
    };

    const handleBooking = () => {
        navigateTo("/payment");
    };

    return (
        <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-slate-200 rounded-xl shadow-sm p-6">

                {/* Price */}
                <div className="flex items-baseline justify-between mb-6">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-900">
                            {currency} {month_rent.toLocaleString()}
                        </span>
                        <span className="text-slate-500">/ month</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-slate-600">
                        <span className="material-symbols-outlined text-primary text-sm fill-current">
                            star
                        </span>
                        <span className="font-bold">{rating}</span>
                    </div>
                </div>

                <div className="border border-slate-300 rounded-lg mb-4 overflow-hidden">

                    {/* Start & End Month */}
                    <div className="flex border-b border-slate-300">

                        <div className="w-1/2 p-3 border-r border-slate-300 hover:bg-slate-50">
                            <label className="block text-[10px] uppercase font-bold text-slate-800 tracking-wider">
                                Start Month
                            </label>

                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="MMM yyyy"
                                showMonthYearPicker
                                placeholderText="Select month"
                                minDate={currentMonth}
                                className="mt-0.5 text-sm text-slate-600 w-full border-none p-0 focus:ring-0 focus:outline-none bg-transparent cursor-pointer"
                                calendarClassName="rounded-lg border border-slate-200 shadow-lg"
                            />
                        </div>

                        <div className="w-1/2 p-3 hover:bg-slate-50">
                            <label className="block text-[10px] uppercase font-bold text-slate-800 tracking-wider">
                                End Month
                            </label>

                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="MMM yyyy"
                                showMonthYearPicker
                                placeholderText="Select month"
                                minDate={startDate || currentMonth}
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

                </div>

                <PrimaryButton
                    disabled={!startDate || !endDate}
                    onClick={handleBooking}
                    className="w-full py-3.5 text-lg mb-4"
                >
                    Request Booking
                </PrimaryButton>

                <p className="text-center text-xs text-slate-500 mb-6 font-medium">
                    Your request will be sent to {owner.first_name}
                </p>

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm text-slate-600">

                    <div className="flex justify-between">
                        <span className="underline decoration-slate-300">Monthly rent</span>
                        <span>{currency} {month_rent.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="underline decoration-slate-300">Duration</span>
                        <span>{getTotalMonths()} months</span>
                    </div>

                </div>

                <div className="my-4 border-t border-slate-200"></div>

                {/* Total */}
                <div className="flex justify-between text-base font-semibold text-slate-900">
                    <span>Total</span>
                    <span>{currency} {calculateTotal().toLocaleString()}</span>
                </div>

                {/* Promotion */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary">
                            airport_shuttle
                        </span>

                        <div>
                            <h4 className="font-semibold text-sm mb-1 text-primary">
                                Moving to Belihuloya?
                            </h4>

                            <p className="text-xs text-slate-600 mb-2">
                                Book a CampusEase van to move your furniture and luggage to SUSL.
                            </p>

                            <a
                                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                                href="#"
                            >
                                Get a Quote
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