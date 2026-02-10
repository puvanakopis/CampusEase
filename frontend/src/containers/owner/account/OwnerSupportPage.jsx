import React from "react";

const OwnerSupportPage = () => {
    return (
        <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 md:px-10">

            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">Support Center (Owner)</h1>
                <p className="text-slate-500">
                    Submit an issue or view previously reported tickets regarding your properties, vehicles, or system access.
                </p>
            </div>

            {/* Create Ticket */}
            <section className="flex flex-col gap-6">
                <form className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">

                    {/* Issue Category */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-900">Issue Category</label>
                        <select className="form-select w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-primary focus:ring-primary">
                            <option disabled value="">
                                Select a category
                            </option>
                            <option value="property">Property Listing Issue</option>
                            <option value="tenant">Tenant Misconduct</option>
                            <option value="vehicle">Vehicle Rental Issue</option>
                            <option value="verification">Verification / Document Issue</option>
                            <option value="payment">Payment / Settlement Issue</option>
                            <option value="system">Portal / Technical Bug</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Listing / Vehicle ID */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-900">Property/Vehicle ID (Optional)</label>
                        <input
                            type="text"
                            placeholder="e.g. SUSL-2938 or VEH-1123"
                            className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-primary focus:ring-primary"
                        />
                    </div>

                    {/* Priority Level */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-900">Priority Level</label>
                        <select className="form-select w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-primary focus:ring-primary">
                            <option disabled value="">
                                Select urgency
                            </option>
                            <option value="low">Low — Informational</option>
                            <option value="medium">Medium — Needs Attention</option>
                            <option value="high">High — Blocking Operations</option>
                            <option value="critical">Critical — Immediate Support Required</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-900">Issue Description</label>
                        <textarea
                            rows={5}
                            placeholder="Explain the issue in detail..."
                            className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-primary focus:ring-primary resize-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">send</span>
                        Submit Ticket
                    </button>
                </form>
            </section>
        </div>
    );
};

export default OwnerSupportPage;