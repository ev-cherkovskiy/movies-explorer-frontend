import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import CardList from "../CardList/CardList";
import Preloader from "../../vendor/Preloader/Preloader";
import {
    BIG_INCREMENT,
    CARDS_NUMBER_L,
    CARDS_NUMBER_M,
    CARDS_NUMBER_S,
    HIGH_WIDTH,
    LOW_WIDTH,
    SMALL_INCREMENT
} from "../../utils/constants";

function Movies({
    pageState,
    movies,
    handleSearch,
    handleButtonClick,
    isMovieSaved,
    isPreloaderShown,
    handleCheckboxClick,
    movieName,
    isCheckboxChecked
}) {

    let initialLength;
    if (window.innerWidth <= LOW_WIDTH) {
        initialLength = CARDS_NUMBER_S;
    } else if (window.innerWidth < HIGH_WIDTH) {
        initialLength = CARDS_NUMBER_M;
    } else {
        initialLength = CARDS_NUMBER_L;
    }

    let initialIncrement;
    if (window.innerWidth < HIGH_WIDTH) {
        initialIncrement = SMALL_INCREMENT;
    } else {
        initialIncrement = BIG_INCREMENT;
    }

    const [lastIndex, setLastIndex] = React.useState(initialLength);
    const [increment, setIncrement] = React.useState(initialIncrement);

    const handleResize = () => {
        if (window.innerWidth >= HIGH_WIDTH) {
            setIncrement(BIG_INCREMENT);
        } else {
            setIncrement(SMALL_INCREMENT);
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
                handleCheckboxClick={handleCheckboxClick}
                movieName={movieName}
                isCheckboxChecked={isCheckboxChecked}
                movies={movies}
                pageState={pageState}
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