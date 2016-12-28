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

export const updateStatus = (responseStatus) => ({
  type: UPDATE_STATUS,
  payload: {
    responseStatus
  }
})
