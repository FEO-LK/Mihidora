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
// import { fontWeight } from "@mui/joy/styles/styleFunctionSx";

import AnalyticsRegistrations from './AnalyticsRegistrations';
import AnalyticsSubmissions from './AnalyticsSubmissions';
import StorageAnalytics from './StorageAnalytics';

function Analytics() {

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
                  backgroundColor: "#93AA40",
                }
              }}
            >
              <Tab
                label="Registrations"
                value="1"
                sx={{
                  "&.Mui-selected": {
                    color: "black",
                    fontWeight: "bold"
                  }
                }}
              />
              <Tab
                label="Submissions"
                value="2"
                sx={{
                  "&.Mui-selected": {
                    color: "black",
                    fontWeight: "bold"
                  }
                }}
              />
              <Tab
                label="Storage"
                value="3"
                sx={{
                  "&.Mui-selected": {
                    color: "black",
                    fontWeight: "bold"
                  }
                }}
              />
            </TabList>
          </Box>
          
          <TabPanel value="1"><StorageAnalytics /></TabPanel>
          <TabPanel value="2"><AnalyticsRegistrations /></TabPanel>
          <TabPanel value="3"><AnalyticsSubmissions /></TabPanel>
          
          
        </TabContext>
      </Box>
    </MainLayout>
  )
}

export default Analytics;