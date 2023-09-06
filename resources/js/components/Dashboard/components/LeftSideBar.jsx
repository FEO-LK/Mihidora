import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Grid, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StorageCounter from './StorageCounter';
import {STORAGE_LIMIT} from '../../utils/misc';
export default function LeftSideBar() {

  const [usage, setUsage] = useState({
    actual: 0,
    percentage: 0,
    type: 'safe'
  });
  const [state, setState] = useState({
    usage: false,
    error: false,
    errorMessages: ''
  });

  useEffect(() => {
    getStorage();
}, [localStorage.getItem('org_id')]);

  //API Calls
  const getStorage = () => {
    const data = {
      "organization_id": localStorage.getItem('org_id')
    }
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post('/api/get-storage-by-users-by-org', data).then(res => {
        console.log(res)
        if (res.status == 200) {
          let mbs = res.data.total;
          let usage  = (mbs / STORAGE_LIMIT) * 100;
          let type = 'safe';
          if(usage > 90) {
            type = 'danger';
          }
          setUsage({actual: mbs, percentage: usage, type: type});
          setState({ usage: true, error: false, errorMessages: '' });
        } else {
          setState({ usage: false, error: true, errorMessages: 'Error Occurred in Storage Reading!' });
        }
      });
    });
  }

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

  const safe = {
    background: ''
  }

  return (
    <div>
      <Grid sx={{ marginBottom: 2, padding: 2, borderRadius: 1, border: '1px solid #ebebeb' }}>
        <ul className='primary_menu' style={{ listStyle: 'none', padding: 0, margin: 0 }}>
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
      <Grid sx={{ marginBottom: 1, padding: 2, borderRadius: 1, border: '1px solid #5bb318' }}>
        <ul className='primary_menu' style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={menuListItem}>
            <Link to="/profile" style={profileMenuItem} color='#5bb318'><InboxIcon style={menuIcon} /> Profile</Link>
          </li>
          <li style={menuListItem}>
            <Link to="/all-members" style={profileMenuItem}><InboxIcon style={menuIcon} /> Members</Link>
          </li>
          <li>
            <Link to="/profile-settings" style={profileMenuItem}><InboxIcon style={menuIcon} /> Login & Security</Link>
          </li>

          <li>
            <Typography sx={{ fontSize: '12px', color: '#93aa40' }} mt={3} mb={1}>Storage Usage</Typography>
            <StorageCounter value={usage.percentage} size={60} type={usage.type} />

            <Typography sx={{ fontSize: '12px', color: '#93aa40' }} mt={1}>You have used {Math.round(usage.actual)}Mb of the allocated {STORAGE_LIMIT}Mb for your account</Typography>
          </li>
        </ul>
      </Grid>
      <Typography style={{ color: '#5bb318', fontSize: 12, fontWeight: 500 }}>Contact FEO for support.</Typography>
    </div>
  )
}
