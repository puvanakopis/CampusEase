import React from "react";

const vehiclesNearSUSL = [
    {
        id: 1,
        title: "Honda Dio 2018",
        pricePerDay: 3500,
        location: "Pambahinna Junction",
        features: ["Daily Rental", "Helmets Included"],
        rating: 4.7,
        type: "bike",
        image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "TVS Apache RTR 160",
        pricePerDay: 5000,
        location: "Belihuloya Town",
        features: ["Daily Rental", "Full Tank"],
        rating: 4.6,
        type: "bike",
        image: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Suzuki Alto – Taxi Service",
        pricePerKm: 120,
        location: "Balangoda Road",
        features: ["Per KM", "A/C", "4 Seater"],
        rating: 4.9,
        type: "taxi",
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        title: "Nissan Caravan – Group Transport",
        pricePerKm: 250,
        location: "Opposite SUSL Gate",
        features: ["Per KM", "14 Seater"],
        rating: 4.3,
        type: "van",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop",
    },];

const VehiclesNearSUSL = () => {
    return (
        <section className="px-4  md:px-24 max-w-8xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mt-4">
                <div className="text-start mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Vehicles Near SUSL</h2>
                    <p className="text-slate-600 text-lg">Find convenient transport options close to campus</p>
                </div>                <a
                    className="text-primary font-bold text-sm flex items-center gap-1"
                    href="/vehicle"
                >
                    View All Vehicles
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {vehiclesNearSUSL.map((veh) => (
                    <div
                        key={veh.id}
                        className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-primary/50 transition-shadow"
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-sm z-10">
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                {veh.rating}
                            </div>
                            <img
                                alt={veh.title}
                                src={veh.image}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        <div className="flex flex-col p-4 gap-2 flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{veh.title}</h3>
                                <span className="text-primary font-bold text-sm whitespace-nowrap">
                                    LKR {veh.pricePerDay ?? veh.pricePerKm}
                                    <span className="text-slate-400 font-normal text-xs">
                                        {veh.type === "taxi" || veh.type === "van" ? "/km" : "/day"}
                                    </span>
                                </span>
                            </div>

                            <p className="text-slate-500 text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">location_on</span>
                                {veh.location}
                            </p>

                            <div className="mt-auto pt-3 flex gap-2">
                                {veh.features.map((feature, i) => (
                                    <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VehiclesNearSUSL;