import React, { useEffect, useState } from "react";
import services from "../services/blogs.js";

const BlogDetails = ({ blog }) => {
  let [currentLikes, setCurrentLikes] = useState(blog.likes);

  useEffect(() => {
    let newBlog = { ...blog, user: blog.user.id, likes: currentLikes };
    delete newBlog.id;
    let asyncPatch = async () => await services.update(blog.id, newBlog);
    try {
      asyncPatch();
    } catch (error) {
      console.log(error);
    }
  }, [currentLikes, blog]);

  return (
    <>
      {blog.url} <br />
      Likes: {currentLikes}{" "}
      <button onClick={() => setCurrentLikes(currentLikes + 1)}>like</button>
      <br />
      {blog.title}
      <br />
      {blog.url}
      <br />
      <em>posted by user:</em> {blog.user.username}
      <br />
    </>
  );
};

export default BlogDetails;
