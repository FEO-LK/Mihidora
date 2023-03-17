import React from 'react'
import { Link } from "react-router-dom";
import {Container, Grid } from '@mui/material'

export default function WhatsOnNavbar() {
  return (
    <div className="topic-menu">
      <Container>
        <Grid container>
          <Grid item sm={12} md={12}>
            <ul className='topic-menu-tab'>
              <li><Link to='/whatson/events'>Events</Link></li>
              <li><Link to='/whatson/volunteer-opportunities'>Volunteer Opportunities</Link></li>
              <li><Link to='/whatson/media-and-advocacy'>Media And Advocacy</Link></li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
} 