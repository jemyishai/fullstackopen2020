import React from 'react'


const CreateNewBlog = ({ newBlog, setNewBlog, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={newBlog.title || ''}
            name="title"
            id="title"
            data-cy="title"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlog.author || ''}
            name="author"
            id="author"
            data-cy="author"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          url
          <input
            type="url"
            value={newBlog.url || ''}
            name="newUrl"
            id="url"
            data-cy="url"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button type="submit" data-cy="new-blog-submit">submit</button>
      </form>
    </div>
  )
}

export default CreateNewBlog
