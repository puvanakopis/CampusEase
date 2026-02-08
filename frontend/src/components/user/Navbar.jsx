import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useNavigateTo from "../../hooks/useNavigateTo";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigateTo = useNavigateTo();
    const location = useLocation();

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Accommodation", path: "/accommodation" },
        { name: "Transport", path: "/transport" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-background-light/95 backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between px-4 md:px-10 max-w-7xl mx-auto">

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

                {/* Buttons + Mobile Hamburger */}
                <div className="flex items-center gap-3">
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
                        <button
                            onClick={() => {
                                navigateTo("/signin");
                                setIsOpen(false);
                            }}
                            className="w-full sm:w-auto text-center px-6 py-2 rounded-lg text-sm font-bold bg-transparent text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;