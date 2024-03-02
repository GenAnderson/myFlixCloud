import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { AddFavorite } from "../favorites/add-favorite";
import { DeleteFavorite } from "../favorites/delete-favorite";

import "./movie-view.scss";

export const MovieView = ({ movies, updateUser, user }) => {
  const { movieId } = useParams();
  const { FavoriteMovies } = user;

  const movie = movies.find((m) => m.id === movieId);

  return (
    <div className="movie-view">
      <div>
        <img
          className="movie-view--img"
          src={movie.ImagePath}
          alt={movie.Title}
        />
      </div>
      <div>
        <div className="movie-view--title">{movie.Title}</div>
        <div>Description: {movie.Description}</div>
      </div>
      <div className="movie-view--directorBox">
        <div>Director: {movie.DirectorName}</div>
        <div>Bio: {movie.DirectorBio}</div>
        <div>Birth: {movie.DirectorBirth}</div>
      </div>
      <div className="movie-view--genreBox">
        <div>Genre: {movie.GenreName}</div>
        <div>Genre description: {movie.GenreDescription}</div>
      </div>
      <div className="movie-view--footer">
        <Link to={`/`}>
          <Button variant="dark">Back</Button>
        </Link>

        {FavoriteMovies.includes(movie.id) ? (
          <DeleteFavorite movieId={movie.id} updateUser={updateUser} />
        ) : (
          <AddFavorite movieId={movie.id} updateUser={updateUser} />
        )}
      </div>
    </div>
  );
};
