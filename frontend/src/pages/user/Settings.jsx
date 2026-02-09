import React from "react";
import SettingsPage from "../../containers/user/account/SettingsPage";
import Sidebar from "../../components/user/Sidebar";

function Settings() {
    return (
        <div className="bg-[#f6f7f8] ">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <SettingsPage />
            </div>
        </div>
    );
}

export default Settings;