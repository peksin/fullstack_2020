import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)


  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const removeButtonStyle = { backgroundColor: 'red' }

  const removeButton = () => {
    // backendista ei tule kirjautumisen yhteydessa tietoa kirjautuneen kayttajan id:sta
    // niin tein taman sitten kayttajanimella
    // sen pitaisi olla myos uniikki niin valiakos tuolla
    if (user.username === blog.user.username) {
      return (
        <button style={removeButtonStyle}
          onClick={removeBlog}>remove</button>
      )
    }
  }

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


  const removeBlog = async () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
      console.log('Removed!')
      await blogService.remove(blog)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    } else {
      console.log('Not removed!')
    }
  }


  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {blog.title}
        <button onClick={toggleVisibility}>hide</button> <br/>
        {blog.url} <br/>
      likes {blog.likes}
        <button onClick={addLike}>like</button><br/>
        {blog.author} <br/>
        {removeButton()}
      </div>
    </div>
  )}

export default Blog
