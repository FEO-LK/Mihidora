import React from "react";
import { Grid } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

function ListSkeleton8() {

    return (
        <Grid container spacing={2}>
            <Grid item key={1} xs={3}>
                <Skeleton variant="rectangular" height={118} />
                <Skeleton />
                <Skeleton width="60%" />
            </Grid>
            <Grid item key={2} xs={3}>
                <Skeleton variant="rectangular" height={118} />
                <Skeleton />
                <Skeleton width="60%" />
            </Grid>
            <Grid item key={3} xs={3}>
                <Skeleton variant="rectangular" height={118} />
                <Skeleton />
                <Skeleton width="60%" />
            </Grid>
            <Grid item key={4} xs={3}>
                <Skeleton variant="rectangular" height={118} />
                <Skeleton />
                <Skeleton width="60%" />
            </Grid>
            <Grid item key={4} xs={3}>
                <Skeleton variant="rectangular" height={118} />
                <Skeleton />
                <Skeleton width="60%" />
            </Grid>
            <Grid item key={4} xs={3}>
                <Skeleton variant="rectangular" height={118} />
                <Skeleton />
                <Skeleton width="60%" />
            </Grid>
            <Grid item key={4} xs={3}>
                <Skeleton variant="rectangular" height={118} />
                <Skeleton />
                <Skeleton width="60%" />
            </Grid>
            <Grid item key={4} xs={3}>
                <Skeleton variant="rectangular" height={118} />
                <Skeleton />
                <Skeleton width="60%" />
            </Grid>
        </Grid>
    )
}

export default ListSkeleton8