import React from "react";

const RegisterForm = ({
    step,
    firstName,
    lastName,
    email,
    role,
    password,
    confirmPassword,
    otp,
    setFirstName,
    setLastName,
    setEmail,
    setRole,
    setPassword,
    setConfirmPassword,
    setOtp,
    handleSendOtp,
    handleVerifyOtp,
    handleCompleteRegistration,
}) => {
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

                {/* STEP 1 */}
                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter your first name"
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-4"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter your last name"
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-4"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">University Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g. name@std.sab.ac.lk"
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-4"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">User Type</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="form-select w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-4"
                            >
                                <option value="student">University Student</option>
                                <option value="staff">University Staff</option>
                                <option value="owner">Owner</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-4"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl h-12 bg-primary text-white font-bold hover:bg-primary/90 mt-4"
                        >
                            Send OTP
                        </button>
                    </form>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">OTP</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 h-12 pl-4"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl h-12 bg-primary text-white font-bold hover:bg-primary/90 mt-4"
                        >
                            Verify OTP
                        </button>
                    </form>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <form onSubmit={handleCompleteRegistration} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 h-12 pl-4"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl h-12 bg-primary text-white font-bold hover:bg-primary/90 mt-4"
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