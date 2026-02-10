import React from "react";
import SupportPage from "../../containers/user/account/SupportPage";
import Sidebar from "../../components/user/Sidebar";

function Support() {
    return (
        <div className="bg-[#f6f7f8] ">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <SupportPage />
            </div>
        </div>
    );
}

export default Support;