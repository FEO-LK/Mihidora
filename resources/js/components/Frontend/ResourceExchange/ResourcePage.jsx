import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Grid,
    Typography,
    CardActions,
    CardContent,
    CardMedia,
    menuIcon,
    Box,
    TextField,
    InputAdornment,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Divider
} from "@mui/material";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BaseLayout from "../BaseLayout";
// import TopicMenu from "./TopicMenu";
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import ListIcon from '@mui/icons-material/List';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import ListSkeleton8 from '../components/ListSkeleton8';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ProjectLink from '../components/ProjectLink';

import resourceImg from "../../../../../public/images/resources-illustration.png";

function ResourcePage() {
    const [projectList, setProjectList] = useState([]);
    const [projectLoad, setProjectLoad] = useState(true);
    const [dataList, setDataList] = useState([]);
    const [dataLoad, setDataLoad] = useState(true);

    const [elearningList, setElearningList] = useState([]);
    const [eventList, setEventList] = useState([]);

    // Filters
    const [subjectTags, setSubjectTags] = useState([]); // holds subject tag list for the filter
    const [extraTags, setExtraTags] = useState([]); // holds extra tag list for the filter
    const [l1tags, setL1tags] = useState([]);
    const [l2tags, setL2tags] = useState([]);
    const [l3tags, setL3tags] = useState([]);
    const [l4tags, setL4tags] = useState([]);
    const [locations, setLocations] = useState([]);
    // handles thematic tags and other single select filters
    const [state, setState] = useState({
        level1: '',
        level2: '',
        level3: '',
        level4: '',
        location: '',
        sortBy: ''
    })
    // handles subject & extra tags, multi select filters
    const [otherTags, setOtherTags] = useState({
        subject: [],
        extra: [],
    })
    // Results
    const [loading, setloading] = useState(true);

    useEffect(() => {
        loadProjects({ skip: 0, take: 50 });
        loadTags({ level: 1 }); // load level 1 tags
        loadTags({ level: 10 }); // load subject tags
        loadTags({ level: 11 }); // load extra tags
    }, []);

    const filterResults = () => {
        console.log(state);
        console.log(otherTags);
        let data = [
            state.level1,
            state.level2,
            state.level3,
            state.level4,
            ...otherTags.subject.map((option) => option.id),
            ...otherTags.extra.map((option) => option.id),
        ]
        console.log(data);
    }

    const loadTags = (data) => {
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/get-tags', data).then(res => {
                console.log(res)
                if (res.status == 200) {
                    if (data.level == 1) {
                        setL1tags(res.data.tags);
                    }
                    if (data.level == 2) {
                        setL2tags(res.data.tags);
                    }
                    if (data.level == 3) {
                        setL3tags(res.data.tags);
                    }
                    if (data.level == 4) {
                        setL4tags(res.data.tags);
                    }
                    if (data.level == 10) {
                        setSubjectTags(res.data.tags);
                    }
                    if (data.level == 11) {
                        setExtraTags(res.data.tags);
                    }
                } else {
                    // handle the error
                }
            });
        });
    }
    const loadProjects = (data) => {
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/get-projects', data).then(res => {
                console.log(res)
                if (res.status == 200) {
                    setProjectList(res.data.projects);
                    setProjectLoad(false);
                } else {
                    // handle the error
                    setProjectLoad(false);
                }
            });
        });
    }
    const filterProjects = (data) => {
        setProjectLoad(true);
        setDataLoad(true);
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/filter-topics', data).then(res => {
                console.log(res)
                if (res.status == 200) {
                    setProjectList(res.data.projects);
                    setProjectLoad(false);
                    setDataList(res.data.data);
                    setDataLoad(false);
                } else {
                    // handle the error
                    setProjectLoad(false);
                }
            });
        });
    }

    // input handlers
    const handleL1Change = (e) => {
        setState({
            ...state,
            level1: e.target.value,
            level2: '',
            level3: '',
            level4: ''
        })
        loadTags({ level: 2, parent: e.target.value });
        let data = [
            e.target.value,
            ...otherTags.subject.map((option) => option.id),
            ...otherTags.extra.map((option) => option.id),
        ]
        console.log(data);
        filterProjects({ filters: data, take: 50 });
    }
    const handleL2Change = (e) => {
        setState({
            ...state,
            level2: e.target.value,
            level3: '',
            level4: ''
        })
        loadTags({ level: 3, parent: e.target.value });
        let data = [
            state.level1,
            e.target.value,
            ...otherTags.subject.map((option) => option.id),
            ...otherTags.extra.map((option) => option.id),
        ]
        filterProjects({ filters: data, take: 50 });
    }
    const handleL3Change = (e) => {
        setState({
            ...state,
            level3: e.target.value,
            level4: ''
        })
        loadTags({ level: 4, parent: e.target.value });
        let data = [
            state.level1,
            state.level2,
            e.target.value,
            ...otherTags.subject.map((option) => option.id),
            ...otherTags.extra.map((option) => option.id),
        ]
        filterProjects({ filters: data, take: 50 });
    }
    const handleL4Change = (e) => {
        setState({
            ...state,
            level4: e.target.value,
        })
        let data = [
            state.level1,
            state.level2,
            state.level3,
            e.target.value,
            ...otherTags.subject.map((option) => option.id),
            ...otherTags.extra.map((option) => option.id),
        ]
        filterProjects({ filters: data, take: 50 });
    }
    const handleSujectTagChange = (event, newValue) => {
        setOtherTags({ ...otherTags, subject: newValue });
        let data = [
            state.level1,
            state.level2,
            state.level3,
            state.level4,
            ...newValue.map((option) => option.id),
            ...otherTags.extra.map((option) => option.id),
        ]
        filterProjects({ filters: data, take: 50 });
    }
    const handleExtraTagSelect = (event, newValue) => {
        setOtherTags({ ...otherTags, extra: newValue });
        let data = [
            state.level1,
            state.level2,
            state.level3,
            state.level4,
            ...otherTags.subject.map((option) => option.id),
            ...newValue.map((option) => option.id),
        ]
        filterProjects({ filters: data, take: 50 });
    }
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleImageError = (event) => {
        event.target.src = '../../../images/project-default.jpg'; // Set the fallback image URL
    };

    const handleImageErrorData = (event) => {
        event.target.src = '../../../images/data-default.jpg'; // Set the fallback image URL
    };

    const menuIcon = {
        color: '#c4c4c4',
        fontSize: 18,
        float: 'left',
        margin: '4px 5px 0px 0px'
    }


    return (
        <BaseLayout title={"Topic"}>

            <div className="topic-title-section">
                <Container>
                    <Grid container>
                        <Grid item sm={12} md={6} lg={6}>
                            <Typography variant="h1">Resource Exchange</Typography>
                        </Grid>
                        <Grid item sm={12} md={6} lg={6}>
                            <div className="section-links">
                                <div style={{ marginRight: '20px' }}><ProjectLink name="Projects" link={'/projects'} icon={<NaturePeopleIcon fontSize="small" className="iconActive" />} /></div>
                                <div style={{ marginRight: '20px' }}><ProjectLink name="Data" link={'/datahub'} icon={<TextSnippetIcon fontSize="small" className="iconActive" />} /></div>
                                <div style={{ marginRight: '20px' }}><ProjectLink visited name="Resources" link={'/resource-exchange'} icon={<ArchitectureIcon fontSize="small" className="iconVisited" />} /></div>
                                <div style={{ marginRight: '20px' }}><ProjectLink name="E-Learning" link={'/projects'} icon={<AutoStoriesIcon fontSize="small" className="iconActive" />} /></div>
                                <div style={{ marginRight: '20px' }}><ProjectLink name="Events" link={'/projects'} icon={<CalendarMonthIcon fontSize="small" className="iconActive" />} /></div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            <Container sx={{ mb: 2 }} className="filter_forms">
                <Grid container>
                    <Grid item sm={12} md={6} lg={6}>
                        <Box variant="div" className="card-image"><img src={resourceImg} /></Box>
                    </Grid>
                    <Grid item sm={12} md={6} lg={6}>
                        <Typography variant="h5">All the Resources You Need <br></br> for Your Next Project</Typography>
                        <Typography sx={{ fontSize: '12px' }} mt={1} mb={3}>
                            At vero eos et accusamus et iusto odio dignissimos ducimus
                            qui blanditiis praesentium voluptatum deleniti atque corrupti
                            quos dolores et quas molestias excepturi sint occaecati
                            cupiditate non provident, similique sunt in culpa qui officia
                            deserunt mollitia animi, id est laborum et dolorum fuga. Et
                            harum quidem rerum facilis est et expedita distinctio
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip sx={{ backgroundColor: '#000000', color: '#ffffff' }} label="Jobs" component="a" href="#basic-chip" clickable />
                            <Chip sx={{ backgroundColor: '#000000', color: '#ffffff' }} label="Grants & RFPs" component="a" href="#basic-chip" clickable />
                            <Chip sx={{ backgroundColor: '#000000', color: '#ffffff' }} label="Suppliers" component="a" href="#basic-chip" clickable />
                            <Chip sx={{ backgroundColor: '#000000', color: '#ffffff' }} label="Resources Pool" component="a" href="#basic-chip" clickable />
                            
                        </Stack>
                    </Grid>
                </Grid>
                {/* <TextField className="searchbox" sx={{
                    '& .MuiInputBase-root-MuiOutlinedInput-root': {
                        borderRadius: '30px'
                    }
                }} fullWidth placeholder="Search using tags: energy, water etc..." id="fullWidth" size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="end" sx={{
                                borderRadius: '30px',
                                '& .MuiInputBase-root-MuiOutlinedInput-root': {
                                    borderRadius: '30px'
                                }
                            }}>
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                /> */}

            </Container>

            {/* ------------------ projects --------------------- */}

            <div id="datasets" className="topic-sub-section">
                <Container>

                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h4" className="section-title">Resource Map</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: 'right' }}>

                        </Grid>
                    </Grid>
                </Container>
            </div>

        </BaseLayout>
    )
}

export default ResourcePage
