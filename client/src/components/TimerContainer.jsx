import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Timer from './Timer'
import TimerTable from './TimerTable'

function TimerContainer (props) {
  const { project } = props
  const [timers, setTimers] = useState([])

  useEffect(()=>{
    fetch(`/projects/${project.id}/timers`).then(r=>{
      if (r.ok) r.json().then(setTimers)
      else r.json().then(console.log)
    })
  }, [project])

  async function deleteTimer (timerId) {
    timerId = parseInt(timerId)
    return fetch(`/timers/${timerId}`, {
      method: 'DELETE'
    }).then(r=>{
      if (r.ok) {
        const list = timers.filter(timer => timer.id !== timerId)
        setTimers(list)
      }
    })
  }

  async function saveTimer (obj) {
    return fetch('/timers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(r=>{
      if (r.ok) r.json().then(dbObj => {
        setTimers([...timers, dbObj])
      })
      else r.json().then(console.log)
    })
  }

  return (
    <Container>
      <Timer saveTimer={saveTimer} />
      <TimerTable timers={timers} deleteTimer={deleteTimer} />
    </Container>
  )
}

export default TimerContainer