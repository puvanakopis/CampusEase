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
        <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 md:px-10">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">Saved Items</h1>
                <p className="text-slate-500">
                    Keep track of your favorite accommodations and vehicles.
                </p>
            </div>

            {/* Saved Accommodations */}
            <section className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">bed</span>
                    <h2 className="text-xl font-bold text-slate-900">Saved Accommodations ({accommodations.length})</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {accommodations.map((item) => (
                        <ItemCard key={item.id} data={item} />
                    ))}
                </div>
            </section>

            {/* Saved Vehicles */}
            <section className="flex flex-col gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">directions_car</span>
                    <h2 className="text-xl font-bold text-slate-900">Saved Vehicles ({vehicles.length})</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {vehicles.map((vehicle) => (
                        <ItemCard key={vehicle.id} data={vehicle} isVehicle />
                    ))}
                </div>
            </section>
        </div>
    );
};

const ItemCard = ({ data, isVehicle = false }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
            <div className="md:w-48 h-48 md:h-auto shrink-0 relative">
                <img
                    alt={data.title}
                    className="h-full w-full object-cover"
                    src={data.image}
                />
                <button className="absolute top-3 right-3 bg-white/90 text-red-500 rounded-full h-8 w-8 flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </button>
                <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {data.type}
                </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                    <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="text-lg font-bold text-slate-900 leading-tight">{data.title}</h3>
                        <div className="flex flex-col items-end">
                            <span className="text-primary font-bold text-lg whitespace-nowrap">
                                LKR {data.price}
                            </span>
                            {isVehicle ? null : <span className="text-xs text-slate-400">/mo</span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-slate-500 text-sm mb-4">
                        <p className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base text-slate-400">location_on</span>
                            {data.location}
                        </p>
                        {isVehicle ? (
                            <p className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base text-slate-400">calendar_today</span>
                                Date: {data.date}
                            </p>
                        ) : (
                            <p className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base text-slate-400">group</span>
                                {data.feature}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-end justify-end gap-3">
                    <button className="px-4 border border-slate-200 text-slate-600 text-sm font-bold h-10 rounded-lg hover:bg-slate-50 transition-colors">
                        View Details
                    </button>
                    <button className="px-4 border border-slate-200 text-red-500 text-sm font-bold h-10 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">delete</span> Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SavedItemsPage;