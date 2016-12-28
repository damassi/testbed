import http from 'axios'
import queryString from 'query-string'
import { Observable } from 'rxjs'

import {
  FLICKR_API_ENDPOINT,
  FLICKR_API_KEY,
  PAGE_SIZE
} from 'config'

export const search = (fetchParams) => Observable.fromPromise(() => {
  const params = queryString.stringify({
    api_key: FLICKR_API_KEY,
    format: 'json',
    nojsoncallback: '?',
    method: 'flickr.photos.search',
    per_page: PAGE_SIZE,
    ...fetchParams
  })

  return http.get(FLICKR_API_ENDPOINT + '?' + params)
})
