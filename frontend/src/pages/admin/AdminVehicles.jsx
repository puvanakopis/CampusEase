import React from "react";
import Heading from "../../containers/admin/Heading";
import StatsCards from "../../containers/admin/StatsCards";

const AdminVehicles = ({ allVehicles }) => {
    const totalVehicles = allVehicles.length;
    const activeVehicles = allVehicles.filter(v => v.status === "Active");
    const totalCapacity = allVehicles.reduce((sum, vehicle) => sum + vehicle.capacity, 0);
    const activeCapacity = activeVehicles.reduce((sum, vehicle) => sum + vehicle.capacity, 0);
    const dailyRevenue = allVehicles.reduce((sum, vehicle) => sum + (vehicle.price * 20), 0);

    const stats = [
        {
            label: "Total Vehicles",
            icon: "directions_car",
            value: Math.round(totalVehicles),
            subtext: `${Math.round(activeVehicles.length)} active`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Total Capacity",
            icon: "group",
            value: Math.round(totalCapacity),
            subtext: `${Math.round(activeCapacity)} active seats`
        },
        {
            label: "Daily Revenue",
            icon: "payments",
            value: `LKR ${Math.round(dailyRevenue).toLocaleString()}`,
            subtext: "Estimated from active vehicles"
        }
    ];

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            <Heading
                title="Admin Vehicle Management"
                subtitle="Manage campus transportation vehicles and review new vehicle submissions."
                showButton={false}
            />

            <StatsCards stats={stats} />
        </main>
    );
};

export default AdminVehicles;