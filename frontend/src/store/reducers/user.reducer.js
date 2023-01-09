import { userService } from '../../services/user.service.js'

// User
export const SET_USER = 'SET_USER'
export const UPDATE_USER_SCORE = 'UPDATE_USER_SCORE'

const initialState = {
  user: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user }
    case UPDATE_USER_SCORE:
      const user = { ...state.user, score: action.score }
      return { ...state, user }
    default:
      return state
  }
}
