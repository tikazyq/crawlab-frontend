import axios from 'axios'

const baseUrl = 'http://localhost:5000/api'

const request = (method, path, params, data) => {
  return new Promise((resolve, reject) => {
    const url = `${baseUrl}${path}`
    axios({
      method,
      url,
      params,
      data
    })
      .then(resolve)
      .catch(reject)
  })
}

const get = (path, params) => {
  return request('GET', path, params)
}

const post = (path, data) => {
  return request('POST', path, {}, data)
}

const put = (path, data) => {
  return request('PUT', path, {}, data)
}

const del = (path, data) => {
  return request('DELETE', path)
}

export default {
  baseUrl,
  request,
  get,
  post,
  put,
  delete: del
}
