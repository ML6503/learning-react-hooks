import React, { useState, useEffect } from "react";
import { useInput } from 'react-hookedup';
import { useAPILogin, useDispatch } from '../hooks';

function useLoginEffect(user, dispatch, setLoginFailed) {  
  useEffect(() => {
    if (user && user.data) {
      if ( user.data.length > 0) {
        setLoginFailed(false)
        dispatch({ type: 'LOGIN', username: user.data[0].username })
      } else {
        setLoginFailed(true)
      }
    }
    if (user && user.error) {
      setLoginFailed(true)
    }
  }, [user, dispatch, setLoginFailed]);
};

export default function Login() {
  const dispatch = useDispatch();

  const { value: username, bindToInput: bindUsername } = useInput("");
  const { value: password, bindToInput: bindPassword } = useInput("");

  const [loginFailed, setLoginFailed] = useState(false);  

  const [ user, login ] = useAPILogin();

  useLoginEffect(user, dispatch, setLoginFailed);
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login({ username, password });
      }}
    >
      <label hmtlFor="login-username">User name: </label>
      <input
        type="text"
        name="login-username"
        id="login-username"
        value={username}
        {...bindUsername}
      />
      <label hmtlFor="login-password">Password: </label>
      <input type="password" value={password} {...bindPassword} name="login-password" id="login-password" />
      <input type="submit" value="Login" disabled={username.length === 0} />
      {loginFailed && <span style={{ color:'red' }}>Invalid username or password</span>}
    </form>
  );
}
