import { Button, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CreateProjectBtn from '../components/CreateProjectBtn'
import PatternDiagram from '../components/PatternDiagram'
import PatternMetaTable from '../components/PatternMetaTable'

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
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h5'>Pattern Summary</Typography>
          <Typography variant='h3'>{pattern.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <CreateProjectBtn pattern={pattern} />
          <Button
            onClick={()=>navigate(-1)}
            >back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6'>information</Typography>
          <PatternMetaTable pattern={pattern} />
        </Grid>
        <Grid item xs={6}>
          [INSERT PATTERN STATISTICS]
        </Grid>
      </Grid>
      {/* <PatternDiagram id={id} /> */}
    </div>
  )
}

export default PatternSummaryPage