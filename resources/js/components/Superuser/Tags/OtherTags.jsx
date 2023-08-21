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
import SubjectTags from "./SubjectTags";
import ExtraTags from "./ExtraTags";

function OtherTags() {

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
              <Tab label="Subject Tags" value="1" />
              <Tab label="Extra Tags" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><SubjectTags /></TabPanel>
          <TabPanel value="2"><ExtraTags /></TabPanel>
        </TabContext>
      </Box>
    </MainLayout>
  )
}

export default OtherTags;