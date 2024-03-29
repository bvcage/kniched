import { Button, Modal, Grid, Typography, Stack, Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AUTH, DB } from '../firebaseConfig'
import { addDoc, collection, getDocs } from 'firebase/firestore'

const emptyPattern = {
  name: '',
  url: '',
  skill: '',
  craft: '',
}

function CreatePatternBtn (props) {
  const user = AUTH.currentUser
  const [pattern, setPattern] = useState(emptyPattern)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()

  // craft options
  const [crafts, setCrafts] = useState([])
  useEffect(() => {
    getDocs(collection(DB, 'crafts')).then(snap => {
      const docs = snap.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setCrafts(docs)
    })
  }, [])

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
    setPattern({...pattern,
      [e.target.name]: e.target.value
    })
  }

  function createPattern (e) {
    e.preventDefault()
    const newPattern = {
      ...pattern,
      'owner_uid': user.uid,
      'craft_uid': pattern.craft,
    }
    delete newPattern.craft
    addDoc(collection(DB, 'patterns'), newPattern)
      .then(docref => {
        handleClose()
        navigate('/patterns/' + docref.id)
      })
    // fetch('/patterns', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(newPattern)
    // }).then(r=>{
    //   if (r.ok) r.json().then(created => {
    //     handleClose()
    //     navigate('/patterns/'+created.id)
    //   })
    // })
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>
        + new pattern
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        >
          <Box
            component='form'
            sx={modalStyle}
            onSubmit={createPattern}
            >
              <Stack spacing={2}>
                <Typography variant='h5' textAlign={'center'}>new pattern</Typography>
                <TextField
                  name='name'
                  label='pattern name'
                  value={pattern.name}
                  onChange={handleChange}
                />
                <FormControl>
                  <InputLabel id='new-pattern-craft'>craft</InputLabel>
                  <Select
                    name='craft'
                    label='craft'
                    labelId='new-pattern-craft'
                    value={pattern.craft}
                    onChange={handleChange}
                    >
                      { crafts[0]
                        ? crafts.map(craft => {
                          return (
                            <MenuItem key={craft.id} value={craft.id}>{craft.name}</MenuItem>
                          )
                        })
                        : null
                      }
                  </Select>
                </FormControl>
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

export default CreatePatternBtn