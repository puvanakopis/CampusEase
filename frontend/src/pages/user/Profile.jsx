import React from "react";
import ProfilePage from "../../containers/user/account/ProfilePage";
import Sidebar from "../../components/user/Sidebar";

function Profile() {
    return (
        <div className="bg-[#f6f7f8]">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <ProfilePage />
            </div>
        </div>
    );
}

export default Profile;