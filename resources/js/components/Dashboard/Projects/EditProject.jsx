import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Grid, Box, TextField, InputLabel, Typography, Button, FormGroup, FormControl, FormLabel, Alert, Select, MenuItem } from "@mui/material"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import MainLayout from "../BaseLayout"
import MenuTab from './MenuTab'
import Map from '../Map'
import FileUploader from '../components/FileUploader';
import ImageUploader from '../components/ImageUploader';
import moment from 'moment'
import ThematicTags from '../components/ThematicTags'
import SubjectTags from "../components/SubjectTags";
import ExtraTags from "../components/ExtraTags";
import ExampleTheme from "../LexicalEditor/themes/ExampleTheme";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import EditorEdit from "../LexicalEditor/EditorEdit";

function EditProject() {
    const projectParams = useParams();
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertContent, setAlertContent] = useState('');
    const [formInput, setFormInput] = useState({
        project_title: '',
        overview: '',
        description: '',
        linked_whatson: [],
        linked_elearning: [],
        linked_data: [],
        linked_classifieds: [],
    });
    //const [linkedContentType, setLinkedContentType] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [newInputFields, setNewInputFields] = useState([
        { linked_content_type: '', linked_content: '' }
    ]);
    const [error, setError] = useState([]);
    const [locations, setLocation] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [files, setFiles] = useState([]);
    const [tags_thematic, setTags_thematic] = useState([]);
    const [tags_subject, setTags_subject] = useState([]);
    const [tags_extra, setTags_extra] = useState([]);

    const [districtList, setDistrictList] = useState([]);
    const [linkDistrict, setLinkDistrict] = useState("");
    const [cityList, setCityList] = useState([]);
    const [linkCity, setLinkCity] = useState("");

    useEffect(() => {
        getProjectData();
        getDistrictList();
        getCityList();

    }, [projectParams.slug, localStorage.getItem('auth_id')]);

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

    const getProjectData = () => {
        axios.get(`/api/edit-project/${projectParams.slug}`).then(res => {
            if (res.data.status === 200) {
                setFormInput(res.data.get_data);
                setStartDate(res.data.get_data.start_date);
                setEndDate(res.data.get_data.end_date);
                setLocation(JSON.parse(res.data.get_data.locations));
                setPhotos(JSON.parse(res.data.get_data.photos));
                setFiles(JSON.parse(res.data.get_data.uploads));
                setLinkDistrict(res.data.get_data.district_id);
                setLinkCity(res.data.get_data.city_id);
                setTags_thematic(res.data.get_data.tags.filter(element => element.type == 1).map(element => element.name.en));
                setTags_subject(res.data.get_data.tags.filter(element => element.type == 2).map(element => element.name.en));
                setTags_extra(res.data.get_data.tags.filter(element => element.type == 3).map(element => element.name.en));
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

    const selectLinkDistrict = (event) => {
        setLinkDistrict(event.target.value);
    }

    const selectLinkCity = (event) => {
        setLinkCity(event.target.value);
    }

    const lanlat =(value) => {
        setLocation(value);
    }

    const handleStartDate = (value) => {
        var start_date = moment(value.$d).format("YYYY-MM-DD");
        setStartDate(start_date);
    }

    const handleEndDate = (value) => {
        var end_date = moment(value.$d).format("YYYY-MM-DD");
        setEndDate(end_date);
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

    const getMediaFiles = (e) => {
        setPhotos(e);
    }

    const getImages = (e) => {
         setFiles([...new Set(e)]);
    }

    const handleDocRemove = (e) => {
        setFiles(files.filter(p => p !== e));
      }
    
    const handleImageRemove = (e) => {
        setPhotos(photos.filter(p => p !== e));
    }

    const projectUpdates = (e) => {
        e.preventDefault();
        const user_id = localStorage.getItem('auth_id');
        const data = {
            user_id: user_id,
            project_title: formInput.project_title,
            overview: formInput.overview,
            description: formInput.description,
            locations: locations,
            uploads: files,
            photos:	photos,
            start_date: startDate,
            end_date: endDate,
            district_id: linkDistrict,
            city_id: linkCity,
            linked_content: '',
            tags_thematic: tags_thematic,
            tags_subject: tags_subject,
            tags_extra: tags_extra
        }
        axios.put(`/api/update-project/${projectParams.slug}`, data).then(res => {
            if(res.data.status === 200) {
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
    //console.log(photos,'sdfsfsfsf');
    return (
        <MainLayout title={"Edit Project"}>
            <MenuTab />
            <Box component={"form"} onSubmit={projectUpdates}>
                <Grid container>
                    <Grid item md={12} lg={8}>
                        <FormGroup className="form-group">
                            <TextField
                                type='text'
                                fullWidth
                                label="Project Title"
                                name="project_title"
                                onChange={handleInput}
                                value={formInput.project_title || ''}
                            />
                            <Typography variant="span">{error.project_title}</Typography>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <TextField
                                multiline
                                rows={4}
                                type='text'
                                fullWidth
                                label="Overview"
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


                        {/*<FormGroup className="form-group">*/}
                        {/*  <TextField*/}
                        {/*    multiline*/}
                        {/*    rows={8}*/}
                        {/*    type='text'*/}
                        {/*    fullWidth*/}
                        {/*    label="Description"*/}
                        {/*    name="description"*/}
                        {/*    onChange={handleInput}*/}
                        {/*    value={formInput.description || ''}*/}
                        {/*  />*/}
                        {/*  <Typography variant="span">{error.description}</Typography>*/}
                        {/*</FormGroup>*/}
                        {editorInitialConfig.length !== 0 && <EditorEdit
                            initialConfig={editorInitialConfig}
                            onChange={onChange}
                        />}
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormGroup className="form-group">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="Start Date"
                                            inputFormat="YYYY-MM-DD"
                                            value={startDate}
                                            onChange={handleStartDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <Typography variant="span">{error.start_date}</Typography>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={6}>
                                <FormGroup className="form-group">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="End Date"
                                            inputFormat="YYYY-MM-DD"
                                            value={endDate}
                                            onChange={handleEndDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <Typography variant="span">{error.end_date}</Typography>
                                </FormGroup>
                            </Grid>
                        </Grid>

            <FormLabel>File</FormLabel>
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

                        <Map zoom={8} center={{ lat: 7.873054, lng: 80.771797 }} getLanLat={lanlat} listLangLat={locations}/>

                        <ThematicTags getThematicTags={tagsThematic} setThematicTag={tags_thematic} />

                        <SubjectTags getSubjectTags={tagsSubject} setSubjectTag={tags_subject} />

                        <ExtraTags getExtraTags={tagsExtra} setExtraTag={tags_extra} />

                        <Button
                            fullWidth
                            variant={"outlined"}
                            type={"submit"}
                            className="user__theme-btn"
                        >
                            Update project
                        </Button>

                        {alert ? <Alert className="response-alert" severity={alertType}>{alertContent}</Alert> : <></>}

                    </Grid>
                </Grid>
            </Box>
        </MainLayout>
    )
}

export default EditProject
