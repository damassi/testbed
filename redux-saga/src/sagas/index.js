import { MIN_INPUT_LENGTH } from 'config'
import { takeEvery, throttle } from 'redux-saga'
import { call, put, select, take } from 'redux-saga/effects'
import * as type from 'actions'
import * as api from 'utils/api'

// function * querySaga(action) {
//   const { query } = action.payload
//
//   if (query.length > MIN_INPUT_LENGTH) {
//     yield put({
//       type: type.SEARCH,
//       payload: {
//         query: action.payload.query
//       }
//     })
//   }
// }
//
// function * searchSaga() {
//   yield put({
//     type: type.SHOW_PRELOADER
//   })
//
//   const {
//     cache,
//     query,
//   } = yield select(s => s.photos)
//
//   const cached = cache && cache[query]
//
//   if (cached) {
//     const cachedPayload = JSON.parse(cached)
//   }
//
//   try {
//     const {
//       data: {
//         photos
//       }
//     } = yield api.search({
//       text: query
//     })
//
//   } catch (error) {
//     console.error('Error searching flickr', error)
//   }
//
// }

function * querySaga() {
  const {
    payload: {
      query
    }
  } = yield take(type.QUERY)

  if (query.length < MIN_INPUT_LENGTH) {
    return false
  }

  const {
    photos: {
      cache
    }
  } = yield select()

  const cached = cache && cache[query]

  if (cached) {
    const cachedPayload = JSON.parse(cached)

    yield put({
      type: type.SEARCH,
      payload: cachedPayload
    })
  } else {
    yield put({
      type: type.SHOW_PRELOADER
    })

    const {
      data: {
        photos
      }
    } = yield call(api.search, {
      text: query
    })

    yield put({
      type: type.SEARCH,
      payload: {
        photos: {
          results: photos.photo,
          total: photos.total
        }
      }
    })
  }
}

function * watchers() {
  yield throttle(500, type.QUERY, querySaga)
}

export default function * rootSaga() {
  yield [
    watchers()
  ]
}
