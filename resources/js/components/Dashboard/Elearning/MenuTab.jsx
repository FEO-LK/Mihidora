import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function MenuTab() {
  return (
    <div className='menu--tab'>
      <Typography className='tab-title'>E-learning</Typography>
      <ul className='menu-tab'>
        <li><Link to='/elearning-list'>E-learning List</Link></li>
        <li><Link to='/add-elearning'>Add New E-learning</Link></li>
      </ul>
    </div>
  )
}
