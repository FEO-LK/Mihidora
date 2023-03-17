import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Alert, Grid, TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell, Button } from "@mui/material";
import BaseLayout from "../BaseLayout";
import MenuTab from './MenuTab';
import Pagination from "../components/Pagination";
import AlertDialog from "../components/AlertDialog";

export default function ProjectList() {
  const [projectList, setProjectList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
	useEffect(() => {
    getProjectList();

  }, []);

  const getProjectList = () => {
		axios.get(`/api/projects-by-organization`).then(res => {
			if(res.data.status === 200) {
				setProjectList(res.data.projects);
			}
		});
	}

  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [error, setError] = useState([]);

  const deleteRecord = (rid) => {
    axios.get(`/api/delete-project/${rid}`).then(res => {
      if (res.data.status === 200) {
        setAlert(true);
        setAlertType('success');
        setAlertContent(res.data.message);
        setError([]);
        getProjectList();
      } else if (res.data.status === 422) {
          setError(res.data.errors);
      } else {
          console.log(res.data.errors);
      }
    });
  }
  // const [postsPerPage] = useState(12);
  // const howManyPages = Math.ceil(projectList.length/postsPerPage);
  const howManyPages = 10;

  return (
    <BaseLayout title={"Projects"}>
      <MenuTab />
      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectList.map((row, item) => (
                <TableRow
                  key={item}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item+1}</TableCell>
                  <TableCell><Link to={`/project/${row.slug}`} target="_blank">{row.project_title}</Link></TableCell>
                  <TableCell>{row.start_date}</TableCell>
                  <TableCell>{row.end_date}</TableCell>
                  <TableCell>
                    <Link className="table-btn" to={`/edit-project/${row.id}`}>EDIT</Link>
                  </TableCell>
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

