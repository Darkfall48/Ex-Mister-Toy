import { userService } from '../../services/user.service.js'

// User
export const GET_USER = 'GET_USER'
export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_PREF = 'UPDATE_USER_PREF'
export const UPDATE_USER_ACTIVITIES = 'UPDATE_USER_ACTIVITIES'

const initialState = {
  user: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    // USER
    case SET_USER:
      return { ...state, user: action.user }
    case UPDATE_USER_ACTIVITIES:
      const user = { ...state.user, activities: action.activities }
      return { ...state, user }

    default:
      return { ...state }
  }
}
