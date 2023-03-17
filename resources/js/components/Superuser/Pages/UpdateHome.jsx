import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Grid, Box, FormGroup, TextField, FormControl, Typography, InputLabel, Select, MenuItem, FormLabel,  Alert, Button } from "@mui/material";
import MainLayout from "../BaseLayout";
import ImageUploader from '../components/ImageUploader';


function UpdateHome() {
  const pageParams = useParams();
  const [exploreTitle, setExploreTitle] = useState([]);
  const [projectDescription, setProjectDescription] = useState([]);
  const [dataDescription, setDataDescription] = useState([]);
  const [resourceDescription, setResourceDescription] = useState([]);
  const [elearningDescription, setElearningDescription] = useState([]);
  const [whatsonTitle, setWhatsonTitle] = useState([]);
  const [photos, setPhotos] = useState([]);

  const [error, setError] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertContent, setAlertContent] = useState('');

  
  useEffect(() => {
    getPageData();

  }, [pageParams.slug, localStorage.getItem('auth_id')]);

  const getPageData = () => {
    axios.get(`/api/edit-hopmepage/home`).then(res => {
      if (res.data.status === 200) {
        setExploreTitle(res.data.get_data[0].value);
        setProjectDescription(res.data.get_data[1].value);
        setDataDescription(res.data.get_data[2].value);
        setResourceDescription(res.data.get_data[3].value);
        setElearningDescription(res.data.get_data[4].value);
        setWhatsonTitle(res.data.get_data[5].value);
        setPhotos(JSON.parse(res.data.get_data[6].value));

      }
      else if (res.data.status === 404) {
        console.log(res.message, "message");
      }
    });
  }

  const handleExploreTitle = (e) => {
    setExploreTitle(e.target.value);
  }

  const handleProjectDescription = (e) => {
    setProjectDescription(e.target.value);
  }

  const handleDataDescription = (e) => {
    setDataDescription(e.target.value);
  }

  const handleResourceDescription = (e) => {
    setResourceDescription(e.target.value);
  }

  const handleElearningDescription = (e) => {
    setElearningDescription(e.target.value);
  }

  const handleWhatsonTitle = (e) => {
    setWhatsonTitle(e.target.value);
  }

  const getMediaFiles = (e) => {
    setPhotos(e);
  }

  const updatePage = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem('auth_id');
    const data = {
      user_id: user_id,
      banners: photos,
      explore_title: exploreTitle,
      project_description: projectDescription,
      data_description: dataDescription,
      resource_description: resourceDescription,
      elearning_description: elearningDescription,
      whatson_title: whatsonTitle
    }
    axios.put(`/api/update-homepage/home`, data).then(res => {
      if (res.data.status === 200) {
        setAlert(true);
        setAlertType('success');
        setAlertContent(res.data.message);
        setError([]);
      }
      else if (res.data.status === 422) {
        setError(res.data.errors);
      }
      else {
        console.log(res.data.errors);
      }
    });
  }

  return (
    <MainLayout>
      <Grid>
        <Grid item>
          <Typography variant={"h5"}>
            Update Home page
          </Typography>
          <Box component={"form"} encType={"multipart/form-data"} onSubmit={updatePage} className="su_form">
            <Grid container>
              <Grid item md={12} lg={3}></Grid>
              <Grid item md={12} lg={6}>
                <FormLabel>Banners</FormLabel>
                <ImageUploader setSelectedFiles={getMediaFiles} />
                <Grid container spacing={2} sx={{ 'marginBottom': 2 }}>
                  {photos.map((element, index) => (
                    <Grid key={index} item xs={4} className="photo-preview">
                      <img src={`/storage/` + element} />
                    </Grid>
                  ))}
                </Grid>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Explore Title"
                    name="explore_title"
                    onChange={handleExploreTitle}
                    value={exploreTitle || ''}
                  />
                  <Typography variant="span">{error.explore_title}</Typography>
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    multiline
                    rows={3}
                    type='text'
                    fullWidth
                    label="Project Description"
                    name="project_description"
                    onChange={handleProjectDescription}
                    value={projectDescription || ''}
                  />
                  <Typography variant="span">{error.project_description}</Typography>
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    multiline
                    rows={3}
                    type='text'
                    fullWidth
                    label="Data Description"
                    name="data_description"
                    onChange={handleDataDescription}
                    value={dataDescription || ''}
                  />
                  <Typography variant="span">{error.data_description}</Typography>
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    multiline
                    rows={3}
                    type='text'
                    fullWidth
                    label="Resource Description"
                    name="resource_description"
                    onChange={handleResourceDescription}
                    value={resourceDescription || ''}
                  />
                  <Typography variant="span">{error.resource_description}</Typography>
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    multiline
                    rows={3}
                    type='text'
                    fullWidth
                    label="E-learning Description"
                    name="elearning_description"
                    onChange={handleElearningDescription}
                    value={elearningDescription || ''}
                  />
                  <Typography variant="span">{error.elearning_description}</Typography>
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Whatson Title"
                    name="whatson_title"
                    onChange={handleWhatsonTitle}
                    value={whatsonTitle || ''}
                  />
                  <Typography variant="span">{error.whatson_title}</Typography>
                </FormGroup>

                <Button
                  fullWidth
                  variant={"outlined"}
                  type={"submit"}
                  className="user__theme-btn"
                >
                  Update Page
                </Button>

                {alert ? <Alert className="response-alert" severity={alertType}>{alertContent}</Alert> : <></>}

              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default UpdateHome