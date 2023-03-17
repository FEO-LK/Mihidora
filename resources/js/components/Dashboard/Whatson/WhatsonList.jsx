import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {Alert, Grid, TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import BaseLayout from "../BaseLayout";
import MenuTab from './MenuTab';
import Pagination from "../components/Pagination";
import AlertDialog from "../components/AlertDialog";

export default function WhatsonList() {
  const [dataList, setDataList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
    getWhatsonList();
    getProjectList();

  }, []);

  const getProjectList = () => {
    axios.get(`/api/projects-by-organization`).then(res => {
      if (res.data.status === 200) {
        setProjectList(res.data.projects);
      }
      else if (res.data.status === 404) {
        console.log(res.message, "message");
      }
    });
  }

  const getWhatsonList = () => {
		axios.get(`/api/whatson-by-organization`).then(res => {
			if(res.data.status === 200) {
				setDataList(res.data.get_data);
			}
		});
	}

  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [error, setError] = useState([]);

  const deleteRecord = (rid) => {
    axios.get(`/api/delete-whatson/${rid}`).then(res => {
      if (res.data.status === 200) {
        setAlert(true);
        setAlertType('success');
        setAlertContent(res.data.message);
        setError([]);
        getWhatsonList();
        getProjectList();
      } else if (res.data.status === 422) {
          setError(res.data.errors);
      } else {
          console.log(res.data.errors);
      }
    });
  }

  const howManyPages =  10;

  return (
    <BaseLayout title={"Projects"}>
      <MenuTab />
      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Project table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((row, item) => (
                <TableRow
                  key={item}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item+1}</TableCell>
                  <TableCell><Link
                      to = {`/${row.type === 1 ? 'whatson-event' : row.type === 2 ? 'whatson-media-and-advocacy' :row.type === 3 && 'whatson-volunteer-opportunity'}/${row.slug}`}
                  >{row.title}</Link></TableCell>
                  <TableCell>{ projectList.map (item => item.id == row.project_id ? item.project_title : '' )}</TableCell>
                  <TableCell>
                    { row.type == 1 ? 'Event':'' }
                    { row.type == 2 ? 'Media Article':'' }
                    { row.type == 3 ? 'Volunteer Opportunity':'' }
                    </TableCell>
                  <TableCell>{row.start_date_time}</TableCell>
                  <TableCell><Link className="table-btn" to={`/edit-whatson/${row.id}`}>Edit</Link></TableCell>
                  <TableCell><AlertDialog id={row.id}  agreeonclick={() => deleteRecord(row.id)} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {alert ? <Alert className="response-alert" severity={alertType}>{alertContent}</Alert> : <></>}
        <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage}/>
      </Grid>
    </BaseLayout>
  )
}

