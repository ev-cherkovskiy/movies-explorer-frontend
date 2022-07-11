import React from "react";

function NavTab() {

    return(
        <div className="nav-tab">
            <a className="nav-tab__link" href="#about">
                О проекте
            </a>
            <a className="nav-tab__link" href="#technologies">
                Технологии
            </a>
            <a className="nav-tab__link" href="#me">
                Студент
            </a>
        </div>
    )
}

export default NavTab;