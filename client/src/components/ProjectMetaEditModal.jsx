import { Box, Button, Grid, MenuItem, Modal, Select, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'

import { MODAL_STYLE } from './ModalStyle'
import { useNavigate } from 'react-router-dom'

function ProjectMetaEditModal (props) {
  const { open, closeModal, project } = props

  const navigate = useNavigate()
  const [statusList, setStatusList] = useState([])
  const [edits, setEdits] = useState(project)
  useEffect(() => {
    fetch('/statuses').then(r=>{
      if (r.ok) r.json().then(setStatusList)
    })
  }, [])

  const editable = ['name', 'start_date', 'end_date', 'status']

  function handleChange (e, name = null, value = null) {
    const key = !!name ? name : e.target.name
    const newVal = !!value ? value : e.target.value
    setEdits({...edits,
      [key]: newVal
    })
  }

  function handleClose () {
    setEdits(project)
    closeModal()
  }

  function saveChanges () {
    const updates = Object.entries(edits).filter(([k,v]) => project[k] !== v)
    const postObj = Object.fromEntries(updates.map(([k,v]) => {
      switch (k) {
        case 'status':
          return ['status_id', v.id]
        default:
          return [k,v]
      }
    }))
    fetch('/projects/'+project.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postObj)
    }).then(r=>{
      if (r.ok) r.json().then(() => {
        closeModal()
        navigate(0)
      })
    })
  }

  function determineInputType(k,v) {
    switch (k) {
      case 'name':
        return (
          <TextField
            name={k}
            value={v}
            onChange={(e) => handleChange(e)}
          />
        )
      case 'status':
        return (
          <Select
            name={k}
            value={parseInt(v.id)}
            onChange={(e) => handleChange(e, null, statusList.find(s=>s.id === parseInt(e.target.value)))}
            >
              {
                !!statusList[0]
                ? statusList.map(status => <MenuItem key={'status-'+status.id} value={status.id}>{status.title}</MenuItem>)
                : null
              }
          </Select>
        )
      case 'start_date':
      case 'end_date':
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                name={k}
                value={dayjs(v)}
                onChange={(date) => handleChange(null, k, date)}
              />
            </DemoContainer>
          </LocalizationProvider>
        )
      default:
        return 'edit'
    }
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
      >
        <Box
          sx={MODAL_STYLE}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h6'>edit project info</Typography>
              </Grid>
              <Grid item xs={12}>
                <Table>
                  <TableBody>
                    {Object.entries(edits)
                      .filter(([k,v]) => editable.includes(k))
                      .map(([k,v]) => {
                        return (
                          <TableRow key={k}>
                            <TableCell>{k}</TableCell>
                            <TableCell>
                              {determineInputType(k,v)}
                            </TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12} sx={{textAlign: 'center'}}>
                <Button
                  variant='outlined'
                  color='success'
                  sx={{marginRight: '0.25rem'}}
                  onClick={saveChanges}
                  >save
                </Button>
                <Button
                  sx={{marginLeft: '0.25rem'}}
                  onClick={handleClose}
                  >cancel
                </Button>
              </Grid>
            </Grid>
        </Box>
    </Modal>
  )
}

export default ProjectMetaEditModal