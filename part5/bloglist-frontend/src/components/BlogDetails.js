import React from 'react'

const BlogDetails = ({ blog, currentLikes, likeAdd, removeBlog }) => {

  return (
    <>
      {blog.url} <br />
      Likes: {currentLikes}{' '}
      <button
        onClick={() => likeAdd()} >
        like
      </button>
      <br />
      {blog.title}
      <br />
      {blog.url}
      <br />
      <em>posted by user:</em> {blog.user.username}
      <br />
      {removeBlog()}
    </>
  )
}

export default BlogDetails
