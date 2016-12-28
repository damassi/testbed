import {Observable} from 'rxjs'
import { MIN_INPUT_LENGTH } from 'config'
import * as api from 'utils/api'
import { combineEpics } from 'redux-observable'
import { concat as concat$ } from 'rxjs/observable/concat'

import {
  fetchRequest,
  fetchFailure,
  fetchSuccess,
  retrieveCache,

  BUILD_QUERY,
  FETCH_REQUEST,
  FETCH_SUCCESS
} from 'actions'

const fetchRequest$ = (action$, store) =>
  action$.ofType(BUILD_QUERY)
    .filter(action => action.payload.query.length > MIN_INPUT_LENGTH - 2)
    .switchMap(action => {
      const {
        payload: {
          query
        }
      } = action

      const {
        photos: {
          cache
        }
      } = store.getState()

      const cached = cache && cache[query]

      if (cached) {
        const payload = JSON.parse(cached)
        return Observable.of(store.dispatch(retrieveCache(payload)))
      } else {
        return concat$(
          Observable.of(fetchRequest()),
          Observable.fromPromise(api.search(query))
            .map(response => {
              const {
                data: {
                  photos
                }
              } = response

              return fetchSuccess(photos)
            })
        )
      }
    })

const rootEpic = combineEpics(fetchRequest$)
export default rootEpic
