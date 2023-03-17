import React, { useState, useEffect } from "react";
import {Grid, TableContainer, Paper, Table, TableBody, Typography, TableHead, TableRow, TableCell, Button, Box } from "@mui/material";
import Modal from '@mui/material/Modal';
import MainLayout from "../BaseLayout";
import axios from 'axios';
import swal from 'sweetalert';
import UserMenu from "../components/submenus/UserMenu";

function NewRequest() {  
  const [UserList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    axios.get('/api/new-request').then(res => {
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
        axios.put(`/api/activate-profile/${id}`).then(res=> {
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

  const viewProfile = (e, id) => {
    setOpen(true);
    console.log(id, 'id')
    return <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
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
                      <TableCell>View</TableCell>
                      <TableCell>Activate</TableCell>
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
                        <TableCell><Button onClick={(e) => viewProfile(e, row.id)}>View Profile</Button></TableCell>
                        <TableCell><Button onClick={(e) => deactivateAccount(e, row.id)}>Activate</Button></TableCell>
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

export default NewRequest