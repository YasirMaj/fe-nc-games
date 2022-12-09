import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Home() {
  return (
    <main className="home">
      <img className="App-logo" src={logo} alt="GF" />
      <br />
      <Link to="/users">
        <button>Login!</button>
      </Link>
      <Link to="/user/sign-up">
        <button>Sign Up!</button>
      </Link>
      <Link to="/reviews">
        <button>Proceed as guest!</button>
      </Link>
    </main>
  );
}
