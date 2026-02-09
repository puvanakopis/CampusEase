const Filters = () => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex-1 min-w-[300px] max-w-md relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    search
                </span>
                <input
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Search Order ID, Student or Property..."
                    type="text"
                />
            </div>
            <div className="flex items-center gap-3">
                <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                    <option>Service Type: All</option>
                    <option>Accommodation</option>
                    <option>Transport</option>
                </select>
                <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                    <option>Date: Last 30 Days</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>Custom Range</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;