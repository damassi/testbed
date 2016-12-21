import u from 'updeep'
import * as type from 'actions';
import { combineReducers } from 'redux';

const initialState = {
  cache: {},
  loading: false,
  query: '',
  photos: {
    results: [],
    total: undefined
  },
  status: undefined
}

function photoReducer(state = initialState, action) {
  switch (action.type) {

    case type.SHOW_PRELOADER:
      return u({
        loading: true
      }, state)

    case type.QUERY:
      return u({
        query: action.payload.query
      }, state)

    case type.SEARCH: {
      const { query } = state
      const { photos } = action.payload

      return u({
        cache: {
          [query]: JSON.stringify(photos)
        },
        loading: false,
        query,
        photos: {
          ...photos
        },
        status: undefined
      }, state)
    }

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
