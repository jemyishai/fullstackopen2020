import React from 'react'

const BlogDetails = ({ blog, currentLikes, likeAdd, removeBlog }) => {

  return (
    <>
      {blog.url}
      <div data-cy={blog.title + '-' + blog.author}>
      Likes: {currentLikes}{' '}
        <button
          data-cy="blog-like"
          onClick={() => likeAdd()} >
        like
        </button>
        <br />
        {blog.title}
        <br />
        {blog.url}
        <br />
        <div id="user-info"><em >posted by user:</em> {blog.user.username}</div>
        <br />
        {removeBlog()}
      </div>
    </>
  )
}

export default BlogDetails
