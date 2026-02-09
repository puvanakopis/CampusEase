import React from "react";
import SavedItemsPage from "../../containers/user/account/SavedItemsPage";
import Sidebar from "../../components/user/Sidebar";

function SavedItems() {
    return (
        <div className="bg-slate-100 ">
            <div className="px-4 py-10 md:px-10 max-w-7xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <SavedItemsPage />
            </div>
        </div>
    );
}

export default SavedItems;