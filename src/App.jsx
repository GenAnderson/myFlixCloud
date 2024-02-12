/* eslint-disable no-unused-expressions */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { MovieCard } from "../src/components/movie-card/movie-card";
import { MovieView } from "../src/components/movie-view/movie-view";
import { LoginView } from "../src/components/login-view/login-view";
import { SignUpView } from "../src/components/signup-view/signup-view";
import { NavigationBar } from "../src/components/navigation-bar/navigation-bar";
import { ProfileView } from "../src/components/profile/profile-view";
import { ProfileUpdate } from "../src/components/profile/profile-update";

import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import "./App.scss";

export const App = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  // filter info start //
  const [movieTitle, setMovieTitle] = useState();
  const [updatedMovies, setUpdatedMovies] = useState(movies);

  useEffect(() => {
    const filteredMovies = movies.filter((movie) => {
      return movie.Title.toLocaleLowerCase().includes(movieTitle);
    });
    setUpdatedMovies(filteredMovies);
  }, [movieTitle]);
  // filter info end //

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movieapi-yazx.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            DirectorName: movie.Director.Name,
            DirectorBio: movie.Director.Bio,
            DirectorBirth: movie.Director.Birth,
            GenreName: movie.Genre.Name,
            GenreDescription: movie.Genre.Description,
          };
        });
        setMovies(moviesFromApi);
        setUpdatedMovies(moviesFromApi);
      });
  }, [token]);

  const updateUser = () => {
    fetch(`https://movieapi-yazx.onrender.com/users/${user.Username}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        alert("Something went wrong " + error);
      });
  };

  return (
    <BrowserRouter>
      <Row className="gx-0">
        <Routes>
          <Route
            path="/signup"
            element={
              <div className="sign-in-page">
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} className="my-auto">
                    <SignUpView />
                  </Col>
                )}
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" replace />
                ) : (
                  <div className="sign-in-page">
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </div>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <div className="movie-view-container">
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> The list is empty!</Col>
                ) : (
                  <Col sm={4} className="mx-auto moviebg">
                    <MovieView
                      movies={movies}
                      user={user}
                      updateUser={updateUser}
                    />
                  </Col>
                )}
              </div>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <div className="movies-container">
                      <NavigationBar
                        user={user}
                        onLoggedOut={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                      />
                      {/* <FilterMovie /> */}
                      <Row className="gx-0 movies-list">
                        <Form className="my-4">
                          <Form.Group controlId="formFilter">
                            <Form.Control
                              placeholder="Search Movies"
                              type="text"
                              onChange={(e) => setMovieTitle(e.target.value)}
                            />
                          </Form.Group>
                        </Form>
                        {updatedMovies.map((movie) => (
                          // <Col sm={4} key={movie.id} className="mb-4">
                          <Col sm={4} key={movie.id} className="py-4 px-4">
                            <MovieCard
                              movie={movie}
                              user={user}
                              updateUser={updateUser}
                            />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </>
                )}
              </>
            }
          />

          {/* Profile  */}
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <NavigationBar
                      user={user}
                      onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    />
                    <ProfileView
                      user={user}
                      movies={movies}
                      token={token}
                      updateUser={updateUser}
                      onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile/update"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={4}>
                    <ProfileUpdate user={user} token={token} />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
