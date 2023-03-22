import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteModal from './DeleteModal'
import Timer from './Timer'
import TimerCreateModal from './TimerCreateModal'
import TimerEditModal from './TimerEditModal'
import TimerTable from './TimerTable'

function TimerContainer (props) {
  const { project } = props
  const [timers, setTimers] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const closeCreateModal = () => setOpenCreateModal(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const closeDeleteModal = () => setOpenDeleteModal(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const closeEditModal = () => setOpenEditModal(false)
  const [timerToEdit, setTimerToEdit] = useState({})
  const [selectedTimer, setSelectedTimer] = useState({})

  useEffect(()=>{
    fetch(`/projects/${project.id}/timers`).then(r=>{
      if (r.ok) r.json().then(setTimers)
      else r.json().then(console.log)
    })
  }, [project])

  function createTimer () {
    setOpenCreateModal(true)
  }

  function confirmDeleteTimer (timerId) {
    timerId = parseInt(timerId)
    let temp = timers.find(t=>t.id === timerId)
    if (!temp) return
    setSelectedTimer(temp)
    setOpenDeleteModal(true)
  }

  async function deleteTimer (timer) {
    const timerId = parseInt(timer.id)
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
    setOpenEditModal(true)
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
        createTimer={createTimer}
        deleteTimer={confirmDeleteTimer}
        editTimer={editTimer}
        formatTimerISO={formatTimerISO}
        timers={timers}
      />
      <TimerEditModal
        closeModal={closeEditModal}
        formatTimerISO={formatTimerISO}
        open={openEditModal}
        saveTimer={saveTimer}
        timer={timerToEdit}
      />
      <TimerCreateModal
        closeModal={closeCreateModal}
        open={openCreateModal}
        formatTimerISO={formatTimerISO}
        saveTimer={saveTimer}
      />
      <DeleteModal
        closeModal={closeDeleteModal}
        delFunc={deleteTimer}
        delObj={selectedTimer}
        open={openDeleteModal}
        prompt={`Are you sure you want to delete timer for ${formatTimerReading(selectedTimer.duration)} from ${new Date(selectedTimer.began).toDateString()}? This cannot be undone.`}
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

function formatTimerReading (numSeconds) {
  const time = new Date(numSeconds * 1000)
  // const years = time.getUTCFullYear() - 1970
  // const months = time.getUTCMonth()
  // const days = time.getUTCDate() - 1
  const hours = time.getUTCHours()
  const minutes = time.getUTCMinutes()
  const seconds = time.getUTCSeconds()
  let val = []
  if (!!hours) val.push(`${hours}\u00A0hour${hours !== 1 ? 's' : ''}`)
  if (!!minutes) val.push(`${minutes}\u00A0minute${minutes !== 1 ? 's' : ''}`)
  if (!!seconds) val.push(`${seconds}\u00A0second${seconds !== 1 ? 's' : ''}`)
  return val.join(', ')
}

export default TimerContainer