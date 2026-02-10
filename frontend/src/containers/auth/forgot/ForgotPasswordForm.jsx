import React from "react";

const ForgotPasswordForm = () => {
    return (
        <section className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-12 lg:p-16 overflow-y-auto">
            <div className="w-full max-w-[420px]">
                <div className="mb-8">
                    <h2 className="text-slate-900 text-3xl font-bold tracking-tight">Forgot Password</h2>
                    <p className="text-slate-500 mt-2 text-base">
                        Enter your university email below and we'll send you a reset link.
                    </p>
                </div>

                <form className="space-y-4">
                    {/* University Email */}
                    <div className="space-y-1.5">
                        <label className="text-slate-700 text-sm font-semibold">University Email</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                alternate_email
                            </span>
                            <input
                                type="email"
                                placeholder="e.g. name@std.sab.ac.lk"
                                required
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-11 pr-4 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none"
                            />
                        </div>
                    </div>

                    {/* Send Reset Link Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center rounded-xl h-12 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] mt-4"
                    >
                        Send Reset Link
                    </button>
                </form>

                {/* Back to login */}
                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-600 text-sm">
                        Remembered your password?
                        <a className="text-primary font-bold hover:underline ml-1" href="/login">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ForgotPasswordForm;