import React from "react";

const OwnerFooter = () => {
    return (
        <footer className="mt-auto border-t border-slate-200 bg-white pt-12 pb-8">
            <div className="max-w-8xl mx-auto px-4 md:px-24">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-primary">
                        <span className="material-symbols-outlined text-2xl">school</span>
                        <h2 className="text-slate-900 text-lg font-bold">CampusEase Owner</h2>
                    </div>

                    <div className="flex gap-8 text-sm text-slate-500">
                        <a className="hover:text-primary transition-colors" href="#">
                            Privacy Policy
                        </a>
                        <a className="hover:text-primary transition-colors" href="#">
                            Terms of Service
                        </a>
                        <a className="hover:text-primary transition-colors" href="#">
                            Help Center
                        </a>
                    </div>

                    <p className="text-slate-400 text-xs">
                        © {new Date().getFullYear()} CampusEase - Property Owner Portal. Built for SUSL.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default OwnerFooter;