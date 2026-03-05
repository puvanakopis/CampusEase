import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, currentCount, totalCount }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex p-4 items-center justify-between text-xs font-medium text-slate-500">
            <p>Showing {currentCount} of {totalCount} accommodations</p>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                    disabled={currentPage === 1}
                >
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>

                {pageNumbers.map((num) => (
                    <button
                        key={num}
                        onClick={() => onPageChange(num)}
                        className={`size-8 rounded flex items-center justify-center transition-colors ${num === currentPage
                                ? "bg-primary text-white"
                                : "border border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        {num}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="size-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                    disabled={currentPage === totalPages}
                >
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
            </div>
        </div>
    );
};

export default Pagination;