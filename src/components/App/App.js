import React from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import * as auth from '../../utils/auth';
import ProtectedRoute from "../ProtectedRoute";
import ProtectedRouteForLoggedIn from "../ProtectedRouteForLoggedIn";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import InfoPopup from "../InfoPopup/InfoPopup";
import {
  BASIC_ERROR_MESSAGE,
  EDIT_PROFILE_ERROR_404_MESSAGE,
  EDIT_PROFILE_MESSAGE,
  SHORT_MOVIE_DURATION
} from "../../utils/constants";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageState, setPageState] = React.useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoPopupMessage, setInfoPopupMessage] = React.useState("");
  const [doesInfoPopupShowError, setDoesInfoPopupShowError] = React.useState(true);
  const [savedMoviesIds, setSavedMoviesIds] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState(movies);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState(savedMovies);
  const [isPreloaderShown, setIsPreloaderShown] = React.useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState((localStorage.getItem("isCheckboxChecked") === "0" ? false : true));
  const [isSavedCheckboxChecked, setIsSavedCheckboxChecked] = React.useState(true);

  // Общие обработчики

  React.useEffect(() => {
    setIsPreloaderShown(true);
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies(), moviesApi.getMovies()])
        .then(([userData, savedMoviesArray, moviesArray]) => {
          setCurrentUser(userData.user);
          localStorage.setItem("name", userData.user.name);
          localStorage.setItem("email", userData.user.email);
          setSavedMovies(savedMoviesArray.movies);
          setMovies(moviesArray);
          setFilteredMovies(JSON.parse(localStorage.getItem("results")) || moviesArray);
          console.log(filteredMovies);
          setFilteredSavedMovies(savedMoviesArray.movies);
          console.log('Данные пользователя:');
          console.log(userData.user);
          console.log('Массив сохранённых фильмов:');
          console.log(savedMoviesArray);
          console.log('Массив фильмов:');
          console.log(moviesArray);
          setSavedMoviesIds(savedMovies.map(movie => movie.movieId));
          setIsPreloaderShown(false);
          if (localStorage.getItem("isCheckboxChecked") === null) setIsCheckboxChecked(true);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    setPageState(location.pathname);
  }, [location]);

  React.useEffect(() => {
    setSavedMoviesIds(savedMovies.map(movie => movie.movieId));
  }, [savedMovies]);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleButtonClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setPageState(path);
  }

  const handleGoBack = () => {
    navigate(-1);
  }

  const showMessage = (type, message) => {
    setDoesInfoPopupShowError(type === "error");
    setInfoPopupMessage(message);
    setIsInfoPopupOpen(true);
  }

  const handleInfoPopupClose = () => {
    setDoesInfoPopupShowError(true);
    setIsInfoPopupOpen(false);
    setInfoPopupMessage("");
  }

  const isMovieSaved = (movie) => {
    return savedMoviesIds.includes(movie.id);
  }

  // Обработчики для аутентификации

  const handleLogin = (email, password) => {
    return auth.authorize(email, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          auth.checkToken(res.token)
            .then(() => {
              setLoggedIn(true);
              navigate("/movies");
            });
        } else {
          showMessage("error", res.message);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleRegister = (name, email, password) => {
    return auth.register(name, email, password)
      .then((res) => {
        if (res.name) {
          handleLogin(email, password);
        } else {
          showMessage("error", res.message);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleAutologin = () => {
    auth.checkToken(localStorage.getItem('token'))
      .then(res => {
        if (res.user) {
          setLoggedIn(true);
          if (pageState === "/signin") {
            navigate("/movies");
          }
        }
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(handleAutologin, [pageState]);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('results');
    localStorage.removeItem('isCheckboxChecked');
    localStorage.removeItem('movieName');
    setCurrentUser({});
    navigate("/");
  }

  // Обработчики для действий пользователя

  const handleEditProfile = (name, email) => {
    mainApi.editProfile(name, email)
      .then((res) => {
        console.log(res);
        if (res.user) {
          setCurrentUser(res.user);
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          showMessage("success", EDIT_PROFILE_MESSAGE);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.includes(409)) {
          showMessage("error", EDIT_PROFILE_ERROR_404_MESSAGE);
        } else {
          showMessage("error", BASIC_ERROR_MESSAGE);
        }
      });
  }

  const handleSaveButtonClick = (movie) => {
    if (!isMovieSaved(movie)) {
      mainApi.addMovie(movie)
        .then(res => {
          console.log(res);
          setSavedMovies([...savedMovies, res.movie]);
          setFilteredSavedMovies([...filteredSavedMovies, res.movie]);
        })
        .catch(err => {
          console.log(err);
          showMessage("error", BASIC_ERROR_MESSAGE);
        });
    } else {
      let foundSavedMovie = savedMovies.find(item => item.movieId === movie.id);
      console.log(foundSavedMovie);
      mainApi.deleteMovie(foundSavedMovie._id)
        .then(res => {
          console.log(res);
          setSavedMovies(savedMovies => savedMovies.filter(item => item._id !== foundSavedMovie._id));
          setFilteredSavedMovies(filteredSavedMovies => filteredSavedMovies.filter(item => item._id !== foundSavedMovie._id));
        })
        .catch(err => {
          console.log(err);
          showMessage("error", BASIC_ERROR_MESSAGE);
        });
    }
  }

  const handleDeleteButtonClick = (movie) => {
    mainApi.deleteMovie(movie._id)
      .then(res => {
        console.log(res);
        setSavedMovies(savedMovies => savedMovies.filter(item => item._id !== movie._id));
        setFilteredSavedMovies(savedMovies => savedMovies.filter(item => item._id !== movie._id));
      })
      .catch(err => {
        console.log(err);
        showMessage("error", BASIC_ERROR_MESSAGE);
      });
  }

  //  Обработчики для поиска

  const getInitialMovies = () => movies;

  const handleSearch = (movieName, areShortMoviesChecked) => {
    let moviesToShow = movies
      .filter(item => (item.nameRU && item.nameRU.toLowerCase().includes(movieName.toLowerCase())) || (item.nameEN && item.nameEN.toLowerCase().includes(movieName.toLowerCase())))
      .filter(item => (item.duration >= (areShortMoviesChecked ? 0 : SHORT_MOVIE_DURATION)));
    if (movieName) {
      setFilteredMovies(moviesToShow);
    } else {
      setFilteredMovies(getInitialMovies());
    }
    localStorage.setItem("movieName", movieName);
    console.log(moviesToShow);
    localStorage.setItem("results", JSON.stringify(moviesToShow));
    return moviesToShow;
  }

  const handleSavedSearch = (movieName, areShortMoviesChecked) => {
    let moviesToShow = savedMovies
      .filter(item => (item.nameRU && item.nameRU.toLowerCase().includes(movieName.toLowerCase())) || (item.nameEN && item.nameEN.toLowerCase().includes(movieName.toLowerCase())))
      .filter(item => (item.duration >= (areShortMoviesChecked ? 0 : SHORT_MOVIE_DURATION)));
    setFilteredSavedMovies(moviesToShow);
  }

  const handleCheckboxClick = (areShortMoviesChecked) => {
    localStorage.setItem("isCheckboxChecked", areShortMoviesChecked ? 1 : 0);
    setIsCheckboxChecked(areShortMoviesChecked);
  }

  const handleSavedCheckboxClick = (areShortMoviesChecked) => {
    setIsSavedCheckboxChecked(areShortMoviesChecked);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {["/", "/movies", "/saved-movies", "/profile"].includes(pageState) && (
          <Header
            pageState={pageState}
            isMenuOpen={isMenuOpen}
            onCloseButtonClick={handleCloseMenu}
            onOpenButtonClick={handleOpenMenu}
            onButtonClick={handleButtonClick}
            loggedIn={loggedIn}
          />
        )}
        <Routes>
          <Route
            exact path="/"
            element={
              <Main />
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRouteForLoggedIn
                component={Register}
                handleRegister={handleRegister}
                onRedirectionButtonClick={handleButtonClick}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                handleLogin={handleLogin}
                onRedirectionButtonClick={handleButtonClick}
                handleAutologin={handleAutologin}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                component={Movies}
                movies={filteredMovies}
                handleSearch={handleSearch}
                handleButtonClick={handleSaveButtonClick}
                pageState={pageState}
                isMovieSaved={isMovieSaved}
                isPreloaderShown={isPreloaderShown}
                handleCheckboxClick={handleCheckboxClick}
                movieName={localStorage.getItem("movieName") || ""}
                isCheckboxChecked={isCheckboxChecked}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={Movies}
                movies={filteredSavedMovies}
                handleSearch={handleSavedSearch}
                handleButtonClick={handleDeleteButtonClick}
                pageState={pageState}
                isMovieSaved={isMovieSaved}
                isPreloaderShown={isPreloaderShown}
                isCheckboxChecked={isSavedCheckboxChecked}
                handleCheckboxClick={handleSavedCheckboxClick}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                initialName={localStorage.getItem("name")}
                initialEmail={localStorage.getItem("email")}
                handleEditProfile={handleEditProfile}
                handleLogout={handleLogout}

              />
            }
          />
          <Route
            path="*"
            element={
              <PageNotFound onButtonClick={handleGoBack} />
            }
          />
        </Routes>
        {["/", "/movies", "/saved-movies"].includes(pageState) && (
          <Footer />
        )}
        <InfoPopup
          isOpen={isInfoPopupOpen}
          onClose={handleInfoPopupClose}
          message={infoPopupMessage}
          showsError={doesInfoPopupShowError}
        />
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
