import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const STATUS = ['', 'to-do', 'in progress', 'complete']

function UserProjectsPage () {
  const user = JSON.parse(localStorage.getItem('user'))
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!!user) {
      fetch('/users/' + user.id + '/projects').then(r=>{
        if (r.ok) r.json().then(projects => setProjects(projects))
        else r.json().then(console.log)
      })
    }
  }, [])

  const ProjectCards = !!projects ? projects.map(project => {
    return (
      <Grid item
        key={project.id}
        xs={12} sm={6} md={4} xl={3}
        >
          <Card
            onClick={()=>navigate(`${project.id}`)}
            >
              <CardContent>
                <Typography variant='h6'>{project.name}</Typography>
                <Typography variant='subtitle1'>{STATUS[project.status]}</Typography>
              </CardContent>
          </Card>
      </Grid>
    )}): null

  return (
    <div>
      <Typography variant='h3'>projects</Typography>
      <Grid container spacing={3}>
        {ProjectCards}
      </Grid>
    </div>
  )
}

export default UserProjectsPage