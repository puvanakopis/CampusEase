import React from 'react';

const Pagination = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    showItemCount = true,
    itemName = "items"
}) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const delta = 2; 
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        range.forEach((i) => {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="mt-6 flex items-center justify-between text-xs font-medium text-slate-500">
            {showItemCount && (
                <p>
                    Showing {startItem} to {endItem} of {totalItems} {itemName}
                </p>
            )}

            <div className="flex items-center gap-1 ml-auto">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`size-8 rounded border border-slate-200 flex items-center justify-center transition-colors
                        ${currentPage === 1
                            ? 'opacity-50 cursor-not-allowed bg-slate-50'
                            : 'hover:bg-slate-50 hover:border-slate-300'
                        }`}
                    aria-label="Previous page"
                >
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === '...' ? (
                            <span className="size-8 flex items-center justify-center text-slate-400">
                                ...
                            </span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`size-8 rounded flex items-center justify-center transition-colors
                                    ${currentPage === page
                                        ? 'bg-primary text-white hover:bg-primary/90'
                                        : 'border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                    }`}
                                aria-label={`Page ${page}`}
                                aria-current={currentPage === page ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        )}
                    </React.Fragment>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`size-8 rounded border border-slate-200 flex items-center justify-center transition-colors
                        ${currentPage === totalPages
                            ? 'opacity-50 cursor-not-allowed bg-slate-50'
                            : 'hover:bg-slate-50 hover:border-slate-300'
                        }`}
                    aria-label="Next page"
                >
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
            </div>
        </div>
    );
};

export default Pagination;