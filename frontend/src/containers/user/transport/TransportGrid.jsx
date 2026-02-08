import React from "react";
import TransportCard from "./TransportCard";

const TransportGrid = ({ transports }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {transports.map((acc, idx) => (
                <TransportCard key={idx} data={acc} />
            ))}
        </div>
    );
};

export default TransportGrid;