import React from "react";
import SavedItemsPage from "../../containers/user/account/SavedItemsPage";
import Sidebar from "../../components/user/Sidebar";

function SavedItems() {
    return (
        <div className="bg-[#f6f7f8] ">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <SavedItemsPage />
            </div>
        </div>
    );
}

export default SavedItems;