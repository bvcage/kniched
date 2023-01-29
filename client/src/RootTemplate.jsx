import React from 'react'
import { Outlet } from 'react-router-dom'

import Container from '@mui/material/Container'
import Header from './components/Header'

function RootTemplate () {
  return (
    <React.Fragment>
      <Header />
      <Container sx={{paddingTop: '1rem'}}>
        <Outlet />
      </Container>
    </React.Fragment>
  )
}

export default RootTemplate