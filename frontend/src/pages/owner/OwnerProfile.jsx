import React, { useContext, useState, useEffect } from "react";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
import OwnerProfilePage from "../../containers/owner/account/OwnerProfilePage";
import { AuthContext } from "../../context/AuthContext";

function OwnerProfile() {
    const { currentUser, authLoading, updateCurrentUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
        id_number: "",
        role: "",
        photo: null,
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                first_name: currentUser.first_name || "",
                last_name: currentUser.last_name || "",
                email: currentUser.email || "",
                phone: currentUser.phone || "",
                address: currentUser.address || "",
                role: currentUser.role || "",
                description: currentUser.description || "",
                id_number: currentUser.id_number || "",
                photo: null,
            });
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
            setFormData((prev) => ({
                ...prev,
                [name]: file,
            }));
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
                <OwnerSidebar />

                <OwnerProfilePage
                    currentUser={currentUser}
                    authLoading={authLoading}
                    formData={formData}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    handleSave={handleSave}
                />
            </div>
        </div>
    );
}

export default OwnerProfile;