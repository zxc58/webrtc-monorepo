import axios from 'axios'
import to from 'await-to-js'
import router from '../router'
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
  (response) => response?.data?.data ?? response?.data ?? response,
  responseErrorHandler
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
async function responseErrorHandler(error) {
  const originalConfig = error.config
  if (error?.response?.status) {
    switch (error.response.status) {
      case 401:
        if (!originalConfig._retry) {
          originalConfig._retry = true
          const [, responseData] = await to(instance.get('/auth/refresh/token'))
          localStorage.setItem('access_token', responseData.accessToken)
          return instance.request(originalConfig)
        } else {
          localStorage.removeItem('access_token')
          router.push('/signin')
          return Promise.reject(error.response.data)
        }
      default:
        return Promise.reject(error.response.data)
    }
  }
  return Promise.reject(error)
}
