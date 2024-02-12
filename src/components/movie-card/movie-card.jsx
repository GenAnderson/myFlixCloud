import { PropTypes } from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DeleteFavorite } from "../favorites/delete-favorite";
import { AddFavorite } from "../favorites/add-favorite";

import "./movie-card.scss";

export const MovieCard = ({ movie, user, updateUser }) => {
  const { FavoriteMovies } = user;

  return (
    <Card>
      <Link
        to={`/movies/${encodeURIComponent(movie.id)}`}
        style={{ textDecoration: "none" }}
      >
        <Card.Img variant="top" src={movie.ImagePath} />
      </Link>
      <Card.Body>
        <div>
          <Link
            to={`/movies/${encodeURIComponent(movie.id)}`}
            style={{ textDecoration: "none" }}
          >
            <Card.Title>{movie.Title}</Card.Title>
          </Link>
          <p>Director: {movie.DirectorName}</p>
        </div>
        {FavoriteMovies.includes(movie.id) ? (
          <DeleteFavorite movieId={movie.id} updateUser={updateUser} />
        ) : (
          <AddFavorite movieId={movie.id} updateUser={updateUser} />
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
