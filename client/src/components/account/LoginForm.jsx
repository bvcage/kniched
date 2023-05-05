import { Alert, Box, Button, Container, Snackbar, Stack, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AUTH, DB } from '../../firebaseConfig'

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
      .then(async uCred => {
        localStorage.setItem('user', JSON.stringify(uCred.user))
        const uInfo = await getDoc(doc(DB, 'users', uCred.user.uid))
        localStorage.setItem('uInfo', JSON.stringify(uInfo.data()))
        navigate('/')
      })
      .catch(err => {
        console.log(err)
        showAlert('error: ' + err.code)
      })
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