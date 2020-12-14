import React, { useState, useContext } from "react";
import { StateContext } from "../contexts";

export default function Login() {
  const { dispatch } = useContext(StateContext);

  const [userName, setUserName] = useState("");

  function handleUserName(evt) {
    setUserName(evt.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN", userName });
      }}
    >
      <label hmtlFor="login-username">User name: </label>
      <input
        type="text"
        name="login-username"
        id="login-username"
        value={userName}
        onChange={handleUserName}
      />
      <label hmtlFor="login-password">Password: </label>
      <input type="password" name="login-password" id="login-password" />
      <input type="submit" value="Login" disabled={userName.length === 0} />
    </form>
  );
}
