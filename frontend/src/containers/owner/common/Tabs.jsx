import React from "react";

const Tabs = ({ tabs, availableTab, onTabChange }) => {
    return (
        <div className="border-b border-slate-200 py-8">
            <div className="flex gap-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${availableTab === tab.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        {tab.label}
                        {tab.count > 0 && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${availableTab === tab.id
                                    ? 'bg-primary text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;