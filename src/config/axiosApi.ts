import { COOKIE_KEYS } from '@constants'
import axios from 'axios'
import Cookies from 'js-cookie'

import { env } from './env'

export const axiosApi = axios.create({
  baseURL: env.api
})

axiosApi.interceptors.request.use(
  (config) => {
    const newConfig = { ...config }
    const token = Cookies.get(COOKIE_KEYS.ACCESS_TOKEN)
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
