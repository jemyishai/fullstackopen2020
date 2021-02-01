import React, { useState, useEffect } from "react";

import blogService from "./services/blogs";

import BlogDisplays from "./components/BlogDisplays";
import Notification from "./components/Notification.js";
import UserLogin from "./components/UserLogin";

import { filterBlogsForUser } from "./util/utils.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  // const [loginVisible, setLoginVisible] = useState(false);
  // const hideWhenVisible = { display: loginVisible ? "none" : "" };
  // const showWhenVisible = { display: loginVisible ? "" : "none" };

  // useEffect(() => {
  //   async function allBlogFetch() {
  //     let allBlogs = await blogService.getAll();
  //     setBlogs(allBlogs);
  //   }
  //  if ( !loginVisible ){
  //   allBlogFetch()
  //  }
  // }, [loginVisible]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    // const visibilityState =  window.localStorage.getItem("currentInvisibility");
    async function blogsFetch(whois) {
      let blogsToBeFiltered = await blogService.getAll();
      setBlogs(filterBlogsForUser(blogsToBeFiltered, whois));
    }
    if (loggedUserJSON) {
      // setLoginVisible(JSON.parse(visibilityState))
      const storedUser = JSON.parse(loggedUserJSON);
      setUser(storedUser);
      blogService.setToken(storedUser.token);
      blogsFetch(storedUser);
    }
    //not sure this is necesary - why fetch the blogs and aisgn no one to them
    //maybe if the other useEffect isn't present
    // else {
    //   //this is why the blogs are not showing
    //   blogsFetch({});
    // }
  }, []);


  return (
    <>
      <Notification
        notification={notificationMessage}
        notificationType={notificationType}
      />
      <div>
        {/* <div style={hideWhenVisible}>
          <button onClick={() => {
            setLoginVisible(true);
            window.localStorage.setItem("currentInvisibility",true);
          }}>log in</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}

        </div>
        {/* <div style={showWhenVisible}> */}
        {user === null ? (
          <UserLogin
            username={username}
            password={password}
            setPassword={setPassword}
            setUsername={setUsername}
            setBlogs={setBlogs}
            setUser={setUser}
            setNotificationMessage={setNotificationMessage}
            setNotificationType={setNotificationType}
          />
        ) : (
          <BlogDisplays
            user={user}
            blogs={blogs}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
            setBlogs={setBlogs}
            setNotificationType={setNotificationType}
            setNotificationMessage={setNotificationMessage}
            setUser={setUser}
          />
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default App;
