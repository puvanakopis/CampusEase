import React from "react";
import Heading from "../../containers/admin/Heading";
import StatsCards from "../../containers/admin/StatsCards";

const AdminOwner = () => {

    const stats = [
        {
            label: "Total Owners",
            icon: "group",
            value: "12",
            subtext: "8 active",
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Monthly Revenue",
            icon: "payments",
            value: "LKR 420,000",
            subtext: "Estimated from active owners"
        },
        {
            label: "Avg. Owner Rating",
            icon: "star",
            value: "4.3",
            subtext: "7 owners rated 4+",
            subtextColor: "text-yellow-600"
        }
    ];

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            <Heading
                title="Owner Management"
                subtitle="Manage property owners, review registration requests, and handle owner accounts."
                showButton={false}
            />

            <StatsCards stats={stats} />
        </main>
    );
};

export default AdminOwner;