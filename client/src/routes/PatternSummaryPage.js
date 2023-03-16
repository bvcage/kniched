import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CreateProjectBtn from '../components/CreateProjectBtn'
import PatternDiagram from '../components/PatternDiagram'

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

  if (!pattern || !pattern.id) return <></>
  console.log(pattern)
  return (
    <div>
      <Typography variant='h3'>pattern summary: {pattern.name}</Typography>
      <CreateProjectBtn pattern={pattern} />
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
            v = !!v ? v : ''
            if (typeof v !== 'object') {
              return (
                <TableRow key={k}>
                  <TableCell>{k}</TableCell>
                  <TableCell>{v ? v : ''}</TableCell>
                </TableRow>
              )
            } else {
              return Object.entries(v).map(([k2,v2]) => {
                return (
                  <TableRow key={k2}>
                    <TableCell>{k2}</TableCell>
                    <TableCell>{v2.toString()}</TableCell>
                  </TableRow>
                )
              })
            }
          })}
        </TableBody>
      </Table>
      {/* <PatternDiagram id={id} /> */}
    </div>
  )
}

export default PatternSummaryPage