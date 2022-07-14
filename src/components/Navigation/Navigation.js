import React from "react";
import Button from "../Button/Button";

function Navigation({ 
    pageState, 
    isMenuOpen, 
    onCloseButtonClick, 
    onButtonClick, 
    loggedIn 
}) {

    return (
        !["/signup", "/signin"].includes(pageState) && loggedIn && (
            <>
                <div className={`navigation-overlay ${!isMenuOpen ? "" : "navigation-overlay_displayed"}`} />
                <button
                    className={`navigation-close-button ${!isMenuOpen ? "" : "navigation-close-button_displayed"}`}
                    onClick={onCloseButtonClick}
                />
                <nav className={`navigation ${!isMenuOpen ? "" : "navigation_displayed"}`}>
                    <ul className="navigation-container">
                        <li>
                            <Button
                                className="navigation__button navigation__button_type_main"
                                path="/"
                                onButtonClick={onButtonClick}
                            >
                                Главная
                            </Button>
                        </li>
                        <li>
                            <Button
                                className={`navigation__button ${pageState === "/movies" ? "navigation__button_selected" : ""}`}
                                path="/movies"
                                onButtonClick={onButtonClick}
                            >
                                Фильмы
                                {pageState === "/movies" && (
                                    <div className="navigation__button-line" />
                                )}
                            </Button>
                        </li>
                        <li>
                            <Button
                                className={`navigation__button ${pageState === "/saved-movies" ? "navigation__button_selected" : ""}`}
                                path="/saved-movies"
                                onButtonClick={onButtonClick}
                            >
                                Сохранённые фильмы
                                {pageState === "/saved-movies" && (
                                    <div className="navigation__button-line" />
                                )}
                            </Button>
                        </li>
                    </ul>
                    <Button
                        className="navigation__button navigation__button_type_account"
                        path="/profile"
                        onButtonClick={onButtonClick}
                    >
                        <p className="navigation__button-text">
                            Аккаунт
                        </p>
                        <div className="navigation__profile-icon" />
                    </Button>
                </nav>
            </>
        )
    )
}

export default Navigation;