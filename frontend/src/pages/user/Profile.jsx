import React, { useState, useContext } from "react";
import ProfilePage from "../../containers/user/account/ProfilePage";
import Sidebar from "../../components/user/Sidebar";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
    const { currentUser, updateCurrentUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        first_name: currentUser?.first_name || "",
        last_name: currentUser?.last_name || "",
        email: currentUser?.email || "",
        phone: currentUser?.phone || "",
        address: currentUser?.address || "",
        role: currentUser?.role || "",
        id_number: currentUser?.id_number || "",
        photo: currentUser?.photo || null,
        id_photo: currentUser?.id_photo || null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            const fileData = {
                filename: URL.createObjectURL(file),
                content_type: file.type,
                size: file.size,
                rawFile: file,
            };
            setFormData((prev) => ({ ...prev, [name]: fileData }));
        }
    };

    const handleSave = async () => {
        await updateCurrentUser(formData);
    };

    return (
        <div className="bg-[#f6f7f8]">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <ProfilePage
                    currentUser={currentUser}
                    formData={formData}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    handleSave={handleSave}
                />
            </div>
        </div>
    );
}

export default Profile;