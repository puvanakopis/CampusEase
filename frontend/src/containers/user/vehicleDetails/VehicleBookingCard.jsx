import React, { useState, useEffect } from "react";
import PrimaryButton from "../../../components/common/PrimaryButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import useNavigateTo from "../../../hooks/useNavigateTo";

const VehicleBookingCard = ({
    currentUser,
    vehicle,
    rating,
    tempBooking,
    saveTempBooking
}) => {

    const [startDate, setStartDate] = useState(
        tempBooking?.start_date ? new Date(tempBooking.start_date) : null
    );

    const [endDate, setEndDate] = useState(
        tempBooking?.end_date ? new Date(tempBooking.end_date) : null
    );

    const navigateTo = useNavigateTo();
    const currency = "LKR";

    useEffect(() => {
        if (tempBooking?.start_date)
            setStartDate(new Date(tempBooking.start_date));

        if (tempBooking?.end_date)
            setEndDate(new Date(tempBooking.end_date));
    }, [tempBooking]);

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
        return days * vehicle.day_rent;
    };

    const handleBooking = async () => {

        if (!startDate || !endDate) return;

        const payload = {
            user_id: currentUser._id,
            booking_type: "vehicle",
            resource_id: vehicle._id,
            owner_id: vehicle.owner?._id,
            unit_price: vehicle.day_rent,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            duration: getTotalDays(),
            total_price: calculateTotal()
        };

        try {
            await saveTempBooking(payload);
            navigateTo("/payment");
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
                            {currency} {vehicle.day_rent.toLocaleString()}
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

                    {/* Dates */}
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
                    Your request will be sent to {vehicle.owner?.first_name}
                </p>

                {/* Breakdown */}
                <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex justify-between">
                        <span className="underline decoration-slate-300">
                            Daily rate
                        </span>

                        <span>
                            {currency} {vehicle.day_rent.toLocaleString()} × {getTotalDays()} days
                        </span>
                    </div>
                </div>

                <div className="my-4 border-t border-slate-200"></div>

                <div className="flex justify-between text-base font-semibold text-slate-900">
                    <span>Total</span>
                    <span>
                        {currency} {calculateTotal().toLocaleString()}
                    </span>
                </div>

            </div>
        </div>
    );
};

export default VehicleBookingCard;