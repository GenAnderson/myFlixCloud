import { Button } from "react-bootstrap";

export const AddFavorite = ({ movieId, updateUser }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const bothHandlers = () => {
    updateUser();
    addFavoriteHandler();
  };

  const instanceEndpoint = "localhost:8080";

  const addFavoriteHandler = () => {
    fetch(
      `http://${instanceEndpoint}/users/${storedUser.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${storedToken}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Movie added to favorites");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => alert("Something went wrong: " + error));
  };

  return (
    <Button variant="dark me-1 mb-1" size="sm" onClick={bothHandlers}>
      +
    </Button>
  );
};
