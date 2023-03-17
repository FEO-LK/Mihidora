import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function MenuTab() {
  return (
    <div className='menu--tab'>
      <Typography className='tab-title'>Members</Typography>
      <ul className='menu-tab'>
        <li><Link to='/all-members'>Members</Link></li>
        {/* <li><Link to='/member-request'>Member Request</Link></li> */}
      </ul>
    </div>
  )
}
