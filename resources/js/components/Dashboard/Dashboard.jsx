import React from "react";
import {Grid, Typography} from "@mui/material";
import MainLayout from "./BaseLayout";
// import StorageCounter from './components/StorageCounter';

function Dashboard() {
    
    return (
        <MainLayout>
            <Typography style={{color: '#535353', fontSize: 17, fontWeight: 600, margin: '0 0 15px'}}>Dashboard</Typography>
            {/* <StorageCounter value={10} /> */}
        </MainLayout>
    )
}

export default Dashboard