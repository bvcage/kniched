import { Alert, Snackbar } from '@mui/material'
import React from 'react'

function AlertSnackbar (props) {
  const {
    text='please review errors',
    severity='error',
    closeFn,
    showAlert=false
  } = props

  return (
    <Snackbar
      autoHideDuration={3000}
      open={showAlert}
      onClose={closeFn}
      >
      <Alert severity={severity}>{text}</Alert>
    </Snackbar>
  )
}

export default AlertSnackbar