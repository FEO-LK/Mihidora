import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function MenuTab() {
  return (
    <div className='menu--tab'>
      <Typography className='tab-title'>Resource Exchange</Typography>
      <ul className='menu-tab'>
        <li><Link to='/classified-list'>Resources</Link></li>
        <li><Link to='/add-classified'>Add New</Link></li>
      </ul>
    </div>
  )
}
