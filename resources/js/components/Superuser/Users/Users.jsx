import React, { useState, useEffect } from "react";
import {Grid, TableContainer, Paper, Table, TableBody, Typography, TableHead, TableRow, TableCell, Button } from "@mui/material";
import MainLayout from "../BaseLayout";
import axios from 'axios';
import swal from 'sweetalert';
import UserMenu from "../components/submenus/UserMenu";

function Users() {  
  const [UserList, setUserList] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    axios.get('/api/view-users').then(res => {
      if(res.status == 200) {
        setUserList(res.data.users);
      }
    });
  }

  const deactivateAccount = (e, id) => {
    e.preventDefault();
            const selectedAcc = e.currentTarget;
        selectedAcc.innerText = 'Deactivating';

    swal({
      title: "Are you sure?",
      text: "You need to deactivate this account?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.put(`/api/deactivate-account/${id}`).then(res=> {
          if(res.data.status === 200) {
            console.log('Account deactivated.!');
            selectedAcc.closest('tr').remove();
            swal("Poof! Account has been deactivated!", {
              icon: "success",
            });
          }
          else {
            console.log('Failed.');
          }
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  } 

  return (
    <MainLayout>
      <Grid>
        <UserMenu />
          <Grid item>
              <Typography variant={"h5"}>
                Users
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      {/* <TableCell>Carbs&nbsp;(g)</TableCell> */}
                      <TableCell>Deactivate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {UserList.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        {/* <TableCell>{row.name}</TableCell> */}
                        <TableCell><Button onClick={(e) => deactivateAccount(e, row.id)}>Deactivate</Button></TableCell>
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

export default Users