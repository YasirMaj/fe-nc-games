import React, { useContext, useState } from "react";
import { postUser } from "../utils/api";
import { UserContext } from "../contexts/users";
import { useNavigate } from "react-router-dom";

export default function SignUp({ users }) {
  const { setUser } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState("");
  const [name, setName] = useState("");
  const [newAvatar, setNewAvatar] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNewUser = (e) => {
    e.preventDefault();
    const exists = validateUserSignUp(newUsername);
    if (exists) {
      setError("Username Already Exists!");
    } else {
      setUser({ username: newUsername });
      postUser(newUsername, name, newAvatar);
      navigate("/reviews");
    }
  };

  const validateUserSignUp = (newUsername) => {
    let exists = false;
    users.forEach((user) => {
      if (user.username === newUsername) {
        exists = true;
      }
    });
    return exists;
  };

  return (
    <form className="sign-up-form" onSubmit={handleNewUser}>
      <h3>Create New User</h3>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        required
        placeholder="e.g silly6"
        onChange={(e) => {
          setNewUsername(e.target.value);
        }}
      />
      <span>{error}</span>
      <br />
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        required
        placeholder="e.g Sam Silly"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <label htmlFor="avatar_url">Avatar URL:</label>
      <input
        type="url"
        id="url"
        placeholder="e.g http://www.example.com"
        onChange={(e) => {
          setNewAvatar(e.target.value);
        }}
      />
      <br />
      <button>Sign-Up</button>
      <input type="reset" id="reset" />
    </form>
  );
}
