import { Button } from "react-bootstrap";

export const DeleteProfile = ({ user, onLoggedOut }) => {
  const storedToken = localStorage.getItem("token");

  const instanceEndpoint = "localhost:8080";

  const deleteProfileHandler = () => {
    fetch(`http://${instanceEndpoint}/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        if (response.ok) {
          alert("Profile deleted");
          onLoggedOut();
          window.location = "../signup";
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => alert("Something went wrong: " + error));
  };

  return (
    <div>
      <Button variant="outline-danger my-2" onClick={deleteProfileHandler}>
        Delete Profile
      </Button>
    </div>
  );
};
