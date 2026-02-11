import React from "react";
import AdminOwnerSupportPage from "../../containers/admin/account/AdminSupportPage";

function AdminSupport() {
    return (
        <div className="bg-[#f6f7f8]">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <AdminOwnerSupportPage />
            </div>
        </div>
    );
}

export default AdminSupport;