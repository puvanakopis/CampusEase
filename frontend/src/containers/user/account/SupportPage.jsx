import React from "react";

const SupportPage = () => {
    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10">
            <div className="space-y-6">
                {/* Header  */}
                <div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold text-slate-900">Support Center</h1>
                        <p className="text-sm text-slate-500">
                            Submit a report or view your previous tickets related to your accommodation or vehicle rentals.
                        </p>
                    </div>
                </div>

                {/* New Support Ticket Form Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <span className="material-symbols-outlined text-primary text-lg">support_agent</span>
                        <h2 className="text-lg font-bold text-slate-900">Submit an Issue</h2>
                    </div>

                    <form className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                        {/* Issue Type */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Issue Category
                            </label>
                            <select
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                <option value="accommodation">Accommodation Issue</option>
                                <option value="vehicle">Vehicle Rental Issue</option>
                                <option value="payment">Payment Dispute</option>
                                <option value="owner">Owner/Host Conduct</option>
                                <option value="technical">Technical Bug</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Booking/Rental ID */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Booking/Rental ID <span className="text-slate-400 font-normal">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. ACC-BK-12345 or VEH-RL-67890"
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out placeholder:text-slate-400"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Issue Description
                            </label>
                            <textarea
                                rows={5}
                                placeholder="Please describe your problem in detail..."
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out placeholder:text-slate-400 resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-base">send</span>
                                Submit Ticket
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default SupportPage;