import React, { useState, useEffect } from "react";
import { Grid, Box, TextField, Typography, Button, FormGroup, FormControl, InputLabel, Select, MenuItem, Alert, FormLabel } from "@mui/material";
import MainLayout from "../BaseLayout";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import MenuTab from './MenuTab';
import FileUploader from '../components/FileUploader';
import ImageUploader from '../components/ImageUploader';
import ThematicTags from '../components/ThematicTags'
import SubjectTags from "../components/SubjectTags"
import ExtraTags from "../components/ExtraTags"
import moment from "moment"
import Editor from "../LexicalEditor/Editor";
import '../LexicalEditor/styles.css'

function AddNewElearning(props) {
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [whatYouWillLearn, setWhatYouWillLearn] = useState([{ what_you_will_learn: ""}]);
  const [Content, setContent] = useState([{ content: ""}]);
  const [formInput, setOrgInput] = useState({
    title: '',
    description: '',
    author: '',
    date: '',
    phone: '',
    email: '',
    overview: '',
  });
  const [error, setError] = useState([]);
  const [startDate, setStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [projectList, setProjectList] = useState([]);
  const [linkProject, setLinkProject] = useState("");
  const [photos, setPhotos] = useState([]); 
  const [files, setFiles] = useState([]);   
  const [tags_thematic, setTags_thematic] = useState([]);
  const [tags_subject, setTags_subject] = useState([]);
  const [tags_extra, setTags_extra] = useState([]);

  useEffect(() => {
    getProjectList();

  }, [localStorage.getItem('auth_id')]);

  const getProjectList = () => {
    axios.get('/api/projects-for-dashboard-dropdowns').then(res => {
    // axios.get('/api/projects-by-organization').then(res => {
      if (res.data.status === 200) {
        setProjectList(res.data.projects);
        setLinkProject(`1`);
      }
      else if (res.data.status === 404) {
        console.log(res.message, "message");
      }
    });
  }


  const selectLinkProject = (event) => {
    setLinkProject(event.target.value);
  }

  const handleInput = (e) => {
    e.persist();
    setOrgInput({ ...formInput, [e.target.name]: e.target.value });
  }

  const handleStartDate = (value) => {
    var start_date = moment(value.$d).format("YYYY-MM-DD");
    //console.log(start_date);
    setStartDate(start_date);
  };

  //uploaders
  const getMediaFiles = (e) => {
    setFiles(e);
  }

  const getImages = (e) => {
    setPhotos(e);
  }

  const handleDocRemove = (e) => {
  setFiles(files.filter(p => p !== e));
  }

  const handleImageRemove = (e) => {
  setPhotos(photos.filter(p => p !== e));
  }
  //end uploaders

  const tagsThematic = (value) => {
    setTags_thematic(value);
  }

  const tagsSubject = (value) => {
    setTags_subject(value);
  }

  const tagsExtra = (value) => {
    setTags_extra(value);
  }

   //whatyouwilllearn

   const addWhatYouWillLearnFields = () => {
    let newfield = { what_you_will_learn: '' }
    setWhatYouWillLearn([...whatYouWillLearn, newfield])
  }
  const removeWhatYouWillLearnFields = (index) => {
    let data = [...whatYouWillLearn];
    data.splice(index, 1)
    setWhatYouWillLearn(data)
  }
  const handleWhatYouWillLearnChange = (index, event) => {
    let data = [...whatYouWillLearn];
    data[index][event.target.name] = event.target.value;
    setWhatYouWillLearn(data);
  }
  
  //--

     //content

     const addContentFields = () => {
      let newfield1 = { content: '' }
      setContent([...Content, newfield1])
    }
    const removeContentFields = (index1) => {
      let data1 = [...Content];
      data1.splice(index1, 1)
      setContent(data1)
    }
    const handleContentChange = (index1, event1) => {
      let data1 = [...Content];
      data1[index1][event1.target.name] = event1.target.value;
      setContent(data1);
    }
    
    //--

  const createElearningMaterial = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem('auth_id');
    const data = {
      user_id: user_id,
      organization_id: localStorage.getItem('org_id'),
      project_id:	linkProject,
      title: formInput.title,
      type:	2,
      overview: formInput.overview,
      description: formInput.description,
      uploads:files , //files
      photos:	photos,   //photos
      date: startDate,
      author:	formInput.author,
      what_you_will_learn : whatYouWillLearn,
      contents : Content,
      phone: formInput.phone,
      email: formInput.email,
      tags_thematic: tags_thematic,
      tags_subject: tags_subject,
      tags_extra: tags_extra
    }
    axios.post(`/api/create-education`, data).then(res => {
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

  const onChange = (editorState) => {
      editorState.read(() => {
          setOrgInput({ ...formInput, description: JSON.stringify(editorState) });
      });
  }

 

  return (
    <MainLayout title={"Add E-learning Material"}>
      <MenuTab />
      <Box component={"form"} onSubmit={createElearningMaterial} method="POST" encType="multipart/form-data">
        <Grid container>
          <Grid item xs={8}>

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

            <FormControl className="form-group">
              <InputLabel id="project-label">Project</InputLabel>
              <Select
                labelId="project-label"
                id="project"
                value={linkProject}
                label="Project"
                onChange={selectLinkProject}
              >
                {projectList.map(row => <MenuItem key={row.id} value={row.id}>{row.project_title}</MenuItem>)}
              </Select>
            </FormControl>
            
            <Editor onChange={onChange}/>
            
            <FormControl className="sep-label-form for-dynamic-fields">
              <FormLabel id="what_you_learn">What you will learn</FormLabel>
              {whatYouWillLearn.map((input, index) => {
                return (
                  <div key={index} className="form-group dynamic-field">
                    <TextField 
                      fullWidth
                      type='text'
                      size="small"
                      name='what_you_will_learn'
                      value={input.what_you_will_learn || ''}
                      onChange={event => handleWhatYouWillLearnChange(index, event)}
                    />
                    {
                      index ?
                        <button type="button" className="button remove" onClick={() => removeWhatYouWillLearnFields(index)}><DeleteIcon /></button>
                      : null
                    }
                  </div>
                )
              })}
            <Button onClick={() => addWhatYouWillLearnFields()}>Add New Field</Button>
            </FormControl>

            <FormControl className="sep-label-form for-dynamic-fields">
              <FormLabel id="content">Content</FormLabel>
              {Content.map((input, index) => {
                return (
                  <div key={index} className="form-group dynamic-field">
                    <TextField 
                      fullWidth
                      type='text'
                      size="small"
                      name='content'
                      value={input.content || ''}
                      onChange={event => handleContentChange(index, event)}
                    />
                    {
                      index ?
                        <button type="button" className="button remove" onClick={() => removeContentFields(index)}><DeleteIcon /></button>
                      : null
                    }
                  </div>
                )
              })}
            <Button onClick={() => addContentFields()}>Add New Field</Button>
            </FormControl>

            <FormLabel>File</FormLabel>
            <FileUploader setSelectedFiles={getMediaFiles}  files={files}/>
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
            <ImageUploader setSelectedFiles={getImages}  />
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

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormGroup className="form-group">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Date"
                      inputFormat="YYYY-MM-DD"
                      value={startDate}
                      onChange={handleStartDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <Typography variant="span">{error.start_date}</Typography>
                </FormGroup>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
            <FormGroup className="form-group">
              <TextField
                type='text'
                fullWidth
                label="Author"
                name="author"
                onChange={handleInput}
                value={formInput.author}
              />
              <Typography variant="span">{error.author}</Typography>
            </FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Phone"
                    name="phone"
                    onChange={handleInput}
                    value={formInput.phone}
                  />
                  <Typography variant="span">{error.phone}</Typography>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleInput}
                    value={formInput.email}
                  />
                  <Typography variant="span">{error.email}</Typography>
                </FormGroup>
              </Grid>
            </Grid>

            <ThematicTags getThematicTags={tagsThematic} setThematicTag={tags_thematic} />

            <SubjectTags getSubjectTags={tagsSubject} setSubjectTag={tags_subject} />

            <ExtraTags getExtraTags={tagsExtra} setExtraTag={tags_extra} />

            <Button
              fullWidth
              variant={"outlined"}
              type={"submit"}
              className="user__theme-btn">
              Add New Elearning
            </Button>

            {alert ? <Alert className="response-alert" severity={alertType}>{alertContent}</Alert> : <></>}

          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  )
}

export default AddNewElearning
