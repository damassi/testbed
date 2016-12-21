export const BUILD_QUERY = 'BUILD_QUERY'
export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_ERROR = 'FETCH_ERROR'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const RETRIEVE_CACHE = 'RETRIEVE_CACHE'
export const UPDATE_STATUS = 'UPDATE_STATUS'


export const buildQuery = (query) => ({
  type: BUILD_QUERY,
  payload: {
    query
  }
})

export function updateStatus(responseStatus) {
  return {
    type: UPDATE_STATUS,
    payload: {
      responseStatus
    }
  }
}
