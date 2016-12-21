import u from 'updeep'
import * as type from 'actions';
import { combineReducers } from 'redux';

const initialState = {
  cache: {},
  isFetching: false,
  query: '',
  photos: {
    results: [],
    total: undefined
  },
  status: undefined
}

function photoReducer(state = initialState, action) {
  switch (action.type) {

    case type.BUILD_QUERY:
      return u({
        query: action.payload.query
      }, state)

    case type.FETCH_REQUEST:
      return u({
        isFetching: true
      }, state)

    case type.FETCH_FAILURE:
      return u({
        isFetching: false,
        message: action.payload.error
      }, state)

    case type.RETRIEVE_CACHE:
    case type.FETCH_SUCCESS: {
      const { query } = state
      const { photos } = action.payload

      return u({
        cache: {
          [query]: JSON.stringify(photos)
        },
        isFetching: false,
        photos,
        query,
        status: undefined
      }, state)
    }

    default:
      return state
  }
}

export default combineReducers({
  photos: photoReducer
})
