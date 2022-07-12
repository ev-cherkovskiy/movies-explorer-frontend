import React from "react";

function PageNotFound({ onButtonClick}) {

    return (
        <main className="page-not-found">
            <div className="page-not-found__message">
                <p className="page-not-found__message-code">
                    404
                </p>
                <p className="page-not-found__message-text">
                    Страница не найдена
                </p>
            </div>
            <button
                className="page-not-found__button"
                type="button"
                onClick={onButtonClick}
            >
                Назад
            </button>
        </main>
    )
}

export default PageNotFound;