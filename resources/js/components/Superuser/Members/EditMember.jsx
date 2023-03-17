import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Grid, Box, FormGroup, TextField, FormControl, Typography, InputLabel, Select, MenuItem, FormLabel,  Alert, Button } from "@mui/material";
import MainLayout from "../BaseLayout";
import ImageUploader from '../components/ImageUploader';

function EditMember() {
  const pageParams = useParams();
  const [formInput, setFormInput] = useState({
    name: '',
    designation: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
  });
  const [images, setImages] = useState([]);

  const [error, setError] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertContent, setAlertContent] = useState('');

  useEffect(() => {
    getMemberData();

  }, [pageParams.slug, localStorage.getItem('auth_id')]);

  const getMemberData = () => {
    axios.get(`/api/edit-member/${pageParams.slug}`).then(res => {
      if (res.data.status === 200) {
        setFormInput(res.data.get_data);
        setImages(JSON.parse(res.data.get_data.photo));
      }
      else if (res.data.status === 404) {
        console.log(res.message, "message");
      }
    });
  }

  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const getMediaFiles = (e) => {
    setImages(e);
  }

  const updateMember = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem('auth_id');
    const data = {
      photo: images,
      name: formInput.name,
      designation: formInput.designation,
      facebook_url: formInput.facebook_url,
      twitter_url: formInput.twitter_url,
      linkedin_url: formInput.linkedin_url,
      status: 1,
    }
    axios.put(`/api/update-member/${pageParams.slug}`, data).then(res => {
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
            Update Member
          </Typography>
          <Box component={"form"} encType={"multipart/form-data"} onSubmit={updateMember} className="su_form">
            <Grid container>
              <Grid item md={12} lg={3}></Grid>
              <Grid item md={12} lg={6}>
                <FormLabel>Photo</FormLabel>
                <ImageUploader setSelectedFiles={getMediaFiles} />
                <Grid container spacing={2} sx={{ 'marginBottom': 2 }}>
                  {images.map((element, index) => (
                    <Grid key={index} item xs={4} className="photo-preview">
                      <img src={`/storage/` + element} />
                    </Grid>
                  ))}
                </Grid>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={handleInput}
                    value={formInput.name || ''}
                  />
                  <Typography variant="span">{error.name}</Typography>
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Designation"
                    name="designation"
                    onChange={handleInput}
                    value={formInput.designation || ''}
                  />
                  <Typography variant="span">{error.designation}</Typography>
                </FormGroup>

                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Facebook"
                    name="facebook_url"
                    onChange={handleInput}
                    value={formInput.facebook_url || ''}
                  />
                  <Typography variant="span">{error.facebook_url}</Typography>
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Twitter"
                    name="twitter_url"
                    onChange={handleInput}
                    value={formInput.twitter_url || ''}
                  />
                  <Typography variant="span">{error.twitter_url}</Typography>
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Linkedin"
                    name="linkedin_url"
                    onChange={handleInput}
                    value={formInput.linkedin_url || ''}
                  />
                  <Typography variant="span">{error.linkedin_url}</Typography>
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

export default EditMember