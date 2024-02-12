import { Button } from "react-bootstrap";

export const AddFavorite = ({ movieId, updateUser }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const bothHandlers = () => {
    updateUser();
    addFavoriteHandler();
  };

  const instanceEndpoint = "ec2-3-94-167-32.compute-1.amazonaws.com";

  const addFavoriteHandler = () => {
    fetch(
      // `https://movieapi-yazx.onrender.com/users/${storedUser.Username}/movies/${movieId}`,
      `https://${instanceEndpoint}/users/${storedUser.Username}/movies/${movieId}`,
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
