import React, {useEffect, useState} from "react";
import {Button, CardContent, CardMedia, Container, Grid, MenuItem, Select, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import BaseLayout from "../BaseLayout";
import FilterSideBar from "../Organisations/FilterSideBar";
import ProjectOrganizationNavbar from "../Organisations/ProjectOrganizationNavbar";
import MapLocations from "../components/MapLocations";
import Pagination from "../../Dashboard/components/Pagination";
import {tagsThematic, tagsSubject, tagsExtra} from "../components/Tags";

function ProjectList() {
    const [projectList, setProjectList] = useState([]);
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
            '/api/projects-filtered',
            {district, tags: [...thematicTags, ...subjectTags, ...extraTags]}
        ).then(res => {
            if (res.data.status === 200) {
                let filteredProjects;
                if (Array.isArray(res.data.filteredProjects)) {
                    filteredProjects = res.data.filteredProjects
                } else {
                    filteredProjects = Object.keys(res.data.filteredProjects).map((k) => res.data.filteredProjects[k])
                }
                let result = filteredProjects.filter((el) => {
                    let filterVal = el.project_title.toLowerCase()
                    return filterVal.indexOf(searchKeyword) !== -1
                })
                setProjectList(result);
            }
        })
    }

    useEffect(() => {
        stringSearch();
    }, [searchKeyword]);

    useEffect(() => {
        getFilteredProjects(null, []);
        getProjectMapList();
    }, []);

    const getProjectList = () => {
        axios.get(`/api/projects`).then(res => {
            if (res.data.status === 200) {
                setProjectList(res.data.projects);
            }
        });
    }

    const sorted = (data) => data.sort(function(a, b) {
        if (a.project_title > b.project_title) {
            return 1;
        }
        if (a.project_title < b.project_title) {
            return -1;
        }
        return 0;
    });

    const getFilteredProjects = (district, tags) => {
        axios.post(
            '/api/projects-filtered',
            {district, tags}
        ).then(res => {
            if(res.data.status === 200) {
                let filteredProjects;
                if (Array.isArray(res.data.filteredProjects)) {
                    filteredProjects = res.data.filteredProjects
                } else {
                    filteredProjects = Object.keys(res.data.filteredProjects).map((k) => res.data.filteredProjects[k])
                }
                setProjectList(filteredProjects);
            }
        })
    }

    useEffect(() => {
        if (district == '26') {
            getFilteredProjects(null,[...thematicTags, ...subjectTags, ...extraTags]);
        } else {
            getFilteredProjects(district,[...thematicTags, ...subjectTags, ...extraTags]);
        }
    },[district,thematicTags.length,subjectTags.length,extraTags.length]);

    const handleOnChangeSortBy = (e) => {
        setSortBy(e.target.value);
        if (e.target.value === 'A-Z') {
            setProjectList(sorted(projectList))
        } else {
            if (district == '26') {
                getFilteredProjects(null, [...thematicTags, ...subjectTags, ...extraTags]);
            } else {
                getFilteredProjects(district, [...thematicTags, ...subjectTags, ...extraTags]);
            }
        }
    }

    const getProjectMapList = () => {
        axios.get(`/api/project-map`).then(res => {
            if (res.data.status === 200) {
                setProjectMapList(res.data.project_map);
            }
        });
    }

    const howManyPages = Math.ceil(projectList.length / 100);

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
        <BaseLayout title={"Projects"}>

            <div className="topic-title-section">
                <Container>
                    <Grid container>
                        <Grid item sm={12} md={6} className="title-and-description">
                            <Typography variant="h1">Organisations & Projects</Typography>
                            <Typography>All in one page for Sri Lanka's environmental projects</Typography>
                        </Grid>
                        <Grid item sm={12} md={6} className="add-org-link">
                            <Typography>
                                Do you work on ernviromental issues in Sri Lanka?
                                {addYourOrgBtn()}
                            </Typography>
                        </Grid>
                    </Grid>
        </Container>
      </div>

			<ProjectOrganizationNavbar />

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
									placeholder="Search Projects"
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
									Search Projects
								</Button>
							</Grid>
							<Grid item sm={12} md={12} mb={3}>
								<Grid container>
									<Grid item sm={12} md={4}>
										<Typography variant="span" className="item-count">{projectList.length} projects.</Typography>
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
                                        <Typography style={{fontSize: '12px', marginTop: '12px', marginRight: '5px'}}>Sort
                                            by: </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {
                        view === 'map' ?
                            <MapLocations locationList={projectMapList}/> :
                            <>
                                <Grid container spacing={2}>
                                    {projectList.slice((currentPage-1)*100, currentPage*100).map((row, key) => (
                                        <Grid item key={key} xs={12} sm={4} className="organization_card">
                                            <Link to={`/project/` + row.slug}>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    //image="../../../images/project.jpg"
                                                    image={JSON.parse(row.photos)[0] ? '/storage/' + JSON.parse(row.photos)[0] : "../../../images/project.jpg"}

                                                    alt="project photo"
                                                />
                                    
                                                <CardContent className="card_content">
                                                    <Typography variant="h5"
                                                                className="org_title">{row.project_title}</Typography>
                                                    <Typography variant="p">{row.overview}</Typography>
                                                    
                                                    <ul className="related-tags" style={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}>
                                                        {
                                                            row.tags?.map((tag, key) => {
                                                                if (tag.type === '1') {
                                                                    return <li><Link style={{color: '#343434', fontSize: '12px'}} to=''>#{tag.name.en}</Link>
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
                                <Pagination pages={howManyPages} setCurrentPage={setCurrentPage}/>
                            </>
                        }

                    </Grid>
                </Grid>
            </Container>
        </BaseLayout>
    )
}

export default ProjectList
