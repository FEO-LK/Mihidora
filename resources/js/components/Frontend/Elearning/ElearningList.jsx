import React, { useEffect, useState } from "react";
import {Container, Grid, Typography, Button, TextField, Select, MenuItem,} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import BaseLayout from "../BaseLayout";
import PageBanner from "../components/PageBanner";

import bannerImage from "../../../../images/aboutBanner.jpg";
import Pagination from "../../Dashboard/components/Pagination";
import ElearningComponent from "./ElearningComponent";
import FilterSideBar from "../Elearning/FilterSideBar";
import {tagsThematic, tagsSubject, tagsExtra} from "../components/Tags";

function ElearningList() {
    const [eLearningMaterialList, setELearningMaterialList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState([]);
    const [sortBy, setSortBy] = useState('Most Relevant');
    const [thematicTags, setThematicTags] = useState([]);
    const [subjectTags, setSubjectTags] = useState([]);
    const [extraTags, setExtraTags] = useState([]);
    const [district, setDistrict] = useState('');

    const ListSearchInput = (e) => {
        e.persist();
        setSearchKeyword(e.target.value);
    }

    const stringSearch = () => {
        let district = district == '26' ? null : district;
        axios.post(
            '/api/elearning-filtered',
            {district, tags: [...thematicTags, ...subjectTags, ...extraTags]}
        ).then(res => {
            if(res.data.status === 200) {
                let filteredELearningData;
                if (Array.isArray(res.data.filteredELearningData)) {
                    filteredELearningData = res.data.filteredELearningData
                } else {
                    filteredELearningData = Object.keys(res.data.filteredELearningData).map((k) => res.data.filteredELearningData[k])
                }
                let result = filteredELearningData.filter((el) => {
                    let filterVal = el.title.toLowerCase()
                    return filterVal.indexOf(searchKeyword) !== -1
                })
                setELearningMaterialList(result);
            }
        })
    }

    useEffect(() => {
        stringSearch();
    }, [searchKeyword]);

    useEffect(() => {
        getFilteredELearningData(null,[]);

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

    const getFilteredELearningData = (district, tags) => {
        axios.post(
            '/api/elearning-filtered',
            {district, tags}
        ).then(res => {
            if(res.data.status === 200) {
                let filteredELearningData;
                if (Array.isArray(res.data.filteredELearningData)) {
                    filteredELearningData = res.data.filteredELearningData
                } else {
                    filteredELearningData = Object.keys(res.data.filteredELearningData).map((k) => res.data.filteredELearningData[k])
                }
                setELearningMaterialList(filteredELearningData);
            }
        })
    }

    useEffect(() => {
        if (district == '26') {
            getFilteredELearningData(null,[...thematicTags, ...subjectTags, ...extraTags]);
        } else {
            getFilteredELearningData(district,[...thematicTags, ...subjectTags, ...extraTags]);
        }
    },[district, thematicTags.length, subjectTags.length, extraTags.length ]);

    const handleOnChangeSortBy = (e) => {
        setSortBy(e.target.value);
        if (e.target.value === 'A-Z') {
            setELearningMaterialList(sorted(eLearningMaterialList))
        } else {
            if (district == '26') {
                getFilteredELearningData(null,[...thematicTags, ...subjectTags, ...extraTags]);
            } else {
                getFilteredELearningData(district,[...thematicTags, ...subjectTags, ...extraTags]);
            }
        }
    }

    const getELearningMaterialList = () => {
        axios.get(`/api/elearning-list`).then(res => {
            if(res.data.status === 200) {
                setELearningMaterialList(res.data.get_data);
            }
        });
    }

    const contributeBtn = () => {
        if(localStorage.getItem('user_role') == 2) {
            return <Link to={'/dashboard'} className="theme-btn small-btn add_event-btn">Contribute Materials</Link>
        }else if(localStorage.getItem('user_role') == 1){
           
        }else {
            return <Link to={'/login'} className="theme-btn small-btn add_event-btn">Contribute Materials</Link>
        }
    }

    const navigate = useNavigate();
    const handleClick = (slug) => {
        navigate(`/elearning-material/${slug}`);
    }

    const howManyPages = Math.ceil(eLearningMaterialList.length/100);

    return (
        <BaseLayout title={"E-Learning Materials"}>
            <div className="banner-title" >
                <PageBanner image={bannerImage}/>
            </div>
            <Container className="elearning-list">
                <Grid container style={{marginBottom: '2em'}}>
                    <Grid item sm={12} md={3} className="filter-sidebar">
                        <FilterSideBar
                            mapLocation={'elearning-map'}
                            listLocation={'elearning-materials'}
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
                                    value={searchKeyword}
                                ></TextField>
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
                                    <Typography variant="span" className="item-count">{eLearningMaterialList?.length} learning materials.</Typography>
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
                        <Grid container spacing={2}>
                  
                            {eLearningMaterialList.reverse().slice((currentPage-1)*100, currentPage*100).map((row, key) => (
                         
                                <ElearningComponent row={row} key={key} handleClick={handleClick}/>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage}/>
            </Container>
        </BaseLayout>
    )
}

export default ElearningList;
