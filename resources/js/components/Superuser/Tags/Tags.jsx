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
import { fontWeight } from "@mui/joy/styles/styleFunctionSx";

import TagsLevel1 from './TagsLevel1';
import TagsLevel2 from './TagsLevel2';
import TagsLevel3 from "./TagsLevel3";
import TagsLevel4 from "./TagsLevel4";

function Tags() {

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
              <Tab label="Level 1" value="1" />
              <Tab label="Level 2" value="2" />
              <Tab label="Level 3" value="3" />
              <Tab label="Level 4" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1"><TagsLevel1 /></TabPanel>
          <TabPanel value="2"><TagsLevel2 /></TabPanel>
          <TabPanel value="3"><TagsLevel3 /></TabPanel>
          <TabPanel value="4"><TagsLevel4 /></TabPanel>
        </TabContext>
      </Box>
    </MainLayout>
  )
}

export default Tags;