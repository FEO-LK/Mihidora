import React, { useState, useEffect } from "react";
import {Grid, Box , TextField, Typography, FormGroup, Alert, Button } from "@mui/material";
import {Link} from 'react-router-dom';
import MainLayout from "./../BaseLayout";
import MenuTab from "./MenuTab";


function Profile(props) {  
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [profileInput, setProfile] = useState ({
    name: '',
		email: '',
    password: '',
    re_password: '',
  });
  const [error, setError] = useState ([]);

  useEffect(() => {
    const user_id = localStorage.getItem('auth_id');
    axios.get(`/api/edit-account/${user_id}`).then(res=> {
      if(res.data.status === 200) {
        setProfile(res.data.profile_data);
      }
      else if(res.data.status === 404) {
        console.log(res.message);
      }
    });
  }, [localStorage.getItem('auth_id')]);

  const handleInput = (e) => {
    e.persist();
    setProfile( {...profileInput, [e.target.name]: e.target.value });
  }

  const updateProfile = (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem('auth_id');
    const data = profileInput;
    axios.put(`/api/update-usercredentials/${user_id}`, data).then(res => {
      if(res.data.status === 200) {
        console.log(res.data.message);
        setAlert(true);
        setAlertType('success');
        setAlertContent(res.data.message);
        setError([]);
      }
      else if(res.data.status === 422) {
        setError(res.data.errors);
      }
      else {
        console.log(res.data.errors);
      }
    });
  }

  return (
    <MainLayout title={"Profile Settings"}>
      <MenuTab />
      <Box component={"form"} onSubmit={updateProfile}>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={6} className="form-col">
            <Typography variant="span" className="form-group-title">Primary Account</Typography>
            <FormGroup className="form-group">  
              <TextField
                type='text'
                fullWidth
                label="Name"
                name="name"
                onChange={handleInput}
                value={profileInput.name}
              />
              <Typography variant="span">{error.name}</Typography>
            </FormGroup>
            <FormGroup className="form-group">  
              <TextField
                type='email'
                fullWidth
                label="Email"
                name="email"
                onChange={handleInput}
                value={profileInput.email}
              />
              <Typography variant="span">{error.email}</Typography>
            </FormGroup>
            <Button
              fullWidth
              variant={"outlined"}
              type={"submit"}
              className="user__theme-btn"
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={6} className="form-col">
            <Typography variant="span" className="form-group-title">Change Password</Typography>
            <FormGroup className="form-group">  
              <TextField
                type='password'
                fullWidth
                label="New password"
                name="password"
                onChange={handleInput}
                value={profileInput.password}
              />
              <Typography variant="span">{error.password}</Typography>
            </FormGroup>
            <FormGroup className="form-group">  
              <TextField
                type='password'
                fullWidth
                label="Confirm new password"
                name="re_password"
                onChange={handleInput}
                value={profileInput.re_password}
              />
              <Typography variant="span">{error.re_password}</Typography>
            </FormGroup>
            <Button
              fullWidth
              variant={"outlined"}
              type={"submit"}
              className="user__theme-btn"
            >
              Update Password
            </Button>
            {alert ? <Alert severity={alertType}>{alertContent}</Alert> : <></>}
          </Grid>
        </Grid>
        
      </Box>
    </MainLayout>
  )
}

export default Profile