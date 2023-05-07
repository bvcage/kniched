import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { AUTH, DB } from '../firebaseConfig.js'

import { Card, CardContent, Grid, Typography } from '@mui/material'
import CreatePatternBtn from '../components/CreatePatternBtn'
import FilterStack from '../components/FilterStack.jsx'
import SortMenu from '../components/SortMenu.jsx'

function UserPatternsPage () {
  const user = AUTH.currentUser
  const uInfo = JSON.parse(localStorage.getItem('uInfo'))
  const [patterns, setPatterns] = useState()
  const [filters, setFilters] = useState({})
  const [appliedFilters, setAppliedFilters] = useState({})
  const [sortOptions, setSortOptions] = useState(['name'])
  const [selSort, setSelSort] = useState('')
  const [selSortDir, setSelSortDir] = useState('asc')
  const navigate = useNavigate()

  useEffect(() => {
    if (!!user && !!user.uid) {
      const q = query(collection(DB, 'patterns'), where("owner_uid", "==", user.uid))
      getDocs(q).then(snapshot => {
        const docs = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        // setFilters(genFilters(docs))
        // setSortOptions(Object.keys(docs[0]))
        setPatterns(docs)
      })
    }
  }, [user])

  // function genFilters (docs) {
  //   const genObj = {}
  //   const keys = Object.keys(docs[0])
  //   keys.forEach(key => {
  //     if (!genObj[key]) genObj[key] = []
  //     docs.forEach(doc => {
  //       const val = doc[key]
  //       if (genObj[key].indexOf(val) < 0) genObj[key].push(val)
  //     })
  //   })
  //   return genObj
  // }

  function sortPatterns (a,b) {
    if (!selSort || !selSortDir) return 0
    const after = selSortDir === 'asc' ? 1 : -1
    const before = selSortDir === 'asc' ? -1 : 1
    let aVal, bVal
    switch (selSort) {
      case 'name':
        aVal = a[selSort].toUpperCase()
        bVal = b[selSort].toUpperCase()
        break
      default:
        aVal = a[selSort]
        bVal = b[selSort]
    }
    if (aVal < bVal) return before
    if (aVal > bVal) return after
    return 0
  }

  const display = !!patterns && !!patterns[0]
    ? patterns
        .sort(sortPatterns)
        .map(pattern => {
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
        })
    : null

  return (
    <div>
      <Typography variant='h2'>my patterns</Typography>
      <Grid container>
        <Grid item>
          <CreatePatternBtn />
        </Grid>
        <Grid item>
          <SortMenu
            options={sortOptions}
            selSort={selSort}
            selSortDir={selSortDir}
            setSelSort={setSelSort}
            setSelSortDir={setSelSortDir}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FilterStack
            filters={filters}
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
          />
        </Grid>
        {display}
      </Grid>
    </div>
  )
}

export default UserPatternsPage