import axios, { type AxiosInstance } from 'axios'

import { errorVerifier } from '../utils/error-verifier'

const api = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
  },
}) as AxiosInstance

api.interceptors.response.use(
  response => response,
  async RequestError => {
    const errorResponse = RequestError.response
    if (errorResponse && errorResponse.data) {
      return Promise.reject(errorVerifier(errorResponse))
    } else {
      return Promise.reject(RequestError)
    }
  }
)

api.interceptors.request.use(
  async config => {
    // Ensure JSON content type for requests with data
    if (config.data && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  error => Promise.reject(error)
)

export { api }
