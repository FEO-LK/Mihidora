import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './components/Header';

import '../../../sass/superuser/styles.css';

// import Logo from "../../../images/logo.jpg";
// import LogoutButton from './components/LogoutButton';

const BaseLayout = ({children, title}) => {
  return (
    <Box sx={{ display: 'flex' }} className="sup__dashboard">
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  )
}

export default BaseLayout