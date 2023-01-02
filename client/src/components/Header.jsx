import React from 'react'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

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
              onClick={()=>navigate('about')}
              >about</Button>
          </ButtonGroup>
        </Left>
      </Grid>

      {/* center */}
      <Grid item xs={4}>
        <Center
          onClick={()=>navigate('/')}
          >
            <h1><em>k</em>niche<em>d</em></h1>
        </Center>
      </Grid>

      {/* right side */}
      <Grid item xs={4}>
        <Right>
          <ButtonGroup>
            <Button
              onClick={()=>navigate('signup')}
              >sign up
            </Button>
            <Button
              onClick={()=>navigate('login')}
              >login
            </Button>
          </ButtonGroup>
        </Right>
      </Grid>

    </Grid>
  )
}

export default Header