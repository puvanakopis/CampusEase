import React from "react";

const SupportPage = () => {
    return (
        <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 md:px-10">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">Support Center</h1>
                <p className="text-slate-500">
                    Submit a report or view your previous tickets related to your accommodation or vehicle rentals.
                </p>
            </div>

            {/* New Support Ticket Form */}
            <section className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">support_agent</span>
                    <h2 className="text-xl font-bold text-slate-900">Submit a Issue</h2>
                </div>

                <form className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
                    {/* Issue Type */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-900">Issue Category</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"                        >                            <option disabled value="">
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
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-900">Booking/Rental ID (Optional)</label>
                        <input
                            type="text"
                            placeholder="e.g. ACC-BK-12345 or VEH-RL-67890"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-900">Issue Description</label>
                        <textarea
                            rows={5}
                            placeholder="Please describe your problem in detail..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out resize-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">send</span>
                        Submit Ticket
                    </button>
                </form>            </section>
        </div>
    );
};

export default SupportPage;