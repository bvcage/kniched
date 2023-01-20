import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import PatternFilter from '../components/PatternFilter'

function UserPatternsPage () {
  const user = JSON.parse(localStorage.getItem('user'))
  const [patterns, setPatterns] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/users/' + user.id + '/patterns').then(r=>{
      if (r.ok) r.json().then(setPatterns)
      else r.json().then(console.log)
    })
  }, [user.id])

  if (!patterns) return <></>
  return (
    <div>
      <Typography variant='h2'>my patterns</Typography>
      <Button>+ new</Button>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <PatternFilter filters={} appliedFilters={} setAppliedFilters={} /> */}
        </Grid>
        {patterns.map(pattern => {
          return (
            <Grid item
              key={pattern.id}
              xs={12} sm={6} md={4} xl={3}
              >
                <Card
                  onClick={()=>navigate('/patterns/'+pattern.id)}
                  >
                    <CardContent>
                      <Typography variant='h5'>{pattern.name}</Typography>
                    </CardContent>
                </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default UserPatternsPage