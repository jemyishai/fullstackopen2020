// import React from 'react'
// import services from '../services/blogs.js'

// const RemoveBlog = ({ blog, blogs, setBlogs }) => {
//   function deleteABlog(aBlog) {
//     let asyncDelete = async () => {
//       await services.deletion(aBlog.id)
//     }
//     try {
//       let input = window.confirm(
//         `Remove blog ${aBlog.title} by ${aBlog.author}`
//       )
//       //check user here
//       //checking local storage for now instead of state
//       if (
//         input &&
//         aBlog.user.username ===
//           JSON.parse(localStorage.getItem('loggedBlogAppUser')).username
//       ) {
//         asyncDelete()

//         setBlogs(blogs.filter((bloggo) => bloggo.id !== aBlog.id))
//         //insert notification to user
//         console.log('test me uyo!')
//       }
//     } catch (err) {
//       //insert notification to user
//       console.log(err)
//     }
//   }

//   const usernameFromLocalStorage = JSON.parse(localStorage.getItem('loggedBlogAppUser')).username
//   const usernameTesting = !usernameFromLocalStorage ? null : usernameFromLocalStorage

//   return blog.user.username === usernameTesting ? (
//     <button onClick={() => deleteABlog(blog)}>remove blog</button>
//   ) : null
// }

// export default RemoveBlog


