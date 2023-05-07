import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { AUTH, DB } from '../firebaseConfig.js'

import { Card, CardContent, Grid, Typography } from '@mui/material'
// import PatternFilter from '../components/PatternFilter'
import CreatePatternBtn from '../components/CreatePatternBtn'

function UserPatternsPage () {
  const user = AUTH.currentUser
  const uInfo = JSON.parse(localStorage.getItem('uInfo'))
  const [patterns, setPatterns] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    if (!!user && !!user.uid) {
      const q = query(collection(DB, 'patterns'), where("owner_uid", "==", user.uid))
      getDocs(q).then(snapshot => {
        const docs = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setPatterns(docs)
      })
    }
  }, [user])

  return (
    <div>
      <Typography variant='h2'>my patterns</Typography>
      <CreatePatternBtn />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <PatternFilter filters={} appliedFilters={} setAppliedFilters={} /> */}
        </Grid>
        {!!patterns && !!patterns[0]
          ? patterns.map(pattern => {
            console.log(pattern)
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
            )})
          : null
        }
      </Grid>
    </div>
  )
}

export default UserPatternsPage