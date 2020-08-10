const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const arrayLikes = blogs.map(blog => blog.likes)
  const sum = (sum, item) => {
    return sum + item
  }

  return arrayLikes.length === 0
    ? 0
    : arrayLikes.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
  const arrayLikes = blogs.map(blog => blog.likes)
  let maxLikesIndex = arrayLikes.indexOf(Math.max(...arrayLikes))

  return blogs.length === 0
    ? 0
    : blogs[maxLikesIndex]
}

const mostBlogs = (blogs) => {
  const amountOfBlogsByAuthor = _.countBy(blogs.map(blog => blog.author), blogs.author)
  const entries = _.entries(amountOfBlogsByAuthor)
  const authorWithMostBlogs = _.maxBy(entries, _.last)
  return {
    author: authorWithMostBlogs[0],
    blogs: authorWithMostBlogs[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}