import React from "react";
import useNavigateTo from "../../../hooks/useNavigateTo";
import PrimaryButton from "../../../components/common/PrimaryButton";
import OutlineButton from "../../../components/common/OutlineButton";

const JoinCommunity = () => {
  const navigateTo = useNavigateTo();

  return (
    <section className="max-w-7xl mb-8 mx-auto mt-12 bg-gradient-to-r from-primary/5 to-blue-50 rounded-2xl p-8 border border-primary/10 text-center">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        Join the CampusEase Community
      </h2>

      <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
        Whether you're a student looking for a place or a provider offering services,
        we’re here to help you connect and succeed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <PrimaryButton
          onClick={() => navigateTo("/")}
        >
          Get Started
        </PrimaryButton>

        <OutlineButton
          onClick={() => navigateTo("/contact")}
        >
          Contact Support
        </OutlineButton>
      </div>

      <p className="text-slate-600 text-sm mt-6">
        No hidden fees • Verified providers • Always student-friendly
      </p>
    </section>
  );
};

export default JoinCommunity;