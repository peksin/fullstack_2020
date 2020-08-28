import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleCreateBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }


  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
        title
          <input
            type="text"
            value={newBlogTitle}
            name="title:"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
        author
          <input
            type="text"
            value={newBlogAuthor}
            name="author:"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
        url
          <input
            type="text"
            value={newBlogUrl}
            name="url:"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleAuthorChange: PropTypes.func.isRequired,
  handleCreateBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired
}

export default BlogForm