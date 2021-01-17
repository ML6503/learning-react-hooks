import React, { useEffect } from "react";
import { useInput } from 'react-hookedup';
import { useAPIRegister, useDispatch } from '../hooks';

export default function Register() {
  const dispatch = useDispatch();
  
  const { value: username, bindToInput: bindUsername } = useInput("");
  const { value: password, bindToInput: bindPassword } = useInput("");
  const { value: passwordRepeat, bindToInput: bindPasswordRepeat } = useInput("");

  const [ user, register ] = useAPIRegister();

  useEffect(() => {
    if(user && user.data) {
      dispatch({ type: 'REGISTER', username: user.data.username });
    }
  }, [user, dispatch]);
 
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        register({ username, password });
      }}
    >
      <label hmtlFor="register-username">User name:</label>
      <input
        type="text"
        name="register-username"
        id="register-username"
        value={username}
        {...bindUsername}
      />
      <label hmtlFor="register-password">Password:</label>
      <input
        type="password"
        name="register-password"
        id="register-password"
        value={password}
        {...bindPassword}
      />
      <label hmtlFor="register-password">Repeate Password:</label>
      <input
        type="password"
        name="register-password-repeat"
        id="register-password-repeat"
        value={passwordRepeat}
        {...bindPasswordRepeat}
      />
      <input
        type="submit"
        value="Register"
        disabled={
          username.length === 0 ||
          password.length === 0 ||
          password !== passwordRepeat
        }
      />
    </form>
  );
}
