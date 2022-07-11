import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function LogoButton() {

    // Такой компонент удобен тем, что он оказывается не привязан к шапке 
    // и может использоваться на разных страницах. Здесь позволим себе продублировать 
    // 3 строки кода из App.js, чтоб не передавать в этот компонент никакие пропсы,
    // поскольку он всегда функционирует одинаково.
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

    return (
        <Button
            className="logo-button"
            path="/"
            onButtonClick={handleClick}
        />
    )
}

export default LogoButton;