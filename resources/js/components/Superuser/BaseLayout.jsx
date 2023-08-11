import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation } from 'react-router-dom'

import Header from './components/Header';
import Menubar from './components/Menubar';

import '../../../sass/superuser/styles.css';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import SendIcon from '@mui/icons-material/Send';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WebIcon from '@mui/icons-material/Web';
import InsightsIcon from '@mui/icons-material/Insights';

import Logo from "../../../images/logo.jpg";
// import LogoutButton from './components/LogoutButton';

const drawerWidth = 240;

// interface Props {
//   window?: () => Window;
// }

const BaseLayout = ({ children, title }) => {

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { hash, pathname, search } = location;
  
  useEffect(() => {
    console.log(location);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      {/* <Divider /> */}
      <List sx={{ px: '2rem' }}>
        <ListItem key='Organizations' disablePadding sx={{ mb: '2rem' }}>
          <ListItemButton 
          className={location.pathname == '/admin/dashboard' ? 'sideBarButtonHighlight' : ''} 
          component="a" href="/admin/dashboard">
           <img src={Logo} />
          </ListItemButton>
        </ListItem>

        <ListItem key='Organizations' disablePadding>
          <ListItemButton 
          className={location.pathname == '/admin/dashboard' ? 'sideBarButtonHighlight' : ''} 
          component="a" href="/admin/dashboard">
          <ListItemIcon>
            <MapsHomeWorkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary='Organizations' />
          </ListItemButton>
        </ListItem>

        <ListItem key='Projects' disablePadding>
          <ListItemButton 
          className={location.pathname == '/admin/projects' ? 'sideBarButtonHighlight' : ''} 
          component="a" href="/admin/projects">
          <ListItemIcon>
            <LocalLibraryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary='Projects' />
          </ListItemButton>
        </ListItem>

        <ListItem key='Users' disablePadding>
          <ListItemButton 
          className={location.pathname == '/admin/users' ? 'sideBarButtonHighlight' : ''} 
          component="a" href="/admin/users">
          <ListItemIcon>
            <PeopleAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary='Users' />
          </ListItemButton>
        </ListItem>

        <ListItem key='Tags' disablePadding>
          <ListItemButton 
          className={location.pathname == '/admin/tags' ? 'sideBarButtonHighlight' : ''} 
          component="a" href="/admin/tags">
          <ListItemIcon>
            <LocalOfferIcon fontSize="small" />
          </ListItemIcon>            
          <ListItemText primary='Tags' />
          </ListItemButton>
        </ListItem>

        <ListItem key='Pages' disablePadding>
          <ListItemButton 
          className={location.pathname == '/admin/pages' ? 'sideBarButtonHighlight' : ''} 
          component="a" href="/admin/pages">
          <ListItemIcon>
            <WebIcon fontSize="small" />
          </ListItemIcon>   
          <ListItemText primary='Pages' />
          </ListItemButton>
        </ListItem>

        <ListItem key='Analytics' disablePadding>
          <ListItemButton 
          className={location.pathname == '/admin/analytics' ? 'sideBarButtonHighlight' : ''} 
          component="a" href="/admin/analytics">
          <ListItemIcon>
            <InsightsIcon fontSize="small" />
          </ListItemIcon>   
          <ListItemText primary='Analytics' />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Box sx={{ display: 'flex' }} className="sup__dashboard">
        {/* <Menubar /> */}
        <CssBaseline />

        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            boxShadow: 'none',
          }}
          style={{ background: '#ffffff' }}
        >
          <Toolbar>
            <IconButton
              // color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography noWrap component="div" style={{ color: '#000000' }} sx={{fontWeight: 'bold'}}>
              Mihidora Admin Portal
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            // container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* <Header /> */}
        <Box component="main" 
        sx={{ flexGrow: 1, p: 3, 
        // width: { sm: `calc(100% - ${drawerWidth}px)` }
        height: '100%',
        ml: { sm: `${drawerWidth}px` },
         }} className='content-div'>
          <Toolbar />

          <div className='inner-content-div'>
            {children}
          </div>
        </Box>
      </Box>
    </div>
  )
}

export default BaseLayout