import React from "react";

function Link({ title, url }) {

    return (
        <li>
            <a
                className="link"
                href={url}
                target="_blank"
                rel="noreferrer"
            >
                <p className="link__title">
                    {title}
                </p>
                <p className="link__icon">
                    ↗
                </p>
            </a>
        </li>
    )
}

export default Link;