import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function PatternSummaryPage () {
  const location = useLocation()
  const id = location.pathname.split('/').pop()
  const navigate = useNavigate()
  const [pattern, setPattern] = useState()

  useEffect(() => {
    fetch('/patterns/'+id).then(r=>{
      if (r.ok) r.json().then(setPattern)
      else r.json().then(console.log)
    })
  }, [id])

  if (!pattern) return <></>
  return (
    <div>
      <Typography variant='h3'>pattern summary: {pattern.name}</Typography>
      <Button
        onClick={()=>navigate(-1)}
        >back
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>attribute</TableCell>
            <TableCell>value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(pattern).map(([k,v]) => {
            return (
              <TableRow>
                <TableCell>{k}</TableCell>
                <TableCell>{v}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default PatternSummaryPage