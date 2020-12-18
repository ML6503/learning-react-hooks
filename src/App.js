import React, { useReducer, useEffect, useState } from "react";

import { ThemeContext, StateContext } from "./contexts";
import appReducer from "./reducers";
import HeaderBar from "./pages/HeaderBar";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";


export default function App() {
  const [theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondaryColor: "coral"
  });

  const [state, dispatch] = useReducer(appReducer, {
    user: '',
    posts: [],
    error: ''
  });

  const { user } = state;


  useEffect(() => {
    if (user) {
      document.title = `${user} - React Hooks Blog`;
    } else {
      document.title = "React Hooks Blog";
    }
  }, [user]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <div style={{ padding: 8 }}>
          <HeaderBar setTheme={setTheme} />          
          <hr />
          {/* <HomePage /> */}
          <PostPage id={'react-hooks'} />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}
