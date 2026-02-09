import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useNavigateTo from "../../hooks/useNavigateTo";

const OwnerNavbar = () => {
    const navigateTo = useNavigateTo();
    const location = useLocation();

    const activeKey = location.pathname.split("/")[2] || "";

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const navItems = [
        { label: "Overview", path: "/owner/", key: "" },
        { label: "Accommodation", path: "/owner/accommodation", key: "accommodation" },
        { label: "Vehicle", path: "/owner/vehicle", key: "vehicle" },
        { label: "Bookings", path: "/owner/bookings", key: "bookings" },
        { label: "Earnings", path: "/owner/earnings", key: "earnings" },
    ];

    const profileMenu = [
        { label: "Profile", icon: "person", path: "/owner/profile" },
        { label: "Settings", icon: "settings", path: "/owner/settings" },
        { label: "Help Center", icon: "help", path: "/owner/help" },
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
            navigateTo("/");
        } else {
            navigateTo(item.path);
        }
        setIsProfileOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between px-4 md:px-24 max-w-8xl mx-auto">

                {/* Logo */}
                <div
                    className="flex items-center gap-2 text-primary cursor-pointer"
                    onClick={() => navigateTo("/")}
                >
                    <span className="material-symbols-outlined text-3xl">school</span>
                    <div className="flex flex-col leading-tight">
                        <h2 className="text-slate-900 text-xl font-bold tracking-tight">
                            CampusEase
                        </h2>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
                            Owner Dashboard
                        </span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex flex-1 justify-center gap-8">
                    {navItems.map((item) => {
                        const isActive = activeKey === item.key;

                        return (
                            <button
                                key={item.key}
                                onClick={() => navigateTo(item.path)}
                                className={`
                                    text-sm transition-all font-medium relative pb-1
                                    ${isActive ? "text-primary font-bold" : "text-slate-600 hover:text-primary"}
                                `}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                {/* Profile Section */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs"
                    >
                        PO
                    </button>

                    {/* Dropdown */}
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                            {profileMenu.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleProfileAction(item)}
                                    className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors ${item.isLogout ? "text-red-600" : "text-slate-700"
                                        }`}
                                >
                                    <span
                                        className={`material-symbols-outlined ${item.isLogout ? "text-red-600" : "text-slate-600"
                                            }`}
                                    >
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {item.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default OwnerNavbar;