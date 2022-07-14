import React from "react";

function InfoPopup({
    isOpen,
    onClose,
    message,
    showsError = true
}) {

    return (
        <div className={`info-popup ${isOpen ? "info-popup_open" : ""}`}>
            <div className="info-popup__container">
                <p className="info-popup__title">
                    {showsError ? "Ошибка" : "Успешно"}
                </p>
                <p className="info-popup__message">
                    {message}
                </p>
                <button
                    className="info-popup__button"
                    type="button"
                    onClick={onClose}
                >
                    {showsError ? "Попробовать снова" : "Далее"}
                </button>
            </div>
        </div>
    )
}

export default InfoPopup;