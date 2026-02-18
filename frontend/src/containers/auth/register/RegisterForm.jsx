import React, { useState } from "react";

const RegisterForm = ({
    step,
    firstName,
    lastName,
    email,
    role,
    password,
    confirmPassword,
    otp,
    agree,
    setFirstName,
    setLastName,
    setEmail,
    setRole,
    setPassword,
    setConfirmPassword,
    setOtp,
    setAgree,
    handleSendOtp,
    handleVerifyOtp,
    handleCompleteRegistration,
    loading,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <section className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-12 lg:p-16 overflow-y-auto">
            <div className="w-full max-w-[420px]">
                {/* HEADER */}
                <div className="mb-8 text-center lg:text-left">
                    <h2 className="text-[#0d141b] text-3xl font-bold tracking-tight">
                        {step === 1
                            ? "Get Started"
                            : step === 2
                                ? "Verify OTP"
                                : "Complete Registration"}
                    </h2>
                    <p className="text-slate-500 mt-2 text-base">
                        {step === 1 && "Create your account to access campus services."}
                        {step === 2 && `Enter the OTP sent to ${email}.`}
                        {step === 3 && "Set your password and complete registration."}
                    </p>
                </div>

                {/* STEP 1: User Info */}
                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div className="flex gap-4">
                            {/* FIRST NAME */}
                            <div className="flex-1 space-y-1.5">
                                <label className="text-slate-700 text-sm font-semibold">
                                    First Name
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                        person
                                    </span>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Enter your first name"
                                        className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-11 pr-4 placeholder:text-slate-400
                      focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            {/* LAST NAME */}
                            <div className="flex-1 space-y-1.5">
                                <label className="text-slate-700 text-sm font-semibold">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                        person
                                    </span>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Enter your last name"
                                        className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-11 pr-4 placeholder:text-slate-400
                      focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">
                                University Email
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                    alternate_email
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="yourname@susl.lk"
                                    className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-11 pr-4 placeholder:text-slate-400
                    focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* ROLE */}
                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">
                                User Type
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                    badge
                                </span>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="form-select w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-11 pr-4
                    focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                >
                                    <option value="student">University Student</option>
                                    <option value="staff">University Staff</option>
                                    <option value="owner">Owner</option>
                                </select>
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">Password</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                    lock
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-11 pr-10 placeholder:text-slate-400
                    focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                    required
                                />
                                <span
                                    className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "visibility_off" : "visibility"}
                                </span>
                            </div>
                        </div>

                        {/* TERMS & CONDITIONS */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="w-3 h-3 rounded-lg text-primary focus:ring-primary/30 border-slate-300 cursor-pointer"
                                checked={agree}
                                onChange={() => setAgree(!agree)}
                                required
                            />

                            <span className="text-sm text-slate-600 font-medium">
                                I agree to the{" "}
                                <a href="/terms" className="text-primary underline">
                                    Terms & Conditions
                                </a>
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                            <span className="material-symbols-outlined text-xl">send</span>
                        </button>
                    </form>
                )}

                {/* STEP 2: Verify OTP */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">OTP</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                    password
                                </span>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    className="form-input w-full rounded-xl border-slate-200 bg-slate-50 h-12 pl-11 pr-4 placeholder:text-slate-400
                    focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                            <span className="material-symbols-outlined text-xl">verified</span>
                        </button>
                    </form>
                )}

                {/* STEP 3: Complete Registration */}
                {step === 3 && (
                    <form onSubmit={handleCompleteRegistration} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                    lock_reset
                                </span>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                    className="form-input w-full rounded-xl border-slate-200 bg-slate-50 h-12 pl-11 pr-10 placeholder:text-slate-400
                    focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                    required
                                />
                                <span
                                    className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl cursor-pointer"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? "visibility_off" : "visibility"}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? "Completing..." : "Complete Registration"}
                            <span className="material-symbols-outlined text-xl">check_circle</span>
                        </button>
                    </form>
                )}

                {/* FOOTER */}
                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-sm font-medium">
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