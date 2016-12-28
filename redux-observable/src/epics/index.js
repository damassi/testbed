// import expect from 'expect';
import { MIN_INPUT_LENGTH } from 'config'
// import { call, cancel, fork, put, select, take } from 'redux-saga/effects'
import * as api from 'utils/api'
import {combineEpics} from 'redux-observable'

import {
  fetchRequest,
  fetchFailure,
  fetchSuccess,
  retrieveCache,

  BUILD_QUERY,
  FETCH_REQUEST
} from 'actions'

const fetchRequest$ = (action$) =>
  action$.ofType(BUILD_QUERY)
    .filter(action => action.payload.query.length > MIN_INPUT_LENGTH - 2)
    .forkJoin(fetchRequest())
    .map(x => {
      console.log(x)
      return x
    })
    .mergeMap(action => console.log(action))
    // .mergeMap(action =>
    //   api.search(action.payload.query)
    //     .mapTo(fetchSuccess))
    .mapTo({ type: 'PONG' });


const rootEpic = combineEpics(fetchRequest$)
export default rootEpic
