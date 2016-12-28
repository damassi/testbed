import createLogger from 'redux-logger'
import { createLogicMiddleware } from 'redux-logic';
import rootPolls from 'polls'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

export default function configureStore(rootReducer, initialState) {
  const logicMiddleware = createLogicMiddleware(rootPolls);

  const middleware = applyMiddleware(
    thunk,
    logicMiddleware,
    createLogger({
      collapsed: true
    })
  )

  return {
    ...createStore(rootReducer, initialState, middleware)
  };
}
