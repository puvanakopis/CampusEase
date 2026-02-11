import React from "react";

const Heading = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h1>
                <p className="text-slate-500 mt-1">{subtitle}</p>
            </div>
        </div>
    );
};

export default Heading;