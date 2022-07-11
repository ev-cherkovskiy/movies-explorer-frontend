import React from "react";
import FormContainer from "../FormContainer/FormContainer";

function Register({ handleRegister, onRedirectionButtonClick }) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleRegister();
    }

    return (
        <div className="register">
            <FormContainer
                title="Добро пожаловать!"
                formType="signup"
                onSubmit={handleSubmit}
                buttonText="Зарегистрироваться"
                otherOptionText="Уже зарегистрированы?"
                otherOptionButtonText="Войти"
                redirectionPath="/signin"
                onRedirectionButtonClick={onRedirectionButtonClick}
            >
                <p className="form__input-title">
                    Имя
                </p>
                <input
                    className="form__input form__input_type_name"
                    id="signup-name"
                    type="text"
                    name="signup-name"
                    placeholder=""
                    minLength="2"
                    maxLength="30"
                    required
                    value={name || ''}
                    onChange={handleNameChange}
                />
                <span className="signup-name-error form__input-error" />
                <p className="form__input-title">
                    E-mail
                </p>
                <input
                    className="form__input form__input_type_email"
                    id="signup-email"
                    type="email"
                    name="signup-email"
                    placeholder=""
                    minLength="2"
                    maxLength="30"
                    required
                    value={email || ''}
                    onChange={handleEmailChange}
                />
                <span className="signup-email-error form__input-error" />
                <p className="form__input-title">
                    Пароль
                </p>
                <input
                    className="form__input form__input_type_password"
                    id="signup-password"
                    type="password"
                    name="signup-password"
                    placeholder=""
                    minLength="2"
                    maxLength="30"
                    required
                    value={password || ''}
                    onChange={handlePasswordChange}
                />
                <span className="signup-password-error form__input-error" />
            </FormContainer>
        </div>
    )
}

export default Register;