import React from "react";
import { useLocation } from "react-router-dom";
import useNavigateTo from "../../hooks/useNavigateTo";

const Sidebar = () => {
    const navigateTo = useNavigateTo();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-full md:w-64 flex flex-col gap-2">
            <nav className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="py-1">
                    <button
                        onClick={() => navigateTo("/profile")}
                        className={`flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors w-full text-left hover:bg-slate-50 ${isActive("/profile")
                                ? "bg-primary/5 text-primary border-l-4 border-primary"
                                : "text-slate-600"
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">person</span>
                        <span>Profile</span>
                    </button>

                    <button
                        onClick={() => navigateTo("/my-bookings")}
                        className={`flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors w-full text-left hover:bg-slate-50 ${isActive("/my-bookings")
                                ? "bg-primary/5 text-primary border-l-4 border-primary"
                                : "text-slate-600"
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">calendar_month</span>
                        <span>My Bookings</span>
                    </button>

                    <button
                        onClick={() => navigateTo("/saved-items")}
                        className={`flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors w-full text-left hover:bg-slate-50 ${isActive("/saved-items")
                                ? "bg-primary/5 text-primary border-l-4 border-primary"
                                : "text-slate-600"
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">favorite</span>
                        <span>Saved Items</span>
                    </button>

                    <button
                        onClick={() => navigateTo("/settings")}
                        className={`flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors w-full text-left hover:bg-slate-50 ${isActive("/settings")
                                ? "bg-primary/5 text-primary border-l-4 border-primary"
                                : "text-slate-600"
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">settings</span>
                        <span>Settings</span>
                    </button>

                    <button
                        onClick={() => navigateTo("/support")}
                        className={`flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors w-full text-left hover:bg-slate-50 ${isActive("/support")
                                ? "bg-primary/5 text-primary border-l-4 border-primary"
                                : "text-slate-600"
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">help</span>
                        <span>Support</span>
                    </button>
                </div>

                <div className="border-t border-slate-100 my-1"></div>

                <div className="py-1">
                    <button
                        onClick={() => navigateTo("/logout")}
                        className="flex items-center gap-3 px-6 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                    >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        <span>Logout</span>
                    </button>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;