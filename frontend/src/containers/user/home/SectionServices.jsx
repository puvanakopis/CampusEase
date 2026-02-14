import React from "react";
import home1 from "../../../assets/home1.png"
import home2 from "../../../assets/home2.png"

const ServicesSection = () => {
    return (
        <section className="px-4 mt-20 md:px-24 max-w-8xl mx-auto">
            <div className="flex flex-col gap-2 pb-4">
                <h2 className="text-slate-900 text-3xl font-bold">
                    Services for SUSL Students &amp; Staff
                </h2>
                <p className="text-slate-500 text-lg">
                    Tailored solutions for the Sabaragamuwa University community.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Accommodation Card */}
                <a
                    className="group relative overflow-hidden rounded-2xl h-64 md:h-80 shadow-md"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity group-hover:from-black/90"></div>

                    <img
                        alt="Hostel room in Belihuloya area"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={home1}
                    />

                    <div className="absolute bottom-0 left-0 p-6 z-20 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-primary bg-white/90 w-fit px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                            <span className="material-symbols-outlined text-sm">bed</span>
                            Accommodation
                        </div>

                        <h3 className="text-white text-2xl font-bold">
                            Belihuloya Boarding Places
                        </h3>

                        <p className="text-slate-200 text-sm font-medium opacity-90">
                            Find verified rooms and annexes within walking distance to SUSL.
                        </p>
                    </div>
                </a>

                {/* Vehicle Rentals Card */}
                <a
                    className="group relative overflow-hidden rounded-2xl h-64 md:h-80 shadow-md"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity group-hover:from-black/90"></div>

                    <img
                        alt="Bus on Pambahinna road"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={home2}
                    />

                    <div className="absolute bottom-0 left-0 p-6 z-20 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-primary bg-white/90 w-fit px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                            <span className="material-symbols-outlined text-sm">directions_car</span>
                            Vehicle Rentals
                        </div>

                        <h3 className="text-white text-2xl font-bold">Campus Vehicle Rentals</h3>

                        <p className="text-slate-200 text-sm font-medium opacity-90">
                            Rent verified cars, vans, and bikes for your campus and nearby trips.
                        </p>
                    </div>
                </a>

            </div>
        </section>
    );
};

export default ServicesSection;