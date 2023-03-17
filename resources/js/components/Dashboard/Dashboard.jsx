import React from "react";
import {Grid, Typography} from "@mui/material";
import MainLayout from "./BaseLayout";

function Dashboard() {
    
    return (
        <MainLayout>
            <Typography style={{color: '#535353', fontSize: 17, fontWeight: 600, margin: '0 0 15px'}}>Dashboard</Typography>
        </MainLayout>
    )
}

export default Dashboard