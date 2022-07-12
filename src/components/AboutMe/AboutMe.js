import React from "react";
import Paragraph from "../Paragraph/Paragraph";
import SectionHeader from "../SectionHeader/SectionHeader";
import photo from "../../images/me-min.png"

function AboutMe() {

    return (
        <div className="about-me" id="me">
            <SectionHeader title="Студент" />
            <div className="about-me-infobox">
                <p className="about-me-infobox__name">
                    Евгений
                </p>
                <Paragraph title="Фронтенд-разработчик, 23 года" titleSize="M" isCentered={false}>
                    Я родился в Нижневартовске, поступил в МГТУ им. Н.Э. Баумана на кафедру Материаловедения и переехал в Москву.
                    На данный момент работаю в лаборатории электронной микроскопии Института Кристаллографии РАН,
                    окончил магистратуру с красным дипломом. Из-за большой любви к искусству всегда хотел заниматься созданием красивого,
                    но с технической стороны. Это подтолкнуло меня к изучению веб-разработки.
                </Paragraph>
                <ul className="about-me-infobox__socials">
                    {/* Фейсбука у меня нет, да и другими соц.сетями особо не пользуюсь, поэтому оставил только гитхаб */}
                    {/* <li>
                        <a
                            className="about-me-infobox__socials-item"
                            href="*"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Facebook
                        </a>
                    </li> */}
                    <li>
                        <a
                            className="about-me-infobox__socials-item"
                            href="https://github.com/ev-cherkovskiy"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Github
                        </a>
                    </li>

                </ul>
                <img
                    className="about-me-infobox__photo"
                    src={photo}
                    alt="Фотография"
                />
            </div>

        </div>
    )
}

export default AboutMe;