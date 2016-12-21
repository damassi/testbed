import { PropTypes } from 'react';

export const isFetching = (state) => state.photos.isFetching
isFetching.propType = PropTypes.bool

export const query = (state) => state.photos.query
query.propType = PropTypes.string

export const cache = (state) => state.photos.cache
cache.propType = PropTypes.object

export const results = (state) => state.photos.photos.results
results.propType = PropTypes.array

export const status = (state) => state.photos.status
status.propType = PropTypes.string
