import { Button } from "react-bootstrap";

export const DeleteProfile = ({ user, onLoggedOut }) => {
  const storedToken = localStorage.getItem("token");

  const instanceEndpoint = "ec2-3-94-167-32.compute-1.amazonaws.com";

  const deleteProfileHandler = () => {
    // fetch(`https://movieapi-yazx.onrender.com/users/${user.Username}`, {
    fetch(`https://${instanceEndpoint}/users/${user.Username}`, {
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
