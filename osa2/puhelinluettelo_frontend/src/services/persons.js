import axios from 'axios'
const baseUrl = '/api/persons'

// GET-pyynto
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data) // palauttaa datan
}

// POST-pyynto
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data) // palauttaa datan
}


// PUT-pyynto
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data) // palauttaa datan
}


// DELETE-pyynto, delete ei kelvannut nimeksi syysta tai toisesta
// krhm ja jos luki tehtavanannon loppuun niin siellahan se sanottiin
const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data) // palauttaa datan
}

export default {getAll, create, update, remove}