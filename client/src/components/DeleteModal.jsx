import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import React from 'react'
import { MODAL_STYLE } from './ModalStyle'

function DeleteModal (props) {
  const {
    closeModal,
    delFunc,
    delObj,
    open,
    prompt,
  } = props

  if (!props.delObj) return <></>
  return (
    <Modal
      open={open}
      onClose={closeModal}
      >
        <Box
          sx={MODAL_STYLE}
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