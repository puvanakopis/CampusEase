import React from "react";

const WhyChooseCampusEase = () => {
    const features = [
        {
            icon: "verified_user",
            title: "Verified Listings",
            description:
                "All boarding houses and transport providers are pre-verified by our team to ensure safety and quality standards.",
        },
        {
            icon: "person_pin",
            title: "Student-Centric Design",
            description:
                "Built specifically for SUSL students with features like university email verification and campus-specific filters.",
        },
        {
            icon: "directions_bus",
            title: "Reliable Transport",
            description:
                "Access real-time bus schedules and private shuttle services tailored for student travel needs.",
        },
    ];

    return (
        <section className="py-20 bg-background-light">
            <div className="px-4 md:px-10 max-w-7xl mx-auto mx-auto px-4 sm:px-10">
                <h2 className="text-3xl font-black mb-12 text-center font-display">
                    Why Choose CampusEase?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl border border-[#e7edf3] shadow-sm hover:border-primary/50 transition-shadow flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                                <span className="material-symbols-outlined text-4xl">
                                    {feature.icon}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-[#4c739a]">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseCampusEase;