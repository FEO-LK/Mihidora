import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Alert, Grid, TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell, Button } from "@mui/material";
import MainLayout from "../BaseLayout";
import MenuTab from './MenuTab';
import Pagination from "../components/Pagination";
import AlertDialog from "../components/AlertDialog";

export default function ClassifiedList() {
  const user_id = localStorage.getItem('auth_id');

  const [classifiedList, setClassifiedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    getClassifiedList();
  }, []);

  const getClassifiedList = () => {
    axios.get(`/api/list-classifieds/${user_id}`).then(res => {
      if(res.data.status === 200) {
        console.log(res.data);
        setClassifiedList(res.data.classifieds);
      }
    });
  }

  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [error, setError] = useState([]);

  const deleteRecord = (rid) => {
    axios.get(`/api/delete-classified/${rid}`).then(res => {
      if (res.data.status === 200) {
        setAlert(true);
        setAlertType('success');
        setAlertContent(res.data.message);
        setError([]);
        getClassifiedList();
      } else if (res.data.status === 422) {
          setError(res.data.errors);
      } else {
          console.log(res.data.errors);
      }
    });
  }

  const [postsPerPage] = useState(100);
  const howManyPages = Math.ceil(classifiedList.length/100);

  return (
    <MainLayout title={"Resource Exchange"}>
      <MenuTab />
      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classifiedList.map((row, item) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item+1}</TableCell>
                  <TableCell><Link
                      to = {`/${row.type === 1 ? 'resource-exchange-job' : row.type === 2 ? 'resource-exchange-proposal' : row.type === 3 ? 'resource-exchange-supplier' :row.type === 4 && 'resource-exchange-resource-sharing'}/${row.slug}`}
                  >{row.title}</Link></TableCell>
                  <TableCell>
                    { row.type == 1 ? 'Job advertisement':'' }
                    { row.type == 2 ? 'Grant and RFPs':'' }
                    { row.type == 3 ? 'Green/Sustainable Suppliers':'' }
                    { row.type == 4 ? 'Resource pool':'' }
                  </TableCell>
                  <TableCell>{row.updated_at}</TableCell>
                  <TableCell><Link className="table-btn" to={`/edit-classified/${row.id}`}>Edit</Link></TableCell>
                  <TableCell><AlertDialog id={row.id}  agreeonclick={() => deleteRecord(row.id)} /></TableCell>
                </TableRow>
              ))} 
            </TableBody>
          </Table>
        </TableContainer>
        {alert ? <Alert className="response-alert" severity={alertType}>{alertContent}</Alert> : <></>}
        <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage}/>

      </Grid>
    </MainLayout>
  )
}
