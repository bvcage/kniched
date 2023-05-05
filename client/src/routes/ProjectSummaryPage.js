import { Box, Button, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Popover, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProjectMetaTable from '../components/ProjectMetaTable'
import TimerContainer from '../components/TimerContainer'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SettingsIcon from '@mui/icons-material/Settings'
import ProjectMetaEditModal from '../components/ProjectMetaEditModal'

import { doc, deleteDoc, getDoc } from 'firebase/firestore'

import { AUTH, DB } from '../firebaseConfig'
import DeleteModal from '../components/DeleteModal'

function ProjectSummaryPage () {
  const user = AUTH.currentUser
  const [project, setProject] = useState({})
  const location = useLocation()
  const navigate = useNavigate()
  const id = location.pathname.split('/').pop()
  const [editTable, setEditTable] = useState(false)
  const closeEditTableModal = () => setEditTable(false)
  const toggleEdit = () => setEditTable(!editTable)
  const [anchorEl, setAnchorEl] = useState(null)
  const closeMenu = () => setAnchorEl(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const closeDeleteModal = () => setShowDeleteModal(false)
  const promptDelete = () => {
    closeMenu()
    setShowDeleteModal(true)
  }

  useEffect(() => {
    if (!!user && !!user.uid) {
      getDoc(doc(DB, 'users', user.uid, 'projects', id))
        .then(docref => {
          setProject({id: docref.id, ...docref.data()})
        })
    }
  }, [user, id])

  function deleteProject () {
    if (!!user && !!user.uid && !!project && !!project.id) {
      deleteDoc(doc(DB, 'users', user.uid, 'projects', project.id))
      navigate('..')
    }
    else {
      console.log('error')
    }
  }

  if (!project.name) return <></>
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h3'>
            {project.name}

            {/* project settings button */}
            <IconButton
              size='small'
              sx={{
                color: !!anchorEl ? '#959595' : 'transparent',
                marginLeft: '0.5rem',
                '&:hover': { color: '#959595' }
              }}
              onClick={(e)=>setAnchorEl(e.currentTarget)}
              >
                <SettingsIcon />
            </IconButton>

            {/* project settings menu */}
            <Menu
              id='settings-menu'
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={closeMenu}
              >
                <MenuItem
                  onClick={promptDelete}
                  >
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText>delete</ListItemText>
                </MenuItem>
              </Menu>
          </Typography>

          {/* navigate back button */}
          <Button
            onClick={()=>navigate('..')}
            >{'< all projects'}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6'>information 
            <IconButton
              size='small'
              sx={{
                color: 'transparent',
                marginLeft: '0.5rem',
                '&:hover': { color: '#959595' }
              }}
              onClick={toggleEdit}
              >
                <EditIcon />
            </IconButton>
          </Typography>
          <ProjectMetaTable project={project} editable={editTable} />
          <ProjectMetaEditModal
            open={editTable}
            closeModal={closeEditTableModal}
            project={project}
          />
        </Grid>
        <Grid item xs={6}>
          <TimerContainer project={project} />
        </Grid>
      </Grid>
      
      {/* delete project modal */}
      <DeleteModal
        prompt='Are you sure you want to delete your project? This cannot be undone.'
        closeModal={closeDeleteModal}
        delFunc={deleteProject}
        delObj={project}
        open={showDeleteModal}
      />
    </React.Fragment>
  )
}

export default ProjectSummaryPage