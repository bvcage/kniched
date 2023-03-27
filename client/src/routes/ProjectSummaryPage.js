import { Button, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProjectMetaTable from '../components/ProjectMetaTable'
import TimerContainer from '../components/TimerContainer'
import EditIcon from '@mui/icons-material/Edit'
import ProjectMetaEditModal from '../components/ProjectMetaEditModal'

function ProjectSummaryPage () {
  const [project, setProject] = useState({})
  const location = useLocation()
  const navigate = useNavigate()
  const id = location.pathname.split('/').pop()
  const [editTable, setEditTable] = useState(false)
  const closeEditTableModal = () => setEditTable(false)
  const toggleEdit = () => setEditTable(!editTable)

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
          <Typography variant='h6'>information 
            <IconButton
              size='small'
              sx={{
                color: 'transparent',
                marginLeft: '0.5rem',
                '&:hover': { color: '#959595' }
              }}
              onClick={toggleEdit}
              >
                <EditIcon />
            </IconButton>
          </Typography>
          <ProjectMetaTable project={project} editable={editTable} />
          <ProjectMetaEditModal
            open={editTable}
            closeModal={closeEditTableModal}
            project={project}
          />
        </Grid>
        <Grid item xs={6}>
          <TimerContainer project={project} />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ProjectSummaryPage