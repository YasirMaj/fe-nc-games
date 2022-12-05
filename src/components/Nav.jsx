import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/users";

export default function Nav() {
  const { user, setUser } = useContext(UserContext);

  return (
    <nav className="Nav">
      <Link className="Link" to="/">
        Home
      </Link>
      <Link className="Link" to="/categories">
        Categories
      </Link>
      {user.username === "Guest" ? (
        <Link className="Link" to="/users">
          Sign In
        </Link>
      ) : null}
      {user.username !== "Guest" ? (
        <Link className="Link" to="/users">
          <button onClick={() => setUser({ username: "Guest" })}>
            Sign Out
          </button>
        </Link>
      ) : null}
    </nav>
  );
}
