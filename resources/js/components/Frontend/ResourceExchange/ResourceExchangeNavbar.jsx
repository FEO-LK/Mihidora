import React from 'react'
import { Link } from "react-router-dom";
import {Container, Grid } from '@mui/material'

export default function ResourceExchangeNavbar() {
  return (
    <div className="topic-menu">
      <Container>
        <Grid container>
          <Grid item sm={12} md={12}>
            <ul className='topic-menu-tab'>
              {/* <li><Link to='/organizations'>Organisational Directory</Link></li>
              <li><Link to='/projects'>Project Hub</Link></li> */}
              <li><Link to='/resource-exchange/jobs'>Jobs</Link></li>
              <li><Link to='/resource-exchange/grants-and-proposals'>Grants and Proposals</Link></li>
              <li><Link to='/resource-exchange/suppliers'>Suppliers</Link></li>
              <li><Link to='/resource-exchange/resource-sharing'>Resource Pool</Link></li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
} 