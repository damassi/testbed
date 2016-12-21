import 'babel-polyfill'
import AppController from './AppController'
import React from 'react'
import configureStore from 'utils/configureStore'
import rootReducer from 'reducers'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

const store = configureStore(rootReducer)

render(
  <Provider store={store}>
    <AppController />
  </Provider>

  , document.getElementById('root')
)
