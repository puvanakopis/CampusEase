import React from "react";
import { useLocation } from "react-router-dom";
import useNavigateTo from "../../hooks/useNavigateTo";

const Sidebar = () => {
    const navigateTo = useNavigateTo();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-full md:w-64 flex flex-col gap-2">
            <nav className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden py-2">
                <button
                    onClick={() => navigateTo("/profile")}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors w-full text-left ${isActive("/profile") ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    <span className="material-symbols-outlined">person</span>
                    Profile
                </button>

                <button
                    onClick={() => navigateTo("/bookings")}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors w-full text-left ${isActive("/bookings") ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    <span className="material-symbols-outlined">calendar_month</span>
                    My Bookings
                </button>

                <button
                    onClick={() => navigateTo("/saved-items")}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors w-full text-left ${isActive("/saved-items") ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    <span className="material-symbols-outlined">favorite</span>
                    Saved Items
                </button>

                <button
                    onClick={() => navigateTo("/settings")}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors w-full text-left ${isActive("/settings") ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    <span className="material-symbols-outlined">settings</span>
                    Settings
                </button>

                <button
                    onClick={() => navigateTo("/support")}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors w-full text-left ${isActive("/support") ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    <span className="material-symbols-outlined">help</span>
                    Support
                </button>

                <hr className="mx-6 my-2 border-slate-100" />

                <button
                    onClick={() => navigateTo("/logout")}
                    className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                >
                    <span className="material-symbols-outlined">logout</span>
                    Logout
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;