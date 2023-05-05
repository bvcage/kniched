import { Box, Button, Grid, Input, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, Timestamp } from 'firebase/firestore'

import { AUTH, DB } from '../firebaseConfig.js'


const emptyProject = {
  name: '',
  start: '',
  end: '',
}

function CreateProjectBtn (props) {
  const { pattern } = props
  const uInfo = JSON.parse(localStorage.getItem('uInfo'))
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
      name: project.name,
      'pattern_id': !!pattern ? pattern.id : null,
      start_TS: !!project.start ? Timestamp.fromDate(new Date(project.start)) : null,
      end_TS: !!project.end ? Timestamp.fromDate(new Date(project.end)) : null
    }
    addDoc(collection(DB, 'users', AUTH.currentUser.uid, 'projects'), newProject)
      .then(docref => {
        if (docref.id) {
          navigate(`/${uInfo.username}/projects/${docref.id}`)
        }
      })
      .catch(err => {
        console.log(err)
      })
    // fetch('/users/'+user.id+'/projects', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(newProject)
    // }).then(r=>{
    //   if (r.ok) r.json().then(created => {
    //     navigate('/'+user.username+'/projects/'+created.id)
    //   })
    //   else r.json().then(console.log)
    // })
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
                {
                  !!pattern
                  ? <TextField
                      label='pattern'
                      value={pattern.name}
                      disabled
                    />
                  : null
                }
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