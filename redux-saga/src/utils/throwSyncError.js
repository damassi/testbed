import { updateStatus } from 'actions'

export default function throwSyncError(msg, error, dispatch) {
  if (error instanceof Error) {
    setTimeout(() => {
      throw error
    })
  }

  if (__DEV__) {
    console.warn(msg, error)
  }

  dispatch(updateStatus(error))
}
