import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./Notification.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null)
  const [newBlog, setNewBlog ] = useState({title:'',author:'',url:''});


  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const resetUser = () => {
    setUsername("");
    setPassword("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      resetUser()
      setNotificationType('notice')
      setNotificationMessage("Successful login");
      setTimeout(() => {
        setNotificationMessage(null);
        setNotificationType(null)
      }, 5000);
    } catch (exception) {
      setNotificationType('error')
      setNotificationMessage("Wrong credentials");
      setTimeout(() => {
        setNotificationType(null)
        setNotificationMessage(null);
      }, 5000);
      resetUser()
    }
  };


  const userLogin = () => (
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
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const logOut = () => {
    setNotificationType('notice')
    setNotificationMessage('Successful Logout');
    setTimeout(() => {
      setNotificationType(null)
      setNotificationMessage(null);
    }, 5000);
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null)
  }

  const resetBlog = () => setNewBlog({})


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting", newBlog);
    try {
      blogService.setToken(user.token)
      const blog = await blogService.create(newBlog);
      resetBlog()
      const newblogs = await blogService.getAll()
      setBlogs(newblogs)
      setNotificationType('notice')
      setNotificationMessage(`Successfully added ${blog.title} by ${blog.author}`);
      setTimeout(() => {
        setNotificationType(null)
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      setNotificationType('error')
      setNotificationMessage("Blog not successfully added");
      setTimeout(() => {
        setNotificationType(null)
        setNotificationMessage(null);
      }, 5000);
      resetBlog()
    }
  };

  const CreateNewBlog = () => (
    <div>
    <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            //this is currently commented out due to fb react error - A component is changing a controlled input of type text to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa).
            // value={newBlog.title}
            name="newTitle"
            onChange={({ target }) => setNewBlog({...newBlog, title :target.value})}
          />
        </div>
        <div>
          author
          <input
            type="text"
            // value={newBlog.author}
            name="newAuthor"
            onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
          />
        </div>
        <div>
          url
          <input
            type="url"
            // value={newBlog.url}
            name="newUrl"
            onChange={({ target }) => setNewBlog({...newBlog,url:target.value})   }
          />
        </div>
        <button type="submit">submit</button>
      </form>
      </div>
  )

  const blogDisplays = () => (
    <div>
      <h2>blogs</h2>
      {user.name} logged in <button type="submit" onClick={logOut}>logout</button> <br/><br/>
       {CreateNewBlog()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <Notification notification={notificationMessage} notificationType={notificationType}/>
      {user === null ? userLogin() : blogDisplays()}
    </div>
  );
};

export default App;
