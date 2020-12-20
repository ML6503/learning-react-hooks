import React, { useReducer, useEffect, useState } from "react";
import { Router, View } from 'react-navi';
import { mount, route } from 'navi';

import { ThemeContext, StateContext } from "./contexts";
import appReducer from "./reducers";
import HeaderBar from "./pages/HeaderBar";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

const routes = mount ({
  '/': route({ view: <HomePage /> }),
  '/view/:id': route( req => {
    return { view: <PostPage id={req.params.id } />}
  })
});

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
        <Router routes={routes}>
            <div style={{ padding: 8 }}>
              <HeaderBar setTheme={setTheme} />          
              <hr />
              <View />          
            </div>
        </Router>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}
