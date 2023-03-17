import React, { useState, useEffect } from "react";
import { Grid, Box, TextField, Typography, Button, FormGroup, Alert, FormLabel, FormControl } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MainLayout from "./../BaseLayout";
import MenuTab from "./MenuTab";

function Contact(props) {
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [orgId, setOrgId] = useState('');
  const [socialForms, setSocialForms] = useState([{ social_media: ""}]);
  const [orgContactInput, setOrgContactInput] = useState({
    contact_number: '',
    contact_person: '',
    email: '',
    website: '',
    address: '',
    contact_nos_hod: '',
    contact_name_hod: '',
    contact_designation_hod: '',
    contact_no_focalpoint: '',
    contact_nos_focalpoint: '',
    contact_name_focalpoint: '',
    contact_designation_focalpoint: '',
    contact_email_focalpoint: '',
    contact_linkedin_focalpoint: '',
  });
  const [error, setError] = useState([]);

  useEffect(() => {
    getContactData();

  }, [localStorage.getItem('auth_id')]);

  const getContactData = () => {
    //const user_id = localStorage.getItem('auth_id');
    const org_id = localStorage.getItem('org_id');
    axios.get(`/api/edit-organisation/${org_id}`).then(res => {
      if (res.data.status === 200) {
        setOrgId(res.data.get_data.id);
        setOrgContactInput(res.data.get_data);
        setSocialForms(JSON.parse(res.data.get_data.social_media));
      }
      else if (res.data.status === 404) {
        console.log(res.message, "message");
      }
    });
  }

  const handleInput = (e) => {
    e.persist();
    setOrgContactInput({ ...orgContactInput, [e.target.name]: e.target.value });
  }

  const addSocialFields = () => {
    let newfield = { social_media: '' }
    setSocialForms([...socialForms, newfield])
  }
  const removeSocialFields = (index) => {
    let data = [...socialForms];
    data.splice(index, 1)
    setSocialForms(data)
  }
  const handleChange = (index, event) => {
    let data = [...socialForms];
    data[index][event.target.name] = event.target.value;
    setSocialForms(data);
  }

  const updateContactData = (e) => {
    e.preventDefault();
    const data = {
      contact_number: orgContactInput.contact_number,
      contact_person: orgContactInput.contact_person,
      email: orgContactInput.email,
      website: orgContactInput.website,
      address: orgContactInput.address,
      social_media: socialForms,
      contact_nos_hod: orgContactInput.contact_nos_hod,
      contact_name_hod: orgContactInput.contact_name_hod,
      contact_designation_hod: orgContactInput.contact_designation_hod,
      contact_no_focalpoint: orgContactInput.contact_no_focalpoint,
      contact_nos_focalpoint: orgContactInput.contact_nos_focalpoint,
      contact_name_focalpoint: orgContactInput.contact_name_focalpoint,
      contact_designation_focalpoint: orgContactInput.contact_designation_focalpoint,
      contact_email_focalpoint: orgContactInput.contact_email_focalpoint,
      contact_linkedin_focalpoint: orgContactInput.contact_linkedin_focalpoint,
    }
    axios.put(`/api/update-org-contact-data/${orgId}`, data).then(res => {
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
        console.log(res.data.errors, "error");
      }
    });
  }

  return (
    <MainLayout title={"Contact"}>
      <MenuTab />
      <Box component={"form"} onSubmit={updateContactData}>
        <Grid container>
          <Grid item xs={8} className="form-col">
            <Typography variant="span" className="form-group-title">Primary Contacts</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormGroup className="form-group">
                  <TextField
                    type='tel'
                    fullWidth
                    label="Contact No"
                    name="contact_number"
                    onChange={handleInput}
                    value={orgContactInput.contact_number || ''}
                  />
                  <Typography variant="span">{error.contact_number}</Typography>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Contact Person"
                    name="contact_person"
                    onChange={handleInput}
                    value={orgContactInput.contact_person || ''}
                  />
                  <Typography variant="span">{error.contact_person}</Typography>
                </FormGroup>
              </Grid>
            </Grid>
            <FormGroup className="form-group">
              <TextField
                type='email'
                fullWidth
                label="Email"
                name="email"
                onChange={handleInput}
                value={orgContactInput.email || ''}
              />
              <Typography variant="span">{error.email}</Typography>
            </FormGroup>
            <FormGroup className="form-group">
              <TextField
                type='url'
                fullWidth
                label="Website"
                name="website"
                onChange={handleInput}
                value={orgContactInput.website || ''}
              />
              <Typography variant="span">{error.website}</Typography>
            </FormGroup>
            <FormGroup className="form-group">
              <TextField
                type='text'
                fullWidth
                label="Address"
                name="address"
                onChange={handleInput}
                value={orgContactInput.address || ''}
              />
              <Typography variant="span">{error.address}</Typography>
            </FormGroup>

            <FormControl className="sep-label-form for-dynamic-fields">
              <FormLabel id="social_media">Social Media</FormLabel>
              {socialForms.map((input, index) => {
                return (
                  <div key={index} className="form-group dynamic-field">
                    <TextField 
                      fullWidth
                      type='text'
                      size="small"
                      name='social_media'
                      value={input.social_media || ''}
                      onChange={event => handleChange(index, event)}
                    />
                    {
                      index ?
                        <button type="button" className="button remove" onClick={() => removeSocialFields(index)}><DeleteIcon /></button>
                      : null
                    }
                  </div>
                )
              })}
              
              <Button onClick={() => addSocialFields()}>Add New Field</Button>
            </FormControl>

          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8} className="form-col">
            <Typography variant="span" className="form-group-title">Contact details of the Head of the Organisation</Typography>
            <FormGroup className="form-group">
              <TextField
                type='tel'
                fullWidth
                label="Contact No"
                name="contact_nos_hod"
                onChange={handleInput}
                value={orgContactInput.contact_nos_hod || ''}
              />
              <Typography variant="span">{error.contact_nos_hod}</Typography>
            </FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Person Name"
                    name="contact_name_hod"
                    onChange={handleInput}
                    value={orgContactInput.contact_name_hod || ''}
                  />
                  <Typography variant="span">{error.contact_name_hod}</Typography>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Designation"
                    name="contact_designation_hod"
                    onChange={handleInput}
                    value={orgContactInput.contact_designation_hod || ''}
                  />
                  <Typography variant="span">{error.contact_designation_hod}</Typography>
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8} className="form-col">
            <Typography variant="span" className="form-group-title">Contact details of the Focal Point for the Organisation</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormGroup className="form-group">
                  <TextField
                    type="tel"
                    fullWidth
                    label="Contact No"
                    name="contact_no_focalpoint"
                    onChange={handleInput}
                    value={orgContactInput.contact_no_focalpoint || ''}
                  />
                  <Typography variant="span">{error.contact_no_focalpoint}</Typography>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup className="form-group">
                  <TextField
                    type="tel"
                    fullWidth
                    label="Contact No Extra"
                    name="contact_nos_focalpoint"
                    onChange={handleInput}
                    value={orgContactInput.contact_nos_focalpoint || ''}
                  />
                  <Typography variant="span">{error.contact_nos_focalpoint}</Typography>
                </FormGroup>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormGroup className="form-group">
                  <TextField
                    type="text"
                    fullWidth
                    label="Person Name"
                    name="contact_name_focalpoint"
                    onChange={handleInput}
                    value={orgContactInput.contact_name_focalpoint || ''}
                  />
                  <Typography variant="span">{error.contact_name_focalpoint}</Typography>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup className="form-group">
                  <TextField
                    type="text"
                    fullWidth
                    label="Designation"
                    name="contact_designation_focalpoint"
                    onChange={handleInput}
                    value={orgContactInput.contact_designation_focalpoint || ''}
                  />
                  <Typography variant="span">{error.contact_designation_focalpoint}</Typography>
                </FormGroup>
              </Grid>
            </Grid>
            <FormGroup className="form-group">
              <TextField
                type="email"
                fullWidth
                label="Email"
                name="contact_email_focalpoint"
                onChange={handleInput}
                value={orgContactInput.contact_email_focalpoint || ''}
              />
              <Typography variant="span">{error.contact_email_focalpoint}</Typography>
            </FormGroup>
            <FormGroup className="form-group">
              <TextField
                type="url"
                fullWidth
                label="LinkedIn Profile"
                name="contact_linkedin_focalpoint"
                onChange={handleInput}
                value={orgContactInput.contact_linkedin_focalpoint}
              />
              <Typography variant="span">{error.contact_linkedin_focalpoint}</Typography>
            </FormGroup>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={6} className="button-group">
            <Button
              fullWidth
              variant={"outlined"}
              type={"submit"}
              className="user__theme-btn"
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

export default Contact