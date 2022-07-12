import React from "react";

function Timeline() {

    return (
        <div className="timeline">
            <p className="timeline__weeks-counter timeline__weeks-counter_type_short">
                1 неделя
            </p>
            <p className="timeline__weeks-counter timeline__weeks-counter_type_long">
                4 недели
            </p>
            <p className="timeline__caption timeline__caption_type_short">
                Back-end
            </p>
            <p className="timeline__caption timeline__caption_type_long">
                Front-end
            </p>
        </div>
    )
}

export default Timeline;