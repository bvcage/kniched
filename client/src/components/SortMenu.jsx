import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

function SortMenu (props) {
  const { options, selSort, selSortDir, setSelSort, setSelSortDir } = props
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState(null)

  const handleClick = (e) => {
    setOpen(true)
    setAnchor(e.target)
  }
  const handleClose = () => {
    setOpen(false)
    setAnchor(null)
  }

  function handleSelect (e, val) {
    if (selSort === val) {
      const newDir = selSortDir !== 'asc' ? 'asc' : 'desc'
      setSelSortDir(newDir)
    } else {
      setSelSort(val)
      setSelSortDir('asc')
    }
  }

  return (
    <React.Fragment>
      <Button
        id="sort-menu-btn"
        aria-controls={open ? 'sort-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
          sort
      </Button>
      <Menu
        id='sort-menu'
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'sort-menu-btn',
        }}
        >
          {
            !!options[0]
              ? options.map(option => {
                  return (
                    <MenuItem
                      key={option}
                      onClick={e => handleSelect(e, option.replace(/ /,'_'))}
                      >
                        {
                          selSort === option.replace(/ /,'_')
                            ? <React.Fragment>
                                <ListItemIcon>
                                  {
                                    selSortDir === 'asc'
                                      ? <ArrowDownwardIcon />
                                      : <ArrowUpwardIcon />
                                  }
                                </ListItemIcon>
                                {option.replace(/_/,' ')}
                              </React.Fragment>
                            : <ListItemText inset>{option.replace(/_/,' ')}</ListItemText>
                        }
                    </MenuItem>
                  )
                })
              : null
          }
        </Menu>
    </React.Fragment>
  )
}

export default SortMenu