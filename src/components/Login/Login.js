import React from "react";
import FormContainer from "../FormContainer/FormContainer";
import validate from "../../utils/inputValidation";

function Login({
    handleLogin,
    onRedirectionButtonClick,
    handleAutologin
}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [isPasswordValid, setIsPasswordValid] = React.useState(false);

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleLogin(email, password);
        setEmail("");
        setPassword("");
    }

    const validateEmail = () => validate(email, /[a-z\d\-\.\_]+\@[a-z]+\.[a-z]{2,}/i, setIsEmailValid);
    const validatePassword = () => validate(password, /[^\sа-яё]+/i, setIsPasswordValid);

    React.useEffect(validateEmail, [email]);
    React.useEffect(validatePassword, [password]);

    React.useEffect(() => {
        handleAutologin();
    }, []);

    return (
        <main className="login">
            <FormContainer
                title="Рады видеть!"
                formType="signin"
                handleSubmit={handleSubmit}
                buttonText="Войти"
                otherOptionText="Ещё не зарегистрированы?"
                otherOptionButtonText="Регистрация"
                redirectionPath="/signup"
                onRedirectionButtonClick={onRedirectionButtonClick}
                isButtonDisabled={!isEmailValid || !isPasswordValid}
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
                    style={isEmailValid ? { backgroundColor: "" } : { backgroundColor: "#f9d9d9" }}
                />
                {!isEmailValid && (
                    <span className="form__input-error">
                        В общепринятом формате электронной почты.
                    </span>
                )}
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
                    style={isPasswordValid ? { backgroundColor: "" } : { backgroundColor: "#f9d9d9" }}
                />
                {!isPasswordValid && (
                    <span className="form__input-error">
                        От 2 до 30 символов, кроме пробелов и русских букв.
                    </span>
                )}
            </FormContainer>
        </main>
    )
}

export default Login;