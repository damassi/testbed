import * as api from 'utils/api'
import FlickrApp from 'components/FlickrApp'
import rooch from 'rooch'
import { MIN_INPUT_LENGTH } from 'config'
import { h } from 'preact'

const app = rooch()

app.model({
  namespace: 'photos',
  state: {
    cache: {},
    isFetching: false,
    query: '',
    photos: {
      results: [],
      total: undefined
    },
    status: undefined
  },
  reducers: {
    buildQuery: (state, data) => {
      return state
    },
    fetchRequest: (state, data) => {
      return {
        isFetching: true
      }
    },
    fetchFailure: (state, data) => {
      return {
        isFetching: false
      }
    },
    fetchSuccess: (payload, state) => {
      const { photos, query } = payload

      return {
        cache: {
          [query]: JSON.stringify(photos)
        },
        isFetching: false,
        photos,
        query,
        status: undefined
      }
    },
    retrieveCache: (state, data) => {
      return {
        isFetching: false
      }
    }
  },
  effects: {
    fetchPhotos: async (query, state, send, done) => {
      if (query.length < MIN_INPUT_LENGTH) {
        return
      }

      try {
        const {
          data: {
            photos
          }
        } = await api.search({
          text: query
        })

        const payload = {
          photos: {
            results: photos.photo,
            total: photos.total
          },
          query
        }

        send('photos:fetchSuccess', payload, () => done())
      } catch (error) {
        send('photos:fetchError', error)
      }
    }
  },
})

const PhotoApp = (state, prev, send) => {
  return (
    <div>
      <FlickrApp
        state={state}
        prev={prev}
        send={send}
      />
    </div>
  )
}

app.router([
  '/', PhotoApp
])

app.start(document.getElementById('root'))
