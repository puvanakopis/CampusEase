import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import SavedItemsPage from "../../containers/user/account/SavedItemsPage";
import Sidebar from "../../components/user/Sidebar";
import { SaveItemContext } from "../../context/SaveItemContext";
import { AuthContext } from "../../context/AuthContext";

function SavedItems() {
    const {
        savedAccommodations,
        savedTransports,
        loading: saveItemsLoading,
        unsaveAccommodation,
        unsaveTransport
    } = useContext(SaveItemContext);

    const { currentUser, authLoading } = useContext(AuthContext);

    if (authLoading) {
        return (
            <div className="bg-[#f6f7f8] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                    <p className="mt-2 text-slate-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!currentUser || !["student", "staff"].includes(currentUser.role)) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="bg-[#f6f7f8] min-h-screen">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 flex">
                <Sidebar />
                <SavedItemsPage
                    accommodations={savedAccommodations}
                    vehicles={savedTransports}
                    loading={saveItemsLoading}
                    onUnsaveAccommodation={unsaveAccommodation}
                    onUnsaveTransport={unsaveTransport}
                    currentUser={currentUser}
                />
            </div>
        </div>
    );
}

export default SavedItems;