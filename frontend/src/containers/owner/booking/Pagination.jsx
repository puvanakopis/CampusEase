const Pagination = ({ currentCount, totalCount }) => {
    return (
        <div className="mt-6 flex items-center justify-between text-xs font-medium text-slate-500">
            <p>Showing 1 to {currentCount} of {totalCount} Booking</p>
            <div className="flex items-center gap-1">
                <button className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="size-8 rounded bg-primary text-white flex items-center justify-center">
                    1
                </button>
                <button className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                    2
                </button>
                <button className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                    3
                </button>
                <button className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
            </div>
        </div>
    );
};

export default Pagination;