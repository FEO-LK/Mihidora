import React, { useState, useEffect } from "react";
import {Grid, TableContainer, Paper, Table, TableBody, Typography, TableHead, TableRow, TableCell, Link } from "@mui/material";
import MainLayout from "../BaseLayout";
import axios from 'axios';

function Pages() {  
  const [pageList, setPageList] = useState([]);

  useEffect(() => {
    getPageList();

  }, []);

  const getPageList = () => {
    axios.get('/api/page-list').then(res => {
      if(res.status == 200) {
        setPageList(res.data.get_data);
      }
    });
  }

  return (
    <MainLayout>
      <Grid>
        <Grid item>
            <Typography variant={"h5"}>
              Pages
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Template</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pageList.map((row, key) => (
                    <TableRow
                      key={key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell><Link href={row.slug == 'home' ? `/` : `/${row.slug}`} target="_blank">{row.title}</Link></TableCell>
                      <TableCell>{row.template}</TableCell>
                      <TableCell><Link href={`/edit-page/${row.id}`} className="table-btn">EDIT</Link></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default Pages