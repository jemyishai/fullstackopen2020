import React, { useState, useEffect } from "react";
import UserLogin from "./components/UserLogin";
import BlogDisplays from "./components/BlogDisplays";
//had the log-in component here
import Notification from "./components/Notification.js";


import blogService from "./services/blogs";


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
    } else {
      blogsFetch({});
    }
  }, []);




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
          setBlogs={setBlogs}
          setUser={setUser}
          setNotificationMessage={setNotificationMessage}
          setNotificationType={setNotificationType}
        />
      ) : (
        <BlogDisplays
          user={user}
          //logout used to be here - instead I'm refactoring it right into BlogDisplay components
          blogs={blogs}
          newBlog={newBlog}
          setNewBlog={setNewBlog}
          handleSubmit={handleSubmit}
          setNotificationType={setNotificationType}
          setNotificationMessage={setNotificationMessage}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default App;
