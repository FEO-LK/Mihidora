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
import TopicMenu from "./TopicMenu";
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import ListIcon from '@mui/icons-material/List';

function OldTopicList() {
  const [projectList, setProjectList] = useState([]);
  const [elearningList, setElearningList] = useState([]);
  const [eventList, setEventList] = useState([]);


  useEffect(() => {
    getProjectList();
    getElearningList();
    getEventList();

  }, []);

  const getProjectList = () => {
    axios.get(`/api/projects`).then(res => {
      if (res.data.status === 200) {
        setProjectList(res.data.projects);
      }
    });
  }

  const getElearningList = () => {
    axios.get(`/api/elearning-list`).then(res => {
      if (res.data.status === 200) {
        setElearningList(res.data.get_data);
      }
    });
  }

  const getEventList = () => {
    axios.get(`/api/whatson-events`).then(res => {
      if (res.data.status === 200) {
        setEventList(res.data.events);
      }
    });
  }


  const menuIcon = {
    color: '#c4c4c4',
    fontSize: 18,
    float: 'left',
    margin: '4px 5px 0px 0px'
  }

  const [state, setState] = useState({
    level1: '',
    level2: '',
    level3: '',
    level4: '',
    location: '',
    subjectTags: '',
    extraTags: '',
    sortBy: ''
  })

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  return (
    <BaseLayout title={"Topic"}>

      <div className="topic-title-section">
        <Container>
          <Grid container>
            <Grid item sm={12} md={6}>
              <Typography variant="h1">Topics</Typography>
              <Typography>Quickly sort through different key words and find information on Mihidora</Typography>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container sx={{mb: 2}}>
        <TextField fullWidth placeholder="Search using tags: energy, water etc..." id="fullWidth" size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <Grid container>

          <Grid item>
            <FormControl sx={{ minWidth: 200, mt: 3 }} size="small">
              <InputLabel id="demo-simple-select-label">Tags level 1</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="level1"
                value={state.level1}
                label="Tags level 1"
                onChange={handleChange}
                sx={{
                  '& .MuiBackdrop-root': {
                    '&.Mui-focused': {
                      color: '#93aa40'
                    }
                  }
                }}
              >
                <MenuItem value={'tag 1'}>Tag 1</MenuItem>
                <MenuItem value={'tag 2'}>Tag 2</MenuItem>
                <MenuItem value={'tag 3'}>Tag 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {state.level1 != '' ?
            <Grid item sx={{ ml: 2 }}>
              <FormControl sx={{ minWidth: 200, mt: 3 }} size="small">
                <InputLabel id="demo-simple-select-label">Tags level 2</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="level2"
                  value={state.level2}
                  label="Tags level 2"
                  onChange={handleChange}
                  sx={{
                    '& .MuiBackdrop-root': {
                      '&.Mui-focused': {
                        color: '#93aa40'
                      }
                    }
                  }}
                >
                  <MenuItem value={'tag 1'}>Tag 1</MenuItem>
                  <MenuItem value={'tag 2'}>Tag 2</MenuItem>
                  <MenuItem value={'tag 3'}>Tag 3</MenuItem>
                </Select>
              </FormControl>
            </Grid> : ''}

          {state.level2 != '' ?
            <Grid item sx={{ ml: 2 }}>
              <FormControl sx={{ minWidth: 200, mt: 3 }} size="small">
                <InputLabel id="demo-simple-select-label">Tags level 3</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="level3"
                  value={state.level3}
                  label="Tags level 3"
                  onChange={handleChange}
                  sx={{
                    '& .MuiBackdrop-root': {
                      '&.Mui-focused': {
                        color: '#93aa40'
                      }
                    }
                  }}
                >
                  <MenuItem value={'tag 1'}>Tag 1</MenuItem>
                  <MenuItem value={'tag 2'}>Tag 2</MenuItem>
                  <MenuItem value={'tag 3'}>Tag 3</MenuItem>
                </Select>
              </FormControl>
            </Grid> : ''}

          {state.level3 != '' ?
            <Grid item sx={{ ml: 2 }}>
              <FormControl sx={{ minWidth: 200, mt: 3 }} size="small">
                <InputLabel id="demo-simple-select-label">Tags level 4</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="level4"
                  value={state.level4}
                  label="Tags level 4"
                  onChange={handleChange}
                  sx={{
                    '& .MuiBackdrop-root': {
                      '&.Mui-focused': {
                        color: '#93aa40'
                      }
                    }
                  }}
                >
                  <MenuItem value={'tag 1'}>Tag 1</MenuItem>
                  <MenuItem value={'tag 2'}>Tag 2</MenuItem>
                  <MenuItem value={'tag 3'}>Tag 3</MenuItem>
                </Select>
              </FormControl>
            </Grid> : ''}
        </Grid>

        <Divider sx={{ mt: 2 }} />

        <Grid container spacing={3}>

          <Grid item xs={2}>
            <FormControl sx={{ mt: 3 }} size="small" fullWidth >
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="location"
                value={state.location}
                label="Location"
                onChange={handleChange}
                sx={{
                  '& .MuiBackdrop-root': {
                    '&.Mui-focused': {
                      color: '#93aa40'
                    }
                  }
                }}
              >
                <MenuItem value={'tag 1'}>Tag 1</MenuItem>
                <MenuItem value={'tag 2'}>Tag 2</MenuItem>
                <MenuItem value={'tag 3'}>Tag 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl sx={{ mt: 3 }} size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">Subject Tags</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="subjectTags"
                value={state.subjectTags}
                label="Subject Tags"
                onChange={handleChange}
                sx={{
                  '& .MuiBackdrop-root': {
                    '&.Mui-focused': {
                      color: '#93aa40'
                    }
                  }
                }}
              >
                <MenuItem value={'tag 1'}>Tag 1</MenuItem>
                <MenuItem value={'tag 2'}>Tag 2</MenuItem>
                <MenuItem value={'tag 3'}>Tag 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl sx={{ mt: 3 }} size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">Extra Tags</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="extraTags"
                value={state.extraTags}
                label="Extra Tags"
                onChange={handleChange}
                sx={{
                  '& .MuiBackdrop-root': {
                    '&.Mui-focused': {
                      color: '#93aa40'
                    }
                  }
                }}
              >
                <MenuItem value={'tag 1'}>Tag 1</MenuItem>
                <MenuItem value={'tag 2'}>Tag 2</MenuItem>
                <MenuItem value={'tag 3'}>Tag 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sx={{ textAlign: 'right', alignSelf: 'end' }} xs={4}>
            {/* These components moved in to the next colum */}
            {/* <div>
              <PlaceIcon sx={{ mr: 2, cursor: 'pointer', fontSize: 32 }} />
              <ListIcon sx={{ cursor: 'pointer', fontSize: 32 }} />
            </div> */}
          </Grid>

          <Grid item xs={2}>
          <div style={{ 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingTop: '20px',
          }}>
              <PlaceIcon sx={{ mr: 2, cursor: 'pointer', fontSize: 32 }} />
              <ListIcon sx={{ cursor: 'pointer', fontSize: 32 }} />
            </div>
            {/* Removing sort options from the topics page */}
            {/* <FormControl variant="standard" sx={{ mt: 3 }} fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="sortBy"
                value={state.sortBy}
                onChange={handleChange}
                label="Sort by"
              >
                <MenuItem value={10}>Most Relevant</MenuItem>
                <MenuItem value={20}>A - Z</MenuItem>
              </Select>
            </FormControl> */}
          </Grid>
        </Grid>
      </Container>

      {/* ------------------ projects --------------------- */}

      <div id="datasets" className="topic-sub-section">
        <Container>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h4" className="section-title">Projects</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Typography variant="button" sx={{ cursor: 'pointer' }}><b>View All</b></Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {projectList.slice(0, 4).map((row, key) => (
              <Grid item key={key} xs={3} className="organization_card" >
                <Link to={``}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="../../../images/project.jpg"
                    alt="green iguana"
                  />
                  <CardContent className="card_content">
                    <Typography variant="span" className="main-tag">THEMATIC AREA</Typography>
                    <Typography variant="h5" className="org_title">Conservation, UN-SDG 1</Typography>
                    <ul className="card_tags">
                      <li><a href=""><ArticleOutlinedIcon style={menuIcon} /> CSV</a></li>
                      <li><a href=""><SettingsApplicationsOutlinedIcon style={menuIcon} /> API</a></li>
                      <li><a href=""><LocationOnOutlinedIcon style={menuIcon} /> Map</a></li>
                    </ul>
                    <ul className="related-tags">
                      <li><Link to=''>#Airquality</Link></li>
                      <li><Link to=''>#Flora</Link></li>
                    </ul>
                  </CardContent>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      {/* ------------------------- organizations --------------------------------- */}

        <Container><Divider sx={{ mt: 2 }} /></Container>

        <div id="datasets" className="topic-sub-section">
          <Container>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h4" className="section-title">Organizations</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Typography variant="button" sx={{ cursor: 'pointer' }}><b>View All</b></Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {projectList.slice(0, 4).map((row, key) => (
                <Grid item key={key} xs={3} className="organization_card" >
                  <Link to={``}>
                    <CardMedia
                      component="img"
                      height="140"
                      image="../../../images/project.jpg"
                      alt="green iguana"
                    />
                    <CardContent className="card_content">
                      <Typography variant="span" className="main-tag">THEMATIC AREA</Typography>
                      <Typography variant="h5" className="org_title">Conservation, UN-SDG 1</Typography>
                      <ul className="card_tags">
                        <li><a href=""><ArticleOutlinedIcon style={menuIcon} /> CSV</a></li>
                        <li><a href=""><SettingsApplicationsOutlinedIcon style={menuIcon} /> API</a></li>
                        <li><a href=""><LocationOnOutlinedIcon style={menuIcon} /> Map</a></li>
                      </ul>
                      <ul className="related-tags">
                        <li><Link to=''>#Airquality</Link></li>
                        <li><Link to=''>#Flora</Link></li>
                      </ul>
                    </CardContent>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>

        {/* ------------------------- Datahub --------------------------------- */}

        <Container><Divider sx={{ mt: 2 }} /></Container>
        
        <div id="datasets" className="topic-sub-section">
          <Container>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h4" className="section-title">Datahub</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Typography variant="button" sx={{ cursor: 'pointer' }}><b>View All</b></Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {projectList.slice(0, 4).map((row, key) => (
                <Grid item key={key} xs={3} className="organization_card" >
                  <Link to={``}>
                    <CardMedia
                      component="img"
                      height="140"
                      image="../../../images/project.jpg"
                      alt="green iguana"
                    />
                    <CardContent className="card_content">
                      <Typography variant="span" className="main-tag">THEMATIC AREA</Typography>
                      <Typography variant="h5" className="org_title">Conservation, UN-SDG 1</Typography>

                      <ul className="card_tags">
                        <li><a href=""><ArticleOutlinedIcon style={menuIcon} /> CSV</a></li>
                        <li><a href=""><SettingsApplicationsOutlinedIcon style={menuIcon} /> API</a></li>
                        <li><a href=""><LocationOnOutlinedIcon style={menuIcon} /> Map</a></li>
                      </ul>
                      <ul className="related-tags">
                        <li><Link to=''>#Airquality</Link></li>
                        <li><Link to=''>#Flora</Link></li>
                      </ul>
                    </CardContent>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>


      {/* <div id="projects" className="topic-sub-section" style={{ background: '#f8f8f8' }}>
        <Container>
          <Grid container>
            <Typography variant="h4" className="section-title">Projects</Typography>
          </Grid>
          {projectList.slice(0, 3).map((row, key) => (
            <Grid item key={key} xs={12} className="data_card card-row" >
              <Grid container>
                <Grid item sm={12} md={2}>
                  <Box className="card-logo" style={{ backgroundImage: `url('https://cdn.logojoy.com/wp-content/uploads/20200605160200/coral-reef-alliance-envronment-logo.png')` }}></Box>
                  <Link to className="cso-name">CSO Name</Link>
                  <Link to className="cso-link">View Org Profile</Link>
                </Grid>
                <Grid item sm={12} md={10}>
                  <Typography variant="h5" className="card_title">{row.project_title} <span>Thematic Area</span></Typography>
                  <Typography variant="span" className="location"><LocationOnOutlinedIcon style={menuIcon} /> Colomo, Western Province</Typography>
                  <Grid container className="description">
                    <Grid item sm={12} md={10}>
                      <Typography variant="body2" color="text.secondary">
                        {row.overview}
                      </Typography>
                    </Grid>
                  </Grid>
                  <ul className="related-tags">
                    <li><Link to=''>#Airquality</Link></li>
                    <li><Link to=''>#Airquality</Link></li>
                  </ul>
                  <Typography variant="span" className="modified-date">Last updated : 13 October 2021</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Container>
      </div> */}

      {/* <div id="elearning" className="topic-sub-section">
        <Container>
          <Grid container>
            <Typography variant="h4" className="section-title">E-Learning</Typography>
          </Grid>
          <Grid container spacing={2}>
            {elearningList.map((row) => (
              <Grid item key={row.id} xs={3} className="organization_card learning-card" >
                <Grid container>
                  <CardContent className="card_content">
                    <Grid item sm={12} md={12} className="card-head">
                      <Grid container>
                        <Grid item sm={12} md={4}>
                          <Box className="card-logo" style={{ backgroundImage: `url('https://cdn.logojoy.com/wp-content/uploads/20200605160200/coral-reef-alliance-envronment-logo.png')` }}></Box>
                        </Grid>
                        <Grid item sm={12} md={8}>
                          <Link to className="cso-name">Environmental CSEO Incorporated</Link>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} md={12} className="card-body">
                      <Typography variant="h5" className="card_title">{row.title}</Typography>
                      <Typography variant="body2" color="text.secondary">Lizards are a widespread group of squamate reptiles.</Typography>
                      <Typography variant="p" className="post-duration">2 weeks</Typography>
                      <Typography variant="p" className="post-date">Added April 2021</Typography>
                    </Grid>
                  </CardContent>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div> */}

      {/* <div id="resources" className="topic-sub-section" style={{ background: '#f8f8f8' }}>
        <Container>
          <Grid container>
            <Typography variant="h4" className="section-title">Resources</Typography>
          </Grid>
          {projectList.slice(0, 4).map((row, key) => (
            <Grid item key={key} xs={12} className="data_card card-row resource-card" >
              <Grid container>
                <Grid item sm={12} md={1}>
                  <Box className="card-logo" style={{ backgroundImage: `url('https://cdn.logojoy.com/wp-content/uploads/20200605160200/coral-reef-alliance-envronment-logo.png')` }}></Box>
                </Grid>
                <Grid item sm={12} md={11} className="card-content">
                  <Typography variant="h5" className="card_title">Some Project Name</Typography>
                  <Grid container className="description">
                    <Grid item sm={12} md={10}>
                      <Typography variant="body2" color="text.secondary">
                        Environment Inc, CSO in Jaffna
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="p" className="modified-date">
                    Location : Colombo
                    <span>Last updated : 13 October 2021</span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Container>
      </div> */}

      {/* <div id="events" className="topic-sub-section">
        <Container>
          <Grid container>
            <Typography variant="h4" className="section-title">Events</Typography>
          </Grid>
          {eventList.slice(0, 3).map((row, key) => (
            <Grid item key={key} xs={12} className="data_card card-row" >
              <Grid container>
                <Grid item sm={12} md={2}>
                  <Box className="card-logo" style={{ backgroundImage: `url('https://cdn.logojoy.com/wp-content/uploads/20200605160200/coral-reef-alliance-envronment-logo.png')` }}></Box>
                  <Link to className="cso-name">CSO Name</Link>
                  <Link to className="cso-link">View Org Profile</Link>
                </Grid>
                <Grid item sm={12} md={10}>
                  <Typography variant="h5" className="card_title">{row.title} <span>Thematic Area</span></Typography>
                  <Typography variant="span" className="location"><LocationOnOutlinedIcon style={menuIcon} /> Colomo, Western Province</Typography>
                  <Grid container className="description">
                    <Grid item sm={12} md={10}>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                      </Typography>
                    </Grid>
                  </Grid>
                  <ul className="related-tags">
                    <li><Link to=''>#Airquality</Link></li>
                    <li><Link to=''>#Airquality</Link></li>
                  </ul>
                  <Typography variant="span" className="modified-date">Last updated : 13 October 2021</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Container>
      </div> */}

    </BaseLayout>
  )
}

export default OldTopicList
