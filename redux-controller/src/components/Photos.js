import React, { PropTypes } from 'react'
import Photo from 'components/Photo'

const Photos = (_, { results }) =>
  <div>
    { results.map((photo, index) =>
      <Photo {...photo} key={index.toString()} />
    )}
  </div>

Photos.contextTypes = {
  results: PropTypes.array.isRequired
}

export default Photos
