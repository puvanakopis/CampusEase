import React from "react";

const HeroSection = () => {
    return (
        <section className="relative w-full md:w-1/2 min-h-[500px] md:min-h-0 overflow-hidden">
            <img
                alt="Diverse Sri Lankan university students smiling and collaborating in an outdoor campus setting"
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
                    Access <br /> Campus Services <br /> Effortlessly
                </h1>
                <p className="text-lg lg:text-xl text-slate-100 max-w-lg mb-10 leading-relaxed font-light">
                    Log in to your account to manage verified accommodation and transport services at Sabaragamuwa
                    University of Sri Lanka.
                </p>
                <div className="flex items-center gap-6">
                    <div className="flex -space-x-3">
                        <img
                            alt="Student Profile"
                            className="w-10 h-10 rounded-full border-2 border-white/30 object-cover shadow-lg"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8TBjBp4CgJowxdCkwDwcZrC4AGeMwlzZ-dpDzYA3fqw87gILJc7bMYuSfCCEK02JnHx0xKdK9FRwsPInNZOLa3vAlgLMQv8UtpQCndzvGg8AFsd0il8yESZd9nfWJiNQX5p8WGXmGK36AzS3fXynmxSBkzjWZTKcwKDsW5q2z5XTosN1siqePFejwL4Pq5M4_2IYwZ9tkvhtNksY7V7_J0dgtC_QtsXRLod6u8-AuTSbhuC2mLw1s_rQ6i-zgDHJbbIAvCAMjedk"
                        />
                        <img
                            alt="Student Profile"
                            className="w-10 h-10 rounded-full border-2 border-white/30 object-cover shadow-lg"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0St7fASGc2DlHyPdPWN_6bh8aeoapkOaG3nN2-crxMxaz16we-A_4bNqFzWHj0dLATc_CZ8V0gPqTDD6lcpVf3Yx5wErBMS7b4_QyV3Z5YRgZTzi8J8kwt2BoIsDhuW-1jRTifG9vsGTVORAOo5m9j7svlmpe08Uy2HmFp54JGUgheqOx1uk_h888X9c4dEIXaBxhD27USZoLEibrqy5JJK5aqGUW2xFx0BTTSsPEVoxFl0AkxXsPeV0sL9wWoqq9-ZY_Cu6johw"
                        />
                        <div className="w-10 h-10 rounded-full border-2 border-white/30 bg-primary flex items-center justify-center text-[10px] font-bold shadow-lg">
                            +2k
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-0.5 mb-0.5">
                            {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <span key={i} className="material-symbols-outlined text-yellow-400 text-xs fill-1">
                                        star
                                    </span>
                                ))}
                        </div>
                        <p className="text-xs font-medium text-white/80">Most trusted university portal</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;