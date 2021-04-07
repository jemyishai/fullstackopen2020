import React, { useState } from 'react'

import BlogDetails from './BlogDetails'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}


const Blog = ({ blog, blogs, setBlogs, likeAdd }) => {
  const [blogDetailsVisibility, setBlogDetailsVisibility] = useState(false)
  const hideOrViewDetails = { display: blogDetailsVisibility ? '' : 'none' }
  const buttonLabel = blogDetailsVisibility ? 'hide' : 'view'

  const toggleVisibility = () => {
    setBlogDetailsVisibility(!blogDetailsVisibility)
  }


  return (
    <div style={blogStyle}>
      {blog.title} <em>authored by</em> {blog.author}{' '}
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <br />
      {/* <div style={hideOrViewDetails}> */}
     {  blogDetailsVisibility ? <BlogDetails blog={blog} blogs={blogs} setBlogs={setBlogs} likeAdd={likeAdd}/> : null }
      {/* </div> */}
    </div>
  )
}
export default Blog
