import React from "react";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
import OwnerSettingsPage from '../../containers/owner/account/OwnerSettingsPage'

function OwnerSettings() {
    return (
        <div className="bg-[#f6f7f8]">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <OwnerSidebar />
                <OwnerSettingsPage />
            </div>
        </div>
    );
}

export default OwnerSettings;