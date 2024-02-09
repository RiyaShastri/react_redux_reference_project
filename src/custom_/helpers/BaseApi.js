import axios from 'axios'

export const baseURL = 'http://192.168.100.89:4004/api'

export const baseAPI = axios.create({
  baseURL: baseURL,
})

baseAPI.interceptors.request.use(
  async (req) => {
    let token = localStorage.getItem('info') ? JSON.parse(localStorage.getItem('info')).token : null
    if (token !== null) {
      req.headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': !!req.multipartForm ? 'multipart/form-data' : 'application/json',
      }
    }
    delete req.multipartForm
    return req
  },
  (error) => {
    return Promise.reject(error)
  },
)

// baseAPI.interceptors.response.use(undefined, function axiosLogout(err) {
//   if (err.response.status === 401 || err.message === 'Request failed with status code 401') {
//     localStorage.removeItem('info')
//   }
//   return Promise.reject(err)
// })
