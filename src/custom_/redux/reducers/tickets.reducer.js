import { GET_RESOLVED_TICKETS, GET_TICKETS, GET_TICKET_BY_ID } from '../actions/tickets.actions'

const initialState = { tickets: {}, resolvedTickets: {}, feedbacks: {} }

const ticketReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TICKETS:
      return { ...state, tickets: payload }

    case GET_RESOLVED_TICKETS:
      return { ...state, resolvedTickets: payload }

    case GET_TICKET_BY_ID:
      return state

    default:
      return state
  }
}

export default ticketReducer
