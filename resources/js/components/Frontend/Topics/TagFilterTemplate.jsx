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
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

function TagFilterTemplate() {
  const [projectList, setProjectList] = useState([]);
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


  useEffect(() => {
    loadTags({ level: 1 }); // load level 1 tags
    loadTags({ level: 10 }); // load subject tags
    loadTags({ level: 11 }); // load extra tags
  }, []);

  const filterResults = () => {
    console.log(state);
    console.log(otherTags);
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
  }
  const handleL2Change = (e) => {
    setState({
      ...state,
      level2: e.target.value,
      level3: '',
      level4: ''
    })
    loadTags({ level: 3, parent: e.target.value });
  }
  const handleL3Change = (e) => {
    setState({
      ...state,
      level3: e.target.value,
      level4: ''
    })
    loadTags({ level: 4, parent: e.target.value });
  }
  const handleL4Change = (e) => {
    setState({
      ...state,
      level4: e.target.value,
    })
  }
  const handleSujectTagChange = (event, newValue) => {
    setOtherTags({ ...otherTags, subject: newValue });
  }
  const handleExtraTagSelect = (event, newValue) => {
    setOtherTags({ ...otherTags, extra: newValue });
  }


  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

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
            <Grid item sm={12} md={6}>
              <Typography variant="h1">Topics</Typography>
              <Typography>Quickly sort through different key words and find information on Mihidora</Typography>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container sx={{ mb: 2 }} className="filter_forms">
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
            <FormControl sx={{ minWidth: 200, mt: 3 }} size="small" variant="standard">
              <InputLabel id="demo-simple-select-label">Tags level 1</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="level1"
                value={state.level1}
                label="Tags level 1"
                onChange={handleL1Change}
                sx={{
                  '& .MuiBackdrop-root': {
                    '&.Mui-focused': {
                      color: '#93aa40'
                    }
                  }
                }}
              >
                <MenuItem value={''}>None</MenuItem>
                {l1tags.map((tag) => {
                  return <MenuItem key={tag.slug} value={tag.id}>{tag.name}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>

          {state.level1 != '' ?
            <Grid item sx={{ ml: 2 }}>
              <FormControl sx={{ minWidth: 200, mt: 3 }} size="small" variant="standard">
                <InputLabel id="demo-simple-select-label">Tags level 2</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="level2"
                  value={state.level2}
                  label="Tags level 2"
                  onChange={handleL2Change}
                  sx={{
                    '& .MuiBackdrop-root': {
                      '&.Mui-focused': {
                        color: '#93aa40'
                      }
                    }
                  }}
                >
                  <MenuItem value={''}>None</MenuItem>
                  {l2tags.map((tag) => {
                    return <MenuItem key={tag.slug} value={tag.id}>{tag.name}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid> : ''}

          {state.level2 != '' ?
            <Grid item sx={{ ml: 2 }}>
              <FormControl sx={{ minWidth: 200, mt: 3 }} size="small" variant="standard">
                <InputLabel id="demo-simple-select-label">Tags level 3</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="level3"
                  value={state.level3}
                  label="Tags level 3"
                  onChange={handleL3Change}
                  sx={{
                    '& .MuiBackdrop-root': {
                      '&.Mui-focused': {
                        color: '#93aa40'
                      }
                    }
                  }}
                >
                  <MenuItem value={''}>None</MenuItem>
                  {l3tags.map((tag) => {
                    return <MenuItem key={tag.slug} value={tag.id}>{tag.name}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid> : ''}

          {state.level3 != '' ?
            <Grid item sx={{ ml: 2 }}>
              <FormControl sx={{ minWidth: 200, mt: 3 }} size="small" variant="standard">
                <InputLabel id="demo-simple-select-label">Tags level 4</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="level4"
                  value={state.level4}
                  label="Tags level 4"
                  onChange={handleL4Change}
                  sx={{
                    '& .MuiBackdrop-root': {
                      '&.Mui-focused': {
                        color: '#93aa40'
                      }
                    }
                  }}
                >
                  <MenuItem value={''}>None</MenuItem>
                  {l4tags.map((tag) => {
                    return <MenuItem key={tag.slug} value={tag.id}>{tag.name}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid> : ''}

          <Grid item sx={{ ml: 2 }} style={{ display: "flex", alignItems: "center" }}>
            <Button className="update-button" onClick={filterResults}>Filter</Button>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 2 }} />

        <Grid container spacing={3}>

          <Grid item>
            <FormControl sx={{ minWidth: 200, mt: 3 }} size="small" variant="standard">
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

          <Grid item sx={{ ml: 2 }}>
            {/* Subject Tags */}
            <FormControl sx={{ mt: 3 }} size="small" fullWidth>
              <FormControl sx={{ minWidth: 200, maxWidth: 300 }} size="small">
                <Autocomplete
                  multiple
                  limitTags={3}
                  id="subject-tags"
                  value={otherTags.subject}
                  onChange={handleSujectTagChange}
                  options={subjectTags}
                  getOptionLabel={(option) => option.name}
                  defaultValue={[]}
                  renderInput={(params) => (
                    <TextField {...params} label="Subject Tags" variant="standard" size="small" />
                  )}
                />
              </FormControl>
            </FormControl>
          </Grid>

          <Grid item sx={{ ml: 2 }}>
            <FormControl sx={{ mt: 3, minWidth: 200 }} size="small" fullWidth>
              <Autocomplete
                multiple
                limitTags={3}
                id="extra-tags"
                value={otherTags.extra}
                onChange={handleExtraTagSelect}
                options={extraTags}
                getOptionLabel={(option) => option.name}
                defaultValue={[]}
                renderInput={(params) => (
                  <TextField {...params} label="Extra Tags" variant="standard" size="small" />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item sx={{ textAlign: 'right', alignSelf: 'end' }} xs={12} md={12}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingTop: '20px',
            }}>
              <PlaceIcon sx={{ mr: 2, cursor: 'pointer', fontSize: 32 }} />
              <ListIcon sx={{ cursor: 'pointer', fontSize: 32 }} />
            </div>
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
    </BaseLayout>
  )
}

export default TagFilterTemplate
