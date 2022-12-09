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

// "https://see.fontimg.com/api/renderfont4/2v7X/eyJyIjoiZnMiLCJoIjo1NiwidyI6MTAwMCwiZnMiOjU2LCJmZ2MiOiIjQjcxMEY0IiwiYmdjIjoiI0ZDRkNGQyIsInQiOjF9/R0FNRVMgRk9SVU0/scrabble.png"
