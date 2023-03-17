import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function MenuTab() {
  return (
    <div className='menu--tab'>
      <Typography className='tab-title'>Profile</Typography>
      <ul className='menu-tab'>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/profile-contact'>Contact</Link></li>
        <li><Link to='/profile-staff'>Staff</Link></li>
      </ul>
    </div>
  )
}
