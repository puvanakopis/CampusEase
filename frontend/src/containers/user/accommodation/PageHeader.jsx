import React from "react";

const PageHeader = () => {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-[#0d141b] tracking-tight text-2xl md:text-3xl font-bold leading-tight">
                Sabaragamuwa Accommodations
            </h1>
            <p className="text-[#4c739a] text-base font-normal">
                Student housing near Sabaragamuwa University of Sri Lanka (SUSL).
            </p>
        </div>
    );
};

export default PageHeader;