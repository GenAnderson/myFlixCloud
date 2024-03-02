import { Button } from "react-bootstrap";

export const DeleteFavorite = ({ movieId, updateUser }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const bothHandlers = () => {
    updateUser();
    deleteFavoriteHandler();
  };

  const instanceEndpoint = "localhost:8080";

  const deleteFavoriteHandler = () => {
    fetch(
      `http://${instanceEndpoint}/users/${storedUser.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${storedToken}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Movie deleted from favorites");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => alert("Something went wrong: " + error));
  };

  return (
    <Button variant="outline-dark me-1 mb-1" size="sm" onClick={bothHandlers}>
      ×
    </Button>
  );
};
