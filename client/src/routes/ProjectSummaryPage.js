import { Button, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProjectMetaTable from '../components/ProjectMetaTable'
import Timer from '../components/Timer'
import TimerContainer from '../components/TimerContainer'
import TimerTable from '../components/TimerTable'

function ProjectSummaryPage () {
  const [project, setProject] = useState({})
  const location = useLocation()
  const navigate = useNavigate()
  const id = location.pathname.split('/').pop()

  useEffect(() => {
    fetch('/projects/'+id).then(r=>{
      if (r.ok) r.json().then(setProject)
      else r.json().then(console.log)
    })
  }, [id])

  if (!project.id) return <></>
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h3'>{project.name}</Typography>
          <Button
            onClick={()=>navigate('..')}
            >{'< all projects'}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6'>information</Typography>
          <ProjectMetaTable project={project} />
        </Grid>
        <Grid item xs={6}>
          <TimerContainer project={project} />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ProjectSummaryPage