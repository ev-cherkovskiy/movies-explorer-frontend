import React from "react";

function Footer() {

    return (
        <footer className="footer">
            <p className="footer__text">
            Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
            <div className="footer__line" />
            <div className="footer__container">
                <p className="footer__container-year">
                © 2022
                </p>
                <ul className="footer__container-socials">
                    <li>
                        <a 
                        className="footer__container-link" 
                        href="https://practicum.yandex.ru/" 
                        target="_blank" 
                        rel="noreferrer"
                        >
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li>
                        <a 
                        className="footer__container-link" 
                        href="https://github.com/ev-cherkovskiy" 
                        target="_blank" 
                        rel="noreferrer"
                        >
                            Github
                        </a>
                    </li>
                    {/* <li>
                        <a 
                        className="footer__container-link" 
                        href="*" 
                        target="_blank" 
                        rel="noreferrer"
                        >
                            Facebook
                        </a>
                    </li> */}
                </ul>
            </div>
        </footer>
    )
}

export default Footer;