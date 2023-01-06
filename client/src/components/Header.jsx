import React from 'react'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import NavDrawer from './NavDrawer'

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
  const user = JSON.parse(localStorage.getItem('user'))

  const LoginBtns = () => {
    return (
      <ButtonGroup>
        <Button
          onClick={()=>navigate('/signup')}
          >sign up
        </Button>
        <Button
          onClick={()=>navigate('/login')}
          >login
        </Button>
      </ButtonGroup>
    )
  }

  const PageBtns = () => {
    return (
      <ButtonGroup sx={{marginLeft: '0.5rem'}}>
        <Button
          onClick={()=>navigate('/explore')}
          >explore
        </Button>
      </ButtonGroup>
    )
  }

  return (
    <Grid container spacing={1}>

      {/* left side */}
      <Grid item xs={4}>
        <Left>
          <ButtonGroup>
            <Button
              onClick={()=>navigate('/')}
              >home</Button>
            <Button
              onClick={()=>navigate('/about')}
              >about</Button>
          </ButtonGroup>
          {!!user ? <PageBtns /> : null}
        </Left>
      </Grid>

      {/* center */}
      <Grid item xs={4}>
        <Center
          onClick={()=>navigate('/')}
          >
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

    </Grid>
  )
}

export default Header