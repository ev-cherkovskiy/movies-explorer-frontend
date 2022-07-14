import React from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import * as auth from '../../utils/auth';
import ProtectedRoute from "../ProtectedRoute";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import InfoPopup from "../InfoPopup/InfoPopup";

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

  // Общие обработчики

  React.useEffect(() => {
    setIsPreloaderShown(true);
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies(), moviesApi.getMovies()])
        .then(([userData, savedMoviesArray, moviesArray]) => {
          setCurrentUser(userData.user);
          setSavedMovies(savedMoviesArray.movies);
          setMovies(moviesArray);
          setFilteredMovies(moviesArray);
          setFilteredSavedMovies(savedMoviesArray.movies);
          console.log('Данные пользователя:');
          console.log(userData.user);
          console.log('Массив сохранённых фильмов:');
          console.log(savedMoviesArray);
          console.log('Массив фильмов:');
          console.log(moviesArray);
          setSavedMoviesIds(savedMovies.map(movie => movie.movieId));
          setIsPreloaderShown(false);
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
    auth.authorize(email, password)
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
    auth.register(name, email, password)
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
          showMessage("success", "Данные пользователя изменены.")
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.includes(409)) {
          showMessage("error", "Пользователь с такими данными уже зарегистрирован.")
        } else {
          showMessage("error", "Что-то пошло не так. Пожалуйста, попробуйте позже.")
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
      });
  }

  //  Обработчики для поиска

  const handleSearch = (movieName, areShortMoviesChecked) => {
    let moviesToShow = movies
      .filter(item => (item.nameRU && item.nameRU.toLowerCase().includes(movieName.toLowerCase())) || (item.nameEN && item.nameEN.toLowerCase().includes(movieName.toLowerCase())))
      .filter(item => (item.duration >= (areShortMoviesChecked ? 0 : 40)));
    setFilteredMovies(moviesToShow);
  }

  const handleSavedSearch = (movieName, areShortMoviesChecked) => {
    let moviesToShow = savedMovies
      .filter(item => (item.nameRU && item.nameRU.toLowerCase().includes(movieName.toLowerCase())) || (item.nameEN && item.nameEN.toLowerCase().includes(movieName.toLowerCase())))
      .filter(item => (item.duration >= (areShortMoviesChecked ? 0 : 40)));
    setFilteredSavedMovies(moviesToShow);
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
              <Register
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
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                initialName={currentUser.name}
                initialEmail={currentUser.email}
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
