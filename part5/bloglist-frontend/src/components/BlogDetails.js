import React, { useEffect, useState } from 'react'
import services from '../services/blogs.js'
import RemoveBlog from './RemoveBlog'

const BlogDetails = ({ blog, blogs, setBlogs, likeAdd }) => {
  let [currentLikes, setCurrentLikes] = useState(blog.likes)

  useEffect(() => {
    let newBlog = { ...blog, user: blog.user.id, likes: currentLikes }
    delete newBlog.id
    let asyncPatch = async () => await services.update(blog.id, newBlog)
    try {
      asyncPatch()
    } catch (error) {
      console.log(error)
    }
  }, [currentLikes, blog])



  return (
    <>
      {blog.url} <br />
      Likes: {currentLikes}{' '}
      <button onClick={() => likeAdd(setCurrentLikes, currentLikes)}>like</button>
      <br />
      {blog.title}
      <br />
      {blog.url}
      <br />
      <em>posted by user:</em> {blog.user.username}
      <br />
      <RemoveBlog blog={blog} blogs={blogs} setBlogs={setBlogs} />
    </>
  )
}

export default BlogDetails
