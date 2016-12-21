import LoadIndicator from 'components/LoadIndicator'
import React, { PropTypes } from 'react'
import { MIN_INPUT_LENGTH } from 'config'

const SearchInput = (_, { buildQuery, isFetching, query }) => {

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
        onChange={(event) => buildQuery(event.currentTarget.value)}
        style={{
          ...styles.input,
          color: textStatusColor
        }}
      />

    </div>
  )
}

SearchInput.contextTypes = {
  buildQuery: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired
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
