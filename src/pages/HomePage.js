import React, { useContext, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import { StateContext } from '../contexts';
import PostLists from "../post/PostLists";

export default function HomePage() {
    const { state, dispatch } = useContext(StateContext);
    const { error } = state;
    
    const [posts, getPosts] = useResource(() => ({
        url: '/posts',
        method: 'get'
    }));

    useEffect(getPosts, []);

    useEffect(() => {
        if(posts && posts.error) {
        dispatch({ type: 'POSTS_ERROR'})
        }
        if(posts && posts.data) {
        dispatch({ type: 'FETCH_POSTS', posts: posts.data.reverse() })
        }
    }, [posts]);

    return(
        <div>
            {error && <b>{error}</b>}
            <PostLists />
        </div>
    );
};