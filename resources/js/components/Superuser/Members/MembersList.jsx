import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Grid, TableContainer, Paper, Table, TableBody, Typography, TableHead, TableRow, TableCell } from "@mui/material";
import MainLayout from "../BaseLayout";
import axios from 'axios';
import UserMenu from "../components/submenus/UserMenu";

function MembersList() {  
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    getAllMembers();
  }, []);

  const getAllMembers = () => {
    axios.get('/api/view-members').then(res => {
      if(res.status == 200) {
        setMemberList(res.data.members);
      }
    });
  }

  return (
    <MainLayout>
      <Grid>
          <Grid item>
              <Typography variant={"h5"}>
                Members
              </Typography>
              <Link to={`/admin/add-new-member`} className="theme-btn">Add New Member</Link>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Designation</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {memberList.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.designation}</TableCell>
                        <TableCell><Link to={`/edit-member/${row.id}`}>Edit</Link></TableCell>
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

export default MembersList