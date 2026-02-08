import React from "react";
import VehicleCard from "./VehicleCard";

const VehicleGrid = ({ vehicles }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {vehicles.map((acc, idx) => (
                <VehicleCard key={idx} data={acc} />
            ))}
        </div>
    );
};

export default VehicleGrid;