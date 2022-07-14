import React from "react";

function Paragraph({ 
    title, 
    titleSize, 
    isCentered, 
    children 
}) {

    const centeringParagraphStyle = isCentered ? "paragraph_centered" : "";

    return (
        <div className={`paragraph ${centeringParagraphStyle}`}>
            <h3 className={`paragraph__title paragraph__title_size_${titleSize}`}>
                {title}

            </h3>
            <p className="paragraph__text">
                {children}
            </p>
        </div>
    )
}

export default Paragraph;