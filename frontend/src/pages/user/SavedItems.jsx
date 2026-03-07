import React, { useContext } from "react";
import SavedItemsPage from "../../containers/user/account/SavedItemsPage";
import Sidebar from "../../components/user/Sidebar";
import { SaveItemContext } from "../../context/SaveItemContext";

function SavedItems() {
    const {
        savedAccommodations,
        savedTransports,
        loading,
        unsaveAccommodation,
        unsaveTransport
    } = useContext(SaveItemContext);

    return (
        <div className="bg-[#f6f7f8] ">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <SavedItemsPage
                    accommodations={savedAccommodations}
                    vehicles={savedTransports}
                    loading={loading}
                    onUnsaveAccommodation={unsaveAccommodation}
                    onUnsaveTransport={unsaveTransport}
                />
            </div>
        </div>
    );
}

export default SavedItems;