import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './custom_/redux/reducers/users.reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import ticketTypeReducer from './custom_/redux/reducers/ticketTypes.reducer'
import ticketReducer from './custom_/redux/reducers/tickets.reducer'
import feedbackReducer from './custom_/redux/reducers/feedbacks.reducer'

const initialState = {
  changeState: { sidebarShow: true },
}

const middleware = [thunk]

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  users: userReducer,
  ticketTypes: ticketTypeReducer,
  tickets: ticketReducer,
  feedbacks: feedbackReducer,
  changeState,
})

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)
export default store
