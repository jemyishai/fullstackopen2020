import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  //altered to backend in future or action creator?
  const newSayingObj = { votes: 0, content}
  const response = await axios.post(baseUrl, newSayingObj)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.patch(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

export default { getAll, create, update }
