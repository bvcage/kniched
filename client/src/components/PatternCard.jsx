import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography } from '@mui/material'

function PatternCard ({ pattern }) {
  const navigate = useNavigate()
  
  if (!pattern) return null
  console.log(pattern)
  const { id, name, craft, skill_level } = pattern

  return (
    <Card
      key={id}
      onClick={()=>navigate('/patterns/'+id)}
      >
        <CardContent>
          <Typography variant='h5'>{name}</Typography>
          <Typography variant='subtitle2'>{craft} | {skill_level}</Typography>
        </CardContent>
    </Card>
  )
}

export default PatternCard