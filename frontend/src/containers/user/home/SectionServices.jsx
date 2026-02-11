import React from "react";

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
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_tkLtkH1vaYU_ReMiRCIarNLNs09ZENFSuSARKfD8Rf9z5qnO-Kh6fZlY-9w0G6F7yi_ukFlFTwS0a9Q8bhbSyNBBWXuc8i34Fy4XK7adDr1mlsOK9zL0n2y_PqjpQnC9GS4DVqNPJMu3v0uNtiOuJnkNXesTypBDeitAwq7tF1A_1AcEKK1lzm-hxqB0GunpGjBxEhRyBXOp50rHF741u2hy6dfY4wV15AADfdSxROYMM44XohjyjBuHGMQvXW9dHAbfZa-xUpM"
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
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjkxWHZxl-NSBLXFxHVOHgLzHxOzFkaOMSE4b9j3k_ajtyCXDsfPuTpCQ0p2pzrkBb2P9DRhnE-GB9xrX6cdTMsA323Bran_XWC-NBG4e_yqLiNq0tA6_fdhSKiwbh7dj6_xqcU_VVv6UBBmuxQUtfgzzfFVSqytpQfPhCUiLfazjnWSSx4DYlvleyS99dkEbfJWPATf0QRaRP6qqsjii77Xq8XXZ0tWJRnbt2yfYz0crn7tTLTJfBiwskW860FcR9aUv52BCmh1A"
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