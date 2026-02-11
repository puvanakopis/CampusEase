import React from "react";
import useNavigateTo from "../../hooks/useNavigateTo";

const Footer = () => {
    const navigateTo = useNavigateTo();

    return (
        <footer className="mt-auto border-t border-slate-200 bg-white pt-16 pb-8">
            <div className="max-w-8xl mx-auto px-4 md:px-24 ">
                {/* Top Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Logo & Description */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-2xl">school</span>
                            <h2 className="text-slate-900 text-lg font-bold">
                                CampusEase SUSL
                            </h2>
                        </div>
                        <p className="text-slate-500 text-sm">
                            Helping the Sabaragamuwa University community find the perfect home away from home since 2023.
                        </p>
                    </div>

                    {/* Pages */}
                    <div className="flex flex-col gap-3 hidden md:flex">
                        <h3 className="font-bold text-slate-900">Pages</h3>
                        <button onClick={() => navigateTo("/")} className="text-slate-500 hover:text-primary text-sm text-left">Home</button>
                        <button onClick={() => navigateTo("/accommodation")} className="text-slate-500 hover:text-primary text-sm text-left">Accommodation</button>
                        <button onClick={() => navigateTo("/vehicle")} className="text-slate-500 hover:text-primary text-sm text-left">Vehicle</button>
                        <button onClick={() => navigateTo("/bookings")} className="text-slate-500 hover:text-primary text-sm text-left">My Bookings</button>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col gap-3 hidden md:flex">
                        <h3 className="font-bold text-slate-900">Support</h3>
                        <button onClick={() => navigateTo("/about")} className="text-slate-500 hover:text-primary text-sm text-left">About Us</button>
                        <button onClick={() => navigateTo("/contact")} className="text-slate-500 hover:text-primary text-sm text-left">Contact Us</button>
                        <button onClick={() => navigateTo("/owner")} className="text-slate-500 hover:text-primary text-sm text-left">Landlord Portal</button>
                        <button onClick={() => navigateTo("/support")} className="text-slate-500 hover:text-primary text-sm text-left">Support Center</button>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-3 hidden sm:flex">
                        <h3 className="font-bold text-slate-900">Contact</h3>
                        <p className="text-slate-500 text-sm flex items-center gap-2 hover:text-primary">
                            <span className="material-symbols-outlined text-base">mail</span> susl@campusease.lk
                        </p>
                        <p className="text-slate-500 text-sm flex items-center gap-2 hover:text-primary">
                            <span className="material-symbols-outlined text-base">location_on</span> Belihuloya, Sri Lanka
                        </p>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} CampusEase - Dedicated to SUSL. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a className="text-slate-400 hover:text-primary" href="https://www.susl.lk" target="_blank" rel="noreferrer">
                            <span className="material-symbols-outlined">public</span>
                        </a>
                        <a className="text-slate-400 hover:text-primary" href="https://www.facebook.com/CampusEaseSUSL" target="_blank" rel="noreferrer">
                            <span className="material-symbols-outlined">share</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;