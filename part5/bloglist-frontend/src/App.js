import React, { useState, useEffect } from "react";
import UserLogin from "./components/UserLogin";
import BlogDisplays from "./components/BlogDisplays";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./Notification.js";
import {
  notify,
  resetUserFields,
  resetBlog,
  filterBlogsForUser,
} from "./util/utils.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  // useEffect(() => {
  //   async function initialFetch() {
  //     let initialBlogs = await blogService.getAll();
  //     setBlogs(initialBlogs);
  //   }
  //   initialFetch();
  // }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    async function blogsFetch(whois) {
      let blogsToBeFiltered = await blogService.getAll();
      setBlogs(filterBlogsForUser(blogsToBeFiltered, whois));
    }
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON);
      setUser(storedUser);
      blogService.setToken(storedUser.token);
      blogsFetch(storedUser);
    } else{
      blogsFetch({});
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      resetUserFields(setUsername, setPassword);
      notify(
        setNotificationType,
        setNotificationMessage,
        "notice",
        "Successful login"
      );
      let blogsToBeFiltered = await blogService.getAll();
      setBlogs(filterBlogsForUser(blogsToBeFiltered, user));
      // setBlogs(filterBlogsForUser(blogs, user));
    } catch (exception) {
      notify(
        setNotificationType,
        setNotificationMessage,
        "error",
        "Wrong Credentials"
      );
      resetUserFields(setUsername, setPassword);
    }
  };

  const logOut = () => {
    notify(
      setNotificationType,
      setNotificationMessage,
      "notice",
      "Successful Logout"
    );
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting", newBlog);
    try {
      blogService.setToken(user.token);
      const blog = await blogService.create(newBlog);
      resetBlog(setNewBlog);
      const newblogs = await blogService.getAll();

      setBlogs(newblogs.filter((blog) => blog.user.name === user.name));

      notify(
        setNotificationType,
        setNotificationMessage,
        "notice",
        `Successfully added ${blog.title} by ${blog.author}`
      );
    } catch (exception) {
      notify(
        setNotificationType,
        setNotificationMessage,
        "error",
        "Blog not successfully added"
      );
      resetBlog(setNewBlog);
    }
  };

  return (
    <div>
      <Notification
        notification={notificationMessage}
        notificationType={notificationType}
      />
      {user === null ? (
        <UserLogin
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      ) : (
        <BlogDisplays
          user={user}
          logOut={logOut}
          blogs={blogs}
          newBlog={newBlog}
          setNewBlog={setNewBlog}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default App;
