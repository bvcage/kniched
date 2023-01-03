import React from 'react'

function LandingPage () {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div>
      {!!user ? 'dashboard' : <NoUser />}
    </div>
  )
}

const NoUser = () => {return (<>
  <h2>welcome to kniched</h2>
  <p>join to track your projects and share your patterns!</p>
</>)}

export default LandingPage