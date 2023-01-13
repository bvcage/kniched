import Typography from '@mui/material/Typography'
import React from 'react'

function AboutPage () {
  return (
    <React.Fragment>
      <br/>
      <Typography variant='h2'>about</Typography>
      <br/>
      <Typography variant='body1'>
        I began knished (/neeshed/) to track my knitting and crochet projects.
        I wanted to keep better track of patterns and also calculate how many hours each project takes.
        I built this website as a way to track and share projects with others.
      </Typography>
      <br/>
      <Typography variant='body1'>
        The name comes from the word <em>niche</em>, which means <em>a place, employment, status, or activity for which a person or thing is best fitted</em>.
        The past tense of the verb (niched) means <em>to place in or as if in a niche</em>.
        It seemed to be the perfect word for storing knitting & other needle craft projects.
      </Typography>
    </React.Fragment>
  )
}

export default AboutPage