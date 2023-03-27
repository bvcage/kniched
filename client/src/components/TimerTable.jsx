import { Box, Button, Container, IconButton, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'
import { formatTimer } from './Timer'

function TimerTable (props) {
  const { timers, createTimer, deleteTimer, editTimer } = props
  const [anchorEl, setAnchorEl] = useState(null)

  function removeTimer (timerId) {
    handleClosePopover()
    deleteTimer(timerId)
  }

  function handleClosePopover () {
    setAnchorEl(null)
  }

  function openCreateModal () {
    createTimer()
    handleClosePopover()
  }

  function openEditModal (timerId) {
    editTimer(timerId)
    handleClosePopover()
  }

  const tableRows = !!timers[0]
    ? timers.map(timer => {
        const began = new Date(timer.began)
        return (
          <TableRow key={timer.id}>
            <TableCell>{began.toDateString()}</TableCell>
            <TableCell align='right'>{formatTimer(timer.duration)}</TableCell>
            <TableCell sx={{padding: 0, margin: 0}}>
              <IconButton aria-label='delete' size='small' name={timer.id} onClick={(e)=>setAnchorEl(e.currentTarget)}>
                <EditIcon fontSize='inherit' />
              </IconButton>
            </TableCell>
          </TableRow>
        )
      })
    : null

  if (!timers[0]) return (
    <Container sx={{textAlign: 'center'}}>
      <Button
        onClick={openCreateModal}
        >
          manual entry
      </Button>
    </Container>
  )
  return (
    <TableContainer>
      <Table size='small' sx={{maxWidth: 'fit-content', margin: 'auto'}}>
        <TableHead>
          <TableRow>
            <TableCell align='center'>date</TableCell>
            <TableCell align='right'>duration</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows}
          <TableRow>
            <TableCell sx={{borderBottom: 'none', textAlign: 'center'}}>
              <IconButton size='small' onClick={openCreateModal}>
                <AddIcon fontSize='inherit' />
              </IconButton>
            </TableCell>
            <TableCell
              align='right'
              sx={{
                borderLeft: '1px solid rgba(224, 224, 224, 1)',
                borderRight: '1px solid rgba(224, 224, 224, 1)'
              }}
              >{formatTimer(timers.reduce((acc, obj) => acc + obj.duration, 0))}
            </TableCell>
          </TableRow>
          {/* timer edit options */}
          <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={()=>setAnchorEl(null)}
            >
              <Box>
                <IconButton
                  size='small'
                  onClick={handleClosePopover}
                  >
                    <CloseIcon fontSize='inherit' />
                </IconButton>
                <IconButton
                  size='small'
                  onClick={(e)=>openEditModal(anchorEl.name)}
                  >
                    <EditIcon fontSize='inherit' />
                  </IconButton>
                <IconButton
                  size='small'
                  onClick={(e)=>removeTimer(anchorEl.name)}
                  >
                    <DeleteIcon fontSize='inherit' />
                </IconButton>
              </Box>
          </Popover>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TimerTable