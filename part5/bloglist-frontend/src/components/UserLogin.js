import React from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { notify, resetUserFields, filterBlogsForUser } from "../util/utils";

const UserLogin = ({
  username,
  password,
  setUsername,
  setPassword,
  setUser,
  setBlogs,
  setNotificationMessage,
  setNotificationType,
  setLoginVisible,
}) => {
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

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="current-password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>

      <button
        onClick={() => {
          setLoginVisible(false);
          window.localStorage.setItem("currentInvisibility", false);
        }}
      >
        cancel
      </button>
    </div>
  );
};

export default UserLogin;
