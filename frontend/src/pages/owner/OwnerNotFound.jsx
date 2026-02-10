import React from "react";
import useNavigateTo from "../../hooks/useNavigateTo";
import PrimaryButton from "../../components/common/PrimaryButton";

const OwnerNotFound = () => {
    const navigateTo = useNavigateTo();

    return (
        <div className="bg-background-light min-h-screen flex flex-col">
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
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-slate-900 tracking-tight text-3xl md:text-4xl font-bold leading-tight px-4 pb-3 pt-6 max-w-[600px]">
                        Oops! This owner page doesn't exist.
                    </h1>

                    {/* Body */}
                    <p className="text-slate-600 text-lg font-normal leading-relaxed pb-8 pt-1 px-4 max-w-[540px]">
                        The page you are looking for might have been moved, or is yet to be created.
                    </p>

                    {/* Back Button */}
                    <div className="flex px-4 py-3 justify-center w-full">
                        <PrimaryButton
                            onClick={() => navigateTo("/owner/overview")}
                            className="flex min-w-[200px] items-center justify-center overflow-hidden rounded-xl h-14 px-8 tracking-wide transition-all"
                        >
                            <span className="material-symbols-outlined mr-2">home</span>
                            <span className="truncate">Back to Dashboard</span>
                        </PrimaryButton>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OwnerNotFound;