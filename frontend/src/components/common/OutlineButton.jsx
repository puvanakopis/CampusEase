import React from "react";

const OutlineButton = ({
    onClick,
    children,
    className = "",
    type = "button",
    disabled = false,
    fullWidth = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                px-8 py-3 border border-primary/30 hover:bg-primary/10 
                text-primary font-semibold rounded-lg transition-colors
                ${fullWidth ? "w-full" : ""}
                ${disabled ? "opacity-60 cursor-not-allowed" : ""}
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default OutlineButton;