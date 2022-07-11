import React from "react";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Cover from "../Cover/Cover"
import NavTab from "../NavTab/NavTab";
import Portfolio from "../Portfolio/Portfolio";
import Technologies from "../Technologies/Technologies";

function Main() {

    return (
        <div className="main">
            <Cover />
            <NavTab />
            <AboutProject />
            <Technologies />
            <AboutMe />
            <Portfolio />
        </div>
    )
}

export default Main;