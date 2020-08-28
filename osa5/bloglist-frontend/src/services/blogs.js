import axios from 'axios'
const baseUrl = '/api/blogs'

// eslint-disable-next-line
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  // console.log(`${JSON.stringify(newObject)}`)
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async newObject => {
  const url = `${baseUrl}/${newObject.id}`
  const response = await axios.put(url, newObject)
  return response.data
}

const remove = async newObject => {
  const url = `${baseUrl}/${newObject.id}`
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(url, config)
}

export default { getAll, setToken, create, update, remove }