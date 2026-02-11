import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

function AdminProfile() {
    return (
        <div className="bg-[#f6f7f8]">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <AdminSidebar />
            </div>
        </div>
    );
}

export default AdminProfile;