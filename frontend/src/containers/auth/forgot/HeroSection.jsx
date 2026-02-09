import React from "react";

const HeroSection = () => {
    return (
        <section className="relative w-full md:w-1/2 min-h-[500px] md:min-h-0 overflow-hidden">
            <img
                alt="Students on campus"
                className="absolute inset-0 w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkxSJMFJv32wEwlTR8AW7U3voLUJtPA07PFli36l0UrDe9VQJ2wWElRqeuaUglX8NXHy6YPlrsfuhkBO70bEzfzNxHQUG3kUyYsLMBmNavJWyIP6W_w3eYL9dRNNxER-94oiIWvc263ohrE5JCkJTrNCAADAUYDAu69AAjD1tiwMaVulC4uraDKvBlUZpj_S_XWhTbrqhl258aOXw17K-7EvqmRFI6fEFZWX1EbO1VQb9Cq9oLjpaoNbq6gkOdFLSwUG13U1_zUK8"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent md:bg-gradient-to-r"></div>
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 lg:p-20 text-white">
                <div className="mb-6 w-max inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium tracking-wide uppercase">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Sabaragamuwa Student Community
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
                    Reset Your <br /> Account Password
                </h1>
                <p className="text-lg lg:text-xl text-slate-100 max-w-lg mb-10 leading-relaxed font-light">
                    Enter your university email to receive a password reset link. Access your verified accommodation and transport services easily.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;