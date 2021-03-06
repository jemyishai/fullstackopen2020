import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify, resetUserFields } from '../util/utils'

const UserLogin = ({
  username,
  password,
  setUsername,
  setPassword,
  setUser,
  setBlogs,
  setNotificationMessage,
  setNotificationType,
  // setLoginVisible,
}) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      resetUserFields(setUsername, setPassword)
      notify(
        setNotificationType,
        setNotificationMessage,
        'notice',
        'Successful login'
      )
      let blogsToBeFiltered = await blogService.getAll()
      // setBlogs(filterBlogsForUser(blogsToBeFiltered, user));
      setBlogs(blogsToBeFiltered)
    } catch (exception) {
      notify(
        setNotificationType,
        setNotificationMessage,
        'error',
        'Wrong Credentials'
      )
      resetUserFields(setUsername, setPassword)
    }
  }

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
            id="username"
            onChange={({ target }) => setUsername(target.value)}
            data-cy="username"
          />
        </div>
        <div>
          password
          <input
            type="current-password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
            data-cy="password"
          />
        </div>
        <button type="submit" id="login-button" data-cy="app-login">login</button>
      </form>

      {/* <button
        onClick={() => {
          setLoginVisible(false);
          window.localStorage.setItem("currentInvisibility", false);
        }}
      >
        cancel
      </button> */}
    </div>
  )
}

export default UserLogin
