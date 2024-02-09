import { GET_FEEDBACKS, GET_FEEDBACK_BY_ID } from '../actions/feedbacks.action'

const initialState = {}

const feedbackReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FEEDBACKS:
      return payload

    case GET_FEEDBACK_BY_ID:
      return state

    default:
      return state
  }
}

export default feedbackReducer
