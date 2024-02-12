import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
    };

    /**
     * Change CORs on movie API if site doesn't have permission
     *   */

    // const instanceEndpoint = "test";

    fetch("https://movieapi-yazx.onrender.com/login", {
      // fetch(`https://${instanceEndpoint}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="login_form">
      <img
        src="./loginlogo.png"
        alt="myflix login logo"
        className="login_logo"
      ></img>
      <p className="login_text">LOGIN</p>
      <Form.Group controlId="formUsernameLogin">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPasswordLogin">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <div className="flex-apart">
        <Link to={`/signup`}>
          <Button variant="primary my-2">Sign-up</Button>
        </Link>

        <Button type="submit" variant="dark my-2" className="sign-on-btn">
          Submit
        </Button>
      </div>
    </Form>
  );
};
