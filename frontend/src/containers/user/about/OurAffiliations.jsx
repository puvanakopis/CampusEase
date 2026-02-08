import React from "react";

const OurAffiliations = () => {
  const affiliations = [
    { icon: "school", name: "SUSL Faculty of Computing" },
    { icon: "groups", name: "Student Union" },
    { icon: "local_taxi", name: "Belihuloya Transport" },
    { icon: "apartment", name: "Local Housing Association" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
        <h2 className="text-2xl font-bold mb-12 text-center text-[#4c739a] uppercase tracking-widest">
          Our Affiliations
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {affiliations.map((affiliation, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="w-20 h-20 cursor-pointer bg-white rounded-full flex items-center justify-center border border-[#e7edf3] hover:border-primary/50 transition-colors p-2">
                <span className="material-symbols-outlined text-4xl">
                  {affiliation.icon}
                </span>
              </div>
              <span className="text-sm font-bold text-center">
                {affiliation.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAffiliations;