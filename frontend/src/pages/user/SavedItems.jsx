import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../../components/user/Sidebar";
import SavedItemsPage from "../../containers/user/account/SavedItemsPage";
import { SaveItemContext } from "../../context/SaveItemContext";
import { AuthContext } from "../../context/AuthContext";
import useNavigateTo from "../../hooks/useNavigateTo";

function SavedItems() {
    const {
        savedAccommodations,
        savedTransports,
        loading: saveItemsLoading,
        unsaveAccommodation,
        unsaveTransport,
    } = useContext(SaveItemContext);

    const { currentUser, authLoading } = useContext(AuthContext);

    const navigateTo = useNavigateTo();

    const handleViewDetails = (id, type) => {
        navigateTo(`/${type}/${id}`);
    };

    const handleRemoveAccommodation = async (id, e) => {
        e.stopPropagation();
        await unsaveAccommodation(id);
    };

    const handleRemoveVehicle = async (id, e) => {
        e.stopPropagation();
        await unsaveTransport(id);
    };

    if (authLoading) {
        return (
            <div className="bg-[#f6f7f8] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 border-4 border-primary border-r-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-slate-500 mt-2">Loading...</p>
                </div>
            </div>
        );
    }

    if (!currentUser || !["student", "staff"].includes(currentUser.role)) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="bg-[#f6f7f8] min-h-screen">
            <div className="px-4 py-16 md:px-24 max-w-8xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">

                    <Sidebar />

                    <main className="flex-1">
                        <SavedItemsPage
                            accommodations={savedAccommodations}
                            vehicles={savedTransports}
                            loading={saveItemsLoading}
                            onView={handleViewDetails}
                            onRemoveAccommodation={handleRemoveAccommodation}
                            onRemoveVehicle={handleRemoveVehicle}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default SavedItems;