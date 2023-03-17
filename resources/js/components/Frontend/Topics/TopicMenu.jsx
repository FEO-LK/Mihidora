import React from 'react'
import { Link } from "react-router-dom";
import {Container, Grid } from '@mui/material'

export default function TopicMenu() {
  return (
    <div className="topic-menu">
      <Container>
        <Grid container>
          <Grid item sm={12} md={12}>
            <ul className='topic-menu-tab'>
              <li><a href='#'>All</a></li>
              <li><a href='#datasets'>Datasets</a></li>
              <li><a href='#projects'>Projects</a></li>
              <li><a href='#elearning'>E-Learning</a></li>
              <li><a href='#resources'>Resources</a></li>
              <li><a href='#events'>Events</a></li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
     