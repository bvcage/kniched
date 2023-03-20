import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

function TimerEditModal (props) {
  const { open, closeModal, timer, formatTimerISO, saveTimer } = props
  const [edits, setEdits] = useState(timer)

  useEffect(() => {
    let duration = new Date(timer.duration * 1000)
    setEdits({
      ...edits,
      hours: duration.getUTCHours(),
      minutes: duration.getUTCMinutes(),
      seconds: duration.getUTCSeconds()
    })
  }, [timer])

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

  function evalTimeEntry () {
    Object.entries(edits).forEach(([k,v]) => {
      switch(k) {
        case 'hours':
          if (v > 23) {
            setEdits({...edits,
              hours: 23
            })
          }
          break
        case 'minutes':
          if (v >= 1440) {
            setEdits({...edits,
              hours: 23,
              minutes: 59,
              seconds: 59
            })
          }
          else if (v > 59) {
            const minutes = v % 60
            const hours = (v - minutes) / 60
            setEdits({...edits,
              hours: hours,
              minutes: minutes
            })
          }
          break
        case 'seconds':
          if (v >= 86400) {
            setEdits({...edits,
              hours: 23,
              minutes: 59,
              seconds: 59
            })
          }
          else if (v > 59) {
            const seconds = v % 60
            let minutes = (v - seconds) / 60
            let hours = 0
            if (minutes > 59) {
              hours = Math.floor(minutes / 60)
              minutes = minutes % 60
            }
            setEdits({...edits,
              hours: hours,
              minutes: minutes,
              seconds: seconds
            })
          }
          break
        default:
          break
      }
    })
  }

  function handleChange (e) {
    if (e.target.value.match(/^[0-9]*$/)) {
      setEdits({...edits,
        [e.target.name]: e.target.value ? e.target.value : 0
      })
    }
  }

  function saveEdits (e) {
    e.preventDefault()
    const editObj = {...timer,
      duration: formatTimerISO((edits.hours * 60 * 60) + (edits.minutes * 60) + edits.seconds)
    }
    saveTimer(editObj, timer.id).then(r=>{
      closeModal()
    })
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
      >
        <Box
          component='form'
          sx={modalStyle}
          onSubmit={saveEdits}
          >
            <Grid
              container
              spacing={3}
              >
                <Grid item xs={12}>
                  <Typography variant='h5'>edit timer</Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name='hours'
                    label='hours'
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    value={edits.hours}
                    onBlur={evalTimeEntry}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name='minutes'
                    label='minutes'
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    value={edits.minutes}
                    onBlur={evalTimeEntry}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name='seconds'
                    label='seconds'
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    value={edits.seconds}
                    onBlur={evalTimeEntry}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                  <Button
                    type='submit'
                    variant='outlined'
                    color='success'
                    >
                      save
                  </Button>
                  <Button
                    variant='outlined'
                    sx={{marginLeft: '0.5rem'}}
                    onClick={closeModal}
                    >
                      cancel
                  </Button>
                </Grid>
            </Grid>
        </Box>
    </Modal>
  )
}

export default TimerEditModal