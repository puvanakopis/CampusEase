import React from "react";

const Footer = () => {
    return (
        <footer className="mt-auto border-t border-slate-200 bg-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
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

                    {/* Areas */}
                    <div className="flex flex-col gap-3 hidden md:flex">
                        <h3 className="font-bold text-slate-900">Sabaragamuwa Areas</h3>
                        <a className="text-slate-500 hover:text-primary text-sm" href="#">Belihuloya Town</a>
                        <a className="text-slate-500 hover:text-primary text-sm" href="#">Pambahinna Junction</a>
                        <a className="text-slate-500 hover:text-primary text-sm" href="#">Balangoda Town</a>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col gap-3 hidden md:flex">
                        <h3 className="font-bold text-slate-900">Support</h3>
                        <a className="text-slate-500 hover:text-primary text-sm" href="#">How to Book</a>
                        <a className="text-slate-500 hover:text-primary text-sm" href="#">Contact Us</a>
                        <a className="text-slate-500 hover:text-primary text-sm" href="#">Landlord Portal</a>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-3 hidden sm:flex">
                        <h3 className="font-bold text-slate-900">Contact</h3>
                        <p className="text-slate-500 text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">mail</span> susl@campusease.lk
                        </p>
                        <p className="text-slate-500 text-sm flex items-center gap-2">
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
                        <a className="text-slate-400 hover:text-primary" href="#">
                            <span className="material-symbols-outlined">public</span>
                        </a>
                        <a className="text-slate-400 hover:text-primary" href="#">
                            <span className="material-symbols-outlined">share</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;