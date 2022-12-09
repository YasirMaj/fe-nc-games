import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Nav() {
  const { user, setUser } = useContext(UserContext);

  return (
    <nav className="Nav">
      <Link className="Link" to="/reviews">
        <FontAwesomeIcon icon={solid("house")} bounce />
      </Link>
      <Link className="Link" to="/categories">
        <FontAwesomeIcon icon={solid("cat")} bounce />
      </Link>
      {user.username === "Guest" ? (
        <Link className="Link" to="/users">
          <FontAwesomeIcon icon={solid("right-to-bracket")} bounce />
        </Link>
      ) : null}
      {user.username !== "Guest" ? (
        <Link
          className="Link"
          to="/users"
          onClick={() => setUser({ username: "Guest" })}
        >
          <FontAwesomeIcon icon={solid("right-from-bracket")} bounce />
        </Link>
      ) : null}
    </nav>
  );
}
