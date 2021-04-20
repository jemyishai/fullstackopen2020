import React, { useState } from 'react'
import BlogDetails from './BlogDetails'

import services from '../services/blogs.js'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}


const Blog = ({ blog, blogs, setBlogs }) => {
  const [blogDetailsVisibility, setBlogDetailsVisibility] = useState(false)
  const buttonLabel = blogDetailsVisibility ? 'hide' : 'view'

  let [currentLikes, setCurrentLikes] = useState(blog.likes)

  let allBlogCall = async () => await services.getAll()

  let likeAdd = () => {
    let copy = currentLikes
    let newBlog = { ...blog, user: blog.user.id, likes: copy + 1 }
    delete newBlog.id
    let asyncPatch = async () => await services.update(blog.id, newBlog)
    try {
      asyncPatch()
      // rewrite this mess async/await & .then is a disaster
      allBlogCall().then((res) => setBlogs(res))
      setCurrentLikes(currentLikes + 1)
    } catch (error) {
      console.log(error)
    }
  }
  const toggleVisibility = () => {
    setBlogDetailsVisibility(!blogDetailsVisibility)
  }

  const removeBlog = () => {
    function deleteABlog(aBlog) {
      let asyncDelete = async () => {
        await services.deletion(aBlog.id)
      }
      try {
        let input = window.confirm(
          `Remove blog ${aBlog.title} by ${aBlog.author}`
        )
        //check user here
        //checking local storage for now instead of state
        if (
          input &&
            aBlog.user.username ===
              JSON.parse(localStorage.getItem('loggedBlogAppUser')).username
        ) {
          asyncDelete()

          setBlogs(blogs.filter((bloggo) => bloggo.id !== aBlog.id))
          //insert notification to user
          console.log('notice to user that blog has been deleted')
        }
      } catch (err) {
        //insert notification to user
        console.log(err)
      }
    }

    const usernameFromLocalStorage = JSON.parse(localStorage.getItem('loggedBlogAppUser')).username
    const usernameTesting = !usernameFromLocalStorage ? null : usernameFromLocalStorage

    return blog.user.username === usernameTesting ? (
      <button onClick={() => deleteABlog(blog)}>remove blog</button>
    ) : null
  }

  return (
    <div style={blogStyle}>
      {blog.title} <em>authored by</em> {blog.author}{' '}
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <br />
      {  blogDetailsVisibility ? <BlogDetails blog={blog} blogs={blogs} setBlogs={setBlogs} likeAdd={likeAdd} currentLikes={currentLikes} removeBlog={removeBlog}/> : null }
    </div>
  )
}
export default Blog
