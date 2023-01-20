import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { formatTimer } from './Timer'

function TimerTable (props) {
  const {projectId} = props
  const [timers, setTimers] = useState([])

  useEffect(()=>{
    fetch(`/projects/${projectId}/timers`).then(r=>{
      if (r.ok) r.json().then(setTimers)
      else r.json().then(console.log)
    })
  }, [projectId])

  const tableRows = !!timers[0]
    ? timers.map(timer => {
        const began = new Date(timer.began)
        return (
          <TableRow key={timer.id}>
            <TableCell>{began.toDateString()}</TableCell>
            <TableCell align='right'>{formatTimer(timer.duration)}</TableCell>
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
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TimerTable