import React, { useEffect, useState } from "react";
import {Container, Grid, Typography, TextField, Button, Select, MenuItem} from "@mui/material";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link } from "react-router-dom";
import BaseLayout from "../BaseLayout";
import PageBanner from "../components/PageBanner";
import {updatedTimeFormat} from "../components/timeFormatFunctions";

import bannerImage from "../../../../images/aboutBanner.jpg";
import FilterSideBar from "../Whatson/FilterSideBar";
import {tagsThematic, tagsSubject, tagsExtra} from "../components/Tags";

function DataHubList() {
	const [projectList, setProjectList] = useState([]);
    const [locationList, setLocationList] = useState([]);
	const [searchEvent, setSearchEvent] = useState([]);
    const [sortBy, setSortBy] = useState('Most Relevant');
    const [thematicTags, setThematicTags] = useState([]);
    const [subjectTags, setSubjectTags] = useState([]);
    const [extraTags, setExtraTags] = useState([]);
    const [district, setDistrict] = useState('');
    const [projectMapList, setProjectMapList] = useState([]);
    const [view, setView] = useState('list');
    const [searchKeyword, setSearchKeyword] = useState([]);

    const ListSearchInput = (e) => {
        e.persist();
        setSearchKeyword(e.target.value);
    }

    useEffect(() => {
        stringSearch();
    }, [searchKeyword]);

    const stringSearch = () => {
        let district = district == '26' ? null : district;
        axios.post(
            '/api/datahub-filtered',
            {district, tags: [...thematicTags, ...subjectTags, ...extraTags]}
        ).then(res => {
            if(res.data.status === 200) {
                let filteredWhatsOnEvents;
                if (Array.isArray(res.data.filteredDatahub)) {
                    filteredWhatsOnEvents = res.data.filteredDatahub
                } else {
                    filteredWhatsOnEvents = Object.keys(res.data.filteredDatahub).map((k) => res.data.filteredDatahub[k])
                }
                let result = filteredWhatsOnEvents.filter((el) => {
                    let filterVal = el.title.toLowerCase()
                    return filterVal.indexOf(searchKeyword) !== -1
                })
                setProjectList(result);
            }
        })
    }

	useEffect(() => {
        // getProjectList();
        // getDatahubData();
        getFilteredDatahub(null,[]);
	}, []);

    const sorted = (data) => data.sort(function(a, b) {
        if (a.title > b.title) {
            return 1;
        }
        if (a.title < b.title) {
            return -1;
        }
        return 0;
    });

    const getFilteredDatahub = (district, tags) => {
        axios.post(
            '/api/datahub-filtered',
            {district, tags}
        ).then(res => {
            if(res.data.status === 200) {
                let filteredDatahub;
                let locationData;
                if (Array.isArray(res.data.filteredDatahub)) {
                    filteredDatahub = res.data.filteredDatahub
                } else {
                    filteredDatahub = Object.keys(res.data.filteredDatahub).map((k) => res.data.filteredDatahub[k])
                }

                if (Array.isArray(res.data.locations)) {
                    locationData = res.data.locations
                } else {
                    locationData = Object.keys(res.data.locations).map((k) => res.data.locations[k])
                }
                setProjectList(filteredDatahub);
                setLocationList(locationData);
            }
        })
    }

    useEffect(() => {
        if (district == '26') {
            getFilteredDatahub(null,[...thematicTags, ...subjectTags, ...extraTags]);
        } else {
            getFilteredDatahub(district,[...thematicTags, ...subjectTags, ...extraTags]);
        }
    },[district,thematicTags.length,subjectTags.length,extraTags.length]);

    const handleOnChangeSortBy = (e) => {
        setSortBy(e.target.value);
        if (e.target.value === 'A-Z') {
            setProjectList(sorted(projectList))
        } else {
            if (district == '26') {
                getFilteredDatahub(null,[...thematicTags, ...subjectTags, ...extraTags]);
            } else {
                getFilteredDatahub(district,[...thematicTags, ...subjectTags, ...extraTags]);
            }
        }
        
    }

	const getProjectList = () => {
		axios.get(`/api/datahub-list`).then(res => {
			if(res.data.status === 200) {
				setProjectList(res.data.projects);
			}
		});
	}


	const menuIcon = {
		color: '#c4c4c4',
    fontSize: 18,
    float: 'left',
    margin: '4px 5px 0px 0px'
  }

	const eventSearchInput = (e) => {
		e.persist();
    setSearchEvent(e.target.value);
	}

    const contributeBtn = () => {
            if(localStorage.getItem('user_role') == 2) {
                return <Link to={'/dashboard'} className="theme-btn small-btn add_event-btn">Contribute Materials</Link>
            }else if(localStorage.getItem('user_role') == 1){
               
            }else {
                return <Link to={'/login'} className="theme-btn small-btn add_event-btn">Contribute Materials</Link>
            }
        }

	return (
		<BaseLayout title={"All data sets"}>
			<div className="banner-title" >
				<PageBanner image={bannerImage}/>
			</div>
			<Container className="elearning-list">
				<Grid container>
					<Grid item sm={12} md={3}>
						<FilterSideBar
                            mapLocation={'datahub-map'}
                            listLocation={'datahub'}
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
                        />
					</Grid>
					<Grid item sm={12} md={9} className="list-wrap">
						<Grid container spacing={2} className="search_bar">
							<Grid item sm={12} md={9}>
								<TextField
									type='text'
									name="search_event"
									size="small"
									placeholder="Search Event"
									onChange={ListSearchInput}
									value={searchKeyword}></TextField>
								<Button
									fullWidth
									variant={"outlined"}
									type={"button"}
									className="theme-btn ligth-btn small-btn">
									Search
								</Button>
							</Grid>
							<Grid item sm={12} md={3}>
                            {contributeBtn()}
							</Grid>
						</Grid>
                        <Grid item sm={12} md={12} mb={3} style={{marginTop:'1em'}}>
                            <Grid container>
                                <Grid item sm={12} md={4}>
                                    <Typography variant="span" className="item-count">{projectList?.length} data items.</Typography>
                                </Grid>
                                <Grid item sm={12} md={8} sx={{ flexDirection: 'row-reverse' }} className="grid-switch">
                                    <Select
                                        value={sortBy}
                                        onChange={handleOnChangeSortBy}
                                        size="small"
                                    >
                                        <MenuItem value='Most Relevant'>Most Relevant</MenuItem>
                                        <MenuItem value='A-Z'>A-Z</MenuItem>
                                    </Select>
                                    <Typography style={{fontSize: '12px', marginTop: '12px', marginRight: '5px'}}>Sort by: </Typography>
                                    {/* <Link to={`/organizations`} style={{marginRight: '10px'}}>Grid View</Link>
										<Link to={`/organization-map`}>Map View</Link>
										<Typography style={{fontSize: '12px', marginTop: '12px', marginRight: '5px'}}>View: </Typography> */}
                                </Grid>
                            </Grid>
                        </Grid>
						<Grid container>
							{/*<Typography variant="span" className="item-count">Showing 23 Events.</Typography>*/}
							{projectList?.map((row, index) => (

								<Grid container key={row.id} xs={12} className="data_card" >
                                    <Grid item sm={12} md={9}>
                                        <Typography className="last_update" style={{marginBottom: '-8px'}}>Created at {updatedTimeFormat(row.created_at)}</Typography>
                                        <Link to={'/datahub/'+row.slug}>
                                            <Typography variant="h5" className="card_title">
                                                {row.title}
                                            </Typography>
                                        </Link>
                                        <Typography variant="body2" color="text.secondary">
                                            {row.overview}
                                        </Typography>
                                        {/* <Typography className="last_update">Location: {locationList[0]} </Typography> */}
                                        <ul className="related-tags" style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}>{
                                            row.tags?.map((tag, key) => {
                                                if (tag.type === '1') {
                                                    return <li><Link style={{color: '#343434', fontSize: '12px'}} to=''>#{tag.name.en}</Link>
                                                    </li>
                                                }
                                            }) 
                                        }</ul>
                                    </Grid>
                                    <Grid item sm={12} md={3}>
                                        <Typography className="last_update">Author: {row.author} </Typography>
                                        <Typography className="last_update">Location: {locationList[index]?.name_en} </Typography>
                                    </Grid>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</BaseLayout>
	)
}

export default DataHubList
