import React from "react";

const AdminTopStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className={`p-6 rounded-xl border shadow-sm flex flex-col gap-1 transition-shadow
                        ${stat.bgColor || "bg-white"}
                        ${stat.borderColor || "border-slate-200"}
                        `}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span
                            className={`p-2 rounded-lg material-symbols-outlined
                                ${stat.iconBg || "bg-slate-100"}
                                ${stat.iconColor || "text-slate-500"}`}
                        >
                            {stat.icon}
                        </span>

                        {stat.badgeText && (
                            <span
                                className={`text-xs font-bold px-2 py-1 rounded
                                    ${stat.badgeBg || "bg-primary/10"}
                                    ${stat.badgeColor || "text-primary"}`}
                            >
                                {stat.badgeText}
                            </span>
                        )}
                    </div>

                    <p className={`text-sm font-medium ${stat.labelColor || "text-slate-500"}`}>
                        {stat.label}
                    </p>

                    <h3 className={`text-2xl font-black ${stat.valueColor || "text-slate-900"}`}>
                        {stat.value}
                    </h3>
                </div>
            ))}
        </div>
    );
};

export default AdminTopStats;