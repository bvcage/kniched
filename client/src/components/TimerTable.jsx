import { Box, IconButton, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import React, { useEffect, useState } from 'react'
import { formatTimer } from './Timer'

function TimerTable (props) {
  const { timers, deleteTimer, editTimer } = props
  const [anchorEl, setAnchorEl] = useState(null)

  function removeTimer (timerId) {
    deleteTimer(timerId).then(handleClosePopover)
  }

  function handleClosePopover () {
    setAnchorEl(null)
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

  if (!timers[0]) return <></>
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
            <TableCell sx={{borderBottom: 'none'}} />
            <TableCell
              align='right'
              sx={{
                borderLeft: '1px solid rgba(224, 224, 224, 1)',
                borderRight: '1px solid rgba(224, 224, 224, 1)'
              }}
              >{formatTimer(timers.reduce((acc, obj) => acc + obj.duration, 0))}
            </TableCell>
          </TableRow>
          {/* delete timer confirmation */}
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