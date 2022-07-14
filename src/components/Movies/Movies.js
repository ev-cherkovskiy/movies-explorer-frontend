import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import CardList from "../CardList/CardList";
import Preloader from "../../vendor/Preloader/Preloader";

function Movies({ 
    pageState, 
    movies, 
    handleSearch, 
    handleButtonClick, 
    isMovieSaved, 
    isPreloaderShown 
}) {

    let initialLength;
    if (window.innerWidth <= 480) {
        initialLength = 5;
    } else if (window.innerWidth < 1280) {
        initialLength = 8;
    } else {
        initialLength = 12;
    }

    let initialIncrement;
    if (window.innerWidth < 1280) {
        initialIncrement = 2;
    } else {
        initialIncrement = 3;
    }

    const [lastIndex, setLastIndex] = React.useState(initialLength);
    const [increment, setIncrement] = React.useState(initialIncrement);

    const handleResize = () => {
        console.log(window.innerWidth);
        if (window.innerWidth >= 1280) {
            setIncrement(3);
        } else {
            setIncrement(2);
        }
    }

    const handleShowMoreMovies = () => {
        if (movies.length - 1 < lastIndex + increment) {
            setLastIndex(movies.length);
        } else {
            setLastIndex(lastIndex + increment);
        }
    }

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    React.useEffect(() => {
        setLastIndex(movies.length <= initialLength ? movies.length : initialLength);
    }, [pageState, movies.length]);

    return (
        <main className="movies">
            <SearchForm
                handleSearch={handleSearch}
            />
            <CardList
                movies={movies.slice(0, lastIndex)}
                handleButtonClick={handleButtonClick}
                pageState={pageState}
                isMovieSaved={isMovieSaved}
                isPreloaderShown={isPreloaderShown}
            />
            {lastIndex !== movies.length && (
                <button
                    className="movies__show-more-button"
                    type="button"
                    onClick={handleShowMoreMovies}
                >
                    Ещё
                </button>
            )}
            {isPreloaderShown && (
                <Preloader />
            )}

        </main>
    )
}

export default Movies;