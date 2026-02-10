import React from "react";

const Tabs = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex border-b border-slate-200 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                        ? "border-b-2 border-primary text-primary font-bold"
                        : "text-slate-500 hover:text-primary"
                        }`}
                >
                    {tab.label}
                    {tab.count > 0 && (
                        <span className="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                            {tab.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default Tabs;