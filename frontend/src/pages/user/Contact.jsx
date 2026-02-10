import React from "react";
import ContactForm from "../../containers/user/contact/ContactForm";
import ContactDetails from "../../containers/user/contact/ContactDetails";
import MapSection from "../../containers/user/contact/MapSection";

const Contact = () => (
    <div className="bg-background-light text-[#0d141b] transition-colors duration-200 min-h-screen">
        <main className="px-4 py-20 md:px-24 max-w-8xl mx-auto">
            <div className="mb-12">
                <h1 className="text-[#0d141b] text-4xl md:text-5xl font-black leading-tight tracking-tight font-display">
                    Contact Our Team
                </h1>
                <p className="text-[#4c739a] text-lg mt-4 max-w-2xl">
                    We're here to help you navigate campus life at Sabaragamuwa University. Reach out to us for any inquiries, technical support, or feedback.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-20">
                <ContactForm />
                <ContactDetails />
            </div>
            <MapSection />
        </main>
    </div>
);

export default Contact;