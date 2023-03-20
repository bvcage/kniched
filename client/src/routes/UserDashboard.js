import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserProjectContainer from '../components/dashboard/UserProjectContainer'

function UserDashboard () {
  const [inProgressProjects, setInProgressProjects] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))
  
  useEffect(() => {
    fetch(`users/${user.id}/projects?status=2`).then(r=>{
      if (r.ok) r.json().then(setInProgressProjects)
    })
  }, [user])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant='h4'>in progress</Typography>
        <UserProjectContainer projects={inProgressProjects} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h4'>statistics</Typography>
      </Grid>
    </Grid>
  )
}

export default UserDashboard