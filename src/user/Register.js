import React, { useState, useContext } from "react";
import { StateContext } from "../contexts";

export default function Register() {
  const { dispatch } = useContext(StateContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  function handleUserName(evt) {
    setUserName(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handlePasswordRepeat(evt) {
    setPasswordRepeat(evt.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "REGISTER", userName });
      }}
    >
      <label hmtlFor="register-username">User name:</label>
      <input
        type="text"
        name="register-username"
        id="register-username"
        value={userName}
        onChange={handleUserName}
      />
      <label hmtlFor="register-password">Password:</label>
      <input
        type="password"
        name="register-password"
        id="register-password"
        value={password}
        onChange={handlePassword}
      />
      <label hmtlFor="register-password">Repeate Password:</label>
      <input
        type="password"
        name="register-password-repeat"
        id="register-password-repeat"
        value={passwordRepeat}
        onChange={handlePasswordRepeat}
      />
      <input
        type="submit"
        value="Register"
        disabled={
          userName.length === 0 ||
          password.length === 0 ||
          password !== passwordRepeat
        }
      />
    </form>
  );
}
