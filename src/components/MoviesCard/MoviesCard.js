import React from "react";

function MoviesCard({ movie, handleButtonClick, deleteMark }) {

    return (
        <li className="movies-card">
            <div className="movies-card__heading">
                <p className="movies-card__heading-title">
                    {movie.title}
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
                        ${movie.saved ? "movies-card__heading-mark_saved" : ""} 
                        ${deleteMark ? "movies-card__heading-mark_delete" : ""}`}
                    type="button"
                    onClick={handleButtonClick}
                />
            </div>
            <img
                className="movies-card__image"
                src={movie.image}
                alt={`Постер к фильму "${movie.title}"`}
            />
        </li>
    )
}

export default MoviesCard;