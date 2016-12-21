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

    case type.FETCH_REQUEST:
      return u({
        isFetching: true
      }, state)

    case type.FETCH_ERROR:
      return u({
        isFetching: false
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
        query,
        photos: {
          ...photos
        },
        status: undefined
      }, state)
    }

    case type.BUILD_QUERY:
      return u({
        query: action.payload.query
      }, state)

    case type.UPDATE_STATUS: {
      const {
        responseStatus: {
          status: _status,
          statusText
        }
      } = action.payload

      const status = _status === 404
        ? '404 Error searching Flickr: Not found'
        : statusText

      return u({
        status
      }, state)
    }

    default:
      return state
  }
}

export default combineReducers({
  photos: photoReducer
})
