import React from "react";

function Button({ className, path, onButtonClick, children }) {

    const handleRedirection = () => {
        onButtonClick(path);
    }

    return (
        <button
            type="button"
            className={className}
            onClick={handleRedirection}
        >
            {children}
        </button>
    )
}

export default Button;