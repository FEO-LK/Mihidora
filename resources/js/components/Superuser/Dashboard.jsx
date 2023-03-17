import React from "react";
import {Grid, Typography} from "@mui/material";
import MainLayout from "./BaseLayout";

function Dashboard() {
    
    return (
        <MainLayout>
            <Grid container justifyContent={"center"}>
                <Grid item>
                    <Typography variant={"h5"}>
                       Super Dashboard
                    </Typography>
                </Grid>
            </Grid>
        </MainLayout>
    )
}

export default Dashboard