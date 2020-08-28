import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const addLike = () => {
    const updatedBlog = blog
    updatedBlog.likes = blog.likes + 1
    blogService.update(updatedBlog)
    // const response = blogService.update(updatedBlog)

    // paivita nakyma jotenkin??
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }


  return (
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>view</button>
    </div>
    <div style={showWhenVisible}>
      {blog.title}
      <button onClick={toggleVisibility}>hide</button> <br/>
      {blog.url} <br/>
      likes {blog.likes} 
      <button onClick={addLike}>like</button><br/>
      {blog.author}
    </div>
  </div>
  )}

export default Blog
