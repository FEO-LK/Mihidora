import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';

export default function LeftSideBar() {
  const menuListItem = {
    marginBottom: 20,
  }
  const menuItem = {
    color: '#a4a4a4', 
    fontSize: 14, 
    display: 'block'
  }
  const menuIcon = {
    fontSize: 18,
    float: 'left',
    margin: '1px 5px 0 0',
  }
  const profileMenuItem = {
    color: '#5bb318', 
    fontSize: 14, 
    display: 'block'
  }

  return (
    <div>
      <Grid sx={{marginBottom: 2, padding: 2, borderRadius: 1, border: '1px solid #ebebeb'}}>
        <ul className='primary_menu' style={{listStyle: 'none', padding: 0, margin: 0}}>
          <li style={menuListItem}>
            <Link to="/dashboard" style={menuItem}><InboxIcon style={menuIcon} /> Dashboard</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/project-list" style={menuItem}><InboxIcon style={menuIcon} /> Projects</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/elearning-list" style={menuItem}><InboxIcon style={menuIcon} /> E-learning</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/datahub-list" style={menuItem}><InboxIcon style={menuIcon} /> Data Hub</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/whatson-list" style={menuItem}><InboxIcon style={menuIcon} /> What's On</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/classified-list" style={menuItem}><InboxIcon style={menuIcon} /> Resource Exchange</Link>
          </li>
          <li>
            <Link to="/media-library" style={menuItem}><InboxIcon style={menuIcon} /> Media Library</Link>
          </li>
        </ul>
      </Grid>
      <Grid sx={{marginBottom: 1, padding: 2, backgroundColor: '#e1ffca', borderRadius: 1, border: '1px solid #5bb318' }}>
        <ul className='primary_menu' style={{listStyle: 'none', padding: 0, margin: 0}}>
          <li style={menuListItem}>
            <Link to="/profile" style={profileMenuItem} color='#5bb318'><InboxIcon style={menuIcon} /> Profile</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/all-members" style={profileMenuItem}><InboxIcon style={menuIcon} /> Members</Link>
          </li>
          <li>
            <Link to="/profile-settings" style={profileMenuItem}><InboxIcon style={menuIcon} /> Login & Security</Link>
          </li>
        </ul>
      </Grid>
      <Typography style={{color: '#5bb318', fontSize: 12, fontWeight: 500}}>Contact FEO for support.</Typography>
    </div>
  )
}
