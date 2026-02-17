import React, { useState, useContext } from "react";
import HeroSection from "../../containers/auth/register/HeroSection";
import RegisterForm from "../../containers/auth/register/RegisterForm";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("student");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");

    const { requestSignupOtp, verifySignupOtp } = useContext(AuthContext);

    // ------------------ Step 1: Send OTP ------------------
    const handleSendOtp = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Sending OTP...");

        try {
            await requestSignupOtp(role, firstName, lastName, email, password);
            toast.success("OTP sent successfully!", { id: toastId });
            setStep(2);
        } catch (err) {
            toast.error(err?.response?.data?.detail || "Failed to send OTP", { id: toastId });
            console.error("Failed to send OTP:", err);
        }
    };

    // ------------------ Step 2: Verify OTP ------------------
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Verifying OTP...");

        try {
            await verifySignupOtp(role, email, otp);
            toast.success("OTP verified!", { id: toastId });
            setStep(3);
        } catch (err) {
            toast.error(err?.response?.data?.detail || "Invalid OTP", { id: toastId });
            console.error("Failed to verify OTP:", err);
        }
    };

    // ------------------ Step 3: Complete Registration ------------------
    const handleCompleteRegistration = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        toast.success("Registration completed!");
    };

    return (
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-screen">
            <HeroSection />

            <RegisterForm
                step={step}
                firstName={firstName}
                lastName={lastName}
                email={email}
                role={role}
                password={password}
                confirmPassword={confirmPassword}
                otp={otp}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setEmail={setEmail}
                setRole={setRole}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                setOtp={setOtp}
                handleSendOtp={handleSendOtp}
                handleVerifyOtp={handleVerifyOtp}
                handleCompleteRegistration={handleCompleteRegistration}
            />
        </main>
    );
};

export default Register;