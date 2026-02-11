import React from "react";
import ContactForm from "../../containers/user/contact/ContactForm";
import ContactDetails from "../../containers/user/contact/ContactDetails";
import MapSection from "../../containers/user/contact/MapSection";
import FAQSection from "../../containers/user/contact/FAQSection";

const Contact = () => (
    <section className="relative w-full overflow-hidden bg-background-light min-h-screen">
        <main className="px-4 pt-20 md:px-24 max-w-8xl mx-auto">

            {/* Header */}
            <div className="z-10 mb-12">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                    Get in Touch
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight font-display text-[#0d141b]">
                    Contact Our Team
                </h1>

                <p className="text-lg md:text-xl leading-relaxed mt-4 text-[#4c739a] max-w-2xl">
                    We're here to support the Sabaragamuwa University community. 
                    Reach out to us for inquiries, technical assistance, or feedback.
                </p>
            </div>

            {/* Form + Details */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-20">
                <div className="lg:col-span-3">
                    <ContactForm />
                </div>
                <div className="lg:col-span-2">
                    <ContactDetails />
                </div>
            </div>

            {/* Map Section */}
            <div className="mb-20">
                <MapSection />
            </div>

            {/* FAQ */}
            <FAQSection />

        </main>
    </section>
);

export default Contact;