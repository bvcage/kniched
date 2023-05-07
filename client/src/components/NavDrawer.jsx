import { signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AUTH, DB } from '../firebaseConfig'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'

import MenuIcon from '@mui/icons-material/Menu'

// typography variant for all buttons
const buttonFont = 'body1'

function NavDrawer () {
  const [open, setOpen] = useState(false)
  const [uInfo, setUInfo] = useState({})
  const location = useLocation()
  const navigate = useNavigate()

  const user = AUTH.currentUser
  useEffect(() => {
    if (!!user && !!user.uid) {
      getDoc(doc(DB, 'users', user.uid))
        .then(doc => {
          if (doc.exists()) {
            setUInfo(doc.data())
          }
        })
    }
  }, [user])

  return (
    <React.Fragment>
      <Button
        variant='outlined'
        onClick={()=>setOpen(true)}
        sx={{display: {xs: 'none', md: 'inline-flex'}}}
        >
          <MenuIcon />&nbsp;navigation
      </Button>
      <Button
        variant='outlined'
        onClick={()=>setOpen(true)}
        sx={{display: {xs: 'inline-flex', md: 'none'}}}
        >
          <MenuIcon />
      </Button>
      <Drawer
        anchor='right'
        open={open}
        onClose={()=>setOpen(false)}
        >
          <Box
            onClick={()=>setOpen(false)}
            onKeyDown={()=>setOpen(false)}
            sx={{width: {xs: '65vw', md: 250}}}
            >
              {/* logo */}
              <List>
                <ListItem disablePadding>
                  <Box sx={{textAlign: 'center', margin: 'auto'}}>
                    <Typography variant='h5'>navigation</Typography>
                  </Box>
                </ListItem>
              </List>

              <Divider />

              {/* home & about, hidden */}

              <List sx={{display: {md: 'none'}}}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={()=>navigate('/')}
                    >
                      <Typography variant={buttonFont}>home</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={()=>navigate('/about')}
                    >
                      <Typography variant={buttonFont}>about</Typography>
                  </ListItemButton>
                </ListItem>

              </List>

              <Divider sx={{display: {md: 'none'}}} />

              {/* explore */}
              <List>
                <ListItem disablePadding>
                  <ListItemButton disabled
                    onClick={()=>navigate('/explore')}
                    >
                      <Typography variant={buttonFont}>explore</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton disabled>
                    <Typography variant={buttonFont}>knitting</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton disabled>
                    <Typography variant={buttonFont}>crochet</Typography>
                  </ListItemButton>
                </ListItem>
              </List>

              <Divider />

              {/* personal */}
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    disabled={!uInfo && !uInfo.username}
                    onClick={()=>navigate(uInfo.username + '/projects')}
                    >
                      <Typography variant={buttonFont}>my projects</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    disabled={!uInfo && !uInfo.username}
                    onClick={()=>navigate(uInfo.username + '/patterns')}
                    >
                      <Typography variant={buttonFont}>my patterns</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    disabled={!uInfo && !uInfo.username}
                    onClick={()=>navigate(uInfo.username)}
                    >
                      <Typography variant={buttonFont}>my profile</Typography>
                  </ListItemButton>
                </ListItem>
              </List>

              <Divider />

              {/* account & logout */}
              <List>
                <ListItem disablePadding>
                  <ListItemButton disabled>
                    <Typography variant={buttonFont}>account</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      ":hover": {
                        backgroundColor: "#BC6D3880",
                      }
                    }}
                    onClick={() => {
                      logoutUser().then(res=>{
                        if (res) {
                          if (location.pathname === '/') {navigate(0)}
                          else {navigate('/')}
                        }
                        else {console.log('res')}
                      })
                    }}
                    >
                      <Typography variant={buttonFont}>logout</Typography>
                  </ListItemButton>
                </ListItem>
              </List>
          </Box>
      </Drawer>
    </React.Fragment>
  )
}

async function logoutUser () {
  return signOut(AUTH)
    .then(() => {
      localStorage.removeItem('user')
      return true
    })
    .catch(err => {
      return err.code
    })
  // return Auth.signOut()
  //   .then(()=>{
  //     localStorage.removeItem('user')
  //     return true
  //   })
  //   .catch(err => {
  //     return err.message
  //   })
  // const user = JSON.parse(localStorage.getItem('user'))
  // if (!!user) {
  //   return await fetch('/logout', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(user)
  //   }).then(r=>{
  //     if (r.ok) {
  //       localStorage.removeItem('user')
  //       return true
  //     }
  //     else r.json().then(err => {return err})
  //   })
  // } else {
  //   return true
  // }
}

export default NavDrawer