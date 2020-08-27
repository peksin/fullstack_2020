import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(`wrong credentials: ${exception}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }


  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    blogService.setToken(null)
    window.localStorage.clear()
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    const returnedBlog = await blogService
      .create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }


  const loginForm = () => (
    <>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </>
  )


  const createNewBlog = () => (
    <>
    <h2>create new</h2>
    <form onSubmit={handleCreateBlog}>
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


  const blogList = () => (
    <div>
    <h2>blogs</h2>
    <p>{user.username} logged in 
      <button onClick={handleLogout}>logout</button>
    </p>

    {createNewBlog()}

    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        blogList()}
      {errorMessage}
    </div>
  )
}

export default App