import React from "react";
import useNavigateTo from "../../../hooks/useNavigateTo";

const JoinCommunity = () => {
  const navigateTo = useNavigateTo();

  return (
    <section className="px-4 md:px-10 max-w-7xl mx-auto rounded-lg py-16 mb-8 bg-primary text-white text-center">
      <div className="max-w-[800px] mx-auto px-4">
        <h2 className="text-3xl font-black mb-6 font-display">
          Join the CampusEase Community
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Whether you're a student looking for a place or a provider offering services, we're here to help.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => navigateTo("/")}>
            <button className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </button>
          <button
            onClick={() => navigateTo("/contact")}
          >
            <button className="px-8 py-3 bg-transparent border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
              Contact Support
            </button>
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;