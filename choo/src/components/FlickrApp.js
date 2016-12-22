import Photos from 'components/Photos'
import { h } from 'preact'
import SearchInput from 'components/SearchInput'
import Status from 'components/Status'

export default function FlickrApp(props) {
  return (
    <div style={styles.container}>
      <Status {...props} />
      <SearchInput {...props} />
      <Photos {...props } />
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    textAlign: 'center'
  }
}
