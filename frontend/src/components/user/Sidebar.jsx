import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import useNavigateTo from "../../hooks/useNavigateTo";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
    const navigateTo = useNavigateTo();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const { logout } = useContext(AuthContext);

    const isActive = (path) => location.pathname === path;

    const handleNavigation = (path) => {
        navigateTo(path);
        setIsMobileMenuOpen(false);
    };

    const DesktopSidebarContent = () => (
        <aside className="hidden lg:block w-64 flex-col gap-2">
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
                        onClick={logout}
                        className="flex items-center gap-3 px-6 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                    >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        <span>Logout</span>
                    </button>
                </div>
            </nav>
        </aside>
    );

    const MobileMenuButton = () => (
        <div className="lg:hidden mb-4">
            <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex items-center gap-2 w-full bg-white border border-[#e7edf3] rounded-lg px-4 py-3 text-sm font-medium text-[#0d141b] hover:bg-gray-50 transition-colors"
            >
                <span className="material-symbols-outlined text-primary">menu</span>
                <span>Menu</span>
            </button>
        </div>
    );

    const MobileDrawer = () => (
        <div className="lg:hidden">
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div
                className={`fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between p-6">
                        <h2 className="text-lg font-bold text-[#0d141b]">Menu</h2>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto ">
                        <nav className="bg-white overflow-hidden">
                            <div className="py-1">
                                <button
                                    onClick={() => handleNavigation("/profile")}
                                    className={`flex items-center gap-3 px-6 py-4 text-base font-medium transition-colors w-full text-left hover:bg-slate-50 ${isActive("/profile")
                                            ? "bg-primary/5 text-primary border-l-4 border-primary"
                                            : "text-slate-600"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-xl">person</span>
                                    <span>Profile</span>
                                </button>

                                <button
                                    onClick={() => handleNavigation("/my-bookings")}
                                    className={`flex items-center gap-3 px-6 py-4 text-base font-medium transition-colors w-full text-left hover:bg-slate-50 ${isActive("/my-bookings")
                                            ? "bg-primary/5 text-primary border-l-4 border-primary"
                                            : "text-slate-600"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-xl">calendar_month</span>
                                    <span>My Bookings</span>
                                </button>

                                <button
                                    onClick={() => handleNavigation("/saved-items")}
                                    className={`flex items-center gap-3 px-6 py-4 text-base font-medium transition-colors w-full text-left hover:bg-slate-50 ${isActive("/saved-items")
                                            ? "bg-primary/5 text-primary border-l-4 border-primary"
                                            : "text-slate-600"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-xl">favorite</span>
                                    <span>Saved Items</span>
                                </button>

                                <button
                                    onClick={() => handleNavigation("/settings")}
                                    className={`flex items-center gap-3 px-6 py-4 text-base font-medium transition-colors w-full text-left hover:bg-slate-50 ${isActive("/settings")
                                            ? "bg-primary/5 text-primary border-l-4 border-primary"
                                            : "text-slate-600"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-xl">settings</span>
                                    <span>Settings</span>
                                </button>

                                <button
                                    onClick={() => handleNavigation("/support")}
                                    className={`flex items-center gap-3 px-6 py-4 text-base font-medium transition-colors w-full text-left hover:bg-slate-50 ${isActive("/support")
                                            ? "bg-primary/5 text-primary border-l-4 border-primary"
                                            : "text-slate-600"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-xl">help</span>
                                    <span>Support</span>
                                </button>
                            </div>

                            <div className="border-t border-slate-100 my-1"></div>

                            <div className="py-1">
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-3 px-6 py-4 text-base font-medium text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                                >
                                    <span className="material-symbols-outlined text-xl">logout</span>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <DesktopSidebarContent />
            <MobileMenuButton />
            <MobileDrawer />
        </>
    );
};

export default Sidebar;