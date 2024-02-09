import {
  GET_TICKET_TYPES,
  ADD_TICKET_TYPE,
  EDIT_TICKET_TYPE,
  DELETE_TICKET_TYPE,
  GET_TICKET_TYPE_BY_ID,
  GET_TICKET_TYPES_NAMES,
} from '../actions/ticketTypes.actions'

const initialState = { ticketTypes: {}, ticketTypesNames: [] }

const ticketTypeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TICKET_TYPES:
      return { ...state, ticketTypes: payload }

    case ADD_TICKET_TYPE:
      //   return [...state, payload.data]
      return {
        ...state,
        ticketTypes: { ...state.ticketTypes, data: [...state.ticketTypes.data, payload.data] },
      }

    case GET_TICKET_TYPE_BY_ID:
      return state.ticketTypes.data.map((t) => {
        if (t.id === payload) {
          return t
        } else {
          return null
        }
      })

    case EDIT_TICKET_TYPE:
      return { ...state, ticketTypes: payload }

    case DELETE_TICKET_TYPE:
      return state.ticketTypes.data.filter((t) => t.id !== payload)

    case GET_TICKET_TYPES_NAMES:
      return { ...state, ticketTypesNames: payload.data }

    default:
      return state
  }
}

export default ticketTypeReducer
