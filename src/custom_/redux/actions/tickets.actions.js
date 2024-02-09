import { baseAPI } from 'src/custom_/helpers/BaseApi'

export const GET_TICKETS = 'GET_TICKETS'
export const GET_RESOLVED_TICKETS = 'GET_RESOLVED_TICKETS'
export const GET_TICKET_BY_ID = 'GET_TICKET_BY_ID'

export const getTickets = (obj) => async (dispatch) => {
  try {
    const res = await baseAPI.post('/_ticket', obj)
    dispatch({ type: GET_TICKETS, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}

export const getResolvedTickets = (obj) => async (dispatch) => {
  try {
    const res = await baseAPI.post('/ticket/resolved', obj)
    dispatch({ type: GET_RESOLVED_TICKETS, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}

export const getTicketById = (id) => async (dispatch) => {
  try {
    const res = await baseAPI.get('/ticket/' + id)
    dispatch({ type: GET_TICKET_BY_ID, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log('err', err)
    return Promise.reject(err)
  }
}
