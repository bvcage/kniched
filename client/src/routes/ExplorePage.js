import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material'
import PatternCard from '../components/PatternCard'

function ExplorePage () {
  const [order, setOrder] = useState([])
  const [offset, setOffset] = useState(0)
  const [patterns, setPatterns] = useState([])
  const numLoad = 4

  useEffect(() => {
    fetch('/patterns/explore').then(r=>{
      if (r.ok) r.json().then(order => {
        setOrder(order)
        loadPatterns(order.slice(offset, numLoad))
      })
      else r.json().then(console.log)
    })
  }, [])

  function loadPatterns (ids) {
    ids = ids.toString()
    fetch('/patterns/?' + new URLSearchParams({
      ids: ids
    })).then(r=>{
      if (r.ok) r.json().then(fetched => {
        console.log(fetched)
        setPatterns([...patterns, ...fetched])
        setOffset(offset + numLoad)
      })
      else r.json().then(console.log)
    })
  }

  if (!patterns[0]) return <></>
  return (
    <Grid container spacing={2}>
      {patterns.map(pattern => {
        return (
          <Grid item
            key={pattern.id}
            xs={12} sm={6} md={4} xl={3}
            >
              <PatternCard pattern={pattern} />
          </Grid>
        )
      })}
      <Grid item xs={12}>
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