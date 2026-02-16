import React, { useState } from "react";

const RegisterForm = () => {
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("student");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");

    const handleRegister = (userData) => {
        console.log("Registering user:", userData);
    };

    const handleSendOtp = (e) => {
        e.preventDefault();
        console.log("Sending OTP to:", email);
        setStep(2);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        console.log("Verifying OTP:", otp);
        setStep(3);
    };

    const handleCompleteRegistration = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        handleRegister({ firstName, lastName, email, userType, password });
        console.log("Registration Complete");
    };

    return (
        <section className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-12 lg:p-16 overflow-y-auto">
            <div className="w-full max-w-[420px]">
                <div className="mb-8">
                    <h2 className="text-slate-900 text-3xl font-bold tracking-tight">
                        {step === 1 ? "Get Started" : step === 2 ? "Verify OTP" : "Complete Registration"}
                    </h2>
                    <p className="text-slate-500 mt-2 text-base">
                        {step === 1 && "Create your account to access campus services."}
                        {step === 2 && `Enter the OTP sent to ${email}.`}
                        {step === 3 && "Set your password and complete registration."}
                    </p>
                </div>

                {/* Step 1: User Details */}
                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">First Name</label>
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-4 pr-4 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-4 pr-4 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">University Email</label>
                            <input
                                type="email"
                                placeholder="e.g. name@std.sab.ac.lk"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-4 pr-4 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">User Type</label>
                            <select
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                className="form-select w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-4 pr-4 appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none"
                            >
                                <option value="student">University Student</option>
                                <option value="staff">University Staff</option>
                                <option value="owner">Owner</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center rounded-xl h-12 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 mt-4"
                        >
                            Send OTP
                        </button>
                    </form>
                )}

                {/* Step 2: OTP */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">OTP</label>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-4 pr-4 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center rounded-xl h-12 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 mt-4"
                        >
                            Verify OTP
                        </button>
                    </form>
                )}

                {/* Step 3: Set Password */}
                {step === 3 && (
                    <form onSubmit={handleCompleteRegistration} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-4 pr-4 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-4 pr-4 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center rounded-xl h-12 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 mt-4"
                        >
                            Complete Registration
                        </button>
                    </form>
                )}

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-600 text-sm">
                        Already have an account?
                        <a className="text-primary font-bold hover:underline ml-1" href="/login">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RegisterForm;