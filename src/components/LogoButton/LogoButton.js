import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function LogoButton() {
    
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