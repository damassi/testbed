import { createLogic } from 'redux-logic'
import { MIN_INPUT_LENGTH } from 'config'
import * as api from 'utils/api'

import {
  fetchRequest,
  fetchFailure,
  fetchSuccess,
  retrieveCache,

  BUILD_QUERY,
  FETCH_FAILURE
} from 'actions'

const getQuery = (action) => action.payload.query
const getCache = (state) => state.photos.cache

const searchPhotoByQuery = createLogic({
  type: BUILD_QUERY,
  cancelType: FETCH_FAILURE,
  latest: true,
  processOptions: {
    dispatchMultiple: true
  },
  validate: ({ getState, action }, allow, reject) => {
    const query = getQuery(action)
    const cache = getCache(getState())
    const cached = cache && cache[query]

    if (cached) {
      reject(retrieveCache(JSON.parse(cached)))
    } else if (query.length > MIN_INPUT_LENGTH) {
      allow(action)
    }
  },
  process: async ({ getState, action }, dispatch, done) => {
    dispatch(fetchRequest())

    try {
      const {
        data: {
          photos
        }
      } = await api.search(getQuery(action))

      if (photos) {
        dispatch(fetchSuccess(photos))
      }
    } catch (error) {
      dispatch(fetchFailure(error))
    }

    done()
  }
})

export default [
  searchPhotoByQuery
]
