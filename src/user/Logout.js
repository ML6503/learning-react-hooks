import React, { useContext } from "react";
import { StateContext } from "../contexts";

export default function Logout() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
      }}
    >
      <label hmtlFor="login-username">Username: </label>
      Logged in as: <b> {user} </b>
      <input type="submit" value="Logout" />
    </form>
  );
}
