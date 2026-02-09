import React, { useState } from "react";

const accommodations = [
    {
        title: "Modern Student Annex - Wing A",
        price: "LKR 18,000",
        location: "Pambahinna Junction, Belihuloya",
        features: [
            { icon: "bed", label: "2 Beds" },
            { icon: "shower", label: "Private Bath" },
            { icon: "wifi", label: "Wifi" },
        ],
        badge: "Main Gate - 10 Min Walk",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1Y1oFNQkG1We2L0MNF7Kt1-7KiMRzBb3t9JnjoNr3aWMa9dMbmCuFpLtHKOJFVMG5ez9Egv45yDa_K3aMKhzr_NAYiDgp0GVfDlTc_3BYnD36XT5gZrrAnpdJIMCSubQ43rnHSNjSgDGSpB9rKAA06iFl7ODaXHqcRJmZBIR2Mhf0GhndjcxGi9JUcPh4CY_tYYQCUyP03JuU9ybDvGtFLL2Ux7_NEwQljcYtm6XNbfeBx_7FIX4Okf85f4-L9scD8D-A1HwOZDQ",
    },
    {
        title: "Deluxe Single Room - Wing B",
        price: "LKR 12,500",
        location: "Near SUSL Main Entrance, Belihuloya",
        features: [
            { icon: "person", label: "1 Student" },
            { icon: "desk", label: "Study Desk" },
            { icon: "bolt", label: "Utilities Incl." },
        ],
        badge: "Quiet Study Zone",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCsA04Rw25lyomrpZ5y3d6TVjuP_85_gu75HhL6boGsnqDsYBENScpjg5UC-lO1Z6K8M1Qs31FqeOyF1sbq3Q-CIDnLs1AHM-mJrpI1b7shDgC1MZdmnsTEkTAhrtPCYLsP6AYbHUXwB-QkJX-8VDsvbS-kped1X-Pw-0dbpi29pJf7JUJeGyvuUiyj22x9on4KEhaYPH4xziXrY3kl8ypqgNqM97XgCLiSAZsZONozQq45Ihy1XMS7Z7w7qKtMvk_xf8t5Bqo64I",
    },
];

const transportServices = [
    {
        title: "Premium Airport Shuttle",
        price: "LKR 3,500",
        description: "Direct service from SUSL to Colombo Airport",
        features: [
            { icon: "directions_bus", label: "12-Seater Van" },
            { icon: "schedule", label: "24/7 Service" },
            { icon: "luggage", label: "Baggage Incl." },
        ],
        badge: "Air-Conditioned",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    },
    {
        title: "Daily Local Transport",
        price: "LKR 500",
        description: "Regular service to nearby towns and facilities",
        features: [
            { icon: "directions_car", label: "4-Seater Car" },
            { icon: "schedule", label: "Hourly Trips" },
            { icon: "payments", label: "Cash/Card" },
        ],
        badge: "Scheduled Trips",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    },
    // Add remaining transport cards similarly
];

const Card = ({ item }) => (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-primary/50 transition-all">
        <div
            className="h-48 bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: `url(${item.image})` }}
        >
            <div className="p-3">
                <span className="bg-white/90 text-primary text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
                    {item.badge}
                </span>
            </div>
        </div>
        <div className="p-5">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg leading-tight">{item.title}</h4>
                <span className="text-primary font-black">{item.price}</span>
            </div>
            {item.description && (
                <p className="text-sm text-slate-500 mb-4 line-clamp-1">{item.description}</p>
            )}
            {item.location && (
                <p className="text-sm text-slate-500 mb-4 line-clamp-1">{item.location}</p>
            )}
            <div className="flex items-center gap-4 text-xs text-slate-600">
                {item.features.map((f, i) => (
                    <span key={i} className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">{f.icon}</span> {f.label}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

const TabsSection = () => {
    const [activeTab, setActiveTab] = useState("accommodations");

    const items = activeTab === "accommodations" ? accommodations : transportServices;

    return (
        <div className="lg:col-span-9 space-y-10">
            <div className="flex border-b border-slate-200 mb-8 overflow-x-auto hide-scrollbar">
                <button
                    onClick={() => setActiveTab("accommodations")}
                    className={`px-6 py-4 text-sm flex items-center gap-2 whitespace-nowrap ${activeTab === "accommodations"
                        ? "tab-active font-bold text-primary border-b-2 border-primary"
                        : "tab-inactive text-slate-500"
                        }`}
                >
                    <span className="material-symbols-outlined text-lg">home</span> Accommodations
                </button>
                <button
                    onClick={() => setActiveTab("transport")}
                    className={`px-6 py-4 text-sm flex items-center gap-2 whitespace-nowrap ${activeTab === "transport"
                        ? "tab-active font-bold text-primary border-b-2 border-primary"
                        : "tab-inactive text-slate-500"
                        }`}
                >
                    <span className="material-symbols-outlined text-lg">airport_shuttle</span> Transport
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item, idx) => (
                    <Card key={idx} item={item} />
                ))}
            </div>
        </div>
    );
};

export default TabsSection;