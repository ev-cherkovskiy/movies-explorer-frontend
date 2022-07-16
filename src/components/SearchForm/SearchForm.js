import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
    handleSearch,
    handleCheckboxClick,
    movieName,
    isCheckboxChecked,
    pageState
}) {

    const [movie, setMovie] = React.useState(pageState === "/movies" ? movieName : "");
    const [areShortMoviesChecked, setAreShortMoviesChecked] = React.useState(isCheckboxChecked);

    const handleMovieChange = (evt) => {
        setMovie(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleSearch(movie, areShortMoviesChecked);
    }

    const toggleCheckboxState = () => {
        handleSearch(movie, !areShortMoviesChecked);
        handleCheckboxClick(!areShortMoviesChecked);
        setAreShortMoviesChecked(!areShortMoviesChecked);
    }

    React.useEffect(() => {
        setMovie(pageState === "/movies" ? movieName : "");
        setAreShortMoviesChecked(isCheckboxChecked);
    }, [pageState])

    return (
        <div className="search-form-container">
            <form
                className="search-form"
                name="search-form"
                method="get"
                noValidate
                onSubmit={handleSubmit}
            >
                <div className="search-form__icon" />
                <input
                    className="search-form__input"
                    id="search-movie"
                    type="text"
                    name="search-movie"
                    minLength="1"
                    maxLength="30"
                    placeholder="Фильм"
                    required
                    value={movie || ""}
                    onChange={handleMovieChange}
                />
                <input
                    className="search-form__hidden-checkbox"
                    type="radio"
                    id="short-movies"
                    name="short-movies"
                    value="short-movies"
                    checked={areShortMoviesChecked}
                    readOnly
                />
                <button
                    className="search-form__submit-button"
                    type="submit"
                />
            </form>
            <div className="search-form__divider" />
            <FilterCheckbox
                checked={areShortMoviesChecked}
                onClick={toggleCheckboxState}
            />
        </div>
    )
}

export default SearchForm;