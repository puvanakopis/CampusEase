import React, { useState, useContext } from "react";
import SettingsPage from "../../containers/user/account/SettingsPage";
import Sidebar from "../../components/user/Sidebar";
import { AuthContext } from "../../context/AuthContext";

function Settings() {
    const { updatePassword } = useContext(AuthContext);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match!");
            return;
        }

        try {
            await updatePassword(currentPassword, newPassword);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            console.error("Password update failed:", err);
        }
    };

    const toggleCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
    const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className="bg-[#f6f7f8]">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6 min-h-screen flex">
                <Sidebar />
                <SettingsPage
                    currentPassword={currentPassword}
                    setCurrentPassword={setCurrentPassword}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    showCurrentPassword={showCurrentPassword}
                    toggleCurrentPassword={toggleCurrentPassword}
                    showNewPassword={showNewPassword}
                    toggleNewPassword={toggleNewPassword}
                    showConfirmPassword={showConfirmPassword}
                    toggleConfirmPassword={toggleConfirmPassword}
                    handlePasswordUpdate={handlePasswordUpdate}
                />
            </div>
        </div>
    );
}

export default Settings;