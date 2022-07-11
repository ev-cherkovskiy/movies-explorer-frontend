import React from "react";
import LogoButton from "../LogoButton/LogoButton";
import Button from "../Button/Button";

function FormContainer({ title, formType, handleSubmit, buttonText, otherOptionText, otherOptionButtonText, onRedirectionButtonClick, redirectionPath, children }) {

    return (
        <div className="form-container">
            <LogoButton />
            <h2 className="form-container__title">
                {title}
            </h2>
            <form
                className={`form form_type_${formType}`}
                name={`form-${formType}`}
                method="post"
                noValidate
                onSubmit={handleSubmit}
            >
                <div className="form__inputs">
                    {children}
                </div>
                <button
                    className="form__submit-button"
                    type="submit"
                >
                    {buttonText}
                </button>
            </form>
            <div className="form-container__other-option">
                <p className="form-container__other-option-text">
                    {otherOptionText}
                </p>
                <Button
                    className="form-container__other-option-button"
                    path={redirectionPath}
                    onButtonClick={onRedirectionButtonClick}
                >
                    {otherOptionButtonText}
                </Button>
            </div>
        </div>
    )
}

export default FormContainer;