import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageChange = (page) => {
        onPageChange(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="flex gap-2">
                <button
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e7edf3] bg-white text-[#0d141b] hover:bg-gray-50 disabled:opacity-50"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium ${page === currentPage
                            ? "bg-primary text-white font-bold"
                            : "bg-white border border-[#e7edf3] text-[#0d141b] hover:bg-gray-50"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e7edf3] bg-white text-[#0d141b] hover:bg-gray-50 disabled:opacity-50"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
            </div>
        </div>
    );
};

export default Pagination;