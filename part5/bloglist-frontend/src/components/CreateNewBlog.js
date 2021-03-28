import React from 'react'

const CreateNewBlog = ({ newBlog, setNewBlog, handleSubmit }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type="text"
          value={newBlog.title || ''}
          name="title"
          onChange={({ target }) => setNewBlog({ ...newBlog, title :target.value })}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newBlog.author || ''}
          name="author"
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        />
      </div>
      <div>
        url
        <input
          type="url"
          value={newBlog.url || ''}
          name="newUrl"
          onChange={({ target }) => setNewBlog({ ...newBlog,url:target.value })   }
        />
      </div>
      <button type="submit">submit</button>
    </form>
  </div>
)

export default CreateNewBlog
