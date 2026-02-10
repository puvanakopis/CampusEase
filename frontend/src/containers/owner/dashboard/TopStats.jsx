import React from "react";

const TopStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className={`p-2 rounded-lg material-symbols-outlined ${stat.iconBg} ${stat.iconColor}`}>
                            {stat.icon}
                        </span>
                        <span className={`text-xs font-bold ${stat.badgeColor} ${stat.badgeBg} px-2 py-1 rounded`}>
                            {stat.badgeText}
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                    <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                </div>
            ))}
        </div>
    );
};

export default TopStats;