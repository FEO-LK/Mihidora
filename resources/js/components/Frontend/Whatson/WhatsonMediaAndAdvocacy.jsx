import React, {useEffect, useState} from 'react';
import BaseLayout from "../BaseLayout";
import {
    Button,
    CardContent,
    CardMedia,
    Container,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import PageBanner from "../components/PageBanner";
import bannerImage from "../../../../images/aboutBanner.jpg";
import Pagination from "../../Dashboard/components/Pagination";
import FilterSideBar from "../Organisations/FilterSideBar";
import MapLocations from "../components/MapLocations";
import WhatsOnNavbar from "../../Frontend/Whatson/WhatsOnNavbar"; 
import {tagsThematic, tagsSubject, tagsExtra} from "../components/Tags";

function WhatsonMediaAndAdvocacy() {

    const [mediaAndArticleList, setMediaAndArticleList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState([]);
    const [sortBy, setSortBy] = useState('Most Relevant');
    const [thematicTags, setThematicTags] = useState([]);
    const [subjectTags, setSubjectTags] = useState([]);
    const [extraTags, setExtraTags] = useState([]);
    const [district, setDistrict] = useState('');
    const [projectMapList, setProjectMapList] = useState([]);
    const [view, setView] = useState('list');

    const ListSearchInput = (e) => {
        e.persist();
        setSearchKeyword(e.target.value);
    }

    const stringSearch = () => {
        let district = district == '26' ? null : district;
        axios.post(
            '/api/whatson-filtered-media-and-advocacy',
            {district, tags: [...thematicTags, ...subjectTags, ...extraTags]}
        ).then(res => {
            if(res.data.status === 200) {
                let filteredMediaAndAdvocacy;
                if (Array.isArray(res.data.filteredMediaAndAdvocacy)) {
                    filteredMediaAndAdvocacy = res.data.filteredMediaAndAdvocacy
                } else {
                    filteredMediaAndAdvocacy = Object.keys(res.data.filteredMediaAndAdvocacy).map((k) => res.data.filteredMediaAndAdvocacy[k])
                }
                let result = filteredMediaAndAdvocacy.filter((el) => {
                    let filterVal = el.title.toLowerCase()
                    return filterVal.indexOf(searchKeyword) !== -1
                })
                setMediaAndArticleList(result);
            }
        })
    }

    useEffect(() => {
        stringSearch();
    }, [searchKeyword]);

    useEffect(() => {
        // getMediaAndArticleList();
        getFilteredMediaAndAdvocacy(null,[]);
        getProjectMapList();
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

    const getFilteredMediaAndAdvocacy = (district, tags) => {
        axios.post(
            '/api/whatson-filtered-media-and-advocacy',
            {district, tags}
        ).then(res => {
            if(res.data.status === 200) {
                let filteredMediaAndAdvocacy;
                if (Array.isArray(res.data.filteredMediaAndAdvocacy)) {
                    filteredMediaAndAdvocacy = res.data.filteredMediaAndAdvocacy
                } else {
                    filteredMediaAndAdvocacy = Object.keys(res.data.filteredMediaAndAdvocacy).map((k) => res.data.filteredMediaAndAdvocacy[k])
                }
                setMediaAndArticleList(filteredMediaAndAdvocacy);
            }
        })
    }

    useEffect(() => {
        if (district == '26') {
            getFilteredMediaAndAdvocacy(null,[...thematicTags, ...subjectTags, ...extraTags]);
        } else {
            getFilteredMediaAndAdvocacy(district,[...thematicTags, ...subjectTags, ...extraTags]);
        }
    },[district, thematicTags.length, subjectTags.length, extraTags.length ]);

    const handleOnChangeSortBy = (e) => {
        setSortBy(e.target.value);
        if (e.target.value === 'A-Z') {
            setMediaAndArticleList(sorted(mediaAndArticleList))
        } else {
            if (district == '26') {
                getFilteredMediaAndAdvocacy(null,[...thematicTags, ...subjectTags, ...extraTags]);
            } else {
                getFilteredMediaAndAdvocacy(district,[...thematicTags, ...subjectTags, ...extraTags]);
            }
        }
    }

    const getMediaAndArticleList = () => {
        axios.get(`/api/whatson-media-and-articles`).then(res => {
            if(res.data.status === 200) {
                setMediaAndArticleList(res.data.articles);
            }
        });
    }

    const getProjectMapList = () => {
        axios.get(`/api/whatson-media-map`).then(res => {
            if(res.data.status === 200) {
                setProjectMapList(res.data.media_map);
            }
        });
    }

    const navigate = useNavigate()
    const handleClick = (slug) => {
        navigate(`/whatson-media-and-advocacy/${slug}`);
    }

    const howManyPages = Math.ceil(mediaAndArticleList.length/6);

    const menuIcon = {
        color: '#c4c4c4',
        fontSize: 18,
        float: 'left',
        margin: '4px 5px 0px 0px'
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
        <BaseLayout title={"E-Learning Materials"}>
            <div className="banner-title" style={{marginBottom: 0}}>
                <PageBanner image={bannerImage}/>
            </div>

            <WhatsOnNavbar />

            <Container className="elearning-list">
                <Grid container style={{marginBottom: '2em'}}>
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
                            <Grid item sm={12} md={9}>
                                <TextField
                                    type='text'
                                    name="search_event"
                                    size="small"
                                    placeholder="Search media and advocacy"
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
                                    <Typography variant="span" className="item-count">{mediaAndArticleList?.length} learning materials.</Typography>
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
                        {
                            view === 'map' ?
                                <MapLocations locationList={projectMapList}/> :
                                <Grid container spacing={2} style={{marginBottom: '2em'}}>
                                    {mediaAndArticleList.slice((currentPage-1)*6, currentPage*6).map((row, key) => (
                                        <Grid item key={key} xs={4} className="organization_card" onClick={() => handleClick(row?.slug)}>
                                            <Link to={``}>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={JSON.parse(row.photos)[0] ? '/storage/' + JSON.parse(row.photos)[0] : "../../../images/project.jpg"}
                                                    alt="project photo"
                                                />
                                                <CardContent className="card_content">
                                                    {/*<Typography variant="span" className="main-tag">THEMATIC AREA</Typography>*/}
                                                    <Typography variant="h5" className="org_title">{row?.title}</Typography>
                                                    {/*<ul className="card_tags">*/}
                                                    {/*    <li><a href=""><ArticleOutlinedIcon style={menuIcon} /> CSV</a></li>*/}
                                                    {/*    <li><a href=""><SettingsApplicationsOutlinedIcon style={menuIcon} /> API</a></li>*/}
                                                    {/*    <li><a href=""><LocationOnOutlinedIcon style={menuIcon} /> Map</a></li>*/}
                                                    {/*</ul>*/}
                                                    <Typography variant="p">{row.overview}</Typography>
                                                    <ul className="related-tags" style={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}>
                                                        {
                                                            row.tags?.map((tag, key) => {
                                                                if (tag.type === '1') {
                                                                    return <li><Link to=''>#{tag.name.en}</Link>
                                                                    </li>
                                                                }
                                                            })
                                                        }
                                                    </ul>
                                                </CardContent>
                                            </Link>
                                        </Grid>
                                    ))}
                                </Grid>
                        }
                    </Grid>
                </Grid>
                <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage}/>
            </Container>
        </BaseLayout>
    );
}

export default WhatsonMediaAndAdvocacy;
