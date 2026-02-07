import React from "react";
import useNavigateTo from "../../../hooks/useNavigateTo";

function HeroSection() {
    const navigateTo = useNavigateTo();

    return (
        <section className="relative w-full overflow-hidden bg-background-light">
            <div className="px-4 my-20 md:px-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                        Established {new Date().getFullYear()}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight font-display mb-6 text-[#0d141b]">
                        Empowering the Sabaragamuwa University Community
                    </h1>
                    <p className="text-lg md:text-xl leading-relaxed mb-8 text-[#4c739a]">
                        Your all-in-one companion for campus life. We bridge the gap between students, service providers, and university resources to make your academic journey seamless.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => navigateTo("/accommodation")}
                            className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                        >
                            Explore Accommodation
                        </button>
                        <button
                            onClick={() => navigateTo("/transport")}
                            className="px-8 py-4 bg-white border border-[#e7edf3] font-bold rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Explore Transport
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                        <img
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC5QTdDw_7GASXrWZXpnFVAQhp3Urp5ogMm9CwlUZX-4lFfyffiKware0g6RSwnH1fwhBgStxhcAB9xSPXhRhoXhMoAeCO2vFSMFLGfIgzVeL56m-NrqPyH2M_PxAvkyU21HPki9fuJDgy6kXVksUWe3oam-ulDnkcLPqZ3-r_UvzEjGPNHre4zLOMr9SZF0WicVJaxLbURt3sqJ6Sbst1QLsHUPpgqNgAn-kdzI3x44Sc1H00Vht9O_G5QY2UGpcmLqPEnwbIBio"
                            alt="Sabaragamuwa University Students"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;