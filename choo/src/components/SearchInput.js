import LoadIndicator from 'components/LoadIndicator'
import { h } from 'preact'
import { MIN_INPUT_LENGTH } from 'config'

const SearchInput = ({ state, prev, send}) => {
  const {
    photos: {
      isFetching,
      query
    }
  } = state;

  const handleChange = ({currentTarget}) => {
    send('photos:fetchPhotos', currentTarget.value) //actions.buildQuery(currentTarget.value))
  }

  const textStatusColor = query.length < MIN_INPUT_LENGTH
    ? '#999'
    : '#333'

  return (
    <div>
      { isFetching &&
        <LoadIndicator /> }

      <input
        autoFocus
        placeholder='Search'
        type='text'
        defaultValue={query}
        onKeyDown={handleChange}
        style={{
          ...styles.input,
          color: textStatusColor
        }}
      />

    </div>
  )
}

export default SearchInput

const styles = {
  input: {
    border: 0,
    borderBottom: '1px solid #ccc',
    borderColor: '#e3e3e3',
    display: 'block',
    fontSize: '18px',
    margin: '30px',
    outline: 0,
    width: '30%'
  }
}
