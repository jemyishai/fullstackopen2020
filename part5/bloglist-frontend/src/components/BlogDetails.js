import React, { useState } from "react";

const BlogDetails = ({ blog }) => (
  <>
    {blog.url} <br />
    {blog.likes} <button>like</button>
    <br />
    {blog.title}
    <br />
    {blog.url}
    <br />
    <em>posted by user:</em> {blog.user.username}
    <br />
  </>
);

export default BlogDetails;
