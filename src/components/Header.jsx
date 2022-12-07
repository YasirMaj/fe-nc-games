import React from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/users";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header>
      <img
        src="https://see.fontimg.com/api/renderfont4/2v7X/eyJyIjoiZnMiLCJoIjo1NiwidyI6MTAwMCwiZnMiOjU2LCJmZ2MiOiIjQjcxMEY0IiwiYmdjIjoiI0ZDRkNGQyIsInQiOjF9/R0FNRVMgRk9SVU0/scrabble.png"
        alt="Games Forum"
        width="100%"
      />
      <h2>{`Welcome ${user.username}.`}</h2>
    </header>
  );
}
