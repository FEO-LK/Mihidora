import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from "@mui/material";
import { Container, Grid, Item } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import '../../../sass/dashboard/styles.css';

import Logo from "../../../images/logo.jpg";
import AccountMenu from './components/AccountMenu';
import Header from './components/Header';
import LeftSideBar from './components/LeftSideBar';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const BaseLayout = ({children, title}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [organizationMenu, setOrganizationMenu] = React.useState(false);
  const [projectsMenu, setProjectsMenu] = React.useState(false);
  const [whatsonMenu, setWhatsonMenu] = React.useState(false);
  const [educationMenu, setEducationMenu] = React.useState(false);
  const [classifiedMenu, setClassifiedMenu] = React.useState(false);
  const [memberMenu, setMmberMenu] = React.useState(false);
  const [settingsMenu, setSettingsMenu] = React.useState(false);

  const organizationMenuClick = () => {
    setOrganizationMenu(!organizationMenu);
  }
  const projectsMenuClick = () => {
    setProjectsMenu(!projectsMenu);
  };
  const whatsonMenuClick = () => {
    setWhatsonMenu(!whatsonMenu);
  };
  const memberMenuClick = () => {
    setMmberMenu(!memberMenu);
  };
  const educationMenuClick = () => {
    setEducationMenu(!educationMenu);
  };
  const classifiedMenuClick = () => {
    setClassifiedMenu(!classifiedMenu);
  };
  const settingsMenuClick = () => {
    setSettingsMenu(!settingsMenu);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="user__dashboard">
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" >
        <Grid container spacing={2}>
          <Grid item md={3} sx={{display: { md: 'block', sm: 'none'} }}>
            <LeftSideBar />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid sx={{padding: 2, borderRadius: 1, border: '1px solid #ebebeb' }}>
              {children}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>

    // <Box sx={{ display: 'flex' }} className="user__dashboard">
    //   <CssBaseline />
    //   <AppBar position="fixed" open={open} className="layout-header">
    //     <Toolbar>
    //       <IconButton
    //         color="inherit"
    //         aria-label="open drawer"
    //         onClick={handleDrawerOpen}
    //         edge="start"
    //         sx={{
    //           marginRight: 5,
    //           ...(open && { display: 'none' }),
    //         }}
    //       >
    //       <MenuIcon />
    //       </IconButton>
    //       <Typography variant="h6" noWrap component="div">
    //         {title}
    //       </Typography>

    //       <AccountMenu />

    //     </Toolbar>
    //   </AppBar>
    //   <Drawer variant="permanent" open={open}>
    //     <DrawerHeader className="drawer-header">
    //       <Link href="/"><img src={Logo} className="brand" /></Link>
    //       <IconButton onClick={handleDrawerClose}>
    //         {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    //       </IconButton>
    //     </DrawerHeader>
    //     <Divider />
    //     <List>
    //       <ListItem disablePadding sx={{ display: 'block' }}>
    //         <ListItemButton href="/dashboard" sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
    //           <ListItemIcon sx={{minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }} >
    //             <InboxIcon />
    //           </ListItemIcon>
    //           <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
    //         </ListItemButton>
    //       </ListItem>
    //     </List>

    //     <List
    //       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    //       component="nav">                  
    //       <ListItemButton onClick={organizationMenuClick}>
    //         <ListItemIcon>
    //           <InboxIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="Organization" />
    //         {organizationMenu ? <ExpandLess /> : <ExpandMore />}
    //       </ListItemButton>
    //       <Collapse in={organizationMenu} timeout="auto" unmountOnExit>
    //         <List component="div" disablePadding>
    //           <ListItemButton href="/organization-profile" sx={{ pl: 4 }}>
    //             <ListItemText primary="Organization Profile" />
    //           </ListItemButton>
    //           <ListItemButton href="/organization-contact" sx={{ pl: 4 }}>
    //             <ListItemText primary="Organization Contact" />
    //           </ListItemButton>
    //           <ListItemButton href="/staff-profile" sx={{ pl: 4 }}>
    //             <ListItemText primary="Staff Profile" />
    //           </ListItemButton>
    //         </List>
    //       </Collapse>
    //     </List>

    //     <List
    //       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    //       component="nav">                  
    //       <ListItemButton onClick={projectsMenuClick}>
    //         <ListItemIcon>
    //           <InboxIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="Projects" />
    //         {projectsMenu ? <ExpandLess /> : <ExpandMore />}
    //       </ListItemButton>
    //       <Collapse in={projectsMenu} timeout="auto" unmountOnExit>
    //         <List component="div" disablePadding>
    //           <ListItemButton href="/project-list" sx={{ pl: 4 }}>
    //             <ListItemText primary="All Projects" />
    //           </ListItemButton>
    //           <ListItemButton href="/add-new-project" sx={{ pl: 4 }}>
    //             <ListItemText primary="Add Project" />
    //           </ListItemButton>
    //         </List>
    //       </Collapse>
    //     </List>

    //     <List
    //       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    //       component="nav">                  
    //       <ListItemButton onClick={whatsonMenuClick}>
    //         <ListItemIcon>
    //           <InboxIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="What's On" />
    //         {whatsonMenu ? <ExpandLess /> : <ExpandMore />}
    //       </ListItemButton>
    //       <Collapse in={whatsonMenu} timeout="auto" unmountOnExit>
    //         <List component="div" disablePadding>
    //           <ListItemButton href="/whatson-list" sx={{ pl: 4 }}>
    //             <ListItemText primary="All" />
    //           </ListItemButton>
    //           <ListItemButton href="/add-whatson" sx={{ pl: 4 }}>
    //             <ListItemText primary="Add New" />
    //           </ListItemButton>
    //         </List>
    //       </Collapse>
    //     </List>

    //     <List
    //       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    //       component="nav">                  
    //       <ListItemButton onClick={educationMenuClick}>
    //         <ListItemIcon>
    //           <InboxIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="Educational Material" />
    //         {educationMenu ? <ExpandLess /> : <ExpandMore />}
    //       </ListItemButton>
    //       <Collapse in={educationMenu} timeout="auto" unmountOnExit>
    //         <List component="div" disablePadding>
    //           <ListItemButton href="/all-material" sx={{ pl: 4 }}>
    //             <ListItemText primary="All Material" />
    //           </ListItemButton>
    //           <ListItemButton href="/add-data-education" sx={{ pl: 4 }}>
    //             <ListItemText primary="Add New" />
    //           </ListItemButton>
    //         </List>
    //       </Collapse>
    //     </List>

    //     <List
    //       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    //       component="nav">                  
    //       <ListItemButton onClick={classifiedMenuClick}>
    //         <ListItemIcon>
    //           <InboxIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="Classified" />
    //         {classifiedMenu ? <ExpandLess /> : <ExpandMore />}
    //       </ListItemButton>
    //       <Collapse in={classifiedMenu} timeout="auto" unmountOnExit>
    //         <List component="div" disablePadding>
    //           <ListItemButton href="/all-classified" sx={{ pl: 4 }}>
    //             <ListItemText primary="All Material" />
    //           </ListItemButton>
    //           <ListItemButton href="/add-classified" sx={{ pl: 4 }}>
    //             <ListItemText primary="Add Classified" />
    //           </ListItemButton>
    //         </List>
    //       </Collapse>
    //     </List>

    //     <List
    //       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    //       component="nav">                  
    //       <ListItemButton onClick={memberMenuClick}>
    //         <ListItemIcon>
    //           <InboxIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="Members" />
    //         {memberMenu ? <ExpandLess /> : <ExpandMore />}
    //       </ListItemButton>
    //       <Collapse in={memberMenu} timeout="auto" unmountOnExit>
    //         <List component="div" disablePadding>
    //           <ListItemButton href="/all-members" sx={{ pl: 4 }}>
    //             <ListItemText primary="All Members" />
    //           </ListItemButton>
    //           <ListItemButton href="/member-request" sx={{ pl: 4 }}>
    //             <ListItemText primary="Member Request" />
    //           </ListItemButton>
    //         </List>
    //       </Collapse>
    //     </List>

    //     <List
    //       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    //       component="nav">                  
    //       <ListItemButton onClick={settingsMenuClick}>
    //         <ListItemIcon>
    //           <InboxIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="Account" />
    //         {settingsMenu ? <ExpandLess /> : <ExpandMore />}
    //       </ListItemButton>
    //       <Collapse in={settingsMenu} timeout="auto" unmountOnExit>
    //         <List component="div" disablePadding>
    //           <ListItemButton href="/profile-settings" sx={{ pl: 4 }}>
    //             <ListItemText primary="Profile Settings" />
    //           </ListItemButton>
    //         </List>
    //       </Collapse>
    //     </List>    

    //   </Drawer>
    //   <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    //     <DrawerHeader />
    //     {children}
    //   </Box>
    // </Box>
  )
}

export default BaseLayout