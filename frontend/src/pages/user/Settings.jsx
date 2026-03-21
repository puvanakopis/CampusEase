import React, { useState, useContext } from "react";
import SettingsPage from "../../containers/user/account/SettingsPage";
import Sidebar from "../../components/user/Sidebar";
import { AuthContext } from "../../context/AuthContext";

function Settings() {
    const { updatePassword, authLoading } = useContext(AuthContext);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage({ type: "error", text: "All fields are required!" });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: "error", text: "New password and confirm password do not match!" });
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ type: "error", text: "New password must be at least 6 characters long!" });
            return;
        }

        try {
            setIsUpdating(true);
            setMessage({ type: "", text: "" });

            await updatePassword(currentPassword, newPassword);

            setMessage({ type: "success", text: "Password updated successfully!" });

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                setMessage({ type: "", text: "" });
            }, 3000);

        } catch (err) {
            console.error("Password update failed:", err);
            setMessage({
                type: "error",
                text: err.response?.data?.message || "Failed to update password. Please try again."
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancel = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setMessage({ type: "", text: "" });
    };

    const toggleCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
    const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    if (authLoading) {
        return (
            <div className="bg-[#f6f7f8] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 border-4 border-primary border-r-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-slate-500 mt-2">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f6f7f8] min-h-screen">
            <div className="px-4 py-16 md:px-24 max-w-8xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Sidebar - Now handles its own mobile state */}
                    <Sidebar />

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Message Alert */}
                        {message.text && (
                            <div className={`mb-4 p-4 rounded-lg ${message.type === "success"
                                    ? "bg-green-50 text-green-800 border border-green-200"
                                    : "bg-red-50 text-red-800 border border-red-200"
                                }`}>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined">
                                        {message.type === "success" ? "check_circle" : "error"}
                                    </span>
                                    <p className="text-sm font-medium">{message.text}</p>
                                </div>
                            </div>
                        )}

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
                            handleCancel={handleCancel}
                            isUpdating={isUpdating}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Settings;