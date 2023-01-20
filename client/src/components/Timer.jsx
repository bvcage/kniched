import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Timer (props) {
  const location = useLocation()
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [timer, setTimer] = useState(0)
  const [began, setBegan] = useState(null)

  useEffect(() => {
    let interval = null
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isRunning, isPaused])

  function startTimer () {
    if (!began) setBegan(new Date());
    setIsRunning(true)
    setIsPaused(false)
  }

  function stopTimer () {
    if (isRunning) {
      setIsRunning(false)
      setIsPaused(true)
    } else {
      // save timer to db
      const postObj = {
        'began': began.toString(),
        'duration': formatTimerISO(timer),
        'concluded': new Date().toString(),
        'project_id': parseInt(location.pathname.split('/').pop())
      }
      fetch('/timers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postObj)
      }).then(r=>{
        if (r.ok) r.json().then(dbObj => {
          console.log(dbObj)
          setTimer(0)
          setBegan(null)
        })
        else r.json().then(console.log)
      })
    }
  }

  return (
    <Box sx={{margin: 'auto', width: 'fit-content'}}>
      <Typography variant='h6' sx={{textAlign: 'center'}}>{formatTimer(timer)}</Typography>
      <Button
        onClick={startTimer}
        disabled={isRunning}
        >
          {timer === 0 && !isRunning ? 'start' : 'resume'}
      </Button>
      <Button
        onClick={stopTimer}
        disabled={timer === 0 && isPaused}
        >
          {isRunning
            ? 'stop'
            : timer > 0
              ? 'save'
              : 'stop'
          }
      </Button>
    </Box>
  )
}

export function formatTimer (numSeconds, forceAll) {
  const time = new Date(numSeconds * 1000)
  const days = time.getUTCDate() - 1
  const hours = time.getUTCHours()
  const minutes = time.getUTCMinutes()
  const seconds = time.getUTCSeconds()
  let formatted = `${zeroPad(minutes)}m ${zeroPad(seconds)}s`
  if (hours > 0 || forceAll) {formatted = `${zeroPad(hours)}h ` + formatted}
  if (days > 0 || forceAll) {formatted = days + 'd ' + formatted}
  return formatted
}

function formatTimerISO (numSeconds) {
  const time = new Date(numSeconds * 1000)
  const years = time.getFullYear() - 1969
  const months = time.getMonth() - 11
  const days = time.getUTCDate() - 1
  const hours = time.getUTCHours()
  const minutes = time.getUTCMinutes()
  const seconds = time.getUTCSeconds()
  return `P${years}Y${months}M${days}DT${hours}H${minutes}M${seconds}S`
}

function zeroPad (num) {
  if (num.toString().length < 2) {
    num = '0' + num
  }
  return num
}

export default Timer