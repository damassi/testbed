import throwSyncError from 'utils/throwSyncError'
import * as api from 'utils/api'
import { MIN_INPUT_LENGTH } from 'config'

export const QUERY = 'QUERY'
export const SEARCH = 'SEARCH'
export const SHOW_PRELOADER = 'SHOW_PRELOADER'
export const UPDATE_STATUS = 'UPDATE_STATUS'

export function search(query) {
  return async (dispatch, getState) => {

    dispatch({
      type: QUERY,
      payload: {
        query
      }
    })

    if (query.length < MIN_INPUT_LENGTH) {
      return false
    }

    const {
      photos: {
        cache
      }
    } = getState()

    const cached = cache && cache[query]

    if (cached) {
      const cachedPayload = JSON.parse(cached)

      return dispatchPayload({
        photos: {
          ...cachedPayload
        }
      })
    }

    try {
      dispatch({
        type: SHOW_PRELOADER
      })

      const {
        data: {
          photos
        }
      } = await api.search({
        text: query
      })

      dispatchPayload({
        photos: {
          results: photos.photo,
          total: photos.total
        }
      })

    } catch (error) {
      throwSyncError(
        '(actions/search.js) Error searching Flickr:',
        error,
        dispatch
      )
    }

    function dispatchPayload(payload) {
      dispatch({
        type: SEARCH,
        payload: {
          query,
          ...payload
        }
      })
    }
  }
}

export function updateStatus(responseStatus) {
  return {
    type: UPDATE_STATUS,
    payload: {
      responseStatus
    }
  }
}
