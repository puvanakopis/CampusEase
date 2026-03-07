import React from "react";
import AccommodationCard from "./AccommodationCard";

const AccommodationGrid = ({ accommodations }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {accommodations.map((acc, idx) => (
                <AccommodationCard key={acc._id || idx} data={acc} />
            ))}
        </div>
    );
};

export default AccommodationGrid;