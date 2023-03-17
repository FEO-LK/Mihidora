import React from 'react'
import { Container, Grid, Link } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline'
import Logo from "../../../../images/logo.jpg"
import AccountMenu from './AccountMenu'

export default function Header() {
  return (
    <div style={{ borderBottom: '1px solid #efefef', marginBottom: 25 }}>
      <Container maxWidth="lg">
        <Grid container>
          <CssBaseline />
          <Grid item md={3} sx={{ display: { md: 'block', sm: 'none' } }}>
            <Link href="/" className="brand-logo">
              <img src={Logo} style={{ height: 35, display: 'flex', margin: '10px 0' }} />
            </Link>
          </Grid>
          <Grid item xs={12} md={9}>
            <AccountMenu />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
