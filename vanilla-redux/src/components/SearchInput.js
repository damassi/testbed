import LoadIndicator from 'components/LoadIndicator'
import React, { PropTypes } from 'react'
import debounce from 'lodash.debounce'
import { search } from 'actions'
import { connect } from 'react-redux'
import { MIN_INPUT_LENGTH } from 'config'

const SearchInput = ({ dispatch, isFetching, query }) => {

  const dispatchSearch = debounce((value) =>
    dispatch(search(value)), 300)

  const handleChange = (event) => {
    const {
      value
    } = event.currentTarget

    dispatchSearch(value)
  }

  const textStatusColor = query.length < MIN_INPUT_LENGTH
    ? '#999'
    : '#333'

  return (
    <div>
      { isFetching &&
        <LoadIndicator /> }

      <input
        placeholder='Search'
        type='text'
        defaultValue={query}
        onChange={handleChange}
        style={{
          ...styles.input,
          color: textStatusColor
        }}
      />

    </div>
  )
}

SearchInput.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
}

export default connect((state) => ({
  isFetching: state.photos.isFetching,
  query: state.photos.query
}))(SearchInput)

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
