import { baseAPI } from 'src/custom_/helpers/BaseApi'

export const GET_USERS = 'GET_USERS'
export const ADD_USER = 'ADD_USER'
export const EDIT_USER = 'EDIT_USER'
export const DELETE_USER = 'DELETE_USER'
export const GET_USER_BY_ID = 'GET_USER_BY_ID'
export const FORGOT_PWD_DATA = 'FORGOT_PWD_DATA'
export const GET_LOGGED_IN_USER = 'GET_LOGGED_IN_USER'
export const GET_ADDED_BY_USERS = 'GET_ADDED_BY_USERS'
export const GET_USERS_BY_ROLE_ID = 'GET_USERS_BY_ROLE_ID'
export const GET_USER_ROLES = 'GET_USER_ROLES'
export const GET_AGENTS = 'GET_AGENTS'

export const getUsers = (obj) => async (dispatch) => {
  try {
    const res = await baseAPI.post('/_user', obj)
    dispatch({ type: GET_USERS, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}

export const addUser = (DATA) => async (dispatch) => {
  try {
    const res = await baseAPI.post('/user', DATA)
    dispatch({ type: ADD_USER, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}

export const  = (id, DATA) => async (dispatch) => {
  try {
    const res = await baseAPI.put('/user/' + id, DATA)
    dispatch({ type: EDIT_USER, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err :>> ', err)
    return Promise.reject(err)
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    const res = await baseAPI.delete('/user/' + id)
    dispatch({ type: DELETE_USER, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err :>> ', err)
    return Promise.reject(err)
  }
}

export const getUserById = (id) => async (dispatch) => {
  try {
    const res = await baseAPI.get('/user/' + id)
    dispatch({ type: GET_USER_BY_ID, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err :>> ', err)
    return Promise.reject(err)
  }
}

export const forgotPwdData = (payload) => ({
  type: FORGOT_PWD_DATA,
  payload,
})

export const getLoggedInUser = () => async (dispatch) => {
  try {
    const res = await baseAPI.get('/me')
    dispatch({ type: GET_LOGGED_IN_USER, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}

export const getAddedByUsers = () => async (dispatch) => {
  try {
    const res = await baseAPI.get('/getAddedByUsers')
    dispatch({ type: GET_ADDED_BY_USERS, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}

export const getUsersByRoleId = (id) => async (dispatch) => {
  try {
    const res = await baseAPI.get('/getUsersAccordingly/' + id)
    dispatch({ type: GET_USERS_BY_ROLE_ID, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}

export const getUserRoles = () => async (dispatch) => {
  try {
    const res = await baseAPI.get('/_userRole')
    dispatch({ type: GET_USER_ROLES, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getAgents = () => async (dispatch) => {
  try {
    const res = await baseAPI.get('/getUsersAccordingly/' + 3)
    dispatch({ type: GET_AGENTS, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}
