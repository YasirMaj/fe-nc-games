import React, { useContext, useEffect, useState } from "react";
import { getUsers } from "../utils/api";
import { UserContext } from "../contexts/users";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Users({ users, setUsers }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getUsers().then((usersFromApi) => {
        setUsers(usersFromApi);
        setIsLoading(false);
      });
    }, 0);
  }, [setUsers]);

  const handleSelectUser = (user) => {
    setUser(user);
    navigate(`/reviews`);
  };

  return (
    <main>
      <h3>Users List</h3>
      {isLoading ? (
        <h3 id="loading">
          Loading <FontAwesomeIcon icon={solid("spinner")} spin />
        </h3>
      ) : (
        <div>
          <Link to="/user/sign-up">
            <button id="sign-up-button">Sign Up</button>
          </Link>
          <section>
            <ul className="users-list">
              {users.map((user) => {
                return (
                  <li className="user-card" key={user.username}>
                    <h4>{user.username}</h4>
                    <p>{user.name}</p>
                    <img src={user.avatar_url} alt={user.username} />
                    <button onClick={() => handleSelectUser(user)}>
                      Select user
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}
