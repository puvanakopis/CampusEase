import React from "react";

const Heading = ({ title, subtitle, buttonText }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h1>
                <p className="text-slate-500 mt-1">{subtitle}</p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-blue-600 transition-all">
                <span className="material-symbols-outlined text-lg">add_circle</span>
                {buttonText}
            </button>
        </div>
    );
};

export default Heading;