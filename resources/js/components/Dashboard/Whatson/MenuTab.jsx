import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function MenuTab() {
  return (
    <div className='menu--tab'>
      <Typography className='tab-title'>What's On</Typography>
      <ul className='menu-tab'>
        <li><Link to='/whatson-list'>What's On</Link></li>
        <li><Link to='/add-whatson'>Add New</Link></li>
      </ul>
    </div>
  )
}
