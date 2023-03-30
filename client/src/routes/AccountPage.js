import { Auth } from 'aws-amplify'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function AccountPage (props) {
  const navigate = useNavigate()

  Auth.currentAuthenticatedUser().then(user => {
    if (user !== undefined) {
      navigate('/')
    }
  })
  
  return (
    <Outlet />
  )
}

export default AccountPage