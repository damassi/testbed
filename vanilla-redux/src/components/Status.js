import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const Status = ({ status }) =>
  <div>
    {status && status}
  </div>

Status.propTypes = {
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default connect((state) => ({
  status: state.photos.status
}))(Status)
