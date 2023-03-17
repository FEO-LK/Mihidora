import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function MenuTab() {
  return (
    <div className='menu--tab'>
      <Typography className='tab-title'>Project</Typography>
      <ul className='menu-tab'>
        <li><Link to='/project-list'>Projects</Link></li>
        <li><Link to='/add-project'>Add New</Link></li>
      </ul>
    </div>
  )
}
