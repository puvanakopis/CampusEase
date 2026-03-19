import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import useNavigateTo from "../../hooks/useNavigateTo";
import { AuthContext } from "../../context/AuthContext";
import { buildPhotoUrl } from "../../utils/photoUtils";

const AdminNavbar = () => {
    const navigateTo = useNavigateTo();
    const location = useLocation();
    const { currentUser, logout } = useContext(AuthContext);

    const availableKey = location.pathname.split("/")[2] || "";

    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const first_name = currentUser ? `${currentUser.first_name} `.trim() : "Admin";
    const avatar = buildPhotoUrl(currentUser?.photo.filename, "user_photo", currentUser.first_name);
    const role = currentUser?.role || "admin";
    const email = currentUser?.email || "";

    const navItems = [
        { label: "Dashboard", path: "/admin/dashboard", key: "dashboard" },
        { label: "Accommodation", path: "/admin/accommodation", key: "accommodation" },
        { label: "Vehicles", path: "/admin/vehicles", key: "vehicles" },
        { label: "Owner", path: "/admin/owner", key: "owner" },
        { label: "Users", path: "/admin/users", key: "users" },
        { label: "Bookings", path: "/admin/bookings", key: "bookings" },
    ];

    const profileMenu = [
        { label: "Profile", icon: "person", path: "/admin/profile" },
        { label: "Support", icon: "support", path: "/admin/support" },
        { label: "Logout", icon: "logout", isLogout: true },
    ];

    useEffect(() => {
        const handler = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleProfileAction = (item) => {
        if (item.isLogout) {
            logout();
            return;
        }
        navigateTo(item.path);
        setIsProfileOpen(false);
        setIsOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between px-4 md:px-24 max-w-8xl mx-auto">

                {/* Logo */}
                <div
                    className="flex items-center gap-2 text-primary cursor-pointer"
                    onClick={() => navigateTo("/admin/dashboard")}
                >
                    <span className="material-symbols-outlined text-3xl">school</span>
                    <div className="flex flex-col leading-tight">
                        <h2 className="text-slate-900 text-xl font-bold tracking-tight">
                            CampusEase
                        </h2>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
                            Admin Dashboard
                        </span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex flex-1 justify-center gap-8">
                    {navItems.map((item) => {
                        const isAvailable = availableKey === item.key;
                        return (
                            <button
                                key={item.key}
                                onClick={() => navigateTo(item.path)}
                                className={`text-sm font-medium transition-colors ${isAvailable ? "text-primary font-bold" : "text-slate-600 hover:text-primary"}`}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                {/* Profile Section */}
                <div className="flex items-center gap-3">
                    {currentUser && (
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 p-2 rounded-lg transition-colors"
                            >
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-medium text-slate-900">{first_name}</span>
                                    <span className="text-xs text-slate-500">{role}</span>
                                </div>
                                <img
                                    src={avatar}
                                    alt={first_name}
                                    className="w-10 h-10 rounded-full border-2 border-white shadow"
                                />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden z-50">
                                    {profileMenu.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleProfileAction(item)}
                                            className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-left transition-colors hover:bg-slate-50 ${item.isLogout ? "text-red-600" : "text-slate-700"
                                                }`}
                                        >
                                            <span
                                                className={`material-symbols-outlined text-[20px] ${item.isLogout ? "text-red-600" : "text-slate-500"
                                                    }`}
                                            >
                                                {item.icon}
                                            </span>

                                            <span>{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex items-center justify-center p-2 text-slate-700 hover:text-primary"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="material-symbols-outlined text-3xl">
                            {isOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-slate-200">
                    <div className="flex flex-col items-center px-4 py-4 gap-4">
                        {navItems.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => { navigateTo(item.path); setIsOpen(false); }}
                                className={`w-full text-center text-sm font-medium transition-colors ${availableKey === item.key ? "text-primary" : "text-slate-600 hover:text-primary"}`}
                            >
                                {item.label}
                            </button>
                        ))}

                        {currentUser && (
                            <div className="w-full border-t border-slate-200 pt-4">
                                <div className="flex items-center gap-3 mb-4 px-4">
                                    <img src={avatar} alt={first_name} className="w-12 h-12 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-slate-900">{first_name}</p>
                                        <p className="text-sm text-slate-500">{email}</p>
                                    </div>
                                </div>

                                {profileMenu.map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => handleProfileAction(item)}
                                        className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors ${item.isLogout ? "text-red-600" : "text-slate-700"}`}
                                    >
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default AdminNavbar;
