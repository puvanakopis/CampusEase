import React from "react";
import Heading from "../../containers/admin/Heading";
import StatsCards from "../../containers/admin/StatsCards";

const AdminBooking = () => {
    const stats = [
        {
            label: "Total Bookings",
            icon: "receipt_long",
            value: 5,
            subtext: "Total Properties",
            subtextColor: "text-green-500"
        },
        {
            label: "Total Revenue",
            icon: "payments",
            value: 5,
            subtext: "Total Properties",
            subtextColor: "text-blue-500"
        },
        {
            label: "Pending Actions",
            icon: "hourglass_bottom",
            value: 5,
            subtext: "Total Properties",
            subtextColor: "text-orange-500"
        }
    ];

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            <Heading
                title="Booking Management"
                subtitle="Manage all bookings, review requests, and handle booking statuses."
            />

            <StatsCards stats={stats} />
        </main>
    );
};

export default AdminBooking;