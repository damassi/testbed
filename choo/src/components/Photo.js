import { h } from 'preact'
import * as urls from 'utils/urls'

const Photo = (props) => {
  const {
    farm,
    id,
    owner,
    secret,
    server
  } = props

  const url = urls.imageUrl(farm, server, id, secret)
  const pageUrl = urls.pageUrl(owner, id)

  return (
    <a href={pageUrl} target='_blank'>
      <img style={styles.img} src={url} />
    </a>
  )
}

export default Photo

const styles = {
  img: {
    padding: '30px'
  }
}
