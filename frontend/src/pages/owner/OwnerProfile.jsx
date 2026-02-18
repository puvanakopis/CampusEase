import React, { useContext, useState, useEffect } from "react";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
import OwnerProfilePage from '../../containers/owner/account/OwnerProfilePage';
import { AuthContext } from "../../context/AuthContext";

function OwnerProfile() {
    const { user, authLoading, updateCurrentUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        business_name: "",
        business_type: "Individual",
        business_description: "",
        id_number: "",
        role: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                role: user.role || "",
                business_name: user.business_name || "Perera Rentals",
                business_type: user.business_type || "Individual",
                business_description: user.business_description || "",
                id_number: user.id_number || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                    user={user}
                    authLoading={authLoading}
                    formData={formData}
                    handleChange={handleChange}
                    handleSave={handleSave}
                />
            </div>
        </div>
    );
}

export default OwnerProfile;