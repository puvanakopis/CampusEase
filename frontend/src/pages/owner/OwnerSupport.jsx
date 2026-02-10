import React from "react";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
import OwnerSupportPage from '../../containers/owner/account/OwnerSupportPage'

function OwnerSupport() {
    return (
        <div className="bg-[#f6f7f8]">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <OwnerSidebar />
                <OwnerSupportPage />
            </div>
        </div>
    );
}

export default OwnerSupport;