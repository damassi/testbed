import http from 'axios'
import queryString from 'query-string'

import {
  FLICKR_API_ENDPOINT,
  FLICKR_API_KEY,
  PAGE_SIZE
} from 'config'

export async function search(text) {

  const params = queryString.stringify({
    api_key: FLICKR_API_KEY,
    format: 'json',
    nojsoncallback: '?',
    method: 'flickr.photos.search',
    per_page: PAGE_SIZE,
    text
  })

  return await http.get(FLICKR_API_ENDPOINT + '?' + params)
}
