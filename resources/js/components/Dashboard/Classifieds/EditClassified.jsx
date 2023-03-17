import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Box, TextField, Typography, Button, FormGroup, FormControl, InputLabel, Select, MenuItem, FormLabel, Alert } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MainLayout from "../BaseLayout";
import MenuTab from "./MenuTab";
import FileUploader from '../components/FileUploader';
import ImageUploader from '../components/ImageUploader';
import ExampleTheme from "../LexicalEditor/themes/ExampleTheme";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import EditorEdit from "../LexicalEditor/EditorEdit";

function EditClassified(props) {
    const datasetParams = useParams();
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertContent, setAlertContent] = useState('');
    const [error, setError] = useState([]);
    const [formInput, setFormInput] = useState({
        title: '',
        description: '',
    });
    // const [projectList, setProjectList] = useState([]);
    // const [linkProject, setLinkProject] = useState("");
    const [type, setType] = useState('');
    const [photos, setPhotos] = useState([]);
    const [files, setFiles] = useState([]);
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
        getDataset();

    }, [datasetParams.slug, localStorage.getItem('auth_id')]);

    const getDataset = () => {
        axios.get(`/api/edit-classified/${datasetParams.slug}`).then(res => {
            if (res.data.status === 200) {
                setFormInput(res.data.get_data);
                setType(res.data.get_data.type);
                setPhotos(JSON.parse(res.data.get_data.photos));
                setFiles(JSON.parse(res.data.get_data.uploads));
                setLinkDistrict(res.data.get_data.district_id);
                setLinkCity(res.data.get_data.city_id);
                setNewInputFields(res.data.get_data.weblink);
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

    const selectType = (event) => {
        setType(event.target.value);
    }

    const selectLinkDistrict = (event) => {
        setLinkDistrict(event.target.value);
    }

    const selectLinkCity = (event) => {
        setLinkCity(event.target.value);
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
        let newfield = { web_link_title: '', linked_content_type: '', linked_content: '' }
        setNewInputFields([...newInputFields, newfield])
    }

    const removeNewField = (index) => {
        let data = [...newInputFields];
        data.splice(index, 1)
        setNewInputFields(data)
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

    const updateClassified = (e) => {
        e.preventDefault();
        const user_id = localStorage.getItem('auth_id');
        const data = {
            user_id: user_id,
            type:	type,
            title: formInput.title,
            description: formInput.description,
            weblink: newInputFields,
            uploads: files,
            photos:	photos,
            district_id: linkDistrict,
            city_id: linkCity,
            status:	1
        }
        axios.put(`/api/update-classified/${datasetParams.slug}`, data).then(res => {
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
        <MainLayout title={"Update Classified"}>
            <MenuTab />
            <Box component={"form"} onSubmit={updateClassified}>
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
                                <MenuItem value={3}>Green/Sustainable Suppliers.</MenuItem>
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
                                                value={element.web_link_title || ''}
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
                                                value={element.linked_content_type || ''}
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
                                                value={element.linked_content || ''}
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
                        {photos.map((element, index) => (
                            <Grid key={index} item xs={4} className="photo-preview">
                            <Button onClick={() => handleImageRemove(element)} className="remove-btn">
                                <img src={`../../../../images/remove-icon.png`} />
                            </Button>
                            <img src={`/storage/`+element} />
                            </Grid>
                        ))}
                        </Grid>

                        <Button
                            fullWidth
                            variant={"outlined"}
                            type={"submit"}
                            className="user__theme-btn">
                            Update Classified
                        </Button>

                        {alert ? <Alert className="response-alert" severity={alertType}>{alertContent}</Alert> : <></>}

                    </Grid>
                </Grid>
            </Box>
        </MainLayout>
    )
}

export default EditClassified
