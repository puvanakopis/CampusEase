import React from "react";

const RegisterForm = () => {
    return (
        <section className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-12 lg:p-16 overflow-y-auto">
            <div className="w-full max-w-[420px]">
                <div className="mb-8">
                    <h2 className="text-slate-900 text-3xl font-bold tracking-tight">Get Started</h2>
                    <p className="text-slate-500 mt-2 text-base">Create your account to access campus services.</p>
                </div>
                <form className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label className="text-slate-700 text-sm font-semibold">Full Name</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                            <input
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-11 pr-4 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none"
                                placeholder="Enter your full name"
                                required
                                type="text"
                            />
                        </div>
                    </div>
                    {/* University Email */}
                    <div className="space-y-1.5">
                        <label className="text-slate-700 text-sm font-semibold">University Email</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">alternate_email</span>
                            <input
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-11 pr-4 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none"
                                placeholder="e.g. name@std.sab.ac.lk"
                                required
                                type="email"
                            />
                        </div>
                    </div>
                    {/* User Type */}
                    <div className="space-y-1.5">
                        <label className="text-slate-700 text-sm font-semibold">User Type</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">school</span>
                            <select className="form-select w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-11 pr-10 appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none">
                                <option value="student">University Student</option>
                                <option value="staff">University Staff</option>
                                <option value="owner">Owner</option>
                            </select>
                        </div>
                    </div>
                    {/* Password */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">Password</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                                <input
                                    className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-11 pr-10 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                    type="password"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-slate-700 text-sm font-semibold">Confirm</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">verified</span>
                                <input
                                    className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-11 pr-4 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                    type="password"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Terms */}
                    <div className="flex items-start gap-3 pt-2">
                        <div className="flex h-5 items-center">
                            <input
                                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary transition-all cursor-pointer"
                                id="terms"
                                type="checkbox"
                            />
                        </div>
                        <label className="text-xs text-slate-500 leading-relaxed select-none" htmlFor="terms">
                            I agree to the
                            <a className="text-primary font-semibold hover:underline" > Terms of Service </a>
                            and
                            <a className="text-primary font-semibold hover:underline" > Privacy Policy</a>.
                        </label>
                    </div>
                    <button
                        className="w-full flex items-center justify-center rounded-xl h-12 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] mt-4"
                        type="submit"
                    >
                        Register Now
                    </button>
                </form>
                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-600 text-sm">
                        Already have an account?
                        <a className="text-primary font-bold hover:underline ml-1" href="/login">Log in</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RegisterForm;