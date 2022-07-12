import React from "react";

function FilterCheckbox({ checked, onClick }) {

    return (
        <button
            className="filter-checkbox"
            onClick={onClick}
        >
            <div className={`filter-checkbox__toggle ${checked ? "filter-checkbox__toggle_checked" : ""}`}>
                <div className="filter-checkbox__toggle-head" />
            </div>
            <p className="filter-checkbox__text">
                Короткометражки
            </p>
        </button>
    )
}

export default FilterCheckbox;