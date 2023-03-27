import React, { useState } from 'react'

function ProjectFilter (props) {
  const { filters, appliedFilters, setAppliedFilters } = props
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

  return (
    <div>ProjectFilter </div>
  )
}

export default ProjectFilter