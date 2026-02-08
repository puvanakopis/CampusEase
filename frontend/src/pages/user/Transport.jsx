import React, { useState } from "react";
import FiltersSidebar from "../../containers/user/transport/FiltersSidebar";
import PageHeader from "../../containers/user/transport/PageHeader";
import SortBar from "../../containers/user/transport/SortBar";
import TransportGrid from "../../containers/user/transport/TransportGrid";
import Pagination from "../../components/user/Pagination";

const transports = [
    {
        title: "Honda Dio Scooter",
        rating: 4.8,
        location: "Belihuloya",
        tags: ["110cc", "Mileage Friendly"],
        price: "LKR 2,000",
        priceLabel: "Per Day",
        badge: { text: "Scooter", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=600",
        favorite: false,
    },
    {
        title: "TVS Ntorq 125",
        rating: 4.6,
        location: "Pambahinna",
        tags: ["125cc", "Sport Mode"],
        price: "LKR 2,300",
        priceLabel: "Per Day",
        badge: { text: "Scooter", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1622241944227-af2793740394?auto=format&fit=crop&q=80&w=600",
        favorite: false,
    },
    {
        title: "Yamaha FZ V3",
        rating: 4.7,
        location: "Kumbalgama",
        tags: ["150cc", "Sport Bike"],
        price: "LKR 2,800",
        priceLabel: "Per Day",
        badge: { text: "Motorbike", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=600",
        favorite: true,
    },
    {
        title: "Bajaj Pulsar NS160",
        rating: 4.5,
        location: "Belihuloya Town",
        tags: ["160cc", "Performance"],
        price: "LKR 3,000",
        priceLabel: "Per Day",
        badge: { text: "Motorbike", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600",
        favorite: false,
    },
    {
        title: "Bajaj Three-Wheeler",
        rating: 4.6,
        location: "Belihuloya Junction",
        tags: ["3 Passenger", "Fuel Efficient"],
        price: "LKR 3,000",
        priceLabel: "Per Day",
        badge: { text: "Tuk", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1542128847-512061320392?auto=format&fit=crop&q=80&w=600",
        favorite: false,
    },
    {
        title: "Toyota Aqua Hybrid",
        rating: 4.9,
        location: "Pambahinna",
        tags: ["Hybrid", "Comfort Ride"],
        price: "LKR 8,500",
        priceLabel: "Per Day",
        badge: { text: "Car", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=600",
        favorite: true,
    },
    {
        title: "Toyota Prius Hybrid",
        rating: 4.7,
        location: "Belihuloya",
        tags: ["Hybrid", "Automatic"],
        price: "LKR 9,000",
        priceLabel: "Per Day",
        badge: { text: "Car", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=600",
        favorite: false,
    },
    {
        title: "Nissan March",
        rating: 4.4,
        location: "Pambahinna",
        tags: ["Compact", "Budget Friendly"],
        price: "LKR 7,000",
        priceLabel: "Per Day",
        badge: { text: "Car", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600",
        favorite: false,
    },
    {
        title: "Suzuki Wagon R",
        rating: 4.6,
        location: "Belihuloya",
        tags: ["Hybrid", "Spacious"],
        price: "LKR 7,500",
        priceLabel: "Per Day",
        badge: { text: "Car", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1520050206274-a1af44633fac?auto=format&fit=crop&q=80&w=600",
        favorite: false,
    },
    {
        title: "Toyota Axio",
        rating: 4.8,
        location: "Kumbalgama",
        tags: ["Comfortable", "Hybrid"],
        price: "LKR 10,500",
        priceLabel: "Per Day",
        badge: { text: "Car", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=600",
        favorite: false,
    },
    {
        title: "Nissan Caravan",
        rating: 4.9,
        location: "Pambahinna",
        tags: ["10 Seater", "AC Van"],
        price: "LKR 12,000",
        priceLabel: "Per Day",
        badge: { text: "Van", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1532939163844-547f958e91b4?auto=format&fit=crop&q=80&w=600",
        favorite: false,
    },
    {
        title: "Toyota HiAce",
        rating: 4.8,
        location: "Belihuloya",
        tags: ["12 Seater", "Tour Van"],
        price: "LKR 15,000",
        priceLabel: "Per Day",
        badge: { text: "Van", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=600",
        favorite: true,
    },
    {
        title: "Hero Pleasure Scooter",
        rating: 4.2,
        location: "Kumbalgama",
        tags: ["100cc", "Lightweight"],
        price: "LKR 1,800",
        priceLabel: "Per Day",
        badge: { text: "Scooter", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1599812182397-621f4a2dabc2?auto=format&fit=crop&q=80&w=600",
        favorite: false,
    },
    {
        title: "Suzuki Alto",
        rating: 4.3,
        location: "Belihuloya Town",
        tags: ["Affordable", "Manual"],
        price: "LKR 5,500",
        priceLabel: "Per Day",
        badge: { text: "Car", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600",
        favorite: false,
    },
    {
        title: "Honda CB125F",
        rating: 4.5,
        location: "Pambahinna",
        tags: ["125cc", "Efficient Bike"],
        price: "LKR 2,500",
        priceLabel: "Per Day",
        badge: { text: "Motorbike", color: "bg-primary/90 text-white" },
        image: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?auto=format&fit=crop&q=80&w=600",
        favorite: true,
    }
];

const ITEMS_PER_PAGE = 9;

const Transport = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(transports.length / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentTransports = transports.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    return (
        <div className="bg-[#f6f7f8]">
            <div className="flex flex-col lg:flex-row px-4 py-10 md:px-10 max-w-7xl mx-auto gap-6">
                <FiltersSidebar />
                <main className="flex-1 flex flex-col gap-6">
                    <PageHeader
                        title="Vehicle Rentals"
                        description="Scooters, cars, vans, and bikes available for rent near Sabaragamuwa University."
                    />
                    <SortBar
                        total={transports.length}
                        location="Belihuloya & Pambahinna"
                    />
                    <TransportGrid transports={currentTransports} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </main>
            </div>
        </div>
    );
};

export default Transport;