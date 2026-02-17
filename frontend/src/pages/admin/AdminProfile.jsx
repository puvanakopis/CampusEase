import React, { useState, useEffect, useContext } from "react";
import AdminProfilePage from "../../containers/admin/account/AdminOwnerProfilePage";
import { AuthContext } from "../../../context/AuthContext";

function AdminProfile() {
    const { user, updateCurrentUser, authLoading } = useContext(AuthContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [roleDescription, setRoleDescription] = useState(
        "Responsible for managing platform-wide settings, monitoring user activity, approving content, and ensuring smooth operation of the system."
    );

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name || "");
            setLastName(user.last_name || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
        }
    }, [user]);

    const handleSaveChanges = async () => {
        const updateData = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
        };
        try {
            await updateCurrentUser(updateData);
        } catch (err) {
            console.error("Failed to update profile:", err);
        }
    };

    return (
        <div className="bg-[#f6f7f8]">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <AdminProfilePage
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    phone={phone}
                    roleDescription={roleDescription}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setEmail={setEmail}
                    setPhone={setPhone}
                    setRoleDescription={setRoleDescription}
                    handleSaveChanges={handleSaveChanges}
                    user={user}
                    authLoading={authLoading}
                />
            </div>
        </div>
    );
}

export default AdminProfile;