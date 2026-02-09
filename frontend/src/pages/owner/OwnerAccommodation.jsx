import React from "react";
import Heading from "../../containers/owner/accommodation/Heading";
import PropertyTable from "../../containers/owner/accommodation/PropertyTable";
import StatsCards from "../../containers/owner/accommodation/StatsCards";

const OwnerAccommodation = () => {

    const properties = [
        {
            id: "SUSL-2938",
            name: "Riverview Annex",
            location: "Pambahinna Junction",
            type: "Annex",
            price: 8000,
            status: "Active",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI5BnAKspEOg_BzW-S6Bd0vthfJXCjNSmdAVzbeMnGiInqD4TBHKDoOIHCmS6Wl_-j8cyilhjlemCGKvQ-n1wgYe3NuA5MtA0thgik4PnK2zwWjlnCbBZ78oO7XVGNhOz1W-LTZM9dUrEmHJdqLrWTK0vkuLsWIRRToS00v0JSqQOamGhp7nchxCb_OwNQdbrecjCejjwZb_mCzQrFoeONrze74vZ6eI97C-ewlMUlmKffkx1wty73DzxgB2LgNXqzWmGTURPZbsw",
        },
        {
            id: "SUSL-1102",
            name: "Hilltop Girls' Hostel",
            location: "Belihuloya Town",
            type: "Hostel",
            price: 6500,
            status: "Active",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwOUPIKoOHaAM_E-TBru2zCVRI3Ssm_LYBqy9OohQOx9fZ7bJFKvFZeXYP-TL5_hnUPQRzHpFmqXIkmL594Z2YVtMNyZ6adghT3SaAi0Q29G-yRY1dWnDXX4DuymdYSw76W9egefXCZ7WnVcqqgYIreJXZ9-WdrrDNT-ZVxNJlTNElTURfj5tpQpeMRuNJtM2fGiyxD9VRg_Si88XLJUgR7cYjdntOdqJg3Yo4z7js1y1HXXZkV1FJXr76YpQn-c4zmKy77-uQ4bI",
        },
        {
            id: "SUSL-4491",
            name: "Campus Edge Single",
            location: "SUSL Main Gate",
            type: "Single Room",
            price: 5000,
            status: "Inactive",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj70YCtt3xEQ41nzjit8EF3C5db8W9u5nFJ41O6tsQNQZ32UUuM0r-fKYxfvOefR7TyBkFee4rs8YZDVYTwXyeF5-2LN0ZZz3qRbc401qQBKu3-BLoGjavC3RQ8ElCf3xEA10qYwUGCWQ1qjTe0HQcnYP4a5EZfsLO31qfm3KcCDHNTpgkFbw3QYArc_yLM9k66cLBfwfJkDiVYNLjmY74jn02DsNtzcc-1VEe-oQxzEqhZKUDlPatpomI-ZActGKMR5Msq05n_iI",
        },
    ];

    const stats = [
        {
            label: "Active Views",
            icon: "visibility",
            value: "1,284",
            subtext: "+12% from last month",
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Occupancy Rate",
            icon: "pie_chart",
            value: "85%",
            subtext: "6/7 units currently occupied",
        },
        {
            label: "Total Revenue (Monthly)",
            icon: "payments",
            value: "LKR 42.5k",
            subtext: "Next payout: 28th Oct",
        },
    ];

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            <Heading
                title="Accommodation Properties Management"
                subtitle="Manage your Sabaragamuwa University area listings."
                buttonText="Add New Property"
            />
            <StatsCards stats={stats} />
            <PropertyTable properties={properties} />
        </main>
    );
};

export default OwnerAccommodation;