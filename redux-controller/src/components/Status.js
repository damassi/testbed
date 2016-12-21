import React, { PropTypes } from 'react'

const Status = (_, { status }) =>
  <div>
    {status && status}
  </div>

Status.contextTypes = {
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default Status
