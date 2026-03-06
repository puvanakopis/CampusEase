import React, { useState } from "react";

const accommodationTypes = [
    { label: "Apartment", value: "apartment" },
    { label: "House", value: "house" },
    { label: "Villa", value: "villa" },
    { label: "Hostel", value: "hostel" },
    { label: "Other", value: "other" },
];

const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
];

const AccommodationFiltersSidebar = ({ filters, onFilterChange }) => {

    const [localFilters, setLocalFilters] = useState(filters);

    const handleTypeChange = (value) => {
        let updatedTypes = [...localFilters.types];

        if (updatedTypes.includes(value)) {
            updatedTypes = updatedTypes.filter(t => t !== value);
        } else {
            updatedTypes.push(value);
        }

        setLocalFilters({ ...localFilters, types: updatedTypes });
    };

    const handleApply = () => {
        onFilterChange(localFilters);
    };

    return (
        <aside className="hidden lg:flex w-80 h-max flex-col gap-4 border border-[#e7edf3] rounded-xl bg-white p-6 sticky top-[65px]">

            <div className="flex flex-col gap-1 pb-4 border-b border-[#e7edf3]">
                <h1 className="text-[#0d141b] text-lg font-bold leading-normal">Filters</h1>
                <p className="text-[#4c739a] text-sm font-normal leading-normal">
                    Find stays near Sabaragamuwa University.
                </p>
            </div>

            {/* Type */}
            <div className="flex flex-col gap-3 py-2">
                <label className="text-[#0d141b] text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">house</span>
                    Property Type
                </label>

                <div className="flex flex-col gap-2">
                    {accommodationTypes.map((type, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={localFilters.types.includes(type.value)}
                                onChange={() => handleTypeChange(type.value)}
                                className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary h-4 w-4 bg-transparent"
                            />
                            <span className="text-[#0d141b] text-sm font-medium group-hover:text-primary transition-colors">
                                {type.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rent */}
            <div className="flex flex-col gap-3 py-2">
                <label className="text-[#0d141b] text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">payments</span>
                    Monthly Budget (LKR)
                </label>

                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={localFilters.minRent}
                        onChange={(e) =>
                            setLocalFilters({ ...localFilters, minRent: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none"
                    />

                    <span className="text-gray-400">-</span>

                    <input
                        type="number"
                        placeholder="Max"
                        value={localFilters.maxRent}
                        onChange={(e) =>
                            setLocalFilters({ ...localFilters, maxRent: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none"
                    />
                </div>
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-3 py-2">
                <label className="text-[#0d141b] text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">wc</span>
                    Gender
                </label>

                <div className="flex flex-col gap-2">
                    {genders.map((gender, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="gender"
                                checked={localFilters.gender === gender.value}
                                onChange={() =>
                                    setLocalFilters({ ...localFilters, gender: gender.value })
                                }
                                className="form-radio rounded text-primary border-gray-300 focus:ring-primary h-4 w-4 bg-transparent"
                            />
                            <span className="text-[#0d141b] text-sm font-medium group-hover:text-primary transition-colors">
                                {gender.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-auto pt-4">
                <button
                    onClick={handleApply}
                    className="flex w-full items-center justify-center rounded-lg h-10 px-4 bg-primary text-slate-50 text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm"
                >
                    Apply Filters
                </button>
            </div>

        </aside>
    );
};

export default AccommodationFiltersSidebar;