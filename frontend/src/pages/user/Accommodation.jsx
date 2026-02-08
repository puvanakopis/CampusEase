import React from "react";
import FiltersSidebar from "../../containers/user/accommodation/FiltersSidebar";
import PageHeader from "../../containers/user/accommodation/PageHeader"
import SortBar from "../../containers/user/accommodation/SortBar"

const Accommodations = () => {
    return (
        <div className='bg-[#f6f7f8]'>
            <div className="flex flex-1 flex-col lg:flex-row px-4 py-10 md:px-10 max-w-7xl mx-auto mx-auto">
                <FiltersSidebar />
                <main className="flex-1 flex flex-col pl-4 md:pl-6 lg:pl-10 w-full gap-y-4">
                    <PageHeader />
                    <SortBar />
                </main>
            </div>
        </div>
    );
};

export default Accommodations;