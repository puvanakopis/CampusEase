const StatsCards = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-500 text-sm">{stat.label}</span>
                        <span className="material-symbols-outlined text-primary">{stat.icon}</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    {stat.subtext && (
                        <div className={`text-xs mt-1 ${stat.subtextColor} flex items-center gap-1`}>
                            {stat.trendIcon && <span className="material-symbols-outlined text-xs">{stat.trendIcon}</span>}
                            {stat.subtext}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default StatsCards;