import createLogger from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from 'epics'
import thunk from 'redux-thunk'
import { compose, createStore, applyMiddleware } from 'redux'

export default function configureStore(rootReducer, initialState) {
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const middleware = applyMiddleware(
    thunk,
    epicMiddleware,
    createLogger({
      collapsed: true
    })
  )

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return {
    ...createStore(rootReducer, composeEnhancers(middleware), initialState)
  };
}
