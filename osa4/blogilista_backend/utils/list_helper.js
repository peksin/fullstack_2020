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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}