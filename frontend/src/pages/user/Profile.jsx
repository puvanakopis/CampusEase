import React, { useState, useContext, useEffect } from "react";
import ProfilePage from "../../containers/user/account/ProfilePage";
import Sidebar from "../../components/user/Sidebar";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
    const { currentUser, updateCurrentUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
        role: "",
        id_number: "",
        photo: null,
    });

    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setFormData({
                first_name: currentUser.first_name || "",
                last_name: currentUser.last_name || "",
                email: currentUser.email || "",
                phone: currentUser.phone || "",
                address: currentUser.address || "",
                description: currentUser.description || "",
                role: currentUser.role || "",
                id_number: currentUser.id_number || "",
                photo: null,
            });

            setPhotoPreview(currentUser.photo ? `/uploads/user_photo/${currentUser.photo.filename}` : null);
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            setFormData((prev) => ({ ...prev, [name]: file }));

            if (name === "photo") {
                setPhotoPreview(URL.createObjectURL(file));
            }
        }
    };

    const handleSave = async () => {
        try {
            await updateCurrentUser(formData);
        } catch (err) {
            console.error("Failed to update profile:", err);
        }
    };

    return (
        <div className="bg-[#f6f7f8]">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <ProfilePage
                    currentUser={currentUser}
                    formData={formData}
                    photoPreview={photoPreview}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    handleSave={handleSave}
                />
            </div>
        </div>
    );
}

export default Profile;