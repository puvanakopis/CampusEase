import React from 'react';

const ContactDetails = () => (
    <div className="lg:col-span-2 space-y-8">
        <div className="bg-primary/5 border border-primary/20 p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-6">Support Channels</h3>
            <div className="space-y-6">
                {[
                    { icon: "call", label: "Call Us", value: "+94 (45) 123-4567" },
                    { icon: "mail", label: "Email Us", value: "support@campusease.lk" },
                    { icon: "schedule", label: "Working Hours", value: "Mon - Fri: 8 AM - 5 PM" },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                        <div className="bg-primary text-white p-2 rounded-lg">
                            <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#4c739a]">{item.label}</p>
                            <p className="text-lg font-bold">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ContactDetails;