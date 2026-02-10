import React from "react";
import useNavigateTo from "../../hooks/useNavigateTo";
import PrimaryButton from "../../components/common/PrimaryButton";

const AdminNotFound = () => {
    const navigateTo = useNavigateTo();

    return (
        <div className="bg-background-light min-h-screen flex flex-col">

            {/* Main Content */}
            <main className="flex flex-1 items-center justify-center p-4 pb-16">
                <div className="flex flex-col max-w-[720px] w-full items-center text-center">

                    {/* Illustration */}
                    <div className="w-full py-6">
                        <div className="relative w-full aspect-[16/7] flex items-center justify-center">
                            <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-1"></div>

                            <div className="relative flex items-center justify-center gap-2 select-none">
                                <span className="text-[120px] md:text-[180px] font-black text-slate-200 tracking-tighter">4</span>
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-24 h-24 md:w-36 md:h-36 bg-primary rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center text-white rotate-6">
                                        <span className="material-symbols-outlined !text-6xl md:!text-8xl">directions_bus</span>
                                    </div>
                                    <div className="mt-4 w-12 h-2 bg-slate-300 rounded-full opacity-50 blur-[2px]"></div>
                                </div>
                                <span className="text-[120px] md:text-[180px] font-black text-slate-200 tracking-tighter">4</span>
                            </div>

                            <div className="absolute top-10 right-10 text-primary opacity-20">
                                <span className="material-symbols-outlined !text-4xl">school</span>
                            </div>
                            <div className="absolute bottom-10 left-10 text-primary opacity-20">
                                <span className="material-symbols-outlined !text-4xl">map</span>
                            </div>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-slate-900 tracking-tight text-3xl md:text-4xl font-bold leading-tight px-4 pb-3 pt-6 max-w-[600px]">
                        Oops! This page seems to have taken a wrong turn near Belihuloya.
                    </h1>

                    {/* Body */}
                    <p className="text-slate-600 text-lg font-normal leading-relaxed pb-8 pt-1 px-4 max-w-[540px]">
                        The page you are looking for might have been moved, or it's currently hiking in the Horton Plains.
                    </p>

                    {/* Back to Dashboard Button */}
                    <div className="flex px-4 py-3 justify-center w-full">
                        <PrimaryButton
                            onClick={() => navigateTo("/admin/dashboard")}
                            className="flex min-w-[200px] items-center justify-center overflow-hidden rounded-xl h-14 px-8 tracking-wide transition-all"
                        >
                            <span className="material-symbols-outlined mr-2">home</span>
                            <span className="truncate">Back to Dashboard</span>
                        </PrimaryButton>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full max-w-md mt-12 px-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                                    search
                                </span>
                            </div>
                            <input
                                className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-slate-900 placeholder-slate-400"
                                placeholder="Search for courses, lecturers, or maps..."
                                type="text"
                            />
                        </div>
                        <p className="mt-4 text-sm text-slate-500">
                            Can't find what you need?{" "}
                            <button className="text-primary hover:underline font-medium" onClick={() => navigateTo("/contact")}>
                                Contact Support
                            </button>
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default AdminNotFound;