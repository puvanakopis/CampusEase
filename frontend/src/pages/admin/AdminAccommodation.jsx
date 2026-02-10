import React from "react";
import Heading from "../../containers/admin/Heading";
import StatsCards from "../../containers/admin/StatsCards";

const AdminAccommodation = () => {
    const stats = [
        {
            label: "Total Properties",
            icon: "apartment",
            value: 0,
            subtext: `0 active`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Pending Requests",
            icon: "pending_actions",
            value: 0,
            subtext: "Awaiting review",
            subtextColor: "text-yellow-500"
        },
        {
            label: "Monthly Revenue",
            icon: "payments",
            value: "LKR 0",
            subtext: "From active properties"
        }
    ];

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">

            <Heading
                title="Admin Accommodation Management"
                subtitle="Manage existing properties and review new property submissions from owners."
                showButton={false}
            />

            <StatsCards stats={stats} />

        </main>
    );
};

export default AdminAccommodation;