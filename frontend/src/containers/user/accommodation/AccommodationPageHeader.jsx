import React from "react";

const AccommodationPageHeader = ({ title, description }) => {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-[#0d141b] tracking-tight text-2xl md:text-3xl font-bold leading-tight">
                {title}
            </h1>
            <p className="text-[#4c739a] text-base font-normal">{description}</p>
        </div>
    );
};

export default AccommodationPageHeader;