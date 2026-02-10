import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useNavigateTo from "../../hooks/useNavigateTo";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigateTo = useNavigateTo();
    const location = useLocation();
    const profileRef = useRef(null);

    const [user, setUser] = useState({
        isLoggedIn: true,
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://i.pravatar.cc/256?u=john.doe@example.com",
        role: "Student"
    });
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Accommodation", path: "/accommodation" },
        { name: "Vehicle", path: "/vehicle" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const profileMenuItems = [
        { name: "Profile", path: "/profile", icon: "person" },
        { name: "My Bookings", path: "/bookings", icon: "bookmarks" },
        { name: "Logout", path: "/logout", icon: "logout", isLogout: true }
    ];

    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleProfileAction = (item) => {
        if (item.isLogout) {
            setUser({ ...user, isLoggedIn: false });
            navigateTo("/");
        } else {
            navigateTo(item.path);
        }
        setIsProfileOpen(false);
        setIsOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-background-light/95 backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between px-4 md:px-24 max-w-8xl mx-auto">

                {/* Logo */}
                <div
                    onClick={() => navigateTo("/")}
                    className="flex items-center gap-2 text-primary cursor-pointer"
                >
                    <span className="material-symbols-outlined text-3xl">school</span>
                    <div className="flex flex-col leading-tight">
                        <h2 className="text-slate-900 text-xl font-bold tracking-tight">CampusEase</h2>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-primary">Sabaragamuwa</span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex flex-1 justify-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigateTo(item.path)}
                            className={`text-sm font-medium transition-colors ${isActive(item.path) ? "text-primary" : "text-slate-600 hover:text-primary"
                                }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* User Area */}
                <div className="flex items-center gap-3">
                    {user.isLoggedIn ? (
                        <>
                            {/* Desktop Profile */}
                            <div className="hidden md:block relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                                >
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-medium text-slate-900">{user.name}</span>
                                        <span className="text-xs text-slate-500">{user.role}</span>
                                    </div>
                                    <div className="relative">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full border-2 border-white shadow"
                                        />
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                    </div>
                                </button>

                                {/* Profile Dropdown */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                                        {/* User Info */}
                                        <div className="px-4 py-3 border-b border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-12 h-12 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-semibold text-slate-900">{user.name}</p>
                                                    <p className="text-sm text-slate-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        {profileMenuItems.map((item, index) => (
                                            item.type === "divider" ? (
                                                <div key={index} className="border-t border-slate-100 my-2"></div>
                                            ) : (
                                                <button
                                                    key={item.path}
                                                    onClick={() => handleProfileAction(item)}
                                                    className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-slate-600 text-lg">
                                                            {item.icon}
                                                        </span>
                                                        <span className={`text-sm font-medium ${item.isLogout ? "text-red-600" : "text-slate-700"}`}>
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                    {item.badge && (
                                                        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </button>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mobile Profile Button */}
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="md:hidden flex items-center p-2"
                            >
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-9 h-9 rounded-full border-2 border-white"
                                />
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Login/Signup Buttons */}
                            <button
                                onClick={() => navigateTo("/signin")}
                                className="hidden sm:flex items-center justify-center rounded-lg h-9 px-4 text-sm font-bold bg-transparent text-slate-700 hover:bg-slate-200 transition-colors"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigateTo("/signup")}
                                className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary text-white text-sm font-bold shadow-md hover:bg-primary/90 transition-colors"
                            >
                                Sign Up
                            </button>
                        </>
                    )}

                    {/* Hamburger Icon */}
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

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-background-light border-t border-slate-200">
                    <div className="flex flex-col items-center px-4 py-4 gap-4">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => {
                                    navigateTo(item.path);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-center text-sm font-medium transition-colors ${isActive(item.path) ? "text-primary" : "text-slate-600 hover:text-primary"
                                    }`}
                            >
                                {item.name}
                            </button>
                        ))}

                        {user.isLoggedIn ? (
                            <div className="w-full border-t border-slate-200 pt-4">
                                <div className="flex items-center gap-3 mb-4 px-4">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold text-slate-900">{user.name}</p>
                                        <p className="text-sm text-slate-500">{user.email}</p>
                                    </div>
                                </div>
                                {profileMenuItems.slice(0, 4).map((item) => (
                                    item.type !== "divider" && (
                                        <button
                                            key={item.path}
                                            onClick={() => handleProfileAction(item)}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-slate-600">
                                                {item.icon}
                                            </span>
                                            <span className={`text-sm font-medium ${item.isLogout ? "text-red-600" : "text-slate-700"}`}>
                                                {item.name}
                                            </span>
                                            {item.badge && (
                                                <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    )
                                ))}
                                <button
                                    onClick={() => handleProfileAction(profileMenuItems.find(item => item.isLogout))}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-red-50 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-red-600">
                                        logout
                                    </span>
                                    <span className="text-sm font-medium text-red-600">
                                        Logout
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    navigateTo("/signin");
                                    setIsOpen(false);
                                }}
                                className="w-full sm:w-auto text-center px-6 py-2 rounded-lg text-sm font-bold bg-transparent text-slate-700 hover:bg-slate-200 transition-colors"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;