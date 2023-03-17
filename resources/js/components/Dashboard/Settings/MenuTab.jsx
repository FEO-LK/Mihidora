import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function MenuTab() {
  return (
    <div className='menu--tab'>
      <Typography className='tab-title'>Login & Security</Typography>
      <ul className='menu-tab'>
        <li><Link to='/profile-settings'>Profile Settings</Link></li>
      </ul>
    </div>
  )
}
