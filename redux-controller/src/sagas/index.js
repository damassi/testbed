import expect from 'expect';
import { MIN_INPUT_LENGTH } from 'config'
import { call, cancel, fork, put, select, take } from 'redux-saga/effects'
import * as api from 'utils/api'

import {
  fetchRequest,
  fetchFailure,
  fetchSuccess,
  retrieveCache,

  BUILD_QUERY,
} from 'actions'

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
    yield put(retrieveCache(payload))

    // Empty cache: proceed with GET
  } else {
    yield put(fetchRequest())

    try {
      const {
        data: {
          photos
        }
      } = yield call(api.search, {
        text: query
      })

      if (photos) {
        yield put(fetchSuccess(photos))
      }
    } catch (error) {
      yield put(fetchFailure(error))
    }
  }
}

function * watchers() {
  let currentTask

  while (true) {
    const action = yield take(BUILD_QUERY)

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


// Dummy tests
// -----------

function test() {
  const action = {
    payload: {
      query: 'foo'
    }
  }

  // Task should return cached result
  let gen = searchPhotoByQuery(action)
  expect(gen.next().value).toEqual(select())

  const cache = {
    photos: {
      cache: {
        foo: JSON.stringify(action.payload)
      }
    }
  }

  expect(gen.next(cache).value).toEqual(put(retrieveCache(action.payload)))
  expect(gen.next().done).toEqual(true)

  // Task should fetch result
  gen = searchPhotoByQuery(action)
  gen.next()

  expect(gen.next({photos: {}}).value).toEqual(put(fetchRequest()))
  expect(gen.next().value).toEqual(call(api.search, { text: 'foo' }))

  const photos = [1, 2, 3]
  expect(
    gen.next({
      data: {
        photos
      }
    }).value
  ).toEqual(put(fetchSuccess(photos)))
}

test()
