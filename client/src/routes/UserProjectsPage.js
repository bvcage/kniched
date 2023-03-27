import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'

import CreateProjectBtn from '../components/CreateProjectBtn'
import FilterStack from '../components/FilterStack'
import SortMenu from '../components/SortMenu'

function UserProjectsPage () {
  const user = JSON.parse(localStorage.getItem('user'))
  const [projects, setProjects] = useState([])
  const [statusList, setStatusList] = useState([])
  const [filters, setFilters] = useState({})
  const [appliedFilters, setAppliedFilters] = useState({})
  const [sortOptions, setSortOptions] = useState([])
  const [selSort, setSelSort] = useState('')
  const [selSortDir, setSelSortDir] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!!user) {
      fetch('/users/' + user.id + '/projects').then(r=>{
        if (r.ok) r.json().then(projects => setProjects(projects))
        else r.json().then(console.log)
      })
    }
    fetch('/statuses').then(r=>{
      if (r.ok) r.json().then(setStatusList)
    })
    fetch('/projects/filters').then(r=>{
      if (r.ok) r.json().then(setFilters)
    })
    fetch('/projects/sorting').then(r=>{
      if (r.ok) r.json().then(setSortOptions)
    })
  }, [])

  function sortProjects (a,b) {
    if (!selSort || !selSortDir) return 0
    const after = selSortDir === 'asc' ? 1 : -1
    const before = selSortDir === 'asc' ? -1 : 1
    let aVal, bVal
    switch (selSort) {
      case 'name':
        aVal = a[selSort].toUpperCase()
        bVal = b[selSort].toUpperCase()
        break
      case 'status':
        aVal = a[selSort].code
        bVal = b[selSort].code
        break
      default:
        aVal = a[selSort]
        bVal = b[selSort]
    }
    if (aVal < bVal) return before
    if (aVal > bVal) return after
  }

  const ProjectCards = !!projects
    ? projects
        .filter(project => {
          const results = Object.entries(appliedFilters).map(([k,v]) => {
            console.log([k,v])
            console.log(project[k])
            if (!v[0]) return true
            let value = null
            switch (k) {
              case 'status':
                value = project[k].title
                break
              default:
                value = project[k]
            }
            return v.indexOf(value) > -1
          })
          return results.every(Boolean)
        })
        .sort(sortProjects)
        .map((project, idx) => {
          const status = !!project.status ? project.status : statusList.find(s => s.code === 999)
          if (!status) {
            return (
              <Grid item
                key={idx}
                xs={12} sm={6} md={4} xl={3}
                >
                  <Card>
                    <CardContent>
                      <Skeleton variant='text' sx={{fontSize: '2rem'}} />
                      <Skeleton variant='text' sx={{fontSize: '1rem'}} />
                    </CardContent>
                  </Card>
              </Grid>
            )
          }
          return (
            <Grid item
              key={project.id}
              xs={12} sm={6} md={4} xl={3}
              >
                <Card
                  onClick={()=>navigate(`${project.id}`)}
                  >
                    <CardContent>
                      <Typography variant='h6'>{project.name}</Typography>
                      <Typography variant='subtitle1'>{status.title}</Typography>
                    </CardContent>
                </Card>
            </Grid>
          )
        })
    : null

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h3'>projects</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <CreateProjectBtn />
            </Grid>
            <Grid item xs={7}>
              <FilterStack filters={filters} appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} justify='right' />
            </Grid>
            <Grid item xs={1}>
              <SortMenu options={sortOptions} selSort={selSort} selSortDir={selSortDir} setSelSort={setSelSort} setSelSortDir={setSelSortDir} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {ProjectCards}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default UserProjectsPage