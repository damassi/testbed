import Photos from 'components/Photos'
import React from 'react'
import SearchInput from 'components/SearchInput'
import Status from 'components/Status'

export default function FlickrApp() {
  return (
    <div style={styles.container}>
      <Status />
      <SearchInput />
      <Photos />
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    textAlign: 'center'
  }
}
