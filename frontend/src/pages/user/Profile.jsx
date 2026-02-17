import React, { useState, useContext } from "react";
import ProfilePage from "../../containers/user/account/ProfilePage";
import Sidebar from "../../components/user/Sidebar";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
    const { user, updateCurrentUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        role: user?.role || "",
        id_number: user?.id_number || "",
        photo: user?.photo || null,
        id_photo: user?.id_photo || null,
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
                    user={user}
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