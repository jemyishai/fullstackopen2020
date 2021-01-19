import React from "react";
import Blog from "./Blog";
import CreateNewBlog from "./CreateNewBlog";
// import LogOut from './LogOut';

//only added this when deciding to add logout function to this component
import { logOut } from '../util/utils.js'


const BlogDisplays = ({
  user,
  blogs,
  newBlog,
  setNewBlog,
  handleSubmit,
  setNotificationType,setNotificationMessage,setUser
}) => (
  <div>
    <h2>blogs</h2>
    {user.name} logged in{" "}

    {/* review the difference between passing an onClick handler with the function called, like so funciton(), or the the functions being called in an anonymous function, like so function ()=>function() */}
    <button type="submit" onClick={()=>logOut(setNotificationType,setNotificationMessage,setUser)} >
      logout
    </button>{" "}
    <br />
    <br />
    <CreateNewBlog
      newBlog={newBlog}
      setNewBlog={setNewBlog}
      handleSubmit={handleSubmit}
    />
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

export default BlogDisplays;
