import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} authored by {blog.author}
  </div>
)

export default Blog
