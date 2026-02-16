import React, { useState, useContext } from "react";
import HeroSection from "../../containers/auth/forgot/HeroSection";
import ForgotPasswordForm from "../../containers/auth/forgot/ForgotPasswordForm";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { requestPasswordReset, resetPassword } = useContext(AuthContext);

    // ------------------ Step 1: Send OTP ------------------
    const handleSendLink = async (e) => {
        e.preventDefault();
        try {
            await requestPasswordReset(email);
            setStep(2);
        } catch (err) {
            console.error(err);
            toast.error("Failed to send reset link");
        }
    };

    // ------------------ Step 2: Verify OTP ------------------
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp) {
            toast.error("Please enter the OTP");
            return;
        }
        setStep(3);
    };

    // ------------------ Step 3: Reset Password ------------------
    const handleSetNewPassword = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(email, otp, newPassword);
            toast.success("Password reset successfully!");
            setStep(1);
            setEmail("");
            setOtp("");
            setNewPassword("");
        } catch (err) {
            console.error(err);
            toast.error("Failed to reset password");
        }
    };

    return (
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-screen">
            <HeroSection />
            <ForgotPasswordForm
                step={step}
                email={email}
                setEmail={setEmail}
                otp={otp}
                setOtp={setOtp}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                handleSendLink={handleSendLink}
                handleVerifyOtp={handleVerifyOtp}
                handleSetNewPassword={handleSetNewPassword}
            />
        </main>
    );
};

export default ForgotPassword;