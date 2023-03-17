import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import FilterSideBar from "../Whatson/FilterSideBar";
import BaseLayout from "../BaseLayout";
import {updatedTimeFormat} from "../components/timeFormatFunctions";
import Pagination from "../../Dashboard/components/Pagination";
import MapLocations from "../components/MapLocations";
import ResourceExchangeNavbar from "../../Frontend/ResourceExchange/ResourceExchangeNavbar"; 
import {tagsThematic, tagsSubject, tagsExtra} from "../components/Tags";

function ResourceExchangeJobs() {

    const [jobList, setJobList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState([]);
    const [thematicTags, setThematicTags] = useState([]);
    const [subjectTags, setSubjectTags] = useState([]);
    const [extraTags, setExtraTags] = useState([]);
    const [district, setDistrict] = useState('');
    const [projectMapList, setProjectMapList] = useState([]);
    const [view, setView] = useState('list');
    const [locations, setLocations] = useState([]);

    const ListSearchInput = (e) => {
        e.persist();
        setSearchKeyword(e.target.value);
    }

    const stringSearch = () => {
        axios.get(`/api/classified-jobs`).then(res => {
            if (res.data.status === 200) {
                let result = res.data.classifieds.filter((el) => {
                    let filterVal = el.title.toLowerCase()
                    return filterVal.indexOf(searchKeyword) !== -1
                })
                setJobList(result);
            }
        });
    }

    useEffect(() => {
        stringSearch();
    }, [searchKeyword]);

    useEffect(() => {
        getJobList();
        getProjectMapList();
        getFilteredJobs(null,[]);
    }, []);

    const sorted = (data) => data.sort(function(a, b) {
        if (a.project_title > b.project_title) {
            return 1;
        }
        if (a.project_title < b.project_title) {
            return -1;
        }
        return 0;
    });
    
    const getFilteredJobs = (district, tags) => {
        axios.post(
            '/api/classified-jobs-filtered',
            {district, tags}
        ).then(res => {
            if(res.data.status === 200) {
                let filteredJobs;
                if (Array.isArray(res.data.filteredJobs)) {
                    filteredJobs = res.data.filteredJobs
                } else {
                    filteredJobs = Object.keys(res.data.filteredJobs).map((k) => res.data.filteredJobs[k])
                }
                setJobList(filteredJobs);
            }
        })
    }
    
    useEffect(() => {
        if (district == '26') {
            getFilteredJobs(null,[]);
        } else {
            getFilteredJobs(district,[]);
        }
    },[district,thematicTags.length,subjectTags.length,extraTags.length]);
    
    const handleOnChangeSortBy = (e) => {
        setSortBy(e.target.value);
        if (e.target.value === 'A-Z') {
            setJobList(sorted(jobList))
        } else {
            if (district == '26') {
                getFilteredJobs(null,[...thematicTags, ...subjectTags, ...extraTags]);
            } else {
                getFilteredJobs(district,[...thematicTags, ...subjectTags, ...extraTags]);
            }
        }
    }


    const getJobList = () => {
        axios.get(`/api/classified-jobs`).then(res => {
            if(res.data.status === 200) {
                setJobList(res.data.classifieds);
                setLocations(res.data.locations);
            }
        });
    }


    const navigate = useNavigate()
    const handleClick = (slug) => {
        navigate(`/resource-exchange-job/${slug}`);
    }

    const [sortBy, setSortBy] = useState('Most Relevant');

    const howManyPages = Math.ceil(jobList.length / 4);

    const getProjectMapList = () => {
        axios.get(`/api/classified-jobs-map`).then(res => {
            if (res.data.status === 200) {
                setProjectMapList(res.data.jobs_map);
            }
        });
    }

    const postYourAdBtn = () => {
        if(localStorage.getItem('user_role') == 2) {
            return <Link to={'/dashboard'} className="theme-btn small-btn add_event-btn">Post your Ad</Link>
        }else if(localStorage.getItem('user_role') == 1){
           
        }else {
            return <Link to={'/login'} className="theme-btn small-btn add_event-btn">Post your Ad</Link>
        }
    }

    return (
        <BaseLayout title={"Projects"}>

            <div className="topic-title-section">
                <Container>
                    <Grid container>
                        <Grid item sm={12} md={6} className="title-and-description">
                            <Typography variant="h1" style={{marginBottom: 0}}>Resource Exchange / Jobs</Typography>
                        </Grid>
                        <Grid item sm={12} md={6} className="add-org-link">
                            <Typography>
                                Does your organization have resources to share?
                                {postYourAdBtn()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
                <Container style={{display:'flex', justifyContent: 'center', marginTop:'2em', marginBottom: '2em'}}>
        
                </Container>
                <Container>
                    <Grid container className="search_bar" direction="row" justifyContent="space-around">
                        <Grid item sm={8} md={4}>
                            <TextField
                                type='text'
                                name="list_search"
                                size="small"
                                placeholder="Search for jobs"
                                onChange={ListSearchInput}
                                value={searchKeyword}
                                style={{width: '100%'}}
                            >
                            </TextField>
                        </Grid>
                    
                       
                        <Grid item sm={4} md={2}>
                            <Button
                                fullWidth
                                variant={"outlined"}
                                type={"button"}
                                className="theme-btn ligth-btn small-btn"
                                onClick={stringSearch}
                                style={{float: 'right'}}>
                                Search
                            </Button>
                        </Grid>
                     
                    </Grid>
                </Container>
            </div>

            <ResourceExchangeNavbar />

            <Container className="organization-list">
                <Grid container>
                    <Grid item sm={12} md={3}>
                        <FilterSideBar
                            thematicTags={tagsThematic}
                            subjectTags={tagsSubject}
                            extraTags={tagsExtra}
                            setThematicTags={setThematicTags}
                            selectedThematicTags={thematicTags}
                            setSubjectTags={setSubjectTags}
                            selectedSubjectTags={subjectTags}
                            setExtraTags={setExtraTags}
                            selectedExtraTags={extraTags}
                            district={district}
                            setDistrict={setDistrict}
                            view={view}
                            setView={setView}
                            resourceExchange
                        />
                    </Grid>
                    <Grid item sm={12} md={9} className="list-wrap">
                        <Grid container spacing={2} className="search_bar">
                            <Grid item sm={12} md={12} mb={3}>
                                <Grid container>
                                    <Grid item sm={12} md={4}>
                                        <Typography variant="span"
                                                    className="item-count">Showing {jobList.length} Jobs</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {
                            view === 'map' ?
                                <MapLocations locationList={projectMapList}/> :
                                <>
                                    <Grid container spacing={2} style={{paddingLeft: '20px'}}>
                                        {jobList.reverse().slice((currentPage - 1) * 4, currentPage * 4).map((jobDetails, key) => (
                                            <Grid item key={key} xs={12} className="data_card card-row resource-card">
                                                <Grid container>
                                                    <Grid item sm={12} md={1}>
                                                        <Box className="card-logo"
                                                             style={{
                                                                 backgroundImage: `url(${
                                                                     JSON.parse(jobDetails.photos)[0]
                                                                         ? `/storage/${JSON.parse(jobDetails.photos)[0]}`
                                                                         : "../../../../images/project.jpg"
                                                                 })`
                                                             }}
                                                    ></Box>

                                                        {/*style={{backgroundImage: `../../../../images/project.jpg`}}></Box>*/}
                                                    </Grid>
                                                    <Grid item sm={12} md={11} className="card-content">
                                                        <Typography
                                                            variant="h5"
                                                            className="card_title"
                                                            style={{cursor: 'pointer'}}
                                                            onClick={() => handleClick(jobDetails?.slug)}
                                                        >
                                                            {jobDetails.title}
                                                        </Typography>
                                                        <Grid container className="description">
                                                            <Grid item sm={12} md={10}>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {/* {jobDetails.description.slice(0, 200)}{jobDetails.description.length > 200 && '...'} */}
                                                                    {jobDetails.overview}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Typography variant="p" className="modified-date">
                                                            Location : {locations?.[key]?.name_en  || '-'}
                                                            <span>Published at : {updatedTimeFormat(jobDetails?.created_at)}</span>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Pagination pages={howManyPages} setCurrentPage={setCurrentPage}/>
                                </>
                        }
                    </Grid>
                </Grid>
            </Container>
        </BaseLayout>
    );
}

export default ResourceExchangeJobs;
