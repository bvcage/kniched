import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material'
import PatternCard from '../components/PatternCard'
import FilterStack from '../components/FilterStack'

function ExplorePage () {
  const [order, setOrder] = useState([])
  const [offset, setOffset] = useState(0)
  const [patterns, setPatterns] = useState([])
  const [filters, setFilters] = useState({})
  const [appliedFilters, setAppliedFilters] = useState({})
  const numLoad = 4

  useEffect(() => {
    fetch('/patterns/explore').then(r=>{
      if (r.ok) r.json().then(order => {
        setOrder(order)
        loadPatterns(order.slice(offset, numLoad))
      })
      else r.json().then(console.log)
    })
    fetch('/patterns/filters').then(r=>{
      if (r.ok) r.json().then(setFilters)
      else r.json().then(console.log)
    })
  }, [])

  function loadPatterns (ids) {
    ids = ids.toString()
    fetch('/patterns/?' + new URLSearchParams({
      ids: ids
    })).then(r=>{
      if (r.ok) r.json().then(fetched => {
        setPatterns([...patterns, ...fetched])
        setOffset(offset + numLoad)
      })
      else r.json().then(console.log)
    })
  }

  if (!patterns[0]) return <></>
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FilterStack filters={filters} appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} />
      </Grid>
      {patterns
        .filter(pattern => {
          const results = Object.entries(appliedFilters).map(([k,v]) => {
            if (!v[0]) return true
            return v.indexOf(pattern[k]) > -1
          })
          return results.every(Boolean)
        })
        .map(pattern => {
          return (
            <Grid item
              key={pattern.id}
              xs={12} sm={6} md={4} xl={3}
              >
                <PatternCard pattern={pattern} />
            </Grid>
          )
        })
      }
      <Grid item xs={12} sx={{textAlign: 'center'}}>
        <Button
          disabled={offset > order.length}
          onClick={() => loadPatterns(order.slice(offset, offset + numLoad))}
          >
            {offset > order.length ? 'end of results' : 'load more'}
        </Button>
      </Grid>
    </Grid>
  )
}

export default ExplorePage