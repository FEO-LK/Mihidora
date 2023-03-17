import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function MenuTab() {
  return (
    <div className='menu--tab'>
      <Typography className='tab-title'>Data Hub</Typography>
      <ul className='menu-tab'>
        <li><Link to='/datahub-list'>Data Hub List</Link></li>
        <li><Link to='/add-datahub'>Add New Data</Link></li>
      </ul>
    </div>
  )
}
