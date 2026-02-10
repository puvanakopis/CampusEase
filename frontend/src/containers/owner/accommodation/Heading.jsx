import React from "react";

const Heading = ({ title, subtitle, buttonText, onButtonClick, buttonDisabled = false }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h1>
                <p className="text-slate-500 mt-1">{subtitle}</p>
            </div>
            <button 
                onClick={onButtonClick}
                disabled={buttonDisabled}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all ${buttonDisabled ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-600'}`}
            >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                {buttonText}
                {buttonDisabled && (
                    <span className="material-symbols-outlined text-sm ml-1" title="Property limit reached">
                        warning
                    </span>
                )}
            </button>
        </div>
    );
};

export default Heading;