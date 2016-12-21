import * as actions from 'actions'
import * as api from 'utils/api'
import * as selectors from 'selectors'
import PhotoAppLayout from 'components/PhotoAppLayout'
import throwSyncError from 'utils/throwSyncError'
import { MIN_INPUT_LENGTH } from 'config'
import { controller, getProps } from 'react-redux-controller'

const AppController = {
  *buildQuery(query) {
    if (query.length < MIN_INPUT_LENGTH) {
      return false;
    }

    const {
      dispatch,
      cache
    } = yield getProps

    dispatch(actions.buildQuery(query))

    const cached = cache && cache[query]

    if (cached) {
      dispatch(actions.retrieveCache(JSON.parse(cached)))
    } else {
      dispatch(actions.fetchRequest())

      try {
        const {
          data: {
            photos
          },
          stat
        } = yield api.search(query)

        if (stat !== 'fail' && photos) {
          dispatch(actions.fetchSuccess(photos))
        } else {
          dispatch(actions.fetchFailure('Photo not found'))
        }
      } catch (error) {
        dispatch(actions.fetchFailure(error.message))
        throwSyncError('Error fetching photos', error, dispatch)
      }
    }
  }
}

export default controller(PhotoAppLayout, AppController, selectors)
