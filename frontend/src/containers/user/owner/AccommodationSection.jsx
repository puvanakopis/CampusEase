import React, { useState } from "react";

const AccommodationSection = () => {
    const [activeTab, setActiveTab] = useState("accommodations");

    return (
        <div className="lg:col-span-9 space-y-10">
            {/* Tabs */}
            <div>
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
                        <span className="material-symbols-outlined text-lg">airport_shuttle</span> Transport Services
                    </button>
                </div>

                {/* Content based on active tab */}
                {activeTab === "accommodations" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Accommodation Card 1 */}
                        <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-primary/50 transition-all">
                            <div
                                className="h-48 bg-cover bg-center overflow-hidden"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1Y1oFNQkG1We2L0MNF7Kt1-7KiMRzBb3t9JnjoNr3aWMa9dMbmCuFpLtHKOJFVMG5ez9Egv45yDa_K3aMKhzr_NAYiDgp0GVfDlTc_3BYnD36XT5gZrrAnpdJIMCSubQ43rnHSNjSgDGSpB9rKAA06iFl7ODaXHqcRJmZBIR2Mhf0GhndjcxGi9JUcPh4CY_tYYQCUyP03JuU9ybDvGtFLL2Ux7_NEwQljcYtm6XNbfeBx_7FIX4Okf85f4-L9scD8D-A1HwOZDQ")',
                                }}
                            >
                                <div className="p-3">
                                    <span className="bg-white/90 text-primary text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
                                        Main Gate - 10 Min Walk
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg leading-tight">Modern Student Annex - Wing A</h4>
                                    <span className="text-primary font-black">LKR 18,000</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-4 line-clamp-1">Pambahinna Junction, Belihuloya</p>
                                <div className="flex items-center gap-4 text-xs text-slate-600">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">bed</span> 2 Beds
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">shower</span> Private Bath
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">wifi</span> Wifi
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Accommodation Card 2 */}
                        <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-primary/50 transition-all">
                            <div
                                className="h-48 bg-cover bg-center overflow-hidden"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCsA04Rw25lyomrpZ5y3d6TVjuP_85_gu75HhL6boGsnqDsYBENScpjg5UC-lO1Z6K8M1Qs31FqeOyF1sbq3Q-CIDnLs1AHM-mJrpI1b7shDgC1MZdmnsTEkTAhrtPCYLsP6AYbHUXwB-QkJX-8VDsvbS-kped1X-Pw-0dbpi29pJf7JUJeGyvuUiyj22x9on4KEhaYPH4xziXrY3kl8ypqgNqM97XgCLiSAZsZONozQq45Ihy1XMS7Z7w7qKtMvk_xf8t5Bqo64I")',
                                }}
                            >
                                <div className="p-3">
                                    <span className="bg-white/90 text-primary text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
                                        Quiet Study Zone
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg leading-tight">Deluxe Single Room - Wing B</h4>
                                    <span className="text-primary font-black">LKR 12,500</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-4 line-clamp-1">Near SUSL Main Entrance, Belihuloya</p>
                                <div className="flex items-center gap-4 text-xs text-slate-600">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">person</span> 1 Student
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">desk</span> Study Desk
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">bolt</span> Utilities Incl.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "transport" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Transport Card 1 - Airport Shuttle */}
                        <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-primary/50 transition-all">
                            <div
                                className="h-48 bg-cover bg-center overflow-hidden"
                                style={{
                                    backgroundImage:
                                        'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80")',
                                }}
                            >
                                <div className="p-3">
                                    <span className="bg-white/90 text-primary text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
                                        Air-Conditioned
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg leading-tight">Premium Airport Shuttle</h4>
                                    <span className="text-primary font-black">LKR 3,500</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-4 line-clamp-1">Direct service from SUSL to Colombo Airport</p>
                                <div className="flex items-center gap-4 text-xs text-slate-600">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">directions_bus</span> 12-Seater Van
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">schedule</span> 24/7 Service
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">luggage</span> Baggage Incl.
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Transport Card 2 - Local Transport */}
                        <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-primary/50 transition-all">
                            <div
                                className="h-48 bg-cover bg-center overflow-hidden"
                                style={{
                                    backgroundImage:
                                        'url("https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80")',
                                }}
                            >
                                <div className="p-3">
                                    <span className="bg-white/90 text-primary text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
                                        Scheduled Trips
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg leading-tight">Daily Local Transport</h4>
                                    <span className="text-primary font-black">LKR 500</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-4 line-clamp-1">Regular service to nearby towns and facilities</p>
                                <div className="flex items-center gap-4 text-xs text-slate-600">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">directions_car</span> 4-Seater Car
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">schedule</span> Hourly Trips
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">payments</span> Cash/Card
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Transport Card 3 - Weekend Service */}
                        <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-primary/50 transition-all">
                            <div
                                className="h-48 bg-cover bg-center overflow-hidden"
                                style={{
                                    backgroundImage:
                                        'url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
                                }}
                            >
                                <div className="p-3">
                                    <span className="bg-white/90 text-primary text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
                                        Weekend Special
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg leading-tight">Weekend City Shuttle</h4>
                                    <span className="text-primary font-black">LKR 2,000</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-4 line-clamp-1">Weekend trips to Colombo and major cities</p>
                                <div className="flex items-center gap-4 text-xs text-slate-600">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">airport_shuttle</span> Comfort Coach
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">weekend</span> Fri-Sun
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">wifi</span> Free WiFi
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Transport Card 4 - Emergency Service */}
                        <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-primary/50 transition-all">
                            <div
                                className="h-48 bg-cover bg-center overflow-hidden"
                                style={{
                                    backgroundImage:
                                        'url("https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
                                }}
                            >
                                <div className="p-3">
                                    <span className="bg-white/90 text-primary text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
                                        Emergency Service
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg leading-tight">24/7 Emergency Transport</h4>
                                    <span className="text-primary font-black">LKR 4,000</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-4 line-clamp-1">Immediate transport for medical or urgent needs</p>
                                <div className="flex items-center gap-4 text-xs text-slate-600">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">emergency</span> On Call
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">medical_services</span> Medical Priority
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">support_agent</span> 24/7 Support
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Reviews Section */}
            <div className="pt-10 border-t border-slate-200">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black">Reviews from Students</h3>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-yellow-400 fill-current">star</span>
                        <span className="font-bold">4.9</span>
                        <span className="text-slate-400 text-sm">(120 Reviews)</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Review Card 1 */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 relative">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                alt="Student"
                                className="h-10 w-10 rounded-full bg-slate-100 object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm7lkysdTuv3I_kq8ciERHGGL7JVa-FVApEdgzrPe6jRpVMojrflO2N4b-UH0AfhGIKjp7ha5WWa8p8t8pfcKKh81NqdBSMpmnkUtC0_a-_08rJ3-sKydInfqZHV9WXy7-vbYWupPGvmrpKqZjM9RcDaaPQ2bl_f7O2UMuYoM0qrLpRVrBm5n1H-hciyucGOCxy1DAvk_KqYcSFgFHvLzrYX8kj1SpoVrzw90eL1otSU4CYAnYE4Np_tubeK1Ngw5STRB6i3vSYYY"
                            />
                            <div>
                                <h5 className="font-bold text-sm">Tharindu S.</h5>
                                <p className="text-[10px] text-slate-500 font-medium">Applied Sciences • 3rd Year</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            "Mrs. Priyani is like a second mother. The rooms are always clean and the environment is
                            perfect for late-night studying. Best place to stay near SUSL."
                        </p>
                        <div className="mt-4 flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="material-symbols-outlined text-sm text-yellow-400 fill-current">
                                    star
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Review Card 2 */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 relative">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                alt="Student"
                                className="h-10 w-10 rounded-full bg-slate-100 object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_nBbP2HtGqTL6ZAZVhEObv5yC-hnDuA-o7EGwsXz0YZHJcyHGycbkVmOH1DkdLJ2T0Vu8t1RK-2TXNooeO4JepJ2m1H6Q9gBBrFvkhEdl_5-GV9h2tq0Hnmsourm2__FE7lurL6yEJncptXX8Ga6UoUdJbnzDOxzYmobQe6BQIey0KufszpUq5kbX00WAH-DurYz3ZP26RFoWAbQOnn51cs7P268qOMNG1Tm1ypckmHcgzudEQcy22JY-_P8LVuZzIOt1SgR-Gnw"
                            />
                            <div>
                                <h5 className="font-bold text-sm">Kasun S.</h5>
                                <p className="text-[10px] text-slate-500 font-medium">Management Faculty • Alumnus</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            "Stayed here for 4 years. Never had issues with water or electricity. The transport
                            service she offers is also very reliable for holiday travels."
                        </p>
                        <div className="mt-4 flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="material-symbols-outlined text-sm text-yellow-400 fill-current">
                                    star
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <button className="mt-8 w-full py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    Read all 120 reviews
                </button>
            </div>
        </div>
    );
};

export default AccommodationSection;