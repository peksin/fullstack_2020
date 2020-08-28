import React, {useState} from 'react'

const BlogForm = ({ handleCreateBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  // const handleTitleChange = (event) => {
  //   setNewBlogTitle(event.target.value)
  // }

  // const handleAuthorChange = (event) => {
  //   setNewBlogAuthor(event.target.value)
  // }

  // const handleUrlChange = (event) => {
  //   setNewBlogUrl(event.target.value)
  // }


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

export default BlogForm