import React from "react";
import SupportPage from "../../containers/user/account/SupportPage";
import Sidebar from "../../components/user/Sidebar";

function Support() {
    return (
        <div className="bg-slate-100 ">
            <div className="px-4 py-10 md:px-10 max-w-7xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <SupportPage />
            </div>
        </div>
    );
}

export default Support;