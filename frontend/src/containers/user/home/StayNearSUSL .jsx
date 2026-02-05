import React from "react";

const StayNearSUSL = () => {
    const accommodations = [
        {
            title: "Riverview Annex",
            price: "8k",
            location: "Pambahinna Junction",
            features: ["200m to SUSL", "Wifi"],
            rating: 4.8,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCI5BnAKspEOg_BzW-S6Bd0vthfJXCjNSmdAVzbeMnGiInqD4TBHKDoOIHCmS6Wl_-j8cyilhjlemCGKvQ-n1wgYe3NuA5MtA0thgik4PnK2zwWjlnCbBZ78oO7XVGNhOz1W-LTZM9dUrEmHJdqLrWTK0vkuLsWIRRToS00v0JSqQOamGhp7nchxCb_OwNQdbrecjCejjwZb_mCzQrFoeONrze74vZ6eI97C-ewlMUlmKffkx1wty73DzxgB2LgNXqzWmGTURPZbsw",
        },
        {
            title: "Hilltop Girls' Hostel",
            price: "6k",
            location: "Belihuloya Town",
            features: ["Meals Inc.", "Secure"],
            rating: 4.5,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBwOUPIKoOHaAM_E-TBru2zCVRI3Ssm_LYBqy9OohQOx9fZ7bJFKvFZeXYP-TL5_hnUPQRzHpFmqXIkmL594Z2YVtMNyZ6adghT3SaAi0Q29G-yRY1dWnDXX4DuymdYSw76W9egefXCZ7WnVcqqgYIreJXZ9-WdrrDNT-ZVxNJlTNElTURfj5tpQpeMRuNJtM2fGiyxD9VRg_Si88XLJUgR7cYjdntOdqJg3Yo4z7js1y1HXXZkV1FJXr76YpQn-c4zmKy77-uQ4bI",
        },
        {
            title: "Samanala View Apartment",
            price: "25k",
            location: "Balangoda Road",
            features: ["Family/Staff", "Parking"],
            rating: 4.9,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuC0R2QIf_k1JNOSwOn1AC0_WqkqO5eKVda4ivqmZwvdv3VIl1yDnPjjDvAE7-w8LP2SB_Mig3oBdo3OwnJ0NDs22EaJijDTsXaOvwmhCNezV1e7mETm_tTtIxSnKjrafHBixV3CmEkQ1-CRFSbN4hAcDxG_ykK59Df3iqrneCMyAD7OJjOJI6bzOpVOHm2H0wLuFE7UCBidJ_VUioam4BBbeYwZAtl7_atptmr91L7l0_AHNS-fWypvtBPMfx34spiV5tlZDtOLypg",
        },
        {
            title: "Campus Edge Single Room",
            price: "5k",
            location: "Opposite SUSL Main Gate",
            features: ["Budget", "Single"],
            rating: 4.2,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBj70YCtt3xEQ41nzjit8EF3C5db8W9u5nFJ41O6tsQNQZ32UUuM0r-fKYxfvOefR7TyBkFee4rs8YZDVYTwXyeF5-2LN0ZZz3qRbc401qQBKu3-BLoGjavC3RQ8ElCf3xEA10qYwUGCWQ1qjTe0HQcnYP4a5EZfsLO31qfm3KcCDHNTpgkFbw3QYArc_yLM9k66cLBfwfJkDiVYNLjmY74jn02DsNtzcc-1VEe-oQxzEqhZKUDlPatpomI-ZActGKMR5Msq05n_iI",
        },
    ];

    return (
        <section className="px-4 my-16 md:px-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Stay Near SUSL</h2>
                <a
                    className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
                    href="#"
                >
                    View All in Belihuloya
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {accommodations.map((acc, index) => (
                    <div
                        key={index}
                        className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-primary/50  transition-shadow"
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-sm z-10">
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>{" "}
                                {acc.rating}
                            </div>
                            <img
                                alt={acc.title}
                                src={acc.image}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="flex flex-col p-4 gap-2 flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{acc.title}</h3>
                                <span className="text-primary font-bold text-sm whitespace-nowrap">
                                    LKR {acc.price}
                                    <span className="text-slate-400 font-normal text-xs">/mo</span>
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">location_on</span>
                                {acc.location}
                            </p>
                            <div className="mt-auto pt-3 flex gap-2">
                                {acc.features.map((feature, i) => (
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

export default StayNearSUSL;