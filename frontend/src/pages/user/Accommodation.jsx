import React, { useState, useContext, useEffect } from "react";
import AccommodationFiltersSidebar from "../../containers/user/accommodation/AccommodationFiltersSidebar";
import AccommodationPageHeader from "../../containers/user/accommodation/AccommodationPageHeader";
import AccommodationSortBar from "../../containers/user/accommodation/AccommodationSortBar";
import AccommodationGrid from "../../containers/user/accommodation/AccommodationGrid";
import Pagination from "../../components/user/Pagination";
import { AccommodationContext } from "../../context/AccommodationContext";
import { SaveItemContext } from "../../context/SaveItemContext";
import { AuthContext } from "../../context/AuthContext";
import { PAGINATION } from "../../constants/constants";

const Accommodations = () => {
  const { accommodations, accoLoading, fetchAccommodations } = useContext(AccommodationContext);
  const { fetchSavedItems } = useContext(SaveItemContext);
  const { currentUser } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    types: [],
    gender: "",
    minRent: "",
    maxRent: "",
  });

  const [sortOption, setSortOption] = useState("distance");

  useEffect(() => {
    fetchAccommodations();
    fetchSavedItems();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const filteredAccommodations = accommodations
    .filter((acc) => acc.status === "available")
    .filter((acc) => acc.owner?.status === "available")
    .filter((acc) => {
      if (filters.types.length > 0 && !filters.types.includes(acc.accommodation_type)) {
        return false;
      }

      if (filters.gender && acc.gender !== filters.gender) {
        return false;
      }

      if (filters.minRent && acc.month_rent < Number(filters.minRent)) {
        return false;
      }

      if (filters.maxRent && acc.month_rent > Number(filters.maxRent)) {
        return false;
      }

      return true;
    });

  const sortedAccommodations = [...filteredAccommodations].sort((a, b) => {
    if (sortOption === "price_low_high") {
      return a.month_rent - b.month_rent;
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

  const totalPages = Math.ceil(sortedAccommodations.length / PAGINATION.USER_ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * PAGINATION.USER_ITEMS_PER_PAGE;

  const currentAccommodations = sortedAccommodations.slice(
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
        <AccommodationFiltersSidebar filters={filters} onFilterChange={handleFilterChange} />

        <main className="flex-1 flex flex-col gap-6">
          <AccommodationPageHeader
            title="Accommodation Rentals"
            description="Student housing near Sabaragamuwa University of Sri Lanka (SUSL)."
          />

          <AccommodationSortBar
            total={sortedAccommodations.length}
            location="Belihuloya & Pambahinna"
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />

          {accoLoading ? (
            <div className="text-center py-20 text-lg font-semibold">
              Loading accommodations...
            </div>
          ) : (
            <>
              {currentAccommodations.length === 0 ? (
                <div className="text-center py-20 text-lg font-semibold text-gray-500">
                  No accommodations found matching your filters.
                </div>
              ) : (
                <AccommodationGrid
                  currentUser={currentUser}
                  accommodations={currentAccommodations}
                />
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

export default Accommodations;