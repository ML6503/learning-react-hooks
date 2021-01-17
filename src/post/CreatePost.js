import React, { useEffect } from "react";
import { useInput } from 'react-hookedup';
// import useUndo from 'use-undo';
import { useNavigation } from 'react-navi';
// import { useDebouncedCallback } from 'use-debounce';
import { useDispatch, useUserState, useDebouncedUndo, useAPICreatePost } from "../hooks";


export default function CreatePost() {
  const dispatch = useDispatch();
  const user  = useUserState;

  const { value: title, bindToInput: bindTitle } = useInput('');
  // const { value: content, bindToInput: bindContent } = useInput('');

  const [ content, setContent, { undo, redo, canUndo, canRedo } ] = useDebouncedUndo();

  function handleContent(e) {
    const { value } = e.target;
    setContent(value);
  };
  
  useDebouncedUndo();

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
