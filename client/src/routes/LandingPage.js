import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import UserDashboard from './UserDashboard'

import { AUTH } from '../firebaseConfig.js'

function LandingPage () {
  const [ user, setUser ] = useState(undefined)

  useEffect(() => {
    if (!!AUTH.currentUser) {
      setUser(AUTH.currentUser.uid)
    }
  }, [])

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