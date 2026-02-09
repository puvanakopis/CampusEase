import React from "react";
import Heading from "../../containers/owner/vehicle/Heading";
import VehicleTable from "../../containers/owner/vehicle/VehicleTable";
import VehicleStatsCards from "../../containers/owner/vehicle/VehicleStatsCards";

const OwnerVehicle = () => {

    const vehicles = [
        {
            id: "VEH-9021",
            name: "Toyota Axio",
            type: "Car",
            price: 8500,
            status: "Active",
            location: "Belihuloya Town",
            image:
                "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
        },
        {
            id: "VEH-4410",
            name: "Honda Dio",
            type: "Scooter",
            price: 2500,
            status: "Active",
            location: "Pambahinna Junction",
            image:
                "https://images.pexels.com/photos/2527935/pexels-photo-2527935.jpeg",
        },
        {
            id: "VEH-7712",
            name: "Nissan Caravan",
            type: "Van",
            price: 12000,
            status: "Inactive",
            location: "SUSL Main Gate",
            image:
                "https://images.pexels.com/photos/417312/pexels-photo-417312.jpeg",
        },
    ];

    const stats = [
        {
            label: "Total Bookings",
            icon: "event_available",
            value: "312",
            subtext: "+5% from last month",
            trendIcon: "trending_up",
            subtextColor: "text-green-500",
        },
        {
            label: "Active Vehicles",
            icon: "directions_car",
            value: "12",
            subtext: "8 currently rented out",
        },
        {
            label: "Monthly Revenue",
            icon: "payments",
            value: "LKR 185k",
            subtext: "Next payout: 28th Oct",
        },
    ];

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            <Heading
                title="Vehicle Rentals Management"
                subtitle="Manage your transportation rentals around Sabaragamuwa University."
                buttonText="Add New Vehicle"
            />
            <VehicleStatsCards stats={stats} />
            <VehicleTable vehicles={vehicles} />
        </main>
    );
};

export default OwnerVehicle;