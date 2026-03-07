import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import useNavigateTo from "../../hooks/useNavigateTo";
import { AuthContext } from "../../context/AuthContext";
import { buildPhotoUrl } from "../../utils/photoUtils";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigateTo = useNavigateTo();
    const location = useLocation();
    const profileRef = useRef(null);

    const { currentUser, logout } = useContext(AuthContext);

    const authPages = ["/login", "/register", "/forgot-password"];
    if (authPages.includes(location.pathname)) return null;

    const isActive = (path) => location.pathname === path;

    const first_name = currentUser ? `${currentUser.first_name}`.trim() : "";
    const avatar = buildPhotoUrl(currentUser?.photo.filename, "user_photo", first_name);
    const email = currentUser?.email || "";
    const role = currentUser?.role || "Student";

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Accommodation", path: "/accommodation" },
        { name: "Vehicle", path: "/vehicle" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const profileMenuItems = [
        { name: "Profile", path: "/profile", icon: "person" },
        { name: "Saved Items", path: "/saved-items", icon: "favorite" },
                { name: "My Bookings", path: "/my-bookings", icon: "bookmarks" },
        { name: "Logout", icon: "logout", isLogout: true },
    ];

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
            logout();
            return;
        }
        navigateTo(item.path);
        setIsProfileOpen(false);
        setIsOpen(false);
    };

    return (
        <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 w-full border-b border-slate-200">
            <div className="flex h-16 items-center justify-between px-4 md:px-24 max-w-8xl mx-auto">
                {/* Logo */}
                <div
                    onClick={() => navigateTo("/")}
                    className="flex items-center gap-2 text-primary cursor-pointer"
                >
                    <span className="material-symbols-outlined text-3xl">school</span>
                    <div className="flex flex-col leading-tight">
                        <h2 className="text-slate-900 text-xl font-bold tracking-tight">CampusEase</h2>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
                            Sabaragamuwa
                        </span>
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
                    {currentUser ? (
                        <>
                            {/* Desktop Profile */}
                            <div className="hidden md:block relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
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
                                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden z-50">

                                        {/* Profile Header */}
                                        <div className="p-4 border-b border-slate-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-100">
                                                    <img
                                                        src={avatar}
                                                        alt={first_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                <div className="flex flex-col">
                                                    <p className="text-sm font-bold text-slate-900">
                                                        {first_name}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        {email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-1">
                                            {profileMenuItems.map((item, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleProfileAction(item)}
                                                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                                >
                                                    <span
                                                        className={`material-symbols-outlined text-[20px] ${item.isLogout ? "text-red-600" : "text-slate-500"
                                                            }`}
                                                    >
                                                        {item.icon}
                                                    </span>

                                                    <span className={item.isLogout ? "text-red-600" : ""}>
                                                        {item.name}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Profile Button */}
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="md:hidden flex items-center p-2"
                            >
                                <img src={avatar} alt={first_name} className="w-9 h-9 rounded-full" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigateTo("/login")}
                                className="hidden sm:flex items-center rounded-lg h-9 px-4 font-bold text-sm text-slate-700 hover:bg-slate-200"
                            >
                                Sign In
                            </button>

                            <button
                                onClick={() => navigateTo("/register")}
                                className="flex items-center rounded-lg h-9 px-4 bg-primary text-white font-bold text-sm shadow-md hover:bg-primary/90"
                            >
                                Sign Up
                            </button>
                        </>
                    )}

                    {/* Hamburger */}
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
                <div className="md:hidden bg-white border-t border-slate-200">
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

                        {currentUser && (
                            <div className="w-full border-t border-slate-200 pt-4">
                                <div className="flex items-center gap-3 mb-4 px-4">
                                    <img src={avatar} alt={first_name} className="w-12 h-12 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-slate-900">{first_name} </p>
                                        <p className="text-sm text-slate-500">{email}</p>
                                    </div>
                                </div>

                                {profileMenuItems.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => handleProfileAction(item)}
                                        className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors ${item.isLogout ? "text-red-600" : "text-slate-700"
                                            }`}
                                    >
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                        <span className="text-sm font-medium">{item.name}</span>
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

export default Navbar;