import React from "react";

const LoginForm = () => {
    return (
        <section className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-12 lg:p-16 overflow-y-auto">
            <div className="w-full max-w-[420px]">
                <div className="mb-10 text-center lg:text-left">
                    <h2 className="text-[#0d141b] text-4xl font-extrabold tracking-tight mb-4">Welcome back!</h2>
                    <p className="text-slate-500 text-base">
                        Log in to your SUSL account to access housing and transport services.
                    </p>
                </div>
                <form className="space-y-6">
                    {/* University Email */}
                    <div className="space-y-1.5">
                        <label className="text-slate-700 text-sm font-semibold">University Email</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                alternate_email
                            </span>
                            <input
                                type="email"
                                placeholder="yourname@susl.lk"
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-11 pr-4 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                required
                            />
                        </div>
                    </div>
                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-slate-700 text-sm font-semibold">Password</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                lock_open
                            </span>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="form-input w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 h-12 pl-11 pr-4 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                                required
                            />
                        </div>
                    </div>
                    {/* Remember me */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded-lg text-primary focus:ring-primary/30 border-slate-300 cursor-pointer"
                        />
                        <span className="text-sm text-slate-600 font-medium">Remember this device</span>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                        Log in
                        <span className="material-symbols-outlined text-xl">login</span>
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        Not a member yet?{" "}
                        <a className="text-primary font-bold hover:underline ml-1" href="/register">
                            Create an account
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;