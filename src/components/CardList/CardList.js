import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function CardList({ movies, handleButtonClick, pageState }) {

    return (
        <ul className="card-list">
            {
                movies.map(movie => (
                    <MoviesCard
                        key={movie.movieId}
                        movie={movie}
                        handleButtonClick={handleButtonClick}
                        deleteMark={pageState === "/saved-movies"}
                    />
                ))
            }
        </ul>
    )
}

export default CardList;