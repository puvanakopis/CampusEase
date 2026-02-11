import React, { useState } from "react";

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            q: "How long does it take to receive a reply?",
            a: "Our support team responds within 24 hours during weekdays and within 48 hours during weekends."
        },
        {
            q: "Can I update or delete my account?",
            a: "Yes. You can manage your account settings from your profile page or reach out to us for assistance."
        },
        {
            q: "What kind of technical issues do you handle?",
            a: "We support login issues, system access errors, data inconsistencies, and general platform usage queries."
        },
        {
            q: "Do you provide support for accommodation and transport?",
            a: "We offer assistance related to platform features, but operational queries are directed to relevant departments."
        }
    ];

    const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

    return (
        <div className="bg-white border border-[#e7edf3] rounded-2xl p-8 shadow-sm mb-20">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
                {faqs.map((f, i) => (
                    <div
                        key={i}
                        className="border-b pb-4 cursor-pointer"
                        onClick={() => toggleFAQ(i)}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">help</span>
                                {f.q}
                            </h3>
                            <span
                                className={`material-symbols-outlined transform transition-transform duration-300 ${openIndex === i ? "rotate-180" : "rotate-0"
                                    }`}
                            >
                                expand_more
                            </span>
                        </div>

                        <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 mt-2" : "max-h-0"
                            }`}>
                            <p className="text-[#4c739a]">{f.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;