import React from "react";
import FiltersSidebar from "../../containers/user/accommodation/FiltersSidebar";

const AccommodationsPage = () => {
    return (
        <div className='bg-[#f6f7f8]'>
            <div className="flex flex-1 flex-col lg:flex-row px-4 py-10 md:px-10 max-w-7xl mx-auto mx-auto">
                <FiltersSidebar />
            </div>
        </div>
    );
};

export default AccommodationsPage;