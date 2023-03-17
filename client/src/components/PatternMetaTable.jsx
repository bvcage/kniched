import React from 'react'
import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

function PatternMetaTable (props) {
  const { pattern } = props
  if (!pattern) return <></>

  const display = Object.entries(pattern)
  .map(([key,value]) => {
    switch (key) {
      case 'owner_info':
        return ['creator', value.full_name, '/'+value.username]
        case 'skill_level':
          return ['skill level', value]
          case 'url':
            return ['source', value, 'https://'+value]
            case 'craft':
              case 'name':
                return [key, value]
                default:
                  return null
                }
              })
              .filter(entry => entry)

  const displayOrder = [
    'name',
    'craft',
    'skill level',
    'creator',
    'source',
  ]
  display.sort((a,b) => {
    // put unlisted items at bottom
    if (!displayOrder.includes(a[0]) && displayOrder.includes(b[0])) return 1
    else if (displayOrder.includes(a[0]) && !displayOrder.includes(b[0])) return -1
    // eval against display order array
    const aIdx = displayOrder.findIndex(el => el === a[0])
    const bIdx = displayOrder.findIndex(el => el === b[0])
    if (aIdx < bIdx) return -1
    else if (aIdx > bIdx) return 1
    // default to sort alphabetically
    if (a[0] < b[0]) return -1
    else if (a[0] > b[0]) return 1
    return 0
  })
  // displayOrder.findIndex(el => a[0]) < displayOrder.findIndex(el => b[0])
  return (
    <TableContainer>
      <Table>
        {/* <TableHead>
          <TableCell />
          <TableCell />
        </TableHead> */}
        <TableBody>
          {display.map(entry => {
            console.log(entry)
            return (
              <TableRow>
                <TableCell>{entry[0]}</TableCell>
                <TableCell>
                  {
                    !!entry[2]
                    ? <Link href={entry[2]}>{entry[1]}</Link>
                    : entry[1]
                  }
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PatternMetaTable