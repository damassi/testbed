import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'sagas'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

export const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  sagaMiddleware,
  createLogger({
    collapsed: true
  })
)(createStore)

export default function configureStore(rootReducer, initialState = {}) {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  sagaMiddleware.run(
    rootSaga
  );

  return store
}
