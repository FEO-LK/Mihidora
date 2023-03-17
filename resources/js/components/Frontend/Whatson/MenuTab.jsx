import React from 'react'
import { Link } from 'react-router-dom';

export default function MenuTab() {
  return (
    <div className='menu-tab'>
      <ul>
        <li><Link to=''>All Events</Link></li>
        <li><Link to=''>Volunteer Opportunities</Link></li>
        <li><Link to=''>Media and Advocacy</Link></li>
      </ul>
    </div>
  )
}
