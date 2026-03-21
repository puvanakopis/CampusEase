import React, { useState, useEffect } from 'react';
import PrimaryButton from '../../../components/common/PrimaryButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import useNavigateTo from "../../../hooks/useNavigateTo";

const BookingCard = ({ currentUser, accommodation, averageRating, tempBooking, saveTempBooking }) => {
    const [startDate, setStartDate] = useState(tempBooking?.start_date ? new Date(tempBooking.start_date) : null);
    const [endDate, setEndDate] = useState(tempBooking?.end_date ? new Date(tempBooking.end_date) : null);
    const currency = "LKR";

    const navigateTo = useNavigateTo();

    const handleGoToAbout = () => {
        navigateTo("/payment")
    };

    const currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    useEffect(() => {
        if (tempBooking?.start_date) setStartDate(new Date(tempBooking.start_date));
        if (tempBooking?.end_date) setEndDate(new Date(tempBooking.end_date));
    }, [tempBooking]);

    const getFirstDayUTC = (date) => {
        if (!date) return null;
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1, 0, 0, 0));
    };

    const getTotalMonths = () => {
        if (!startDate || !endDate) return 0;
        const diffYears = endDate.getFullYear() - startDate.getFullYear();
        const diffMonths = endDate.getMonth() - startDate.getMonth();
        return diffYears * 12 + diffMonths + 1;
    };

    const calculateDuration = () => {
        const months = getTotalMonths();
        return months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "Select duration";
    };

    const calculateTotal = () => getTotalMonths() * accommodation.month_rent;

    const handleBooking = async () => {
        if (!startDate || !endDate) return;

        const payload = {
            user_id: currentUser._id,
            booking_type: "accommodation",
            resource_id: accommodation._id,
            owner_id: accommodation.owner?._id,
            unit_price: accommodation.month_rent,
            start_date: getFirstDayUTC(startDate).toISOString(),
            end_date: getFirstDayUTC(endDate).toISOString(),
            duration: getTotalMonths(),
            total_price: calculateTotal()
        };

        try {
            await saveTempBooking(payload);
        } catch (err) {
            toast.error(err.message || "Failed to save booking");
        }
    };

    return (
        <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-slate-200 rounded-xl shadow-sm p-6">

                {/* Price */}
                <div className="flex items-baseline justify-between mb-6">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-900">
                            {currency} {accommodation.month_rent.toLocaleString()}
                        </span>
                        <span className="text-slate-500">/ month</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-slate-600">
                        <span className="material-symbols-outlined text-primary text-sm fill-current">
                            star
                        </span>
                        <span className="font-bold">{averageRating}</span>
                    </div>
                </div>

                <div className="border border-slate-300 rounded-lg mb-4 overflow-hidden">
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
                            />
                        </div>
                    </div>

                    <div className="p-3 border-b border-slate-300">
                        <label className="block text-[10px] uppercase font-bold text-slate-800 tracking-wider">
                            Duration
                        </label>
                        <div className="text-sm text-slate-600 mt-0.5">{calculateDuration()}</div>
                    </div>
                </div>

                <PrimaryButton
                    disabled={!startDate || !endDate}
                    onClick={() => {
                        if (!currentUser) {
                            navigateTo("/login");
                            return;
                        }
                        handleBooking();
                        handleGoToAbout();
                    }}
                    className="w-full py-3.5 text-lg mb-4"
                >
                    Request Booking
                </PrimaryButton>

                <p className="text-center text-xs text-slate-500 mb-6 font-medium">
                    Your request will be sent to {accommodation.owner?.first_name}
                </p>

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex justify-between">
                        <span className="underline decoration-slate-300">Monthly rent</span>
                        <span>{currency} {accommodation.month_rent.toLocaleString()}</span>
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

            </div>
        </div>
    );
};

export default BookingCard;