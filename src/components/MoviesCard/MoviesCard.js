import React from "react";

function MoviesCard({ 
    movie, 
    handleButtonClick, 
    pageState, 
    isMovieSaved 
}) {

    const onButtonClick = () => {
        handleButtonClick(movie);
    }

    return (
        <li className="movies-card">
            <div className="movies-card__heading">
                <p className="movies-card__heading-title">
                    {movie.nameRU}
                </p>
                <p className="movies-card__heading-duration">
                    {Math.trunc(movie.duration / 60) !== 0 ? (
                        `${Math.trunc(movie.duration / 60)}ч ${movie.duration % 60}м`
                    ) : (
                        `${movie.duration % 60}м`
                    )}
                </p>
                <button
                    className={
                        `movies-card__heading-mark 
                        ${isMovieSaved(movie) ? "movies-card__heading-mark_saved" : ""} 
                        ${pageState === "/saved-movies" ? "movies-card__heading-mark_delete" : ""}`}
                    type="button"
                    onClick={onButtonClick}
                />
            </div>
            <a
                href={movie.trailerLink}
                target="_blank"
                rel="noreferrer"
            >
                <img
                    className="movies-card__image"
                    src={
                        pageState === "/movies"
                            ? "https://api.nomoreparties.co" + movie.image.url
                            : movie.image
                    }
                    alt={`Постер к фильму "${movie.title}"`}
                />
            </a>

        </li>
    )
}

export default MoviesCard;