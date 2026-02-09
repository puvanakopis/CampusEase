import React from "react";
import ProfilePage from "../../containers/user/profile/ProfilePage";
import Sidebar from "../../components/user/Sidebar";

function Profile() {
    return (
        <div className="bg-slate-100 ">
            <div className="px-4 py-10 md:px-10 max-w-7xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <ProfilePage />
            </div>
        </div>
    );
}

export default Profile;