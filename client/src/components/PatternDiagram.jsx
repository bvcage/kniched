import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'

function PatternDiagram (props) {
  const { id } = props
  const [diagram, setDiagram] = useState([])

  useEffect(() => {
    fetch('/patterns/'+id+'/diagram').then(r=>{
      if (r.ok) r.json().then(setDiagram)
      else r.json().then(console.log)
    })
  }, [id])

  const max_cols = !!diagram[0] ? diagram[0].max_cols : 0
  const num_rows = !!diagram[0] ? parseInt(diagram[0].num_rows) : 0

  const labels = []
  for (let i=0; i<=max_cols; ++i) {
    labels.push(<TableCell key={'label'+i} sx={{textAlign: 'center'}}>{i}</TableCell>)
  }

  const rows = !!diagram[0] ? diagram.reverse().map((row,i) => {
    if (!Array.isArray(row)) return <></>
    const row_num = num_rows - i
    const display = (row_num % 2 !== 0 || row_num === num_rows)
    return (
      <TableRow key={'row'+row_num}>
        {row.map((col,i) => {
          console.log(col)
          return (
            <TableCell
              key={'row'+row_num+'col'+i}
              sx={{border: 1, textAlign: 'center'}}
              >{col.stitch.symbol}
            </TableCell>
          )
        })}
        <TableCell>{display ? row_num : ''}</TableCell>
      </TableRow>
    )
  }) : null

  if (!diagram[0]) return <></>
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {rows}
          <TableRow>
            {labels}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PatternDiagram