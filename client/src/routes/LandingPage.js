import { Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import UserDashboard from './UserDashboard'

function LandingPage () {
  const [ user, setUser ] = useState(undefined)

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(user => {
      if (user === undefined) {
        setUser(undefined)
      } else {
        setUser(user.username)
      }
    })
  }, [])

  // const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div>
      {!!user ? <UserDashboard /> : <NoUser />}
    </div>
  )
}

const NoUser = () => {return (<>
  <br/>
  <Typography variant='h2'>welcome to kniched</Typography>
  <br/>
  <Typography variant='body1'>join to track your projects and share your patterns!</Typography>
</>)}

export default LandingPage