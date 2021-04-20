import React, { useRef } from 'react'
import Blog from './Blog'
import CreateNewBlog from './CreateNewBlog'
import Toggle from './Toggle'

import { logOut,  likeAdd } from '../util/utils.js'
import { notify, resetBlog } from '../util/utils.js'
import blogService from '../services/blogs'

const BlogDisplays = ({
  user,
  blogs,
  newBlog,
  setNewBlog,
  setNotificationType,
  setNotificationMessage,
  setUser,
  setBlogs,
}) => {
  const blogFormRef = useRef()


  const handleSubmit = async ( event ) => {
    event.preventDefault()
    // console.log("submitting", newBlog);
    blogFormRef.current.toggleVisibility()
    try {
      blogService.setToken(user.token)
      const blog = await blogService.create(newBlog)
      resetBlog(setNewBlog)
      const newblogs = await blogService.getAll()
      // was previously only showing blogs if user posted them. changed that at 5.10 for deletion button
      // setBlogs(newblogs.filter((blog) => blog.user.name === user.name));
      setBlogs(newblogs)
      resetBlog(setNewBlog)
      notify(
        setNotificationType,
        setNotificationMessage,
        'notice',
        `Successfully added ${blog.title} by ${blog.author}`
      )
      // return blog
    } catch (exception) {
      notify(
        setNotificationType,
        setNotificationMessage,
        'error',
        'Blog not successfully added'
      )
      resetBlog(setNewBlog)
    }

  }

  return (
    <div>
      <h2>Blogs</h2>
      {user.name} logged in{' '}
      {/*
      -review the difference between passing an onClick handler with the function called, like so funciton(), or the the functions being called in an anonymous function, like so function ()=>function() */}
      <button
        type="submit"
        onClick={() =>
          logOut(setNotificationType, setNotificationMessage, setUser)
        }
      >
        logout
      </button>{' '}
      <br />
      <br />
      <Toggle buttonLabel={'New Blog'} ref={blogFormRef}>
        <CreateNewBlog
          newBlog={newBlog}
          setNewBlog={setNewBlog}
          blogs={blogs}
          setUser={setUser}
          setBlogs={setBlogs}
          handleSubmit={handleSubmit}
        />
      </Toggle>
      {blogs.sort((a,b) => b.likes-a.likes).map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} likeAdd={likeAdd}/>
      ))}
    </div>
  )
}

export default BlogDisplays
