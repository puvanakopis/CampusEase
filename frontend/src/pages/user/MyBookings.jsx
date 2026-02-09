import React from "react";
import BookingsPage from "../../containers/user/account/BookingsPage";
import Sidebar from "../../components/user/Sidebar";

function Bookings() {
    return (
        <div className="bg-[#f6f7f8] ">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <BookingsPage />
            </div>
        </div>
    );
}

export default Bookings;