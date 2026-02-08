import React from "react";

const PrimaryButton = ({
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
                px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold 
                rounded-lg transition-colors 
                ${fullWidth ? "w-full" : ""}
                ${disabled ? "opacity-60 cursor-not-allowed" : ""}
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;