import React, { useState, useEffect } from "react";
import { Grid, Box, TextField, Typography, Button, FormGroup, FormControl, InputLabel, Select, MenuItem, Alert, FormLabel } from "@mui/material";
import MainLayout from "../BaseLayout";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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

function AddDataHub(props) {
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertContent, setAlertContent] = useState('');
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
    const [photos, setPhotos] = useState([]); //files
    const [files, setFiles] = useState([]);   //photos
    const [tags_thematic, setTags_thematic] = useState([]);
    const [tags_subject, setTags_subject] = useState([]);
    const [tags_extra, setTags_extra] = useState([]);

    const [districtList, setDistrictList] = useState([]);
    const [linkDistrict, setLinkDistrict] = useState("");
    const [cityList, setCityList] = useState([]);
    const [linkCity, setLinkCity] = useState("");

    useEffect(() => {
        getProjectList();
        getDistrictList();
        getCityList();

    }, [localStorage.getItem('auth_id')]);

    const getProjectList = () => {
        axios.get(`/api/projects-for-dashboard-dropdowns`).then(res => {
            if (res.data.status === 200) {
                setProjectList(res.data.projects);
                setLinkProject(`1`);
            }
            else if (res.data.status === 404) {
                console.log(res.message, "message");
            }
        });
    }

    const getDistrictList = () => {
        axios.get(`/api/districts`).then(res => {
            if (res.data.status === 200) {
                setDistrictList(res.data.districts);
                setLinkDistrict(`26`);
            }
            else if (res.data.status === 404) {
                console.log(res.message, "message");
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

    const selectLinkProject = (event) => {
        setLinkProject(event.target.value);
    }

    const selectLinkDistrict = (event) => {
        setLinkDistrict(event.target.value);
    }

    const selectLinkCity = (event) => {
        setLinkCity(event.target.value);
    }

    const handleInput = (e) => {
        e.persist();
        setOrgInput({ ...formInput, [e.target.name]: e.target.value });
    }

    const handleStartDate = (value) => {
        var start_date = moment(value.$d).format("YYYY-MM-DD");
        setStartDate(start_date);
    };

    const handleDocRemove = (e) => {
        setFiles(files.filter(p => p !== e));
      }
    
      const handleImageRemove = (e) => {
        setPhotos(photos.filter(p => p !== e));
      }

    const getMediaFiles = (e) => {
        setFiles(e);
      }
    
      const getImages = (e) => {
        setPhotos(e);
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

    const createDataHub = (e) => {
        e.preventDefault();
        const user_id = localStorage.getItem('auth_id');
        const data = {
            user_id: user_id,
            organization_id : localStorage.getItem('org_id'), 
            project_id:	linkProject,
            title: formInput.title,
            type:	1,
            overview: formInput.overview,
            description: formInput.description,
            uploads: files, //files
            photos:	photos,   //photos
            date: startDate,
            author:	formInput.author,
            phone: formInput.phone,
            email: formInput.email,
            district_id: linkDistrict,
            city_id: linkCity,
            tags_thematic: tags_thematic,
            tags_subject: tags_subject,
            tags_extra: tags_extra
        }
        axios.post(`/api/create-data`, data).then(res => {
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
        <MainLayout title={"Add Data Hub"}>
            <MenuTab />
            <Box component={"form"} onSubmit={createDataHub}>
                <Grid container>
                    <Grid item xs={8}>

                        <FormGroup className="form-group">
                            <TextField
                                type='text'
                                fullWidth
                                label="Title *"
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

                        <FormControl className="form-group">
                            <InputLabel id="district-label">District *</InputLabel>
                            <Select
                                labelId="district-label"
                                id="district"
                                value={linkDistrict}
                                label="District"
                                onChange={selectLinkDistrict}
                            >
                                {districtList.map(row => <MenuItem key={row.id} value={row.id}>{row.name_en}</MenuItem>)}
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


                        {/* <FormLabel>File</FormLabel>
                        <FileUploader setSelectedFiles={getMediaFiles}  />
                        <Grid container spacing={2} sx={{'marginBottom': 6}}>
                            {photos.map((element, index) => (
                                <Grid key={index} item xs={4} className="photo-preview">
                                    <img src={`/storage/`+element} />
                                </Grid>
                            ))}
                        </Grid> */}
                        
                        {/* <FormLabel>File</FormLabel>
                        <FileUploader setSelectedFiles={getMediaFiles} />
                        <Grid container spacing={2} sx={{'marginBottom': 6}}>
                        {photos.map((element, index) => (  //files
                            <Grid key={index} item xs={4} className="photo-preview">
                            {/* <img src={`/storage/`+element} /> */}
                            {/* <img src={`../../../../images/pdf-icon.png`} /> */}
                            {/* </Grid> */}
                        {/* ))} */}
                        {/* </Grid>  */}

                        {/* <FormLabel>Photos</FormLabel>
                        <ImageUploader setSelectedFiles={getImages}  />
                        <Grid container spacing={2} sx={{'marginBottom': 8}}>
                            {files.map((element, index) => (
                                <Grid key={index} item xs={4} className="photo-preview">
                                    <img src={`/storage/`+element} />
                                </Grid>
                            ))}
                        </Grid> */}

                    <FormLabel>File</FormLabel>
                    <FileUploader setSelectedFiles={getMediaFiles} files={files} />
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
                            Add Data Hub
                        </Button>

                        {alert ? <Alert className="response-alert" severity={alertType}>{alertContent}</Alert> : <></>}

                    </Grid>
                </Grid>
            </Box>
        </MainLayout>
    )
}

export default AddDataHub
