import React from "react";
import SettingsPage from "../../containers/user/account/SettingsPage";
import Sidebar from "../../components/user/Sidebar";

function Settings() {
    return (
        <div className="bg-slate-100 ">
            <div className="px-4 py-10 md:px-10 max-w-7xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <SettingsPage />
            </div>
        </div>
    );
}

export default Settings;