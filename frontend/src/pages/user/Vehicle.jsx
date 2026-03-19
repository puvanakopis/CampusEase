import React, { useState, useContext, useEffect } from "react";
import VehicleFiltersSidebar from "../../containers/user/vehicle/VehicleFiltersSidebar";
import VehiclePageHeader from "../../containers/user/vehicle/VehiclePageHeader";
import VehicleSortBar from "../../containers/user/vehicle/VehicleSortBar";
import VehicleGrid from "../../containers/user/vehicle/VehicleGrid";
import Pagination from "../../components/user/Pagination";
import { VehicleContext } from "../../context/VehicleContext";
import { SaveItemContext } from "../../context/SaveItemContext";
import { PAGINATION } from "../../constants/constants";

const Vehicle = () => {
    const { vehicles, loading, fetchVehicles } = useContext(VehicleContext);
    const { fetchSavedItems } = useContext(SaveItemContext);

    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState({
        types: [],
        transmission: "",
        minRent: "",
        maxRent: "",
    });

    const [sortOption, setSortOption] = useState("distance");

    useEffect(() => {
        fetchVehicles();
        fetchSavedItems();
    }, []);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleSortChange = (value) => {
        setSortOption(value);
    };

    const filteredVehicles = vehicles
        .filter((vehicle) => vehicle.status === "available")
        .filter((vehicle) => vehicle.owner?.status === "Available")
        .filter((vehicle) => {
            if (filters.types.length > 0 && !filters.types.includes(vehicle.vehicle_type)) {
                return false;
            }

            if (filters.transmission && vehicle.transmission !== filters.transmission) {
                return false;
            }

            if (filters.minRent && vehicle.day_rent < Number(filters.minRent)) {
                return false;
            }

            if (filters.maxRent && vehicle.day_rent > Number(filters.maxRent)) {
                return false;
            }

            return true;
        });

    const sortedVehicles = [...filteredVehicles].sort((a, b) => {
        if (sortOption === "price_low_high") {
            return a.day_rent - b.day_rent;
        }

        if (sortOption === "top_rated") {
            return (b.highly_rated ? 1 : 0) - (a.highly_rated ? 1 : 0);
        }

        if (sortOption === "distance") {
            const aDist = parseFloat(a.time_from_uni?.susl_main_gate || 0);
            const bDist = parseFloat(b.time_from_uni?.susl_main_gate || 0);
            return aDist - bDist;
        }

        return 0;
    });

    const totalPages = Math.ceil(sortedVehicles.length / PAGINATION.USER_ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * PAGINATION.USER_ITEMS_PER_PAGE;

    const currentVehicles = sortedVehicles.slice(
        startIndex,
        startIndex + PAGINATION.USER_ITEMS_PER_PAGE
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="bg-[#f6f7f8] min-h-screen">
            <div className="flex flex-col lg:flex-row px-4 py-6 md:px-24 max-w-8xl mx-auto gap-6">

                {/* Filters Sidebar with mobile support */}
                <VehicleFiltersSidebar filters={filters} onFilterChange={handleFilterChange} />

                <main className="flex-1 flex flex-col gap-6">
                    <VehiclePageHeader
                        title="Vehicle Rentals"
                        description="Scooters, cars, vans, and bikes available for rent near Sabaragamuwa University."
                    />

                    <VehicleSortBar
                        total={sortedVehicles.length}
                        location="Belihuloya & Pambahinna"
                        sortOption={sortOption}
                        onSortChange={handleSortChange}
                    />

                    {loading ? (
                        <div className="text-center py-20 text-lg font-semibold">
                            Loading vehicles...
                        </div>
                    ) : (
                        <>
                            {currentVehicles.length === 0 ? (
                                <div className="text-center py-20 text-lg font-semibold text-gray-500">
                                    No vehicles found matching your filters.
                                </div>
                            ) : (
                                <VehicleGrid vehicles={currentVehicles} />
                            )}
                        </>
                    )}

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default Vehicle;