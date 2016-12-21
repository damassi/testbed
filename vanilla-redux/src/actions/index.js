import throwSyncError from 'utils/throwSyncError'
import * as api from 'utils/api'
import { MIN_INPUT_LENGTH } from 'config'

export const BUILD_QUERY = 'BUILD_QUERY'
export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_FAILURE = 'FETCH_FAILURE'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const RETRIEVE_CACHE = 'RETRIEVE_CACHE'
export const UPDATE_STATUS = 'UPDATE_STATUS'

export const buildQuery = (query) => ({
  type: BUILD_QUERY,
  payload: {
    query
  }
})

export const fetchRequest = () => ({
  type: FETCH_REQUEST
})

export const fetchFailure = (error) => ({
  type: FETCH_FAILURE,
  payload: {
    error
  }
})

export const fetchSuccess = (response) => ({
  type: FETCH_SUCCESS,
  payload: {
    photos: {
      results: response.photo,
      total: response.total
    }
  }
})

export const retrieveCache = (cache) => ({
  type: RETRIEVE_CACHE,
  payload: {
    photos: cache
  }
})

export function search(query) {
  return async (dispatch, getState) => {
    if (query.length < MIN_INPUT_LENGTH) {
      return false
    }

    dispatch(buildQuery(query))

    const {
      photos: {
        cache
      }
    } = getState()

    const cached = cache && cache[query]

    if (cached) {
      dispatch(retrieveCache(JSON.parse(cached)))

      // No cache, proceed with GET
    } else {
      try {
        dispatch(fetchRequest())

        const {
          data: {
            photos
          }
        } = await api.search({
          text: query
        })

        dispatch(fetchSuccess(photos))
      } catch (error) {
        dispatch(fetchFailure(error))

        throwSyncError(
          '(actions/search.js) Error searching Flickr:',
          error,
          dispatch
        )
      }
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
