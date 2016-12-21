import { MIN_INPUT_LENGTH } from 'config'
import { call, cancel, fork, put, select, take } from 'redux-saga/effects'
import * as type from 'actions'
import * as api from 'utils/api'

function * searchPhotoByQuery(action) {
  const {
    payload: {
      query
    }
  } = action;

  if (query.length < MIN_INPUT_LENGTH) {
    return
  }

  const {
    photos: {
      cache
    }
  } = yield select()

  const cached = cache && cache[query]

  if (cached) {
    const payload = JSON.parse(cached)

    yield put({
      type: type.RETRIEVE_CACHE,
      payload: {
        photos: payload
      }
    })

    // No cache; proceed witih GET
  } else {
    yield put({
      type: type.FETCH_REQUEST
    })

    const {
      data: {
        photos
      }
    } = yield call(api.search, {
      text: query
    })

    if (photos) {
      yield put({
        type: type.FETCH_SUCCESS,
        payload: {
          photos: {
            results: photos.photo,
            total: photos.total
          }
        }
      })
    }
  }
}

function * watchers() {
  let currentTask = undefined;

  while (true) {
    const action = yield take(type.BUILD_QUERY)

    if (currentTask) {
      yield cancel(currentTask)
    }

    currentTask = yield fork(searchPhotoByQuery, action)
  }
}

export default function * rootSaga() {
  yield [
    watchers()
  ]
}
