import React, {useEffect, useState} from "react";
import {
    Alert,
    Box,
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MainLayout from "../BaseLayout";
import MenuTab from "./MenuTab";
import FileUploader from '../components/FileUploader';
import ImageUploader from '../components/ImageUploader';
import Editor from "../LexicalEditor/Editor";

function AddNewClassified(props) {
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertContent, setAlertContent] = useState('');
  const [error, setError] = useState([]);
  const [formInput, setFormInput] = useState({
    title: '',
    description: '',
    overview: '',
  });
  // const [projectList, setProjectList] = useState([]);
  // const [linkProject, setLinkProject] = useState("");
  const [type, setType] = React.useState('');
  const [photos, setPhotos] = useState([]); //files
  const [files, setFiles] = useState([]);   //photos
  const [newInputFields, setNewInputFields] = useState([
    { web_link_title: '', linked_content_type: '', linked_content: '' }
  ]);

  const [districtList, setDistrictList] = useState([]);
  const [linkDistrict, setLinkDistrict] = useState("");
  const [cityList, setCityList] = useState([]);
  const [linkCity, setLinkCity] = useState("");

  useEffect(() => {
    getDistrictList();
    getCityList();
  }, [localStorage.getItem('auth_id')]);

  const getDistrictList = () => {
    axios.get(`/api/districts`).then(res => {
      if (res.data.status === 200) {
        setDistrictList(res.data.districts);
        setLinkDistrict(`26`);
      }
      else if (res.data.status === 404) {
        console.log(res.message, "Could not find districts");
      }
    });
  }

  const getCityList = () => {
    axios.get(`/api/cities`).then(res => {
      if (res.data.status === 200) {
        setCityList(res.data.cities);
        setLinkCity(`339`);
      }
      else if (res.data.status === 404) {
        console.log(res.message
          , "message");
      }
    });
  }


  const selectType = (event) => {
    setType(event.target.value);
  }

  const handleInput = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const handleNewFormChange = (index, event) => {
    let data = [...newInputFields];
    data[index][event.target.name] = event.target.value;
    setNewInputFields(data);
  }

  const addNewField = () => {
    let newfield = { web_link_title:'', linked_content_type: '', linked_content: '' }
    setNewInputFields([...newInputFields, newfield])
  }

  const removeNewField = (index) => {
    let data = [...newInputFields];
    data.splice(index, 1)
    setNewInputFields(data)
  }

  const selectLinkDistrict = (event) => {
    setLinkDistrict(event.target.value);
  }

  const selectLinkCity = (event) => {
    setLinkCity(event.target.value);
  }

  //uploaders
  const getMediaFiles = (e) => {
    setPhotos(e);
  }

  const getImages = (e) => {
    setFiles(e);
  }

  const handleDocRemove = (e) => {
  setFiles(files.filter(p => p !== e));
  }

  const handleImageRemove = (e) => {
  setPhotos(photos.filter(p => p !== e));
  }
  //end uploaders

  const createClassified = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem('auth_id');
    const data = {
      user_id: user_id,
      type:	type,
      organization_id : localStorage.getItem('org_id'), 
      title: formInput.title,
      description: formInput.description,
      weblink:	newInputFields,
      uploads: photos, //files
      photos:	files,   //photos
      district_id: linkDistrict,
      overview: formInput.overview,
      city_id: linkCity,
    }
    axios.post(`/api/create-classified`, data).then(res => {
      if (res.data.status === 200) {
        setAlert(true);
        setAlertType('success');
        setAlertContent(res.data.message);
        setError([]);
      } else if (res.data.status === 422) {
          setError(res.data.errors);
      } else {
          console.log(res.data.errors);
      }
    });
  }

    const onChange = (editorState) => {
        editorState.read(() => {
            setFormInput({...formInput, description: JSON.stringify(editorState)});
        });
    }

    return (
        <MainLayout title={"Add Classified"}>
            <MenuTab/>
            <Box component={"form"} onSubmit={createClassified}>
                <Grid container>
                    <Grid item md={12} lg={8}>
                        <FormControl className="form-group">
                            <InputLabel id="organisation-type-label">Select Type</InputLabel>
                            <Select
                labelId="organisation-type-label"
                fullWidth
                id="organisation-type"
                value={type}
                label="Type of classified"
                onChange={selectType}>
                <MenuItem value={1}>Job advertisement</MenuItem>
                <MenuItem value={2}>Grants and RFPs</MenuItem>
                <MenuItem value={3}>Green/Sustainable Suppliers</MenuItem>
                <MenuItem value={4}>Resource Pool</MenuItem>
              </Select>
            </FormControl>
            <FormGroup className="form-group">
              <TextField
                  type='text'
                  fullWidth
                  label="Title"
                  name="title"
                  onChange={handleInput}
                  value={formInput.title}
              />
                <Typography variant="span">{error.title}</Typography>
                
            </FormGroup>

            <FormGroup className="form-group">
                  <TextField
                      multiline
                      rows={4}
                      type='text'
                      fullWidth
                      label="Overview *"
                      name="overview"
                      inputProps={{
                          maxLength: 198,
                      }}
                      onChange={handleInput}
                      value={formInput.overview || ''}
                  />
                  <Typography variant="span">{error.overview}</Typography>
            </FormGroup>
                  
          <Editor onChange={onChange}/>
                       
          <FormControl className="form-group">
              <InputLabel id="district-label">District *</InputLabel>
              <Select
                  labelId="district-label"
                  id="district"
                  value={linkDistrict}
                  label="District"
                  onChange={selectLinkDistrict}
              >
                  {districtList.map(row => <MenuItem key={row.id}
                                                      value={row.id}>{row.name_en}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl className="form-group">
              <InputLabel id="city-label">City *</InputLabel>
              <Select
                labelId="city-label"
                id="city"
                value={linkCity}
                label="City *"
                onChange={selectLinkCity}
              >
                {cityList.map(row => <MenuItem key={row.id} value={row.id}>{row.name_en}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl className="sep-label-form for-dynamic-fields">
              <Grid container spacing={2}>
                <Grid item xs={4}><FormLabel>Third party link</FormLabel></Grid>
                <Grid item xs={4}><FormLabel>Link Title</FormLabel></Grid>
                <Grid item xs={4}><FormLabel>Link Description</FormLabel></Grid>
              </Grid>
              {newInputFields.map((element, index) => (
                <Grid key={index} container spacing={2}>

                  <Grid item xs={4}>
                    <FormGroup className="form-group dynamic-field">
                      <TextField
                        type='text'
                        fullWidth
                        name="web_link_title"
                        onChange={event => handleNewFormChange(index, event)}
                      //value={element || ''}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={4}>
                    <FormGroup className="form-group dynamic-field">
                      <TextField
                        type='text'
                        fullWidth
                        name="linked_content_type"
                        onChange={event => handleNewFormChange(index, event)}
                      //value={element || ''}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={4}>
                    <FormGroup className="form-group dynamic-field">
                      <TextField
                        type='text'
                        fullWidth
                        name="linked_content"
                        onChange={event => handleNewFormChange(index, event)}
                      //value={element || ''}
                      />
                      {
                        index ?
                          <button type="button" className="button remove" onClick={() => removeNewField(index)}><DeleteIcon /></button>
                          : null
                      }
                    </FormGroup>
                  </Grid>
                </Grid>
              ))}
              <Button onClick={() => addNewField()}>Add New Field</Button>
            </FormControl>
            
            {/* <FormLabel>File</FormLabel>
            <FileUploader setSelectedFiles={getMediaFiles} />
            <Grid container spacing={2} sx={{'marginBottom': 6}}>
            {photos.map((element, index) => (  //files
                <Grid key={index} item xs={4} className="photo-preview">
                </Grid>
            ))}
            </Grid>

            <FormLabel>Photos</FormLabel>
            <ImageUploader setSelectedFiles={getImages}  />
            <Grid container spacing={2} sx={{'marginBottom': 8}}>
                {files.map((element, index) => (   //photos
                    <Grid key={index} item xs={4} className="photo-preview">
                        <img src={`/storage/`+element} />
                    </Grid>
                ))}
            </Grid> */}

            <FormLabel>File</FormLabel>
            {/* <FileUploader setSelectedFiles={getImages}  /> */}
            <FileUploader setSelectedFiles={getImages} files={files} />
            <Grid container spacing={2} sx={{'marginBottom': 6}}>
            {files.map((item, index) => {
                var fileName = item.split('/');
                return <Grid key={index} item xs={2} className="doc-preview">
                    <Button onClick={() => handleDocRemove(item)} className="remove-btn">
                    <img src={`../../../../images/remove-icon.png`} />
                    </Button>
                    <Typography style={{width: 'calc(100% - 20px)', wordBreak: 'break-all', fontSize: 13, lineHeight: 1.2, textAlign: 'center', top: '96%', position: 'absolute'}}>{fileName[1]}</Typography>
                    <img src={`../../../../images/unknown-icon.png`} />
                </Grid>
            })}
            </Grid>

            <FormLabel>Photos</FormLabel>
            <ImageUploader setSelectedFiles={getMediaFiles}  />
            <Grid container spacing={2} sx={{'marginBottom': 8}}>
            {photos.map((element, index) => (
                <Grid key={index} item xs={4} className="photo-preview">
                <Button onClick={() => handleImageRemove(element)} className="remove-btn">
                    <img src={`../../../../images/remove-icon.png`} />
                </Button>
                <img src={`/storage/`+element} />
                </Grid>
            ))}
            </Grid>

            {/* <FormLabel>Photos</FormLabel>
            <FileUploader setSelectedFiles={getMediaFiles}  />
            <Grid container spacing={2} sx={{'marginBottom': 2}}>
              {photos.map((element, index) => (
                <Grid key={index} item xs={4} className="photo-preview">
                  <img src={`/storage/`+element} />
                </Grid>
              ))}
            </Grid> */}

            <Button
              fullWidth
              variant={"outlined"}
              type={"submit"}
              className="user__theme-btn">
              Create record
            </Button>

            {alert ? <Alert className="response-alert" severity={alertType}>{alertContent}</Alert> : <></>}

          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  )
}

export default AddNewClassified
