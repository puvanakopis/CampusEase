import React from "react";
import BookingsPage from "../../containers/user/account/BookingsPage";
import Sidebar from "../../components/user/Sidebar";

function Bookings() {
    return (
        <div className="bg-slate-100 ">
            <div className="px-4 py-10 md:px-10 max-w-7xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <BookingsPage />
            </div>
        </div>
    );
}

export default Bookings;