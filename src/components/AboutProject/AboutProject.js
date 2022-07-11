import React from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import Paragraph from "../Paragraph/Paragraph";
import Timeline from "../Timeline/Timeline";

function AboutProject() {

    return (
        <div className="about-project" id="about">
            <SectionHeader title="О проекте" />
            <div className="paragraph-container">
                <Paragraph title="Дипломный проект включал 5 этапов" titleSize="L" isCentered={false}>
                    Составление плана, работу над бэкендом, вёрстку, 
                    добавление функциональности и финальные доработки.
                </Paragraph>
                <Paragraph title="На выполнение диплома ушло 5 недель" titleSize="L" isCentered={false}>
                    У каждого этапа был мягкий и жёсткий дедлайн, которые нужно 
                    было соблюдать, чтобы успешно защититься.
                </Paragraph>
            </div>
            <Timeline />
        </div>
    )
}

export default AboutProject;