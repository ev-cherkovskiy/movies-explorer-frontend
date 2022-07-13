import React from "react";
import FormContainer from "../FormContainer/FormContainer";
import validate from "../../utils/inputValidation";

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


    const [isNameValid, setIsNameValid] = React.useState(false);
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [isPasswordValid, setIsPasswordValid] = React.useState(false);

    const validateName = () => validate(name, /([а-яА-Яёa-z][\s\-]{0,1})+/i, setIsNameValid);
    const validateEmail = () => validate(email, /[a-z\d\-\.\_]+\@[a-z]+\.[a-z]{2,}/i, setIsEmailValid);
    const validatePassword = () => validate(password, /[^\sа-яё]+/i, setIsPasswordValid);

    React.useEffect(validateName, [name]);
    React.useEffect(validateEmail, [email]);
    React.useEffect(validatePassword, [password]);


    return (
        <main className="register">
            <FormContainer
                title="Добро пожаловать!"
                formType="signup"
                onSubmit={handleSubmit}
                buttonText="Зарегистрироваться"
                otherOptionText="Уже зарегистрированы?"
                otherOptionButtonText="Войти"
                redirectionPath="/signin"
                onRedirectionButtonClick={onRedirectionButtonClick}
                isButtonDisabled={!isNameValid || !isEmailValid || !isPasswordValid}
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
                    style={isNameValid ? { backgroundColor: "" } : { backgroundColor: "#f9d9d9" }}
                />
                {!isNameValid && (
                    <span className="form__input-error">
                        От 2 до 30 букв. Допускается дефис и пробел.
                    </span>
                )}
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
                    id="signup-password"
                    type="password"
                    name="signup-password"
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

export default Register;