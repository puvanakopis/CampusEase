import React from "react";
import { useLocation } from "react-router-dom";
import useNavigateTo from "../../hooks/useNavigateTo";

const OwnerSidebar = () => {
    const navigateTo = useNavigateTo();
    const location = useLocation();

    const isAvailable = (path) => location.pathname === path;

    return (
        <aside className="w-full md:w-64 flex flex-col gap-2">
            <nav className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="py-1">
                    <button
                        onClick={() => navigateTo("/owner/profile")}
                        className={`flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors w-full text-left hover:bg-slate-50 ${isAvailable("/owner/profile")
                            ? "bg-primary/5 text-primary border-l-4 border-primary"
                            : "text-slate-600"
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">person</span>
                        <span>Profile</span>
                    </button>

                    <button
                        onClick={() => navigateTo("/owner/settings")}
                        className={`flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors w-full text-left hover:bg-slate-50 ${isAvailable("/owner/settings")
                            ? "bg-primary/5 text-primary border-l-4 border-primary"
                            : "text-slate-600"
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">settings</span>
                        <span>Settings</span>
                    </button>

                    <button
                        onClick={() => navigateTo("/owner/support")}
                        className={`flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors w-full text-left hover:bg-slate-50 ${isAvailable("/owner/support")
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

export default OwnerSidebar;