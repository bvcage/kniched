import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Timer from '../components/Timer'
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
      <Typography variant='h3'>{project.name}</Typography>
      <Button
        onClick={()=>navigate('..')}
        >all projects
      </Button>
      <Container>
        <Timer />
      </Container>
      <TimerTable projectId={project.id} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>attribute</TableCell>
            <TableCell>value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(project).map(([k,v]) => {
            return (
              <TableRow key={k}>
                <TableCell>{k}</TableCell>
                <TableCell>{v}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

export default ProjectSummaryPage