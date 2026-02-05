import React, { useState } from "react";

const Hero = () => {
    const [mode, setMode] = useState("accommodation"); 
    const [location, setLocation] = useState("Belihuloya, Pambahinna");

    const handleSearch = () => {
        alert(`Searching for ${mode} at ${location}`);
    };

    return (
        <section className="relative w-full">
            <div className="relative flex min-h-[560px] flex-col items-center justify-center p-4 text-center">
                {/* Background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80 z-10"></div>
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDv124ENMaSKvYXRWTeOgjNkKagk00f6oxSt8XZ2KuXFdxkIch6g8SvNDrcZB55bBkYjSXLWS5_mpC3nOtmHqEA9cxn2EaEdOQTMWESssP4_TS92QC687DEGtr60SKKJiGFLaBBEhrLcixhNxvJtK7POOaviBFzB0Qtx7P09_a2eD9f2bpPvUxeES2LV3wswh1TUjH-FeMbQdqOyRXrr6f9bkDg-uCAuO9yQJTzwaWNeI-baSDq6NM96LWPWZA1CO3_JRdvsJ596o"
                        alt="Belihuloya scenic mountain view near Sabaragamuwa University"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="relative z-20 flex flex-col gap-6 max-w-4xl px-4 w-full">
                    <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-sm">
                        Simplifying Campus Life at Sabaragamuwa University
                    </h1>
                    <p className="text-slate-100 text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-md">
                        Find verified hostels in Belihuloya and reliable transport routes to Pambahinna in just a few clicks.
                    </p>

                    {/* Select Mode Buttons */}
                    <div className="mt-6 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden p-2">
                        <div className="flex gap-2 mb-2 p-1">
                            <button
                                className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-colors ${mode === "accommodation"
                                    ? "text-primary bg-primary/10"
                                    : "text-slate-500 hover:bg-slate-100"
                                    }`}
                                onClick={() => setMode("accommodation")}
                            >
                                <span className="material-symbols-outlined text-lg">home_work</span>
                                Find Accommodation
                            </button>
                            <button
                                className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-colors ${mode === "transport"
                                    ? "text-primary bg-primary/10"
                                    : "text-slate-500 hover:bg-slate-100"
                                    }`}
                                onClick={() => setMode("transport")}
                            >
                                <span className="material-symbols-outlined text-lg">directions_bus</span>
                                Book a Ride
                            </button>
                        </div>

                        {/* Location Input + Search */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 h-12">
                                <span className="material-symbols-outlined text-slate-400">location_on</span>
                                <input
                                    type="text"
                                    className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm md:text-base ml-2 outline-none focus:outline-none focus:ring-0"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                            <button
                                className="h-12 px-8 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;