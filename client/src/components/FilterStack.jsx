import { Button, Stack, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import Check from '@mui/icons-material/Check'
import React, { useState } from 'react'

function FilterStack (props) {
  const { filters, appliedFilters, setAppliedFilters, justify = 'center' } = props
  const [open, setOpen] = useState('')
  const [anchor, setAnchor] = useState(null)

  function handleOpen (e) {
    setAnchor(e.target)
    setOpen(e.target.id)
  }

  function handleClose () {
    setAnchor(null)
    setOpen('')
  }

  function handleFilterClick (e, key, val) {
    if (appliedFilters[key]) {
      const index = appliedFilters[key].indexOf(val)
      if (index < 0) {
        setAppliedFilters({...appliedFilters,
          [key]: [...appliedFilters[key], val]
        })
      } else {
        const rmVal = appliedFilters[key].filter(item => item !== val)
        setAppliedFilters({...appliedFilters,
          [key]: [...rmVal]
        })
      }
    } else {
      setAppliedFilters({...appliedFilters,
        [key]: [val]
      })
    }
  }

  if (!filters) return <></>
  return (
    <Stack direction='row' spacing={2} justifyContent={justify}>
      {Object.entries(filters).map(([k,v]) => {
        return (
          <React.Fragment key={k}>
            <Button
              id={k+'-filter'}
              key={k+'-filter'}
              aria-controls={open===k+'-filter' ? k+'-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open===k+'-filter' ? 'true' : undefined}
              onClick={handleOpen}
              >{k.replaceAll('_', ' ')}
            </Button>
            <Menu
              id={k+'-menu'}
              key={k+'-menu'}
              anchorEl={anchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={open===k+'-filter'}
              onClose={handleClose}
              >
                {v.map(option => {
                  return (
                    <MenuItem
                      key={option+'-menu-option'}
                      onClick={(e) => handleFilterClick(e, k, option)}
                      >
                        {appliedFilters[k] && appliedFilters[k].indexOf(option) > -1
                          ? <><ListItemIcon><Check /></ListItemIcon>{option}</>
                          : <ListItemText inset>{option}</ListItemText>} 
                      </MenuItem>
                  )
                })}
            </Menu>
          </React.Fragment>
        )
      })}
    </Stack>
  )
}

export default FilterStack