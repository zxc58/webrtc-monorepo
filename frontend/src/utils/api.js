import axios from 'axios'
const apiUrl = import.meta.env.API_URL ?? 'http://localhost:3000'
const instance = axios.create({
  baseURL: apiUrl,
  timeout: 1000,
  withCredentials: true,
})
instance.interceptors.request.use(
  (config) => {
    if (config.url === `/auth/signin` || config.url === `/auth/signup`) {
      return config
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'access_token'
    )}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  function (response) {
    return response?.data?.data ?? response?.data ?? response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export function apiSignin(data) {
  return instance.post(`/auth/signin`, data)
}
export function apiRefreshToken() {
  return instance.get('/auth/refresh/token')
}
export function apiSignup(data) {
  return instance.post(`/auth/signup`, data)
}
export function apiVerifyToken() {
  return instance.get('/auth/verify/token')
}
export function apiCookies() {
  return instance.get('/cookies')
}
