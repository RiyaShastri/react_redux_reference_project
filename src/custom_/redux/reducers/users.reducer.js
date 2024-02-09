import {
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  FORGOT_PWD_DATA,
  GET_ADDED_BY_USERS,
  GET_AGENTS,
  GET_LOGGED_IN_USER,
  GET_USERS,
  GET_USERS_BY_ROLE_ID,
  GET_USER_BY_ID,
  GET_USER_ROLES,
} from '../actions/users.actions'

const initialState = {
  users: {},
  forgotPwdData: 0,
  loggedInUser: {},
  addedByUsers: [],
  usersByRoleId: [],
  userRoles: [],
  agents: [],
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return { ...state, users: payload }

    case ADD_USER:
      // return [...state, payload]
      return { ...state, users: { ...state.users, data: [...state.users.data, payload] } }

    case EDIT_USER:
      return payload

    case DELETE_USER:
      return state.users.data.filter((user) => user.id !== payload)

    case GET_USER_BY_ID:
      return state

    case FORGOT_PWD_DATA:
      return { ...state, forgotPwdData: payload }

    case GET_LOGGED_IN_USER:
      return { ...state, loggedInUser: payload.data }

    case GET_ADDED_BY_USERS:
      return { ...state, addedByUsers: payload.data }

    case GET_USERS_BY_ROLE_ID:
      return { ...state, usersByRoleId: payload.data }

    case GET_USER_ROLES:
      return { ...state, userRoles: payload.data }

    case GET_AGENTS:
      return { ...state, agents: payload.data }

    default:
      return state
  }
}

export default userReducer
