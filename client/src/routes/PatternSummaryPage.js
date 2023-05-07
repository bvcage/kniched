import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AUTH, DB } from '../firebaseConfig'

import CreateProjectBtn from '../components/CreateProjectBtn'
// import PatternDiagram from '../components/PatternDiagram'
import PatternMetaTable from '../components/PatternMetaTable'
import { doc, getDoc } from 'firebase/firestore'

function PatternSummaryPage (props) {
  const location = useLocation()
  const id = location.pathname.split('/').pop()
  const user = AUTH.currentUser
  const uInfo = JSON.parse(localStorage.getItem('uInfo'))
  const navigate = useNavigate()
  const [pattern, setPattern] = useState()

  useEffect(() => {
    if (!!id) {
      getDoc(doc(DB, 'patterns', id))
        .then(docref => {
          const doc = {id: docref.id, ...docref.data()}
          setPattern(doc)
        })
        .catch(err => console.log(err))
    }
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