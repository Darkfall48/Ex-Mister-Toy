import { combineReducers, legacy_createStore as createStore } from 'redux'

import { appReducer } from './reducers/app.reducer.js'
import { toyReducer } from './reducers/toy.reducer.js'
import { userReducer } from './reducers/user.reducer.js'

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
  appModule: appReducer,
  toyModule: toyReducer,
  userModule: userReducer,
})

export const store = createStore(rootReducer, middleware)

// For debug
store.subscribe(() => {
  console.log('**** Store state changed: ****')
  console.log('storeState:\n', store.getState())
  console.log('*******************************')
})
