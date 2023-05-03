import React from 'react'
import { Container, Typography } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'

import { AUTH, DB } from '../firebaseConfig.js'

function UserProfilePage () {
  const user = AUTH.currentUser
  const [uInfo, setUInfo] = React.useState({})

  React.useEffect(() => {
    if (!!user && !!user.uid) {
      getDoc(doc(DB, 'users', user.uid)).then(doc => {
        if (doc.exists()) {
          setUInfo(doc.data())
        } else {
          console.log('error')
        }
      })
    }
  }, [user])

  if (Object.keys(uInfo).length < 1) return <>loading</>
  return (
    <Container sx={{textAlign: 'center'}}>
      <Typography variant='h3'>{uInfo.first} {uInfo.last}</Typography>
      <Typography variant='h5'>@{uInfo.username}</Typography>
      <Typography variant='body'>joined on {new Date(parseInt(uInfo.created_TS.seconds * 1000)).toLocaleDateString()}</Typography>
    </Container>
  )
}

export default UserProfilePage