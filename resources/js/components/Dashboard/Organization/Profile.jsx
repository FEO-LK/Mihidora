import React, { useState, useEffect } from "react";
import {
  Grid, Box, TextField, Typography, Button, FormGroup, FormControl, InputLabel, Select, MenuItem,
  FormControlLabel, FormLabel, RadioGroup, Radio, Alert, Autocomplete, Chip 
} from "@mui/material";
import MainLayout from "../BaseLayout";
import MenuTab from "./MenuTab";
import ThematicTags from '../components/ThematicTags' 
import SubjectTags from "../components/SubjectTags";
import ImageUploader from '../components/ImageUploader'
import ExtraTags from "../components/ExtraTags";

function Profile(props) {
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [orgTypeList, setOrgTypeList] = useState([]);
  const [orgId, setOrgId] = useState("");
  const [orgType, setOrgType] = useState("");
  const [orgSize, setOrgSize] = useState("");
  const [orgInput, setOrgInput] = useState({
    org_name: '',
    reg_number: '',
    description: '',
  });
  const [error, setError] = useState([]);
  const [tags_thematic, setTags_thematic] = useState([]);
  const [tags_subject, setTags_subject] = useState([]);
  const [tags_extra, setTags_extra] = useState([]);
  const [photos, setLogo] = useState([]);

  useEffect(() => {
    getProfileData();
    getOrganizationTypes();

  }, [localStorage.getItem('auth_id')]);

  
  const getProfileData = () => {
    const org_id = localStorage.getItem('org_id');
    axios.get(`/api/edit-organisation/${org_id}`).then(res => {
      if (res.data.status === 200) {
        setOrgId(res.data.get_data.id);
        setOrgInput(res.data.get_data);
        setOrgType(res.data.get_data.org_type);
        setLogo(JSON.parse(res.data.get_data.org_logo));
        setOrgSize(res.data.get_data.org_size);
        setTags_thematic(res.data.get_data.tags.filter(element => element.type == 1).map(element => element.name.en));
        setTags_subject(res.data.get_data.tags.filter(element => element.type == 2).map(element => element.name.en));
        setTags_extra(res.data.get_data.tags.filter(element => element.type == 3).map(element => element.name.en));
      }
      else if (res.data.status === 404) {
        console.log(res.message, "message");
      }
    });
  }

  const getOrganizationTypes = () => {
    axios.get('sanctum/csrf-cookie').then(response => {
      axios.get('/api/organisation-types').then(res => {
        if (res.data.status === 200) {
          setOrgTypeList(res.data.organizationTypes);
        }
      });
    });
  }

  const getMediaFiles = (e) => {
    setLogo(e);
  }

  const handleInput = (e) => {
    e.persist();
    setOrgInput({ ...orgInput, [e.target.name]: e.target.value });
  }

  const tagsThematic = (value) => {
    setTags_thematic(value);
  }

  const tagsSubject = (value) => {
    setTags_subject(value);
  }

  const tagsExtra = (value) => {
    setTags_extra(value);
  }

  const selectOrgType = (event) => {
    setOrgType(event.target.value);
  }


  const selectOrgSize = (event) => {
    setOrgSize(event.target.value);
  }

  const updateOrgProfile = (e) => {
    e.preventDefault();
    const data = {
      org_name: orgInput.org_name,
      org_type: orgType,
      org_size: orgSize,
      reg_number: orgInput.reg_number,
      description: orgInput.description,
      tags_thematic: tags_thematic,
      tags_subject: tags_subject,
      org_logo: photos,
      tags_extra: tags_extra
    }
    axios.put(`/api/update-organisation/${orgId}`, data).then(res => {
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
    <MainLayout title={"Profile"}>
      <MenuTab />
      <Box component={"form"} onSubmit={updateOrgProfile}>
        <Grid container>
          <Grid item xs={8}>

          <FormLabel>Logo</FormLabel>
            <ImageUploader setSelectedFiles={getMediaFiles}  />
            <Grid container spacing={2} sx={{'marginBottom': 2}}>
              {photos.map((element, index) => (
                <Grid key={index} item xs={4} className="photo-preview">
                  <img src={`/storage/`+element} />
                </Grid>
              ))}
            </Grid>


            <FormGroup className="form-group">
              <TextField
                type='text'
                fullWidth
                label="Organization Name"
                name="org_name"
                onChange={handleInput}
                value={orgInput.org_name}
              />
              <Typography variant="span">{error.org_name}</Typography>
            </FormGroup>
            <FormControl className="form-group">
              <InputLabel id="organisation-type-label">Organisation Type</InputLabel>
              <Select
                labelId="organisation-type-label"
                id="organisation-type"
                value={orgType}
                label="Organisation Type"
                onChange={selectOrgType}
              >
                {orgTypeList.map(row => <MenuItem key={row.id} value={row.id}>{row.type}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl className="sep-label-form">
              <FormLabel id="size-of-organization">Size of Organization - {orgSize}</FormLabel>
              <RadioGroup
                row
                onChange={selectOrgSize}
              >
                <FormControlLabel value="1 - 10" checked={orgSize == '1 - 10'} control={<Radio />} label="1 - 10" />
                <FormControlLabel value="11 - 30" checked={orgSize == '11 - 30'} control={<Radio />} label="11 - 30" />
                <FormControlLabel value="31 - 60" checked={orgSize == '31 - 60'} control={<Radio />} label="31 - 60" />
                <FormControlLabel value="61 - 100" checked={orgSize == '61 - 100'} control={<Radio />} label="61 - 100" />
                <FormControlLabel value="Over 100" checked={orgSize == 'Over 100'} control={<Radio />} label="Over 100" />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Registration No"
                    name="reg_number"
                    onChange={handleInput}
                    value={orgInput.reg_number}
                  />
                  <Typography variant="span">{error.reg_number}</Typography>
                </FormControl>
              </Grid>
            </Grid>
            <FormGroup className="form-group">
              <TextField
                type='text'
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                onChange={handleInput}
                value={orgInput.description}
              />
              <Typography variant="span">{error.description}</Typography>
            </FormGroup>
            
            <ThematicTags getThematicTags={tagsThematic} setThematicTag={tags_thematic} />

            <SubjectTags getSubjectTags={tagsSubject} setSubjectTag={tags_subject} />

            <ExtraTags getExtraTags={tagsExtra} setExtraTag={tags_extra} /> 
            
            <Button
              fullWidth
              variant={"outlined"}
              type={"submit"}
              className="user__theme-btn"
              sx={{marginBottom: 2}}
            >
              Update Profile
            </Button>

            {alert ? <Alert severity={alertType}>{alertContent}</Alert> : <></>}

          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  )
}

export default Profile