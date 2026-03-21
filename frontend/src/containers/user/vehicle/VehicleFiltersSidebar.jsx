import React, { useState, useEffect } from "react";

const vehicleTypes = [
    { label: "Car", value: "car" },
    { label: "Van", value: "van" },
    { label: "Bike", value: "bike" },
    { label: "Three Wheel", value: "three_wheel" },
    { label: "Bus", value: "bus" },
    { label: "Other", value: "other" },
];

const transmissions = [
    { label: "Manual", value: "manual" },
    { label: "Automatic", value: "automatic" },
    { label: "Semi-Automatic", value: "semi_automatic" }
];

const VehicleFiltersSidebar = ({ filters, onFilterChange }) => {
    const [localFilters, setLocalFilters] = useState(filters);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Update local filters when prop changes
    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleTypeChange = (value) => {
        let updatedTypes = [...localFilters.types];

        if (updatedTypes.includes(value)) {
            updatedTypes = updatedTypes.filter(t => t !== value);
        } else {
            updatedTypes.push(value);
        }

        setLocalFilters({ ...localFilters, types: updatedTypes });
    };

    const handleTransmissionChange = (value) => {
        // If the same value is clicked, clear it (toggle off)
        if (localFilters.transmission === value) {
            setLocalFilters({ ...localFilters, transmission: "" });
        } else {
            setLocalFilters({ ...localFilters, transmission: value });
        }
    };

    const handleApply = () => {
        onFilterChange(localFilters);
        setIsMobileFiltersOpen(false); // Close mobile sidebar after applying
    };

    const handleClearAll = () => {
        const clearedFilters = {
            types: [],
            transmission: "",
            minRent: "",
            maxRent: "",
        };
        setLocalFilters(clearedFilters);
        onFilterChange(clearedFilters);
        setIsMobileFiltersOpen(false);
    };

    const FilterContent = () => (
        <>
            <div className="flex flex-col gap-1 pb-4 border-b border-[#e7edf3]">
                <div className="flex items-center justify-between">
                    <h1 className="text-[#0d141b] text-lg font-bold leading-normal">Filters</h1>
                    <button
                        onClick={handleClearAll}
                        className="text-sm text-primary hover:text-primary/80 font-medium"
                    >
                        Clear All
                    </button>
                </div>
                <p className="text-[#4c739a] text-sm font-normal leading-normal">
                    Find rental vehicles near Sabaragamuwa University.
                </p>
            </div>

            {/* Vehicle Type */}
            <div className="flex flex-col gap-3 py-2">
                <label className="text-[#0d141b] text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">
                        directions_car
                    </span>
                    Vehicle Type
                </label>

                <div className="flex flex-col gap-2">
                    {vehicleTypes.map((type, i) => (
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

            {/* Daily Budget */}
            <div className="flex flex-col gap-3 py-2">
                <label className="text-[#0d141b] text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">
                        payments
                    </span>
                    Rental Budget (Per Day)
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

            {/* Transmission */}
            <div className="flex flex-col gap-3 py-2">
                <label className="text-[#0d141b] text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">
                        settings
                    </span>
                    Transmission
                </label>

                <div className="flex flex-col gap-2">
                    {transmissions.map((trans, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="transmission"
                                checked={localFilters.transmission === trans.value}
                                onChange={() => handleTransmissionChange(trans.value)}
                                className="form-radio rounded text-primary border-gray-300 focus:ring-primary h-4 w-4 bg-transparent"
                            />
                            <span className="text-[#0d141b] text-sm font-medium group-hover:text-primary transition-colors">
                                {trans.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Apply Button */}
            <div className="mt-auto pt-4">
                <button
                    onClick={handleApply}
                    className="flex w-full items-center justify-center rounded-lg h-10 px-4 bg-primary text-slate-50 text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm"
                >
                    Apply Filters
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-80 h-max flex-col gap-4 border border-[#e7edf3] rounded-xl bg-white p-6 sticky top-[65px]">
                <FilterContent />
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4 flex">
                <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="flex items-center gap-2 w-full bg-white border border-[#e7edf3] rounded-lg px-4 py-3 text-sm font-medium text-[#0d141b] hover:bg-gray-50 transition-colors justify-between"
                >
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">filter_list</span>
                        Filters
                    </div>

                    {(filters.types.length > 0 || filters.transmission || filters.minRent || filters.maxRent) && (
                        <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {(filters.types.length +
                                (filters.transmission ? 1 : 0) +
                                (filters.minRent ? 1 : 0) +
                                (filters.maxRent ? 1 : 0))}
                        </span>
                    )}
                </button>
            </div>

            {/* Mobile Filter Drawer */}
            {isMobileFiltersOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="lg:hidden fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsMobileFiltersOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="lg:hidden fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 overflow-y-auto shadow-xl animate-slide-right">
                        <div className="p-6">
                            {/* Drawer Header */}
                            <div className="flex items-end justify-end mb-4 pb-4 border-b border-[#e7edf3]">
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Filter Content */}
                            <div className="flex flex-col gap-4">
                                <FilterContent />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default VehicleFiltersSidebar;