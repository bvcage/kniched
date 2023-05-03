import { Alert, Box, Button, Container, Grid, Snackbar, TextField } from '@mui/material'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AUTH } from '../../firebaseConfig'


// default values for state objects
const blankUser = {
  email: '',
  pass1: '',
  pass2: '',
  first: '',
  last: ''
}
const noErrors = {}
Object.keys(blankUser).forEach(item => {
  noErrors[item] = false
})

// regex expressions for form validation
const noSpecialChars = /^[A-Za-z]+[A-Za-z '-]*$/
const emailFormat = /^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/m


// form component to sign up user via AWS
function SignUpForm (props) {
  const [ alert, setAlert ] = useState('')
  const [ errors, setErrors ] = useState(noErrors)
  const [ user, setUser ] = useState(blankUser)

  const navigate = useNavigate()

  function handleChangeUser (e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit (e) {
    e.preventDefault()
    // validate form
    Object.entries(user).forEach(([k,v]) => {
      validateField(undefined, k, v)
    })
    if (Object.values(errors).some(item => !!item)) {
      return setAlert('could not complete sign up - please review errors')
    }
    // sign up user
    createUserWithEmailAndPassword(AUTH, user.email, user.pass1)
      .then(uCred => {
        localStorage.setItem('user', JSON.stringify(uCred.user))
        navigate('/')
      })
      .catch(err => {
        console.log(err.code)
        switch (err.code) {
          case 'auth/email-already-in-use':
            setAlert('account already exists for this email')
            break
          default:
            setAlert('error: ' + err.code)
            console.log(err)
        }
      })
    // AWS
    // Auth.signUp({
    //   username: user.email,
    //   password: user.pass1,
    //   attributes: {
    //     email: user.email
    //   }
    // }).then(res=>{
    //   localStorage.setItem('user', JSON.stringify(res.user.username))
    //   navigate('/')
    // }).catch(err=>{
    //   setAlert(err.message)
    // })
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
      return setErrorMessage(field, 'cannot be empty')
    } else {
      setErrorMessage(field, false)
    }

    switch (field) {
      case 'first':
      case 'last':
        if (!noSpecialChars.test(val)) {
          return setErrorMessage(field, 'cannot have special characters')
        } else {
          return setErrorMessage(field, false)
        }
      case 'email':
        if (!!val && !emailFormat.test(val)) {
          return setErrorMessage(field, 'must be in valid format (eg, user@email.com)')
        } else {
          return setErrorMessage(field, false)
        }
      case 'pass1':
        let passwordErrs = []
        if (!/[A-Z]+/.test(val)) {
          passwordErrs.push('must have an uppercase letter')
          // setErrorMessage(field, 'must have an uppercase letter')
        }
        if (!/[a-z]+/.test(val)) {
          passwordErrs.push('must have a lowercase letter')
          // setErrorMessage(field, 'must have a lowercase letter')
        }
        if (!/[0-9]+/.test(val)) {
          passwordErrs.push('must have a number')
          // setErrorMessage(field, 'must have a number')
        }
        if (!/[~!@#$%^&*()=_+{}|;':",.<>/?`[\]]+/.test(val)) {
          passwordErrs.push('must have a special character')
          // setErrorMessage(field, 'must have a special character')
        }
        if (passwordErrs.length > 0) {
          return setErrorMessage(field, <React.Fragment>{passwordErrs.map(err=><>{err}<br/></>)}</React.Fragment>)
        } else {
          return setErrorMessage(field, false)
        }
      case 'pass2':
        if (user.pass1 !== user.pass2) {
          return setErrorMessage(field, 'passwords do not match')
        } else {
          return setErrorMessage(field, false)
        }
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
              value={user.first}
              error={!!errors.first}
              helperText={typeof errors.first === 'string' ? errors.first : null}
              fullWidth
              onBlur={validateField}
              onChange={handleChangeUser}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name='last'
              label='last'
              value={user.last}
              error={!!errors.last}
              helperText={typeof errors.last === 'string' ? errors.last : null}
              fullWidth
              onBlur={validateField}
              onChange={handleChangeUser}
            />
          </Grid>

          {/* contact */}
          <Grid item xs={12}>
            <TextField
              name='email'
              label='email'
              value={user.email}
              error={!!errors.email}
              helperText={typeof errors.email === 'string' ? errors.email : null}
              fullWidth
              onBlur={validateField}
              onChange={handleChangeUser}
            />
          </Grid>

          {/* password */}
          <Grid item xs={12} sm={6}>
            <TextField
              name='pass1'
              label='password'
              type='password'
              value={user.pass1}
              error={!!errors.pass1}
              helperText={!!errors.pass1 ? errors.pass1 : null}
              fullWidth
              onBlur={validateField}
              onChange={handleChangeUser}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name='pass2'
              label='confirm password'
              type='password'
              value={user.pass2}
              error={!!errors.pass2}
              helperText={typeof errors.pass2 === 'string' ? errors.pass2 : null}
              fullWidth
              onBlur={validateField}
              onChange={handleChangeUser}
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
          open={!!alert}
          onClose={()=>setAlert(null)}
          >
            <Alert severity='error'>{alert}</Alert>
        </Snackbar>
      </Box>
    </Container>
  )
}

export default SignUpForm