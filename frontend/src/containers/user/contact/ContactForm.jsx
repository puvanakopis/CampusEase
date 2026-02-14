import React from 'react';
import PrimaryButton from "../../../components/common/PrimaryButton";

const ContactForm = () => (
    <div className="lg:col-span-3 bg-white p-6 md:p-10 rounded-xl border border-[#e7edf3] shadow-sm">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary/90">edit_note</span>
            Get in Touch
        </h2>
        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">Full Name</span>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">University Email</span>
                    <input
                        type="email"
                        placeholder="name@std.sab.ac.lk"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    />
                </label>
            </div>
            <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Inquiry Subject</span>
                <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out appearance-none"
                >
                    <option>Technical Support</option>
                    <option>Account Issues</option>
                    <option>Academic Resources</option>
                    <option>Feedback & Suggestions</option>
                    <option>Other</option>
                </select>
            </label>

            <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Your Message</span>
                <textarea
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out resize-none"
                />
            </label>

            <PrimaryButton
                className="w-full py-4 flex items-center justify-center gap-2"
                type="submit"
            >
                <span className="material-symbols-outlined">send</span>
                Send Message
            </PrimaryButton>
        </form>
    </div>
);

export default ContactForm;