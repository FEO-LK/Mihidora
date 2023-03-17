import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Grid, TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell, MenuItem, Select } from "@mui/material";
import BaseLayout from "../BaseLayout";
import MenuTab from './MenuTab';
import Pagination from "../components/Pagination";

export default function MemberRequest() {
  const [memberList, setMemberList] = useState([]);
  const [memberStatus, setMemberStatus] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //const user_id = localStorage.getItem('auth_id');

	useEffect(() => {
    getMemberList();

  }, []);

  const getMemberList = () => {
		axios.get(`/api/get-user-request`).then(res => {
			if(res.data.status === 200) {
				setMemberList(res.data.user_request);
			}
		});
	}

  const handleMemberStatus = (rowid, e) => {
    const data = {
      status: e.target.value,
    }
    axios.put(`/api/update-member-request/${rowid}`, data).then(res => {
			if(res.data.status === 200) {
				window.location.reload();
			}
		});
  };

  //const [postsPerPage] = useState(12);
  //const howManyPages = Math.ceil(projectList.length/postsPerPage);
  const howManyPages = Math.ceil(memberList.length / 100);

  return (
    <BaseLayout title={"Member List"}>
      <MenuTab />
      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Request Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberList.map((row, item) => (
                <TableRow
                  key={item}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item+1}</TableCell>
                  <TableCell><Link to={``}>{row.name}</Link></TableCell>
                  <TableCell><Link to={``}>{row.email}</Link></TableCell>
                  <TableCell>{row.created_at}</TableCell>
                  <TableCell>
                    { row.status == 0 ? 'rejected':'' }
                    { row.status == 1 ? 'Approved':'' }
                    { row.status == 2 ? 'Pending':'' }
                  </TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      value={memberStatus}
                      onChange={(e) => handleMemberStatus(row.id, e)}
                    >
                      <MenuItem value={1}>Approve</MenuItem>
                      <MenuItem value={2}>Pending</MenuItem>
                      <MenuItem value={0}>Rejecte</MenuItem>
                    </Select> 
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage}/>

      </Grid>
    </BaseLayout>
  )
}

