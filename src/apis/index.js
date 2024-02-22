import axios from 'axios'
import { API_ROOT } from '../utils/constants'
import * as storage from '../utils/Storage'
const instance = axios.create({
  baseURL: API_ROOT
})

instance.interceptors.request.use((config) => {
  // console.log('config', config)
  const token = storage.load('user')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  }
  return config
})


// Auth
export const loginAPI = async (username, password) => {
  const requestBody = {
    'username': username,
    'password': password
  }
  const response = await instance.post(`${API_ROOT}/api/auth/login`, requestBody)
  return response.data
}

export const fetchStudentsListAPI = async () => {
  const response = await instance.get(`${API_ROOT}/api/student/list`)
  return response.data.items
}

export const fetchEmployeesListAPI = async () => {
  const response = await instance.get(`${API_ROOT}/api/employee/list`)
  return response.data.items
}

export const fetchClassesListAPI = async() => {
  const response = await instance.get(`${API_ROOT}/api/class/list`)
  return response.data.items
}

export const fetchStudentInfoAPI = async() => {
  const response = await instance.get(`${API_ROOT}/api/class/list`)
  return response.data.student[0]
}