import React from "react";

const Heading = ({ title, subtitle, buttonText, onButtonClick, buttonDisabled = false }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h1>
                <p className="text-slate-500 mt-1">{subtitle}</p>
            </div>
            {buttonText && (
                <button
                    onClick={onButtonClick}
                    disabled={buttonDisabled}
                    className={`bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default Heading;