import React, {useEffect, useState} from "react"
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
} from "@mui/material"
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker'
import MainLayout from "../BaseLayout"
import MenuTab from "./MenuTab"
import Map from '../Map'
import moment from "moment"
import ThematicTags from '../components/ThematicTags'
import SubjectTags from "../components/SubjectTags"
import ExtraTags from "../components/ExtraTags"
import Editor from "../LexicalEditor/Editor";
import FileUploader from '../components/FileUploader';
import ImageUploader from '../components/ImageUploader';

function AddNewProject(props) {
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
    const [startDate, setStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState();
    const [newInputFields, setNewInputFields] = useState([
        { linked_content_type: '', linked_content: '' }
    ]);
    const [error, setError] = useState([]);
    const [locations, setLocation] = useState([]);
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

    const getMediaFiles = (e) => { //files
        setPhotos(e);
      }
    
      const getImages = (e) => {     //photos
        setFiles(e);
      }

    const onChange = (editorState) => {
        editorState.read(() => {
            setFormInput({...formInput, description: JSON.stringify(editorState)});
        });
    }

    const createNewProject = (e) => {
        e.preventDefault();
        const headers = { "Content-Type": "multipart/form-data" };
        const user_id = localStorage.getItem('auth_id');
        const data = {
            user_id: user_id,
            organization_id : localStorage.getItem('org_id'), 
            project_title: formInput.project_title,
            overview: formInput.overview,
            description: formInput.description,
            locations: locations,
            district_id: linkDistrict,
            city_id: linkCity,
            uploads: photos, //files
            photos:	files,   //photos
            ongoing: 'No',
            start_date: startDate,
            end_date: endDate,
            linked_content: newInputFields,
            tags_thematic: tags_thematic,
            tags_subject: tags_subject,
            tags_extra: tags_extra
        }
        axios.post(`/api/store-project`, data, headers).then(res => {
            if (res.data.status === 200) {
                setAlert(true);
                setAlertType('success');
                setAlertContent(res.data.message);
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors, "422");
            } else {
                console.log(res.data.errors, "error");
            }
        });
    }

    return (
        <MainLayout title={"Add New Project"}>
            <MenuTab/>
            <Box component={"form"} encType={"multipart/form-data"} onSubmit={createNewProject}>
                <Grid container>
                    <Grid item md={12} lg={8}>
                        <FormGroup className="form-group">
                            <TextField
                                type='text'
                                fullWidth
                                label="Project Title *"
                                name="project_title"
                                inputProps={{
                                    maxLength: 200,
                                }}
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
                        <div>
                            <Editor onChange={onChange}/>
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormGroup className="form-group">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="Start Date *"
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
                        <FileUploader setSelectedFiles={getMediaFiles}  files={files}/>
                        <Grid container spacing={2} sx={{'marginBottom': 6}}>
                        {photos?.map((item, index) =>{
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
                            {files?.map((element, index) => (
                            <Grid key={index} item xs={4} className="photo-preview">
                            <Button onClick={() => handleImageRemove(element)} className="remove-btn">
                                <img src={`../../../../images/remove-icon.png`} />
                            </Button>
                            <img src={`/storage/`+element} />
                            </Grid>
                        ))}
                        </Grid>

                        {/* <Map zoom={8} center={{ lat: 7.873054, lng: 80.771797 }} getLanLat={lanlat}  listLangLat={[]}/> */}
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
                            Add Project
                        </Button>

                        {alert ? <Alert className="response-alert" severity={alertType}>{alertContent}</Alert> : <></>}

                    </Grid>
                </Grid>
            </Box>
        </MainLayout>
    )
}

export default AddNewProject
