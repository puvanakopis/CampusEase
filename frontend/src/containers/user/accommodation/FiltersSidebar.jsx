import React from "react";

const FiltersSidebar = () => {
    return (
        <aside className="hidden lg:flex w-80 h-max flex-col gap-4 border border-[#e7edf3] rounded-xl bg-white p-6 sticky top-[65px]">
            {/* Header */}
            <div className="flex flex-col gap-1 pb-4 border-b border-[#e7edf3]">
                <h1 className="text-[#0d141b] text-lg font-bold leading-normal">Filters</h1>
                <p className="text-[#4c739a] text-sm font-normal leading-normal">
                    Find stays near Sabaragamuwa University.
                </p>
            </div>

            {/* Property Type */}
            <div className="flex flex-col gap-3 py-2">
                <label className="text-[#0d141b] text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">
                        house
                    </span>{" "}
                    Property Type
                </label>
                <div className="flex flex-col gap-2">
                    {["Boarding (Bodim)", "Student Hostel", "Single Annex", "Shared Room"].map((type, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary h-4 w-4 bg-transparent"
                                defaultChecked={i === 0}
                            />
                            <span className="text-[#0d141b] text-sm font-medium group-hover:text-primary transition-colors">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Monthly Budget */}
            <div className="flex flex-col gap-3 py-2">
                <label className="text-[#0d141b] text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">
                        payments
                    </span>{" "}
                    Monthly Budget (LKR)
                </label>
                <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" className="w-full rounded-lg border border-[#cfdbe7] bg-background-light text-sm p-2 text-[#0d141b] focus:border-primary focus:ring-0" />
                    <span className="text-gray-400">-</span>
                    <input type="number" placeholder="Max" className="w-full rounded-lg border border-[#cfdbe7] bg-background-light text-sm p-2 text-[#0d141b] focus:border-primary focus:ring-0" />
                </div>
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-3 py-2">
                <label className="text-[#0d141b] text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">wc</span>
                    Gender
                </label>
                <div className="flex flex-col gap-2">
                    {["Male", "Female"].map((gender, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <input type="radio" name="gender" className="form-radio rounded text-primary border-gray-300 focus:ring-primary h-4 w-4 bg-transparent" defaultChecked={i === 0} />
                            <span className="text-[#0d141b] text-sm font-medium group-hover:text-primary transition-colors">{gender}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Apply Button */}
            <div className="mt-auto pt-4">
                <button className="flex w-full items-center justify-center rounded-lg h-10 px-4 bg-primary text-slate-50 text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
                    Apply Filters
                </button>
            </div>
        </aside>
    );
};

export default FiltersSidebar;