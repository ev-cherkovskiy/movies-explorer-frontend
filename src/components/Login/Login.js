import React from "react";
import FormContainer from "../FormContainer/FormContainer";

function Login({ handleLogin, onRedirectionButtonClick }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleLogin();
    }

    // add auto-login if token already exists

    return (
        <main className="login">
            <FormContainer
                title="Рады видеть!"
                formType="signin"
                onSubmit={handleSubmit}
                buttonText="Войти"
                otherOptionText="Ещё не зарегистрированы?"
                otherOptionButtonText="Регистрация"
                redirectionPath="/signup"
                onRedirectionButtonClick={onRedirectionButtonClick}
            >
                <p className="form__input-title">
                    E-mail
                </p>
                <input
                    className="form__input form__input_type_email"
                    id="signin-email"
                    type="email"
                    name="signin-email"
                    placeholder=""
                    minLength="2"
                    maxLength="30"
                    required
                    value={email || ''}
                    onChange={handleEmailChange}
                />
                <span className="signin-email-error form__input-error" />
                <p className="form__input-title">
                    Пароль
                </p>
                <input
                    className="form__input form__input_type_password"
                    id="signin-password"
                    type="password"
                    name="signin-password"
                    placeholder=""
                    minLength="2"
                    maxLength="30"
                    required
                    value={password || ''}
                    onChange={handlePasswordChange}
                />
                <span className="signin-password-error form__input-error" />
            </FormContainer>
        </main>
    )
}

export default Login;