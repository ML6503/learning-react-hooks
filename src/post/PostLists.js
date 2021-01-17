import React, { Fragment } from "react";
import { usePostsState } from "../hooks";
import Post from "./Post";

export default function PostList() {
  const posts = usePostsState();

  return (
    <div>
      {posts.map((p, i) => (
        <Fragment key={"post-" + i}>
          <Post {...p} short={true}/>
          <hr />
        </Fragment>
      ))}
    </div>
  );
}
