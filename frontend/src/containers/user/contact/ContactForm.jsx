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
                        className="rounded-lg border border-[#cfdbe7] bg-transparent focus:ring-2 focus:ring-primary/90 focus:border-primary/90 p-3 outline-none transition-all"
                        placeholder="John Doe"
                        type="text"
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">University Email</span>
                    <input
                        className="rounded-lg border border-[#cfdbe7] bg-transparent focus:ring-2 focus:ring-primary/90 focus:border-primary/90 p-3 outline-none transition-all"
                        placeholder="name@std.sab.ac.lk"
                        type="email"
                    />
                </label>
            </div>
            <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Inquiry Subject</span>
                <select
                    className="border border-[#cfdbe7] rounded-lg bg-transparent focus:ring-2 focus:ring-primary/90 focus:border-primary/90 p-3 appearance-none outline-none transition-all"
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
                    className="border border-[#cfdbe7] rounded-lg bg-transparent focus:ring-2 focus:ring-primary/90 focus:border-primary/90 p-3 resize-none outline-none transition-all"
                    placeholder="How can we help you?"
                    rows="5"
                ></textarea>
            </label>

            <PrimaryButton
                className="w-full py-4flex items-center justify-center gap-2"
                type="submit"
            >
                <span className="material-symbols-outlined">send</span>
                Send Message
            </PrimaryButton>
        </form>
    </div>
);

export default ContactForm;