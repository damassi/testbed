import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'sagas'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

export default function configureStore(rootReducer, initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = applyMiddleware(
    thunk,
    sagaMiddleware,
    createLogger({
      collapsed: true
    })
  )

  return {
    ...createStore(rootReducer, initialState, middleware),
    runSaga: sagaMiddleware.run(rootSaga)
  };
}
