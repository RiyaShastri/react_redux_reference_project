import { baseAPI } from 'src/custom_/helpers/BaseApi'

export const GET_FEEDBACKS = 'GET_FEEDBACKS'
export const GET_FEEDBACK_BY_ID = 'GET_FEEDBACK_BY_ID'

export const getFeedbacks = (obj) => async (dispatch) => {
  try {
    const res = await baseAPI.post('/getAllFeedback', obj)
    dispatch({ type: GET_FEEDBACKS, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getFeedbackById = (id) => async (dispatch) => {
  try {
    const res = await baseAPI.get('/ticket/getFeedback/' + id)
    dispatch({ type: GET_FEEDBACK_BY_ID, payload: res.data })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}
