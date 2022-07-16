import React from "react";
import Navigation from "../Navigation/Navigation";
import Button from "../Button/Button";
import LogoButton from "../LogoButton/LogoButton";

function Header({
    pageState,
    isMenuOpen,
    onCloseButtonClick,
    onOpenButtonClick,
    onButtonClick,
    loggedIn
}) {

    return (
        <header className={`header ${pageState === "/" ? "header_color_pink" : "header_color_white"}`}>
            <LogoButton />
            <Navigation
                pageState={pageState}
                isMenuOpen={isMenuOpen}
                onCloseButtonClick={onCloseButtonClick}
                onButtonClick={onButtonClick}
                loggedIn={loggedIn}
            />
            <div className={`header__auth-buttons ${!loggedIn ? "" : "header__auth-buttons_hidden"}`}>
                <Button
                    className="header__auth-buttons-item"
                    path="/signup"
                    onButtonClick={onButtonClick}
                >
                    Регистрация
                </Button>
                <Button
                    className="header__auth-buttons-item header__auth-buttons-item_accented"
                    path="/signin"
                    onButtonClick={onButtonClick}
                >
                    Войти
                </Button>
            </div>
            <button
                className={`${["/signup", "/signin"].includes(pageState) || !loggedIn ? "header__burger-button_hidden" : "header__burger-button"}`}
                onClick={onOpenButtonClick}
            />
        </header>
    );
}

export default Header;