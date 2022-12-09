import React from "react";

export default function Error({ errorMsg, t }) {
  if (errorMsg === 400 && t === "rev")
    return <p callsName="error">Path does not exist</p>;
  if (errorMsg === 404 && t === "rev")
    return <p callsName="error">Review does not exist</p>;
  if (errorMsg === 404 && t === "cat")
    return <p callsName="error">Category does not exist</p>;
}
