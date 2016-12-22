import { h } from 'preact'
import Photo from 'components/Photo'

const Photos = ({ results = [] } = {}) =>
  <div>
    { results.map((photo, index) =>
      <Photo {...photo} key={index.toString()} />
    )}
  </div>

export default Photos
