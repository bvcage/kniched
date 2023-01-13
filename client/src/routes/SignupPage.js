import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'

// blank state objects
const blankInfo = {
  first: '',
  last: '',
  email: '',
  pass1: '',
  pass2: ''
}
const noErrors = {}
Object.keys(blankInfo).forEach(item => {
  noErrors[item] = false
})

// regex expressions for form validation
const noSpecialChars = /^[A-Za-z]+[A-Za-z '-]*$/
const emailFormat = /^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm

function SignupPage () {
  const [info, setInfo] = useState(blankInfo)
  const [errors, setErrors] = useState(noErrors)
  const [alert, showAlert] = useState(false)
  const navigate = useNavigate()

  function handleChangeInfo (e) {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit (e) {
    e.preventDefault()
    // validate form
    Object.entries(info).forEach(([k,v]) => validateField(undefined, k, v))
    if (Object.values(errors).some(item => !!item)) {
      return showAlert(true)
    }
    // handle user signup
    const signup = {...info, password: info.pass1}
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signup)
    }).then(r=>{
      if (r.ok) r.json().then(user=>{
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/')
      })
      else r.json().then(console.log)
    })

  }

  function setErrorMessage (field, message) {
    return setErrors({
      ...errors,
      [field]: message
    })
  }

  function validateField (e, field, val) {
    if (!!e) {
      field = e.target.name
      val = e.target.value
    }

    if (!val) {
      return setErrorMessage(field, true)
    } else {
      setErrorMessage(field, false)
    }

    switch (field) {
      case 'first':
      case 'last':
        if (!noSpecialChars.test(val)) {
          setErrorMessage(field, 'cannot have special characters')
        } else {
          setErrorMessage(field, false)
        }
        break
      case 'email':
        if (!!val && !emailFormat.test(val)) {
          setErrorMessage(field, 'must be in valid format (eg, user@email.com)')
        } else {
          setErrorMessage(field, false)
        }
        break
      case 'pass1':
        // if (!/[A-Z]+/.test(val)) {
        //   setErrorMessage(field, 'must have an uppercase letter')
        // }
        // else if (!/[a-z]+/.test(val)) {
        //   setErrorMessage(field, 'must have a lowercase letter')
        // }
        // else if (!/[0-9]+/.test(val)) {
        //   setErrorMessage(field, 'must have a number')
        // }
        // else if (!/[~!@#$%^&*()=_+{}|;':",.<>/?`[\]]+/.test(val)) {
        //   setErrorMessage(field, 'must have a special character')
        // }
        break
      case 'pass2':
        if (!!info.pass1 && info.pass1 !== info.pass2) {
          setErrorMessage(field, 'passwords do not match')
        } else {
          setErrorMessage(field, false)
        }
        break
      default:
        break
    }
  }

  return (
    <Container maxWidth='sm' sx={{padding: '1rem'}}>
      <Box component='form' onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          {/* name */}
          <Grid item xs={12} sm={6}>
            <TextField
              name='first'
              label='first'
              value={info.first}
              error={!!errors.first}
              helperText={typeof errors.first === 'string' ? errors.first : null}
              fullWidth
              onBlur={validateField}
              onChange={handleChangeInfo}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name='last'
              label='last'
              value={info.last}
              error={!!errors.last}
              helperText={typeof errors.last === 'string' ? errors.last : null}
              fullWidth
              onBlur={validateField}
              onChange={handleChangeInfo}
            />
          </Grid>

          {/* contact */}
          <Grid item xs={12}>
            <TextField
              name='email'
              label='email'
              value={info.email}
              error={!!errors.email}
              helperText={typeof errors.email === 'string' ? errors.email : null}
              fullWidth
              onBlur={validateField}
              onChange={handleChangeInfo}
            />
          </Grid>

          {/* password */}
          <Grid item xs={12} sm={6}>
            <TextField
              name='pass1'
              label='password'
              type='password'
              value={info.pass1}
              error={!!errors.pass1}
              helperText={typeof errors.pass1 === 'string' ? errors.pass1 : null}
              fullWidth
              onBlur={validateField}
              onChange={handleChangeInfo}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name='pass2'
              label='confirm password'
              type='password'
              value={info.pass2}
              error={!!errors.pass2}
              helperText={typeof errors.pass2 === 'string' ? errors.pass2 : null}
              fullWidth
              onBlur={validateField}
              onChange={handleChangeInfo}
            />
          </Grid>

          {/* actions */}
          <Grid item xs={12}>
            <Box sx={{textAlign: 'center'}}>
              <Button
                type='submit'
                variant='outlined'
                sx={{minWidth: '40%'}}
                >sign up
              </Button>
            </Box>
          </Grid>

        </Grid>

        {/* error alert */}
        <Snackbar
          autoHideDuration={3000}
          open={alert}
          onClose={()=>showAlert(false)}
          >
            <Alert severity='error'>could not complete sign up - please review errors</Alert>
        </Snackbar>
      </Box>
    </Container>
  )
}

export default SignupPage