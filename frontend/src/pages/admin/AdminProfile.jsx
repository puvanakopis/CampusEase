import React, { useState, useEffect, useContext } from "react";
import LoadingSpinner from "../../components/common/Loading";
import AdminProfilePage from "../../containers/admin/account/AdminOwnerProfilePage";
import { AuthContext } from "../../context/AuthContext";

function AdminProfile() {
    const { currentUser, updateCurrentUser, authLoading } = useContext(AuthContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [roleDescription, setRoleDescription] = useState(
        "Responsible for managing platform-wide settings, monitoring user activity, approving content, and ensuring smooth operation of the system."
    );

    useEffect(() => {
        if (currentUser) {
            setFirstName(currentUser.first_name || "");
            setLastName(currentUser.last_name || "");
            setEmail(currentUser.email || "");
            setPhone(currentUser.phone || "");
        }
    }, [currentUser]);

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


    if (authLoading) {
        return (
            <LoadingSpinner />
        );
    }

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
                    currentUser={currentUser}
                    authLoading={authLoading}
                />
            </div>
        </div>
    );
}

export default AdminProfile;