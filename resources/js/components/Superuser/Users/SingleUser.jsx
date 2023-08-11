import React, { useState, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainLayout from "../BaseLayout";
import axios from 'axios';
import swal from 'sweetalert';
import UserMenu from "../components/submenus/UserMenu";
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import AllUsers from './AllUsers';
import OrganizationUsers from './OrganizationUsers';


function SingleUser() {

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <MainLayout>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#93AA40"
                }
              }}
            >
              <Tab label="Org Users" value="1" />
              <Tab label="All Users" value="2" />
              <Tab label="Pending Requests" value="3" />
              <Tab label="Rejected" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One 1</TabPanel>
          <TabPanel value="2">Item Two 2</TabPanel>
          <TabPanel value="2">Item Three 3</TabPanel>
          <TabPanel value="3">Item Four</TabPanel>
        </TabContext>
      </Box>
    </MainLayout>
  )
}

export default SingleUser