import React from 'react'
import { Container, Typography } from '@mui/material'

function UserProfilePage () {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <Container sx={{textAlign: 'center'}}>
      <Typography variant='h3'>{user.first} {user.last}</Typography>
      <Typography variant='h5'>@{user.username}</Typography>
      <Typography variant='body'>joined on {new Date(user.join_date).toLocaleDateString()}</Typography>
    </Container>
  )
}

export default UserProfilePage