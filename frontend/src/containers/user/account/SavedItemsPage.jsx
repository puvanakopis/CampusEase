import React from "react";

const SavedItemsPage = () => {
    const accommodations = [
        {
            id: 1,
            title: "Sunshine Girls Hostel",
            price: "8,500",
            location: "Belihuloya, 5 mins walk to Gate",
            feature: "Shared Rooms Available",
            image: "https://images.unsplash.com/photo-1555854817-5b2738a77fd8?q=80&w=500",
            type: "Accommodation"
        },
        {
            id: 2,
            title: "Hillview Male Annex",
            price: "12,000",
            location: "Pambahinna, Near Main Road",
            feature: "Single Rooms / Attached Bath",
            image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500",
            type: "Accommodation"
        },
        {
            id: 3,
            title: "Lakeview Studio",
            price: "15,000",
            location: "Samanalawewa View Point",
            feature: "Full Kitchen Access",
            image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=500",
            type: "Accommodation"
        }
    ];

    const vehicles = [
        {
            id: 101,
            title: "Toyota Hiace Van",
            price: "12,000",
            date: "Feb 15, 2026",
            location: "Belihuloya Town",
            image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=500",
            type: "Vehicle"
        },
        {
            id: 102,
            title: "Bajaj RE TukTuk",
            price: "2,500",
            date: "Feb 12, 2026",
            location: "Pambahinna Junction",
            image: "https://images.unsplash.com/photo-1506450681928-8103e39e600c?q=80&w=500",
            type: "Vehicle"
        }
    ];

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10">
            <div className="space-y-6">
                {/* Header */}
                <div className="">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold text-slate-900">Saved Items</h1>
                        <p className="text-sm text-slate-500">
                            Keep track of your favorite accommodations and vehicles.
                        </p>
                    </div>
                </div>

                {/* Saved Accommodations Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <span className="material-symbols-outlined text-primary text-lg">bed</span>
                        <h2 className="text-lg font-bold text-slate-900">Saved Accommodations ({accommodations.length})</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {accommodations.map((item) => (
                            <ItemCard key={item.id} data={item} />
                        ))}
                    </div>
                </section>

                {/* Saved Vehicles Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <span className="material-symbols-outlined text-primary text-lg">directions_car</span>
                        <h2 className="text-lg font-bold text-slate-900">Saved Vehicles ({vehicles.length})</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {vehicles.map((vehicle) => (
                            <ItemCard key={vehicle.id} data={vehicle} isVehicle />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

const ItemCard = ({ data, isVehicle = false }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col md:flex-row hover:bg-slate-50/50 transition-colors">
            <div className="md:w-48 h-48 md:h-auto shrink-0 relative">
                <img
                    alt={data.title}
                    className="h-full w-full object-cover"
                    src={data.image}
                />
                <button className="absolute top-3 right-3 bg-white text-red-500 rounded-full h-8 w-8 flex items-center justify-center border border-slate-200 hover:bg-red-50 transition-colors">
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </button>
                <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-medium px-2 py-1 rounded-full uppercase tracking-wider">
                    {data.type}
                </div>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="text-base font-bold text-slate-900 leading-tight">{data.title}</h3>
                        <div className="flex flex-col items-end">
                            <span className="text-primary font-bold text-base whitespace-nowrap">
                                LKR {data.price}
                            </span>
                            {!isVehicle && <span className="text-xs text-slate-400">/mo</span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 text-slate-500 text-sm mb-3">
                        <p className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm text-slate-400">location_on</span>
                            {data.location}
                        </p>
                        {isVehicle ? (
                            <p className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm text-slate-400">calendar_today</span>
                                Date: {data.date}
                            </p>
                        ) : (
                            <p className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm text-slate-400">group</span>
                                {data.feature}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-end justify-end gap-2">
                    <button className="border border-slate-200 text-slate-700 py-1.5 px-3 rounded-lg font-medium hover:bg-slate-50 transition-colors text-xs">
                        View Details
                    </button>
                    <button className="border border-slate-200 text-red-500 py-1.5 px-3 rounded-lg font-medium hover:bg-red-50 transition-colors text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">delete</span>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SavedItemsPage;