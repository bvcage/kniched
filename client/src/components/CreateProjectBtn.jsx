import { Box, Button, Grid, Input, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const emptyProject = {
  name: '',
  start: null,
  end: null,
}

function CreateProjectBtn (props) {
  const { pattern } = props
  const user = JSON.parse(localStorage.getItem('user'))
  const [project, setProject] = useState(emptyProject)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '1rem',
  }

  function handleChange (e) {
    setProject({...project,
      [e.target.name]: e.target.value
    })
  }

  function createProject (e) {
    e.preventDefault()
    handleClose()
    const newProject = {
      ...project,
      'pattern_id': pattern.id,
    }
    fetch('/users/'+user.id+'/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProject)
    }).then(r=>{
      if (r.ok) r.json().then(created => {
        navigate('/'+user.username+'/projects/'+created.id)
      })
      else r.json().then(console.log)
    })
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>
        + new project
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        >
          <Box 
            component='form'
            sx={modalStyle}
            onSubmit={createProject}
            >
              <Stack spacing={2}>
                <Typography variant='h5' textAlign={'center'}>new project</Typography>
                <TextField
                  name='name'
                  label='project name'
                  value={project.name}
                  onChange={handleChange}
                />
                <TextField
                  label='pattern'
                  value={pattern.name}
                  disabled
                />
                <Grid container>
                  <Grid item xs={12} sm={6} sx={{textAlign: 'center'}}>
                    <Typography variant='body1'>start by</Typography>
                    <Input
                      name='start'
                      type='date'
                      label='start'
                      value={project.start}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{textAlign: 'center'}}>
                    <Typography variant='body1'>complete by</Typography>
                    <Input
                      name='end'
                      type='date'
                      label='end'
                      value={project.end}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent={'center'}>
                  <Grid item>
                    <Button
                      variant='outlined'
                      color='success'
                      type='submit'
                      >create
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='outlined'
                      // color='secondary'
                      sx={{marginLeft: '0.5rem'}}
                      onClick={handleClose}
                      >cancel
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
          </Box>

      </Modal>
    </React.Fragment>
  )
}

export default CreateProjectBtn