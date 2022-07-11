import React from "react";

function SectionHeader({ title }) {

    return (
        <div className="section-header">
            <h2 className="section-header__text">
                {title}
            </h2>
            <div className="section-header__line" />
        </div>
    )
}

export default SectionHeader;