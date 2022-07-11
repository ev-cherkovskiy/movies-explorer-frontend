import React from "react";
import Link from "../Link/Link";

function Portfolio() {

    return (
        <div className="portfolio">
            <h2 className="portfolio__header">
                Портфолио
            </h2>
            <ul className="portfolio__links-container">
                <Link
                    title="Статичный сайт"
                    url="https://github.com/ev-cherkovskiy/how-to-learn"
                />
                <div className="portfolio__links-divider" />
                <Link
                    title="Адаптивный сайт"
                    url="https://github.com/ev-cherkovskiy/russian-travel"
                />
                <div className="portfolio__links-divider" />
                <Link
                    title="Одностраничное приложение"
                    url="https://github.com/ev-cherkovskiy/react-mesto-api-full"
                />
            </ul>
        </div>
    )
}

export default Portfolio;