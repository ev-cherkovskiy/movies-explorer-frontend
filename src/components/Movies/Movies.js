import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import CardList from "../CardList/CardList";

function Movies({ pageState, movies, handleSearch, handleButtonClick }) {

    const [lastIndex, setLastIndex] = React.useState();

    const handleShowMoreMovies = () => {
        if (movies.length - 1 < lastIndex + 12) {
            setLastIndex(movies.length);
        } else {
            setLastIndex(lastIndex + 12);
        }
    }

    React.useEffect(() => {
        setLastIndex(movies.length <= 12 ? movies.length : 12);
    }, [pageState, movies.length]);

    return (
        <div className="movies">
            <SearchForm
                handleSearch={handleSearch}
            />
            <CardList
                movies={movies.slice(0, lastIndex)}
                handleButtonClick={handleButtonClick}
                pageState={pageState}
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
        </div>
    )
}

export default Movies;