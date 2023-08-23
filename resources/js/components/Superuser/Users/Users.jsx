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
import AllUsers from './AllUsers';
// import { fontWeight } from "@mui/joy/styles/styleFunctionSx";
import OrganizationUsers from './OrganizationUsers';
import PendingUsers from './PendingUsers';
import RejectedUsers from './RejectedUsers';

// function Users() {  
//   const [UserList, setUserList] = useState([]);

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   const getAllUsers = () => {
//     axios.get('/api/view-users').then(res => {
//       if(res.status == 200) {
//         setUserList(res.data.users);
//       }
//     });
//   }

//   const deactivateAccount = (e, id) => {
//     e.preventDefault();
//             const selectedAcc = e.currentTarget;
//         selectedAcc.innerText = 'Deactivating';

//     swal({
//       title: "Are you sure?",
//       text: "You need to deactivate this account?",
//       icon: "warning",
//       buttons: true,
//       dangerMode: true,
//     })
//     .then((willDelete) => {
//       if (willDelete) {
//         axios.put(`/api/deactivate-account/${id}`).then(res=> {
//           if(res.data.status === 200) {
//             console.log('Account deactivated.!');
//             selectedAcc.closest('tr').remove();
//             swal("Poof! Account has been deactivated!", {
//               icon: "success",
//             });
//           }
//           else {
//             console.log('Failed.');
//           }
//         });
//       } else {
//         swal("Your imaginary file is safe!");
//       }
//     });
//   } 

//   return (
//     <MainLayout>
//       <Grid>
//         <UserMenu />
//           <Grid item>
//               <Typography variant={"h5"}>
//                 Users
//               </Typography>
//               <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>ID</TableCell>
//                       <TableCell>Name</TableCell>
//                       <TableCell>Email</TableCell>
//                       {/* <TableCell>Carbs&nbsp;(g)</TableCell> */}
//                       <TableCell>Deactivate</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {UserList.map((row) => (
//                       <TableRow
//                         key={row.name}
//                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                       >
//                         <TableCell component="th" scope="row">{row.id}</TableCell>
//                         <TableCell>{row.name}</TableCell>
//                         <TableCell>{row.email}</TableCell>
//                         {/* <TableCell>{row.name}</TableCell> */}
//                         <TableCell><Button onClick={(e) => deactivateAccount(e, row.id)}>Deactivate</Button></TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//           </Grid>
//       </Grid>
//     </MainLayout>
//   )
// }

// export default Users

function Users() {

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
              <Tab label="Org Users" value="1" />
              <Tab label="All Users" value="2" />
              <Tab label="Pending Requests" value="3" />
              <Tab label="Rejected" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1"><OrganizationUsers /></TabPanel>
          <TabPanel value="2"><AllUsers /></TabPanel>
          <TabPanel value="3"><PendingUsers /></TabPanel>
          <TabPanel value="4"><RejectedUsers /></TabPanel>
        </TabContext>
      </Box>
    </MainLayout>
  )
}

export default Users