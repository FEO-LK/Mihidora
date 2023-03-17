import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" to="/topics">
            <ListItemText primary="Topics" />
          </ListItemButton>
        </ListItem>

{/* Explore */}

        <ListItem disablePadding>
          <ListItemButton component="a" to="/projects">
            <ListItemText primary="Projects" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" to="/organizations">
            <ListItemText primary="Organizations" />
          </ListItemButton>
        </ListItem>

{/* -------- */}

        <ListItem disablePadding>
          <ListItemButton component="a" to="/datahub">
            <ListItemText primary="Data Catalogue" />
          </ListItemButton>
        </ListItem>

{/* -------- */}

        <ListItem disablePadding>
          <ListItemButton component="a" to="/resource-exchange/jobs">
            <ListItemText primary="Jobs" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" to="/resource-exchange/grants-and-proposals">
            <ListItemText primary="Grants and Proporsals" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" to="/resource-exchange/suppliers">
            <ListItemText primary="Suppliers" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" to="/resource-exchange/resource-sharing">
            <ListItemText primary="Resource Pool" />
          </ListItemButton>
        </ListItem>

{/* -------- */}

{/* Whats on */}

<ListItem disablePadding>
          <ListItemButton component="a" to="/whatson/events">
            <ListItemText primary="Events" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" to="/whatson/volunteer-opportunities">
            <ListItemText primary="Volunteer Opportunities" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" to="/whatson/media-and-advocacy">
            <ListItemText primary="Media and Advocacy" />
          </ListItemButton>
        </ListItem>

{/* -------- */}


        <ListItem disablePadding>
          <ListItemButton component="a" to="/about">
            <ListItemText primary="About us" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className='mobile-menu'>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon style={{color: '#000', fontSize: '40px', marginTop: '2px'}} /></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}