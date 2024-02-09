import { baseAPI } from 'src/custom_/helpers/BaseApi'

export const GET_TICKET_TYPES = 'GET_TICKET_TYPES'
export const ADD_TICKET_TYPE = 'ADD_TICKET_TYPE'
export const GET_TICKET_TYPE_BY_ID = 'GET_TICKET_TYPE_BY_ID'
export const EDIT_TICKET_TYPE = 'EDIT_TICKET_TYPE'
export const DELETE_TICKET_TYPE = 'DELETE_TICKET_TYPE'
export const GET_TICKET_TYPES_NAMES = 'GET_TICKET_TYPES_NAMES'

export const getTicketTypes = (obj) => async (dispatch) => {
  try {
    const res = await baseAPI.post('/_tickettype', obj)
    dispatch({ type: GET_TICKET_TYPES, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}

export const addTicketType = (DATA) => async (dispatch) => {
  try {
    const res = await baseAPI.post('/tickettype', DATA)
    dispatch({ type: ADD_TICKET_TYPE, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}

export const getTicketTypeById = (id) => async (dispatch) => {
  try {
    const res = await baseAPI.get('/tickettype/' + id)
    dispatch({ type: GET_TICKET_TYPE_BY_ID, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}

export const editTicketType = (id, DATA) => async (dispatch) => {
  try {
    const res = await baseAPI.put('/tickettype/' + id, DATA)
    dispatch({ type: EDIT_TICKET_TYPE, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}

export const deleteTicketType = (id) => async (dispatch) => {
  try {
    const res = await baseAPI.delete('/tickettype/' + id)
    dispatch({ type: DELETE_TICKET_TYPE, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}

export const getTicketTypesNames = () => async (dispatch) => {
  try {
    const res = await baseAPI.get('/tickettype')
    dispatch({ type: GET_TICKET_TYPES_NAMES, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}
