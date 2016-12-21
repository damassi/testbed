import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'


export default function configureStore(rootReducer, initialState) {
  const middleware = applyMiddleware(
    thunk,
    createLogger({
      collapsed: true
    })
  )

  return {
    ...createStore(rootReducer, initialState, middleware)
  };
}
