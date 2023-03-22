import { Box, Button, Grid, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { useLocation } from 'react-router-dom'

import { MODAL_STYLE } from './ModalStyle'

const emptyTimer = {
  hours: '',
  minutes: ''
}

function TimerCreateModal (props) {
  const { open, closeModal, formatTimerISO, saveTimer } = props
  const [timer, setTimer] = useState(emptyTimer)
  const [date, setDate] = useState(dayjs(Date.now()))
  const location = useLocation()

  function handleChange (e) {
    setTimer({...timer,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit (e) {
    e.preventDefault()
    if (!timer.hours && !timer.minutes) return console.log('no time entered')
    const postObj = {
      'began': date.toString(),
      'duration': formatTimerISO((timer.hours * 60 * 60) + (timer.minutes * 60)),
      'project_id': parseInt(location.pathname.split('/').pop())
    }
    saveTimer(postObj).then(r=>{
      setTimer(emptyTimer)
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
          sx={MODAL_STYLE}
          onSubmit={handleSubmit}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      name='date'
                      label='date'
                      value={date}
                      onChange={val => setDate(val)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name='hours'
                  label='hours'
                  value={timer.hours}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name='minutes'
                  label='minutes'
                  value={timer.minutes}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sx={{textAlign: 'center'}}>
                <Button
                  type='submit'
                  color='success'
                  sx={{marginRight: '0.25rem'}}
                  >
                    save
                </Button>
                <Button
                  sx={{marginLeft: '0.25rem'}}
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

export default TimerCreateModal