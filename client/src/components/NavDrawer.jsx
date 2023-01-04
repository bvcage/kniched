import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'

import MenuIcon from '@mui/icons-material/Menu'

function NavDrawer () {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <React.Fragment>
      <Button
        variant='outlined'
        onClick={()=>setOpen(true)}
        >
          <MenuIcon/>&nbsp;navigation
      </Button>
      <Drawer
        anchor='right'
        open={open}
        onClose={()=>setOpen(false)}
        >
          <Box
            onClick={()=>setOpen(false)}
            onKeyDown={()=>setOpen(false)}
            sx={{width: 250}}
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

              {/* explore */}
              <List>
                <ListItem disablePadding>
                  <ListItemButton>knitting</ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>crochet</ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>explore</ListItemButton>
                </ListItem>
              </List>

              <Divider />

              {/* personal */}
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={()=>navigate(user.username + '/projects')}
                    >projects
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={()=>navigate(user.username + '/patterns')}
                    >patterns
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={()=>navigate(user.username)}
                    >profile
                  </ListItemButton>
                </ListItem>
              </List>

              <Divider />

              {/* logout */}
              <List>
                <ListItem disablePadding>
                  <ListItemButton>account</ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      logoutUser().then(res=>{
                        if (res) {
                          if (location.pathname === '/') {navigate(0)}
                          else {navigate('/')}
                        }
                        else {console.log('res')}
                      })
                    }}
                    >logout
                  </ListItemButton>
                </ListItem>
              </List>
          </Box>
      </Drawer>
    </React.Fragment>
  )
}

async function logoutUser () {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!!user) {
    return await fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(r=>{
      if (r.ok) {
        localStorage.removeItem('user')
        return true
      }
      else r.json().then(err => {return err})
    })
  } else {
    return true
  }
}

export default NavDrawer