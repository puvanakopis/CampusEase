import React, { useContext } from "react";
import SupportPage from "../../containers/user/account/SupportPage";
import Sidebar from "../../components/user/Sidebar";
import { AuthContext } from "../../context/AuthContext";

function Support() {
    const { authLoading } = useContext(AuthContext);

    if (authLoading) {
        return (
            <div className="bg-[#f6f7f8] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 border-4 border-primary border-r-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-slate-500 mt-2">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f6f7f8] min-h-screen">
            <div className="px-4 py-16 md:px-24 max-w-8xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    
                    <Sidebar />

                    <main className="flex-1">
                        <SupportPage />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Support;