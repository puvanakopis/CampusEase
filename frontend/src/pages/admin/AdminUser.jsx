import React from "react";
import Heading from "../../containers/admin/Heading";
import StatsCards from "../../containers/admin/StatsCards";

const AdminUser = () => {
    const stats = [
        {
            label: "Total Users",
            icon: "group",
            value: 5,
            subtext: "Total Properties",
            subtextColor: "text-green-500"
        },
        {
            label: "Total Students",
            icon: "school",
            value: 5,
            subtext: "Total Properties",
            subtextColor: "text-blue-500"
        },
        {
            label: "Avg. User Rating",
            icon: "star",
            value: 5,
            subtext: "Total Properties",
            subtextColor: "text-yellow-600"
        }
    ];

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            <Heading
                title="Admin User Management"
                subtitle="Manage system users, review accounts, and handle user profiles."
            />

            <StatsCards stats={stats} />
        </main>
    );
};

export default AdminUser;