import { Grid, Link, Typography } from '@mui/material'
import React from 'react'

function UserProjectContainer (props) {
  const {projects, view} = props
  const user = JSON.parse(localStorage.getItem('user'))

  const width = view === 'grid' ? 3 : 12
  const items = projects[0]
    ? projects.map(proj => (
      <Grid item xs={width} key={proj.id}>
        <Link href={`${user.username}/projects/${proj.id}`}>
          <Typography variant='body1'>{proj.name}</Typography>
        </Link>
      </Grid>
    ))
    : null

  return (
    <div>
      <Grid container>
        {items}
      </Grid>
    </div>
  )
}

export default UserProjectContainer