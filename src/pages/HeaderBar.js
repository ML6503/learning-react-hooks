import React, { useContext } from 'react';

import ChangeTheme from "../ChangeTheme";
import UserBar from "../user/UserBar";
import Header from "../Header";
import CreatePost from "../post/CreatePost";
import { ThemeContext, StateContext } from "../contexts";
import useWindowSize from '../utilities/useWindowSize';

export default function HeaderBar({ setTheme }) {
    const theme = useContext(ThemeContext);

    const { state } = useContext(StateContext);
    const { user } = state;

    const innerWidth = useWindowSize().width;
    const mobilePhone = innerWidth < 640;

    return (
        <div>
            <Header text="React Hooks Blog" />
            {!mobilePhone && <ChangeTheme setTheme={setTheme} theme={theme} />}
            {!mobilePhone && <br />}
            {!mobilePhone && <React.Suspense fallback={'Loading...'}>
                <UserBar />
            </React.Suspense>}
            {!mobilePhone &&  <br />}
            {user && <CreatePost />}
        </div>
    );
};