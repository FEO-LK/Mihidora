import React from 'react';
import {Grid } from "@mui/material";

export default function PageBanner(props) {

  return (
    <Grid container>
      <img src={props.image} />
    </Grid>
  )
}
 
