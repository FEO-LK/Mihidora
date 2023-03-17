import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Grid, Box, TextField, FormControl, Select, Typography, Button, MenuItem, InputLabel, Alert, FormLabel, FormGroup } from "@mui/material"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
//import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MainLayout from "../BaseLayout"
import moment from "moment"
import MenuTab from "./MenuTab"
import Map from '../Map'
import ThematicTags from '../components/ThematicTags'
import SubjectTags from "../components/SubjectTags";
import ExtraTags from "../components/ExtraTags";
import FileUploader from '../components/FileUploader';
import ImageUploader from '../components/ImageUploader';
import ExampleTheme from "../LexicalEditor/themes/ExampleTheme";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import EditorEdit from "../LexicalEditor/EditorEdit";

function EditWhatson(props) {
    const datasetParams = useParams();
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertContent, setAlertContent] = useState('');
    const [activityType, setActivityType] = useState(1);
    const [formInput, setFormInput] = useState({
        title: '',
        description: '',
        route: ''
    });
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [locations, setLocation] = useState([]);
    const [error, setError] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [linkProject, setLinkProject] = useState("");
    const [photos, setPhotos] = useState([]);
    const [files, setFiles] = useState([]);
    const [mediaArticle, setMediaArticle] = useState(true);
    const [tags_thematic, setTags_thematic] = useState([]);
    const [tags_subject, setTags_subject] = useState([]);
    const [tags_extra, setTags_extra] = useState([]);

    const [districtList, setDistrictList] = useState([]);
    const [linkDistrict, setLinkDistrict] = useState("");
    const [cityList, setCityList] = useState([]);
    const [linkCity, setLinkCity] = useState("");

    useEffect(() => {
        getWhatsonList();
        getProjectList();
        getDistrictList();
        getCityList();

    }, [datasetParams.slug, localStorage.getItem('auth_id')]);

    const getWhatsonList = () => {
        axios.get(`/api/edit-whatson/${datasetParams.slug}`).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.get_data.photos);
                console.log(res.data.get_data.uploads);
                setFormInput(res.data.get_data);
                setStartDate(res.data.get_data.start_date_time);
                setEndDate(res.data.get_data.end_time_time);
                setPhotos(JSON.parse(res.data.get_data.photos));
                setFiles(JSON.parse(res.data.get_data.uploads));
                setLocation(JSON.parse(res.data.get_data.locations));
                setActivityType(res.data.get_data.type);
                setLinkDistrict(res.data.get_data.district_id);
                setLinkCity(res.data.get_data.city_id);
                setLinkProject(res.data.get_data.project_id);
                setTags_thematic(res.data.get_data.tags.filter(element => element.type == 1).map(element => element.name.en));
                setTags_subject(res.data.get_data.tags.filter(element => element.type == 2).map(element => element.name.en));
                setTags_extra(res.data.get_data.tags.filter(element => element.type == 3).map(element => element.name.en));

                if(res.data.get_data.type == 2) {
                    setMediaArticle(false);
                }
                else {
                    setMediaArticle(true);
                }
            }
            else if (res.data.status === 404) {
                console.log(res.message, "message");
            }
        });
    }

    const getProjectList = () => {
        axios.get(`/api/projects-by-organization/`).then(res => {
            if (res.data.status === 200) {
                setProjectList(res.data.projects);
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
            }
            else if (res.data.status === 404) {
                console.log(res.message
                    , "message");
            }
        });
    }

    const handleInput = (e) => {
        e.persist();
        setFormInput({ ...formInput, [e.target.name]: e.target.value });
    }

    const selectLinkProject = (event) => {
        setLinkProject(event.target.value);
    }

    const selectActivityType = (event) => {
        setActivityType(event.target.value);
        if(event.target.value == 2) {
            setMediaArticle(false);
        }
        else {
            setMediaArticle(true);
        }
    };

    const selectLinkDistrict = (event) => {
        setLinkDistrict(event.target.value);
    }

    const selectLinkCity = (event) => {
        setLinkCity(event.target.value);
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

    const handleStartDate = (value) => {
        var start_date = moment(value.$d).format("YYYY-MM-DD");
        setStartDate(start_date);
    }

    const handleEndDate = (value) => {
        var end_date = moment(value.$d).format("YYYY-MM-DD");
        setEndDate(end_date);
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


    const lanlat =(value) => {
        setLocation(value);
    }

    const createActivity = (e) => {
        e.preventDefault();
        const user_id = localStorage.getItem('auth_id');
        const data = {
            user_id: user_id,
            type: activityType,
            project_id: linkProject,
            organization_id: '',
            title: formInput.title,
            start_date_time: startDate,
            end_time_time: endDate,
            description: formInput.description,
            route: formInput.route,
            locations: locations,
            uploads: files, //files
            photos:	photos,   //photos
            district_id: linkDistrict,
            city_id: linkCity,
            tags_thematic: tags_thematic,
            tags_subject: tags_subject,
            tags_extra: tags_extra
        }
        axios.put(`/api/update-whatson/${datasetParams.slug}`, data).then(res => {
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

    const [editorInitialConfig, setEditorInitialConfig] = useState([]);
    let editorConfig = {
        theme: ExampleTheme,
        onError(error) {
            throw error;
        },
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode
        ],
    };

    useEffect(() => {
        if (formInput?.description) {
            editorConfig.editorState = formInput?.description;
            setEditorInitialConfig(editorConfig);
        }
    }, [formInput?.description]);

    const onChange = (editorState) => {
        editorState.read(() => {
            setFormInput({...formInput, description: JSON.stringify(editorState)});
        });
    }

    return (
        <MainLayout title={"Edit Whats' on"}>
            <MenuTab />
            <Box component={"form"} onSubmit={createActivity}>
                <Grid container>
                    <Grid item md={12} lg={8}>
                        <Grid sx={{marginBottom: 4}}>
                            <Typography variant="span" style={{color: '#666', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase'}}>
                                Create events, volunteer opportunities or articles</Typography>
                        </Grid>

                        <FormControl className="form-group">
                            <InputLabel id="activity-type-label">Activity Type</InputLabel>
                            <Select
                                labelId="activity-type-label"
                                fullWidth
                                id="activity-type"
                                value={activityType}
                                label="Action Type"
                                onChange={selectActivityType}
                            >
                                <MenuItem value={1}>Event</MenuItem>
                                <MenuItem value={2}>Media Article</MenuItem>
                                <MenuItem value={3}>Volunteer Opportunity</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl className="form-group">
                            <TextField
                                type='text'
                                fullWidth
                                label="Title"
                                name="title"
                                onChange={handleInput}
                                value={formInput.title}
                            />
                        </FormControl>

                        <FormControl className="form-group">
                            <InputLabel id="project-type-label">Project</InputLabel>
                            <Select
                                labelId="project-type-label"
                                id="project-type"
                                value={linkProject}
                                label="Project"
                                onChange={selectLinkProject}
                            >
                                {projectList.map(row => <MenuItem key={row.id} value={row.id}>{row.project_title}</MenuItem>)}
                            </Select>
                        </FormControl>
                       
                        {editorInitialConfig.length !== 0 && <EditorEdit
                            initialConfig={editorInitialConfig}
                            onChange={onChange}
                        />}

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
                                label="City"
                                onChange={selectLinkCity}
                            >
                                {cityList.map(row => <MenuItem key={row.id} value={row.id}>{row.name_en}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormGroup className="form-group">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            label="Date&Time picker"
                                            value={startDate}
                                            onChange={handleStartDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <Typography variant="span">{error.start_date}</Typography>
                                </FormGroup></Grid></Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormGroup className="form-group">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            label="Date&Time picker"
                                            value={endDate}
                                            onChange={handleEndDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <Typography variant="span">{error.start_date}</Typography>
                                </FormGroup></Grid></Grid>


                        {mediaArticle && (
                            <div style={{marginBottom: 30}}>
                                <FormGroup className="form-group">
                                    <TextField
                                        type='text'
                                        fullWidth
                                        label="Route"
                                        name="route"
                                        onChange={handleInput}
                                        value={formInput.route}
                                    />
                                    {/* <Typography variant="span">{error.email}</Typography> */}
                                </FormGroup>

                                <Map zoom={8} center={{ lat: 7.873054, lng: 80.771797 }} getLanLat={lanlat} listLangLat={locations} />
                            </div>
                        )}

                 <FormLabel>File</FormLabel>
                {/* <FileUploader setSelectedFiles={getImages}  /> */}
                <FileUploader setSelectedFiles={getImages}  files={files}/>
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
                {photos?.map((element, index) => (
                    <Grid key={index} item xs={4} className="photo-preview">
                    <Button onClick={() => handleImageRemove(element)} className="remove-btn">
                        <img src={`../../../../images/remove-icon.png`} />
                    </Button>
                    <img src={`/storage/`+element} />
                    </Grid>
                ))}
                </Grid>

                        <ThematicTags getThematicTags={tagsThematic} setThematicTag={tags_thematic} />

                        <SubjectTags getSubjectTags={tagsSubject} setSubjectTag={tags_subject} />

                        <ExtraTags getExtraTags={tagsExtra} setExtraTag={tags_extra} />

                        <Button
                            fullWidth
                            variant={"outlined"}
                            type={"submit"}
                            className="user__theme-btn">
                            Update Whats on
                        </Button>

                        {alert ? <Alert className="response-alert" severity={alertType}>{alertContent}</Alert> : <></>}

                    </Grid>
                </Grid>
            </Box>
        </MainLayout>

    )
}

export default EditWhatson
