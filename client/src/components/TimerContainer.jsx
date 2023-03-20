import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Timer from './Timer'
import TimerEditModal from './TimerEditModal'
import TimerTable from './TimerTable'

function TimerContainer (props) {
  const { project } = props
  const [timers, setTimers] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const closeEditModal = () => setOpenModal(false)
  const [timerToEdit, setTimerToEdit] = useState({})

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

  function editTimer (timerId) {
    setTimerToEdit(timers.find(t => t.id === parseInt(timerId)))
    setOpenModal(true)
  }

  async function saveTimer (obj, timerId = null) {
    if (!!timerId) {
      return fetch('/timers/'+timerId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      }).then(r=>{
        if (r.ok) r.json().then(editObj => {
          const updatedList = timers.map(timer => {
            if (timer.id !== editObj.id) return timer
            else return editObj
          })
          setTimers(updatedList)
        })
      })
    }
    else {
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
  }

  return (
    <Container>
      <Timer saveTimer={saveTimer} />
      <TimerTable
        deleteTimer={deleteTimer}
        editTimer={editTimer}
        formatTimerISO={formatTimerISO}
        timers={timers}
      />
      <TimerEditModal
        closeModal={closeEditModal}
        formatTimerISO={formatTimerISO}
        open={openModal}
        saveTimer={saveTimer}
        timer={timerToEdit}
      />
    </Container>
  )
}

function formatTimerISO (numSeconds) {
  const time = new Date(numSeconds * 1000)
  const years = time.getUTCFullYear() - 1970
  const months = time.getUTCMonth()
  const days = time.getUTCDate() - 1
  const hours = time.getUTCHours()
  const minutes = time.getUTCMinutes()
  const seconds = time.getUTCSeconds()
  return `P${years}Y${months}M${days}DT${hours}H${minutes}M${seconds}S`
}

export default TimerContainer