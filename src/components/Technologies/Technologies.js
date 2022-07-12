import React from "react";
import Paragraph from "../Paragraph/Paragraph";
import SectionHeader from "../SectionHeader/SectionHeader";

function Technologies() {

    return (
        <div className="technologies" id="technologies">
            <SectionHeader title="Технологии" />
            <Paragraph title="7 технологий" titleSize="XL" isCentered={true}>
                На курсе веб-разработки мы освоили технологии,
                которые применили в дипломном проекте.
            </Paragraph>
            {/* Здесь для краткости воспользуемся методом map(), используя индексы в качестве ключей.
            В данном случае индексы подходят, поскольку массив статичный, а элементы списка никогда
            не меняют свой порядок и не сортируются. */}
            <ul className="technologies-list">
                {
                    ["HTML", "CSS", "JS", "React", "Git", "Express.js", "mongoDB"]
                        .map((item, index) => (
                            <li className="technologies-list__item" key={index}>
                                {item}
                            </li>
                        ))
                }
            </ul>
        </div>
    )
}

export default Technologies;