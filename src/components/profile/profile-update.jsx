import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export const ProfileUpdate = ({ user, token }) => {
  const Bday = new Date(user.Birthday);

  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [favoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
      FavoriteMovies: favoriteMovies,
    };

    const instanceEndpoint = "localhost:8080";

    fetch(`http://${instanceEndpoint}/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          alert("Updated profile successfully.  Please login again");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location = "/login";
        } else {
          alert("Update failed");
        }
      })
      .catch((error) => alert("Update failed" + error));
  };

  return (
    <div className="profileUpdate--container">
      <Form onSubmit={onSubmitHandler}>
        <h3 className="profileUpdate--heading">Update My Profile</h3>

        <Form.Group controlId="changeUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="changePassword">
          <Form.Label>Re-enter Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="changeEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="changeBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="birthday"
            value={Bday.toLocaleDateString()}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <div className="profileView--btnsContainer">
          <Button type="submit" variant="dark my-2">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
