import React from 'react';
import Blog from './Blog';
import CreateNewBlog from './CreateNewBlog';

const BlogDisplays = ({user, logOut, blogs, newBlog, setNewBlog, handleSubmit}) => (
  <div>
    <h2>blogs</h2>
    {user.name} logged in <button type="submit" onClick={logOut}>logout</button> <br/><br/>
    <CreateNewBlog newBlog={newBlog} setNewBlog={setNewBlog} handleSubmit={handleSubmit} />
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

export default BlogDisplays
