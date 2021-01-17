import React, { useState, useContext, useEffect } from "react";
// import { useResource } from 'react-request-hook';
import { useInput } from 'react-hookedup';
// import useUndo from 'use-undo';
import { useNavigation } from 'react-navi';
// import { useDebouncedCallback } from 'use-debounce';
import useDebouncedUndo from '../hooks/useDebouncedUndo';

import { StateContext } from "../contexts";
import { useAPICreatePost } from '../hooks/api';

export default function CreatePost() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const { value: title, bindToInput: bindTitle } = useInput('');
  // const { value: content, bindToInput: bindContent } = useInput('');

  // const [ content, setInput ] = useState('');
  
  // const [ undoContent, {
  //   set: setContent,
  //   undo,
  //   redo,
  //   canUndo,
  //   canRedo
  // }] = useUndo('');

  // const debounced = useDebouncedCallback(
  //   (value) => setContent(value),
  //   400
  // );

  // useEffect(() => {
  //   debounced.cancel();
  //   setInput(undoContent.present);
  // }, [undoContent, debounced]);

  // function handleContent(e) {
  //   const { value } = e.target;
  //   setInput(value);
  //   debounced.callback(value);
  // };
  
  useDebouncedUndo();

  // const [ post, createPost ] = useResource(({ title, content, author }) => ( {
  //   url: '/posts',
  //   method: 'post',
  //   data: { title, content, author }
  // }));

  const [ post, createPost] = useAPICreatePost();

  const navigation = useNavigation();

  useEffect(() => {
    if(post && post.data) {
      dispatch({ type: 'CREATE_POST', ...post.data });
      navigation.navigate(`/view/${post.data.id}`);
    }
  }, [post, navigation, dispatch]);
  
  function handleCreate() {
    createPost({ title, content, author: user });    
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <div>
        Author: <b>{user}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title: </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
         {...bindTitle}
        />
      </div>
      <textarea value={content} onChange={handleContent} />
      <button type="button" onClick={undo} disabled={!canUndo}>Undo</button>
      <button type="button" onClick={redo} disabled={!canRedo}>Redo</button>
      <input type="submit" value="Create" />
    </form>
  );
}
