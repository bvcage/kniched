import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

const blankLogin = {
  email: '',
  password: ''
}

function LoginPage () {
  const [login, setLogin] = useState(blankLogin)
  const navigate = useNavigate()

  function handleChange (e) {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit (e) {
    e.preventDefault()
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    }).then(r=>{
      if (r.ok) r.json().then(user => {
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/')
      })
      else r.json().then(console.log)
    })
  }

  return (
    <Container maxWidth='xs'>
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
      </Box>
    </Container>
  )
}

export default LoginPage