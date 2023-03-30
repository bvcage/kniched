import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Auth } from 'aws-amplify'
import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import AlertSnackbar from '../AlertSnackbar'

function ConfirmationForm (props) {
  const { state } = useLocation()
  const { login } = state
  const [ code, setCode ] = useState('')
  const [ alert, setAlert ] = useState('')
  const navigate = useNavigate()

  function handleChangeCode (e) {
    if (/^[0-9]{0,6}$/.test(e.target.value)) {
      setCode(e.target.value)
    }
  }

  function handleSubmit (e) {
    e.preventDefault()
    if (/^[0-9]{6}$/.test(code)) {
      Auth.confirmSignUp(login.email, code).then(r=>{
        navigate('/')
      }).catch(err=>{
        if (err.message.split(' ').pop() === 'CONFIRMED') {
          navigate('/')
        } else {
          setAlert(err.message)
        }
      })
    } else if (!code) {
      setAlert('please enter your confirmation code')
    } else {
      setAlert('confirmation code must be 6 digits')
    }
  }

  if (!login) return (<Navigate to='/account/login' replace />)
  return (
    <Container maxWidth='xs'>
      <Box component='form' onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h4'>Confirmation Code</Typography>
            <Typography variant='body1'>Please enter the confirmation code sent to {hideEmail(login.email)}:</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={code}
              onChange={handleChangeCode}
              />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='outlined'>submit</Button>
          </Grid>
        </Grid>
      </Box>
      <AlertSnackbar
        text={alert}
        showAlert={!!alert}
        closeFn={()=>setAlert('')}
        />
    </Container>
  )
}

function hideEmail(email) {
  const em1 = email.split('@')
  const em2 = em1[1].split('.')
  return `${em1[0][0]}***@${em2[0][0]}**.${em2.pop()[0]}**`
}

export default ConfirmationForm