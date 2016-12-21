import { delay, take, takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'

function * testCall() {
  yield delay(1000)

  yield put({
    type: 'QUERY',
    payload: {
      query: 'HEY NOW'
    }

  })
}

function * runSaga() {
  yield takeEvery('TEST_CALL', testCall)
}

export default function * rootSaga() {
  yield [
    runSaga()
  ]
}
