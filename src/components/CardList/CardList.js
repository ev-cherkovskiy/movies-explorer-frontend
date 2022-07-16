import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function CardList({
    movies,
    handleButtonClick,
    pageState,
    isMovieSaved,
    isPreloaderShown
}) {

    return (
        <>
            {
                movies.length !== 0 &&
                <ul className="card-list">

                    {
                        movies.map(movie => (
                            <MoviesCard
                                key={pageState === "/movies" ? movie.id : movie.movieId}
                                movie={movie}
                                handleButtonClick={handleButtonClick}
                                pageState={pageState}
                                isMovieSaved={isMovieSaved}
                            />
                        ))
                    }

                </ul>
            }
            {
                movies.length === 0 && !isPreloaderShown &&
                <p className="no-result">
                    К сожалению, фильмов по данному запросу не найдено.
                </p>
            }
        </>
    )
}

export default CardList;