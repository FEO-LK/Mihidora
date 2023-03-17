import React, {useEffect, useState} from "react";
import {Button, CardContent, CardMedia, Container, Grid, MenuItem, Select, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import BaseLayout from "../BaseLayout";
import FilterSideBar from "./FilterSideBar";
import ProjectOrganizationNavbar from "./ProjectOrganizationNavbar";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MapLocations from "../components/MapLocations";
import {tagsThematic, tagsSubject, tagsExtra} from "../components/Tags";
import Pagination from "../../Dashboard/components/Pagination";


function OrganisationList() {
    const [organisationList, setOrganisationList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState([]);
    const [sortBy, setSortBy] = useState('Most Relevant');
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
        let district = district == '26' ? null : district;
        axios.post(
            '/api/organizations-filtered',
            {district, tags: [...thematicTags, ...subjectTags, ...extraTags]}
        ).then(res => {
            if (res.data.status === 200) {
                let filteredOrganizations;
                if (Array.isArray(res.data.filteredOrganizations)) {
                    filteredOrganizations = res.data.filteredOrganizations
                } else {
                    filteredOrganizations = Object.keys(res.data.filteredOrganizations).map((k) => res.data.filteredOrganizations[k])
                }
                let result = filteredOrganizations.filter((el) => {
                    let filterVal = el.org_name.toLowerCase()
                    return filterVal.indexOf(searchKeyword) !== -1
                })
                setOrganisationList(result);
            }
        })
    }

    useEffect(() => {
        stringSearch();
    }, [searchKeyword]);

    useEffect(() => {
        getProjectMapList();
        getFilteredOrganizations(null, []);

    }, []);

    const getOrganisationList = () => {
        axios.get(`/api/organisations`).then(res => {
            if (res.data.status === 200) {
                setOrganisationList(res.data.organizations);
                
            }
        });
    }

    const sorted = (data) => data.sort(function (a, b) {
        if (a.project_title > b.project_title) {
            return 1;
        }
        if (a.project_title < b.project_title) {
            return -1;
        }
        return 0;
    });

    const getFilteredOrganizations = (district, tags) => {
        axios.post(
            '/api/organizations-filtered',
            {district, tags}
        ).then(res => {
            if(res.data.status === 200) {
                let filteredOrganizations;
                if (Array.isArray(res.data.filteredOrganizations)) {
                    filteredOrganizations = res.data.filteredOrganizations
                } else {
                    filteredOrganizations = Object.keys(res.data.filteredOrganizations).map((k) => res.data.filteredOrganizations[k])
                }
                setOrganisationList(filteredOrganizations);
                setLocations(res.data.locations);
            }
        })
    }

    useEffect(() => {
        if (district == '26') {
            getFilteredOrganizations(null,[...thematicTags, ...subjectTags, ...extraTags]);
        } else {
            getFilteredOrganizations(district,[...thematicTags, ...subjectTags, ...extraTags]);
        }
    },[district,thematicTags.length,subjectTags.length,extraTags.length]);

    const handleOnChangeSortBy = (e) => {
        setSortBy(e.target.value);
        if (e.target.value === 'A-Z') {
            setOrganisationList(sorted(organisationList))
        } else {
            if (district == '26') {
                getFilteredOrganizations(null, [...thematicTags, ...subjectTags, ...extraTags]);
            } else {
                getFilteredOrganizations(district, [...thematicTags, ...subjectTags, ...extraTags]);
            }
        }
    }

    const getUserOrganisationList = () => {
        axios.get(`/api/view-organisations`).then(res => {
            if (res.data.status === 200) {
                setOrganisationList(res.data.organizations);
            }
        });
    }

    const showRequestBtn = (id) => {
        return organisationList?.map((item, key) => {
            if (item?.organization_user?.length > 0 && item.id === id) {
                return item.organization_user.map((request_item, index) => {
                    if (request_item.status == 1) {
                        return <Button key={index} size="small" disabled>Joined</Button>
                    } else if (request_item.status == 2) {
                        return <Button key={index} size="small" disabled>Request Pending</Button>
                    } else if (request_item.status == 0) {
                        return <Button key={index} size="small" disabled>Rejected</Button>
                    }
                })
            } else {
                if (item?.organization_user?.length == 0 && item.id === id) {
                    return <Button key={key} size="small" onClick={(e) => sendRequest(e, id)}>send Request</Button>
                }
            }
        })
    }

    const sendRequest = (e, id) => {
        e.preventDefault();
        const data = {
            organization_id: id,
        }
        e.currentTarget.innerText = 'Request Sent';
        e.currentTarget.disabled = true;
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/send-user-request', data).then(res => {
                if (res.data.status === 200) {
                    console.log('Sent');
                }
            });
        });
    }

    const getProjectMapList = () => {
        axios.get(`/api/organisation-map`).then(res => {
            if (res.data.status === 200) {
                setProjectMapList(res.data.organization_map);
            }
        });
    }

    const howManyPages = Math.ceil(organisationList.length / 100);

    const menuIcon = {
        color: '#c4c4c4',
        fontSize: 18,
        float: 'left',
        margin: '4px 5px 0px 0px'
    }

    const addYourOrgBtn = () => {
        if(localStorage.getItem('user_role') == 2) {
            return <Link to={'/dashboard'} className="theme-btn small-btn add_event-btn">Add your Org</Link>
        }else if(localStorage.getItem('user_role') == 1){
           
        }else {
            return <Link to={'/login'} className="theme-btn small-btn add_event-btn">Add your Org</Link>
        }
    }


    return (
        <BaseLayout title={"Organizations"}>

            <div className="topic-title-section">
                <Container>
                    <Grid container>
                        <Grid item sm={12} md={6} className="title-and-description">
                            <Typography variant="h1">Organisations & Projects</Typography>
                            <Typography>All in one page for Sri Lanka's environmental organisations</Typography>
                        </Grid>
                        <Grid item sm={12} md={6} className="add-org-link">
                            <Typography>
                                Do you work on environmental issues in Sri Lanka?
                                {addYourOrgBtn()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            <ProjectOrganizationNavbar/>

            <Container className="organization-list">
                <Grid container>
                    <Grid item sm={12} md={3} className="filter-sidebar">
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
                        />
                    </Grid>
                    <Grid item sm={12} md={9} className="list-wrap">
                        <Grid container spacing={2} className="search_bar">
                            <Grid item sm={12} md={12}>
                                <TextField
                                    type='text'
                                    name="list_search"
                                    size="small"
                                    placeholder="Search Organisations"
                                    onChange={ListSearchInput}
                                    value={searchKeyword}
                                >
                                </TextField>
                                <Button
                                    fullWidth
                                    variant={"outlined"}
                                    type={"button"}
                                    className="theme-btn ligth-btn small-btn"
                                    onClick={stringSearch}
                                    style={{float: 'right'}}>
                                    Search Organisations
                                </Button>
                            </Grid>
                            <Grid item sm={12} md={12} mb={3}>
                                <Grid container>
                                    <Grid item sm={12} md={4}>
                                        <Typography variant="span"
                                                    className="item-count">{organisationList?.length} organisations.</Typography>
                                    </Grid>
                                    <Grid item sm={12} md={8} sx={{flexDirection: 'row-reverse'}}
                                          className="grid-switch">
                                        <Select
                                            value={sortBy}
                                            onChange={handleOnChangeSortBy}
                                            size="small"
                                        >
                                            <MenuItem value='Most Relevant'>Most Relevant</MenuItem>
                                            <MenuItem value='A-Z'>A-Z</MenuItem>
                                        </Select>
                                        <Typography style={{fontSize: '12px', marginTop: '12px', marginRight: '5px'}}>Sort
                                            by: </Typography>
                                        {/* <Link to={`/organizations`} style={{marginRight: '10px'}}>Grid View</Link>
										<Link to={`/organization-map`}>Map View</Link>
										<Typography style={{fontSize: '12px', marginTop: '12px', marginRight: '5px'}}>View: </Typography> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {
                        view === 'map' ?
                            <MapLocations locationList={projectMapList}/> :
                            <>
                                <Grid container spacing={2}>
                                    {organisationList.slice((currentPage - 1) * 100, currentPage * 100).map((row, key) => (
                                        <Grid item key={key} xs={12} sm={4} className="organization_card">
                                            <Link to={`/organization/` + row.slug}>
                                        
                                                {row.org_logo !== '' &&
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={JSON.parse(row.org_logo)[0] ? '/storage/' + JSON.parse(row.org_logo)[0] : "../../../images/project.jpg"}
                                                    alt="organisation image"
                                                />
                                                }
                                                <CardContent className="card_content">
                                                    {/* <Typography variant="span"
                                                                className="main-tag">DISTRICT</Typography> */}
                                                    <Typography variant="h5"
                                                                className="org_title">{row.org_name}</Typography>
                                                    <ul className="card_tags">
                                                        <li><a href=""><LocationOnOutlinedIcon
                                                            style={menuIcon}/>  {locations?.[key]?.name_en || 'National'}</a></li>
                                                    </ul>
                                                    
                                                </CardContent>
                                            </Link>
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
    )
}

export default OrganisationList
