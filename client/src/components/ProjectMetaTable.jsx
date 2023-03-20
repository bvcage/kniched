import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

function ProjectMetaTable (props) {
  const { project } = props
  const [statusList, setStatusList] = useState([])

  useEffect(() => {
    fetch('/statuses').then(r=>{
      if (r.ok) r.json().then(setStatusList)
    })
  }, [])

  if (!project) return <></>

  const displayOptions = ['start date', 'end date', 'status', 'pattern']
  console.log(project)
  const display = Object.entries(project)
    .map(([k,v]) => {
      switch (k) {
        case 'start_date':
          return ['start date', v]
        case 'end_date':
          return ['end date', v]
        case 'status':
          v = !!statusList[0] && !!v ? statusList[v-1].title : 'n/a'
          return [k,v]
        default:
          return [k,v]
      }
    })
    .filter(([k,v]) => displayOptions.includes(k))

  return (
    <Table>
      {/* <TableHead>
        <TableRow>
          <TableCell />
          <TableCell />
        </TableRow>
      </TableHead> */}
      <TableBody>
        {display.map(([k,v]) => {
          return (
            <TableRow key={k}>
              <TableCell>{k}</TableCell>
              <TableCell>{v}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ProjectMetaTable