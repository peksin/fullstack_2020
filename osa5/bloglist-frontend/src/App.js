import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


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
      setErrorMessage('wrong username or password')
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


  const handleCreateBlog = async (blogObject) => {
    const returnedBlog = await blogService
      .create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

    // obscuren bugin korjaukseen
    // post-pyynnon mukana ei tule takaisin muuta kayttajasta kuin
    // id, ja loput tiedot tulevat vasta seuraavan get-pyynnon mukana
    // tuosta johtuen remove-nappi ei nay kuin vasta get-pyynnon jalkeen
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )

    blogFormRef.current.toggleVisibility()
  }


  const addLikeTo = async (id) => {
    const updatedBlog = blogs.find(n => n.id === id)
    updatedBlog.likes = updatedBlog.likes + 1
    blogService.update(updatedBlog)
    // const response = blogService.update(updatedBlog)

    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </>
  )


  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
  )


  const blogList = () => (
    <div id='bloglist'>
      <h2>blogs</h2>
      <p>{user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      {blogForm()}

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} 
              blog={blog} 
              addLike={() => addLikeTo(blog.id)}
              setBlogs={setBlogs} 
              user={user}/>
      )}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        blogList()}
    </div>
  )
}

export default App