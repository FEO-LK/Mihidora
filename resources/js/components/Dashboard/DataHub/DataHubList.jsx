import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Alert, Grid, TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import MainLayout from "../BaseLayout";
import MenuTab from './MenuTab';
import Pagination from "../components/Pagination";
import AlertDialog from "../components/AlertDialog";


export default function DataHubList() {
  const [dataHubList, setDataHubList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getDatahubList();

  }, []);

  const getDatahubList = () => {
    axios.get(`/api/datahub-by-organization`).then(res => {
      if(res.data.status === 200) {
        setDataHubList(res.data.get_data);
      }
    });
  }

  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [error, setError] = useState([]);

  const deleteRecord = (rid) => {
    axios.get(`/api/delete-data/${rid}`).then(res => {
      if (res.data.status === 200) {
        setAlert(true);
        setAlertType('success');
        setAlertContent(res.data.message);
        setError([]);
        getDatahubList();
      } else if (res.data.status === 422) {
          setError(res.data.errors);
      } else {
          console.log(res.data.errors);
      }
    });
  }

  //const [postsPerPage] = useState(12);
  const howManyPages =  10;

  return (
    <MainLayout title={"All Data and Educational Material"}>
      <MenuTab />
      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>&nbsp;</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataHubList.map((row, item) => (
                <TableRow
                  key={item}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item+1}</TableCell>
                  <TableCell><Link to={`/datahub/${row.slug}`} target="_blank">{row.title}</Link></TableCell>
                  <TableCell>{row.author}</TableCell>
                  <TableCell><Link className="table-btn" to={`/edit-datahub/${row.id}`}>EDIT</Link></TableCell>
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
