import React from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";

import fakeMoviesArray from "../../utils/fakeMovies";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [pageState, setPageState] = React.useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [movies, setMovies] = React.useState(fakeMoviesArray);

  React.useEffect(() => {
    setPageState(location.pathname);
  }, [location]);

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

  return (
    <div className="app">
      {["/", "/movies", "/saved-movies", "/profile"].includes(pageState) && (
        <Header
          pageState={pageState}
          isMenuOpen={isMenuOpen}
          onCloseButtonClick={handleCloseMenu}
          onOpenButtonClick={handleOpenMenu}
          onButtonClick={handleButtonClick}
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
              handleRegister={() => { }}
              onRedirectionButtonClick={handleButtonClick}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Login
              handleLogin={() => { }}
              onRedirectionButtonClick={handleButtonClick}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              initialName={name || "Ревьюер"}
              initialEmail={email || "pochta@yandex.ru"}
              handleEditProfile={() => { }}
              handleLogout={() => { }}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <Movies
              movies={movies}
              handleSearch={() => { }}
              handleButtonClick={() => { }}
              pageState={pageState}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <Movies
              movies={movies.filter(movie => movie.saved)}
              handleSearch={() => { }}
              handleButtonClick={() => { }}
              pageState={pageState}
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
    </div>
  );
}

export default App;
