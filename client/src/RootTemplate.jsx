import React from 'react'
import { Outlet } from 'react-router-dom'

import Container from '@mui/material/Container'
import Header from './components/Header'

function RootTemplate () {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}

export default RootTemplate