import React from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/users";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header>
      <h1>{`Welcome ${user.username} to NC Games!`}</h1>
    </header>
  );
}