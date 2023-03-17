import React, { useState, useEffect } from "react";
import {Grid, Box , TextField, Typography, Button, FormGroup, Alert } from "@mui/material";
import MainLayout from "./../BaseLayout";
import MenuTab from "./MenuTab";
import Map from '../Map'

function Staff(props) {  
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [locations, setLocation] = useState([]);
  const [orgId, setOrgId] = useState("");
  const [orgContactInput, setOrgContactInput] = useState ({
    staffprofile_active_no: '',
    staffprofile_percentage_paid_staff: '',
    staffprofile_volunteers_no: '',
    primary_activities: '',
    main_delivery_mode: '',
    existing_profiles: '',
    locations: [],
  });
  const [error, setError] = useState ([]);
  const position = [51.505, -0.09];

  useEffect(() => {
    getStaffData();

  }, [localStorage.getItem('auth_id')]);

  const lanlat =(value) => {
    setLocation(value);
  }

  const getStaffData = () => {
    //const user_id = localStorage.getItem('auth_id');
    const org_id = localStorage.getItem('org_id');
    axios.get(`/api/edit-organisation/${org_id}`).then(res=> {
      if(res.data.status === 200) {
        setOrgId(res.data.get_data.id);
        setLocation(JSON.parse(res.data.get_data.locations));
        setOrgContactInput(res.data.get_data);
      }
      else if(res.data.status === 404) {
        console.log(res.message);
      }
    });
  } 

  const handleInput = (e) => {
    e.persist();
    setOrgContactInput( {...orgContactInput, [e.target.name]: e.target.value });
  }

  const updateStaffProfile = (e) => {
    e.preventDefault();
    const data = {
      staffprofile_active_no: orgContactInput.staffprofile_active_no,
      staffprofile_percentage_paid_staff: orgContactInput.staffprofile_percentage_paid_staff,
      staffprofile_volunteers_no: orgContactInput.staffprofile_volunteers_no,
      primary_activities: orgContactInput.primary_activities,
      main_delivery_mode: orgContactInput.main_delivery_mode,
      existing_profiles: orgContactInput.existing_profiles,
      locations: locations,
    }
    axios.put(`/api/update-staff-profile/${orgId}`, data).then(res => {
      if (res.data.status === 200) {
        setAlertType('success');
        setAlertContent(res.data.message);
        setAlert(true);
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
    <MainLayout title={"Staff"}>
      <MenuTab />
      <Box component={"form"} onSubmit={updateStaffProfile}>
        <Grid container>
          <Grid item xs={8} className="form-col">
            <Typography variant="span" className="form-group-title">Staff Profile</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormGroup className="form-group">  
                  <TextField
                    type='number'
                    fullWidth
                    label="Number of people active in the organisations"
                    name="staffprofile_active_no"
                    onChange={handleInput}
                    value={orgContactInput.staffprofile_active_no || ''}
                  />
                  <Typography variant="span">{error.staffprofile_active_no}</Typography>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup className="form-group">  
                  <TextField
                    type='number'
                    fullWidth
                    label="% of paid staff (full or part time)"
                    name="staffprofile_percentage_paid_staff"
                    onChange={handleInput}
                    value={orgContactInput.staffprofile_percentage_paid_staff || ''}
                  />
                  <Typography variant="span">{error.staffprofile_percentage_paid_staff}</Typography>
                </FormGroup>
              </Grid>
            </Grid>
            <FormGroup className="form-group">  
              <TextField
                type='number'
                fullWidth
                label="Percentage of volunteer workforce"
                name="staffprofile_volunteers_no"
                onChange={handleInput}
                value={orgContactInput.staffprofile_volunteers_no || ''}
              />
              <Typography variant="span">{error.staffprofile_volunteers_no}</Typography>
            </FormGroup>
            <FormGroup className="form-group">  
              <TextField
                type='text'
                fullWidth
                label="Primary Activities"
                name="primary_activities"
                onChange={handleInput}
                value={orgContactInput.primary_activities || ''}
              />
              <Typography variant="span">{error.primary_activities}</Typography>
            </FormGroup>
            <FormGroup className="form-group">  
              <TextField
                type='text'
                fullWidth
                label="Delivery Mode"
                name="main_delivery_mode"
                onChange={handleInput}
                value={orgContactInput.main_delivery_mode || ''}
              />
              <Typography variant="span">{error.main_delivery_mode}</Typography>
            </FormGroup>
            <FormGroup className="form-group">  
              <TextField
                type='text'
                fullWidth
                label="Links to existing online profiles"
                name="existing_profiles"
                onChange={handleInput}
                value={orgContactInput.existing_profiles || ''}
              />
              <Typography variant="span">{error.existing_profiles}</Typography>
            </FormGroup>

            <Map zoom={8} center={{ lat: 7.873054, lng: 80.771797 }} getLanLat={lanlat} listLangLat={locations}/>

            <Button
              fullWidth
              variant={"outlined"}
              type={"submit"}
              className="user__theme-btn"
              sx={{marginY: 2}}
            >
              Update
            </Button>

            {alert ? <Alert severity={alertType}>{alertContent}</Alert> : <></>}

          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  )
}

export default Staff