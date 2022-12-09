import React from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/users";
import headerLogo from "../assets/headerLogo.png";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <img className="header-logo" src={headerLogo} alt="Games Forum" />
      <h2>{`Welcome ${user.username}.`}</h2>
    </header>
  );
}
