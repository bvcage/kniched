import React from 'react'
import { Link, Table, TableBody, TableCell, TableRow } from '@mui/material'

function ProjectMetaTable (props) {
  const { project } = props

  if (!project) return <></>

  // select display items & alter display titles if needed (e.g., remove underscores)
  const displayOptions = ['start date', 'end date', 'status', 'pattern']
  const display = Object.entries(project)
    .map(([k,v]) => {
      switch (k) {
        case 'start_date':
          return ['start date', v]
        case 'end_date':
          return ['end date', v]
        case 'status':
          v = !!v ? v.title : 'n/a'
          return [k,v]
        default:
          return [k,v]
      }
    })
    .filter(([k,v]) => displayOptions.includes(k))
  
  // format how values display in table
  function formatDisplayValue(k,v) {
    switch (k) {
      case 'pattern':
        return (
          <Link href={'/patterns/'+v.id}>{v.name}</Link>
        )
      default:
        return v
    }
  }

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
              <TableCell>
                {formatDisplayValue(k,v)}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ProjectMetaTable