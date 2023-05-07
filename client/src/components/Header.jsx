import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AUTH } from '../firebaseConfig'

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import NavDrawer from './NavDrawer'
import { Breadcrumbs } from '@mui/material'

// import logo from '../assets/logo512.png'

const Left = styled(Paper)(({ theme }) => ({
  textAlign: 'left',
  boxShadow: 'none'
}))
const Center = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  boxShadow: 'none'
}))
const Right = styled(Paper)(({ theme }) => ({
  textAlign: 'right',
  boxShadow: 'none'
}))


function Header () {
  const navigate = useNavigate()
  const location = useLocation()
  const user = AUTH.currentUser
  const uInfo = JSON.parse(localStorage.getItem('uInfo'))

  const BreadcrumbBar = () => {
    return (
      <Breadcrumbs>
        {location.pathname.split('/').map((loc, i, ary) => {
          return (
            <Link key={loc} underline='hover' href={ary.slice(0,i+1).join('/')}>{loc}</Link>
          )
        })}
      </Breadcrumbs>
    )
  }

  const LoginBtns = () => {
    return (
      <ButtonGroup>
        <Button
          onClick={()=>navigate('/account/signup')}
          >sign up
        </Button>
        <Button
          onClick={()=>navigate('/account/login')}
          >login
        </Button>
      </ButtonGroup>
    )
  }

  // const PageBtns = () => {
  //   return (
  //     <ButtonGroup sx={{marginLeft: '0.5rem', display: {xs: 'none', md: 'inline'}}}>
  //       <Button
  //         onClick={()=>navigate('/explore')}
  //         >explore
  //       </Button>
  //     </ButtonGroup>
  //   )
  // }

  return (
    <Grid container fluid='true' sx={{borderBottom: 1}}>

      {/* left side */}
      <Grid item xs={4}>
        <Left>
          <ButtonGroup sx={{display: {xs: 'none', md: 'inline'}}}>
            <Button
              onClick={()=>navigate('/')}
              >home</Button>
            <Button
              onClick={()=>navigate('/about')}
              >about</Button>
          </ButtonGroup>
          {/* {!!user ? <PageBtns /> : null} */}
        </Left>
      </Grid>

      {/* center */}
      <Grid item xs={4}>
        <Center>
            <Typography variant='h4'>
              <em>k</em>niche<em>d</em>
            </Typography>
        </Center>
      </Grid>

      {/* right side */}
      <Grid item xs={4}>
        <Right>
          {!!user ? <NavDrawer /> : <LoginBtns />}
        </Right>
      </Grid>

      <Grid item xs={12}>
        {location.pathname ? <BreadcrumbBar/> : null}
      </Grid>

    </Grid>
  )
}

export default Header