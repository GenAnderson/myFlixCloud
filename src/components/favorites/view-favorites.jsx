import { MovieCard } from "../movie-card/movie-card";
import { Row, Col } from "react-bootstrap";

import "./view-favorites.scss";

export const ViewFavorites = ({ user, FavoriteMovies, movies, updateUser }) => {
  const favorites = movies.filter((m) => FavoriteMovies.includes(m.id));

  return (
    <div className="favorites-container">
      <h5>Favorites: </h5>
      <ul>
        <Row sm={2} className="mx-2">
          {favorites.map((movie) => (
            <Col className="my-2">
              <li key={movie.id}>
                <MovieCard
                  movie={movie}
                  user={user}
                  updateUser={updateUser}
                  key={movie.name}
                />
              </li>
            </Col>
          ))}
        </Row>
      </ul>
    </div>
  );
};
