import { Alert, Box, Button, Container, Snackbar, Stack, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AUTH } from '../../firebaseConfig'

const blankLogin = {
  email: '',
  password: ''
}

function LoginForm (props) {
  const [ login, setLogin ] = useState(blankLogin)
  const [ alert, showAlert ] = useState(null)
  const navigate = useNavigate()

  function handleChange (e) {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit (e) {
    e.preventDefault()
    // login firebase
    signInWithEmailAndPassword(AUTH, login.email, login.password)
      .then(uCred => {
        localStorage.setItem('user', JSON.stringify(uCred.user))
        navigate('/')
      })
      .catch(err => {
        console.log(err)
        showAlert('error: ' + err.code)
      })
    // login AWS
    // Auth.signIn(login.email, login.password)
    //   .then(user=>{
    //     localStorage.setItem('user', JSON.stringify(user.username))
    //     navigate('/')
    //   })
    //   .catch(err=>{
    //     if (err.code === 'UserNotConfirmedException') {
    //       navigate('/account/confirm', {
    //         state: {
    //           login: login
    //         }
    //       })
    //     } else {
    //       showAlert(err.message)
    //     }
    //   })
    }

  return (
    <Container maxWidth='xs' sx={{padding: '1rem'}}>
      <Box component='form' onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name='email'
            label='email'
            value={login.email}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name='password'
            label='password'
            type='password'
            value={login.password}
            fullWidth
            onChange={handleChange}
          />
          <Box sx={{textAlign: 'center'}}>
            <Button
              type='submit'
              variant='outlined'
              sx={{minWidth: '40%'}}
              >login
            </Button>
          </Box>
        </Stack>

        {/* error alert */}
        <Snackbar
          autoHideDuration={3000}
          open={!!alert}
          onClose={()=>showAlert(null)}
          >
          <Alert severity='error'>{alert}</Alert>
        </Snackbar>
      </Box>
    </Container>
  )
}

export default LoginForm