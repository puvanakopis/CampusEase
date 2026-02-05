import React from 'react';

const ContactForm = () => (
    <div className="lg:col-span-3 bg-white p-6 md:p-10 rounded-xl border border-[#e7edf3] shadow-sm">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600">edit_note</span>
            Get in Touch
        </h2>
        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">Full Name</span>
                    <input
                        className="rounded-lg border border-[#cfdbe7] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-all"
                        placeholder="John Doe"
                        type="text"
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">University Email</span>
                    <input
                        className="rounded-lg border border-[#cfdbe7] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-all"
                        placeholder="name@std.sab.ac.lk"
                        type="email"
                    />
                </label>
            </div>
            <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Inquiry Subject</span>
                <select
                    className="border border-[#cfdbe7] rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 appearance-none outline-none transition-all"
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
                    className="border border-[#cfdbe7] rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 resize-none outline-none transition-all"
                    placeholder="How can we help you?"
                    rows="5"
                ></textarea>
            </label>

            <button
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                type="submit"
            >
                <span className="material-symbols-outlined">send</span>
                Send Message
            </button>
        </form>
    </div>
);

export default ContactForm;