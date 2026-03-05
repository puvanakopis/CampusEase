import React, { useState, useContext, useEffect } from "react";
import FiltersSidebar from "../../containers/user/accommodation/FiltersSidebar";
import PageHeader from "../../containers/user/accommodation/PageHeader";
import SortBar from "../../containers/user/accommodation/SortBar";
import AccommodationGrid from "../../containers/user/accommodation/AccommodationGrid";
import Pagination from "../../components/user/Pagination";
import { AccommodationContext } from "../../context/AccommodationContext";

const ITEMS_PER_PAGE = 9;

const Accommodations = () => {
  const { accommodations, accoLoading, fetchAccommodations } = useContext(AccommodationContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const availableAccommodations = accommodations.filter(acc => acc.status === "available");

  const totalPages = Math.ceil(availableAccommodations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAccommodations = availableAccommodations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#f6f7f8]">
      <div className="flex flex-col lg:flex-row px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6">
        <FiltersSidebar />

        <main className="flex-1 flex flex-col gap-6">
          <PageHeader
            title="Accommodation Rentals"
            description="Student housing near Sabaragamuwa University of Sri Lanka (SUSL)."
          />

          <SortBar
            total={availableAccommodations.length}
            location="Belihuloya & Pambahinna"
          />

          {accoLoading ? (
            <div className="text-center py-20 text-lg font-semibold">Loading accommodations...</div>
          ) : (
            <AccommodationGrid accommodations={currentAccommodations} />
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    </div>
  );
};

export default Accommodations;