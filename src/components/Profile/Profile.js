import React from "react";

function Profile({ initialName, initialEmail, handleEditProfile, handleLogout }) {
    const [name, setName] = React.useState(initialName);
    const [email, setEmail] = React.useState(initialEmail);

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleEditProfile();
    }

    return (
        <div className="form-container form-container_type_profile">
            <h2 className="form-container__title form-container__title_type_profile">
                {`Привет, ${initialName}!`}
            </h2>
            <form
                className={`form form_type_profile`}
                name={`form-profile`}
                method="patch"
                noValidate
                onSubmit={handleSubmit}
            >
                <div className="form__profile-inputs">
                    <div className="form__profile-input-container">
                        <p className="form__profile-input-title">
                            Имя
                        </p>
                        <input
                            className="form__profile-input form__profile-input_type_name"
                            id="profile-name"
                            type="text"
                            name="profalie-name"
                            minLength="2"
                            maxLength="30"
                            placeholder={initialName}
                            required
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <span className="profile-name-error form__input-error" />
                    <div className="form__profile-inputs-divider" />
                    <div className="form__profile-input-container">
                        <p className="form__profile-input-title">
                            Почта
                        </p>
                        <input
                            className="form__profile-input form__profile-input_type_email"
                            id="profile-email"
                            type="text"
                            name="profile-email"
                            minLength="2"
                            maxLength="30"
                            placeholder={initialEmail}
                            required
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <span className="profile-email-error form__input-error" />
                </div>
                <button
                    className="form__profile-submit-button"
                    type="submit"
                >
                    Редактировать
                </button>
            </form>
            <button
                className="form-container__profile-signout-button"
                type="button"
                onClick={handleLogout}>
                Выйти из аккаунта
            </button>

        </div>
    )
}
export default Profile;