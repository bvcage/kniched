import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import React from 'react'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '1rem',
}

function DeleteModal (props) {
  const {
    closeModal,
    delFunc,
    delObj,
    open,
    prompt,
  } = props

  console.log(delObj)

  if (!props.delObj) return <></>
  return (
    <Modal
      open={open}
      onClose={closeModal}
      >
        <Box
          sx={modalStyle}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant='h6'>Confirm Deletion:</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body1'>{prompt}</Typography>
              </Grid>
              <Grid item xs={12} sx={{textAlign: 'center'}}>
                <Button
                  variant='outlined'
                  color='error'
                  sx={{marginRight: '0.25rem'}}
                  onClick={() => {
                    closeModal()
                    delFunc(delObj)
                  }}
                  >confirm
                </Button>
                <Button
                  sx={{marginLeft: '0.25rem'}}
                  onClick={closeModal}
                  >cancel
                </Button>
              </Grid>
            </Grid>
        </Box>
    </Modal>
  )
}

export default DeleteModal