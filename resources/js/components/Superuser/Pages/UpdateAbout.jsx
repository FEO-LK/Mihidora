import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Grid, Box, FormGroup, TextField, FormControl, Typography, InputLabel, Select, MenuItem, FormLabel,  Alert, Button, Divider } from "@mui/material";
import MainLayout from "../BaseLayout";
import ImageUploader from '../components/ImageUploader';
import Editor from "../../Dashboard/LexicalEditor/Editor";

import EditorEdit from "../../Dashboard/LexicalEditor/EditorEdit";
import ExampleTheme from "../../Dashboard/LexicalEditor/themes/ExampleTheme";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";

function UpdateAbout() {
  const pageParams = useParams();
  const [banner, setBanner] = useState([]);
  const [introImage, setIntroImage] = useState([]);
  const [trusteesLogo, setTrusteesLogo] = useState([]);
  const [introMainText, setIntroMainText] = useState([]);
  const [introSmallText, setIntroSmallText] = useState([]);
  const [chartTitle, setChartTitle] = useState([]);
  const [chartDescription, setChartDescription] = useState([]);
  const [mainDescription, setMainDescription] = useState([]);
  const [projectDescription, setProjectDescription] = useState([]);
  const [membersDescription, setMembersDescription] = useState('');
  const [ourTrusteesTitle, setOurTrusteesTitle] = useState([]);
  const [ourTrusteesText, setOurTrusteesText] = useState([]);
  const [ourTeamTitle, setOurTeamTitle] = useState([]);

  const [error, setError] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertContent, setAlertContent] = useState('');

  useEffect(() => {
    getPageData();

  }, [pageParams.slug, localStorage.getItem('auth_id')]);

  const getPageData = () => {
    axios.get(`/api/edit-aboutpage/about`).then(res => {
      if (res.data.status === 200) {
        setIntroMainText(res.data.get_data[0].value);
        setIntroSmallText(res.data.get_data[1].value);
        setChartTitle(res.data.get_data[2].value);
        setChartDescription(res.data.get_data[3].value);
        setMainDescription(res.data.get_data[4].value);
        setProjectDescription(res.data.get_data[5].value);
        setMembersDescription(res.data.get_data[6].value);
        setBanner(JSON.parse(res.data.get_data[7].value));
        setIntroImage(JSON.parse(res.data.get_data[8].value));
        setTrusteesLogo(JSON.parse(res.data.get_data[9].value));
        setOurTrusteesTitle(res.data.get_data[10].value);
        setOurTeamTitle(res.data.get_data[11].value);
        setOurTrusteesText(res.data.get_data[12].value);
      }
      else if (res.data.status === 404) {
        console.log(res.message, "message");
      }
    });
  }

  const handleIntroMainText = (e) => {
    setIntroMainText(e.target.value);
  }

  const handleIntroSmallText = (e) => {
    setIntroSmallText(e.target.value);
  }

  const handleChartTitle = (e) => {
    setChartTitle(e.target.value);
  }

  const handleChartDescription = (e) => {
    setChartDescription(e.target.value);
  }

  const handleMainDescription = (e) => {
    setMainDescription(e.target.value);
  }

  const handleProjectDescription = (e) => {
    setProjectDescription(e.target.value);
  }

  // const handleMembersDescription = (e) => {
  //   setMembersDescription(e.target.value);
  // }

  const bannerHandler = (e) => {
    setBanner(e);
  }
  
  const introImageHandler = (e) => {
    setIntroImage(e);
  }

  const trusteesLogoHandler = (e) => {
    setTrusteesLogo(e);
  }

  const handleMembersDescription  = (editorState) => {
    editorState.read(() => {
      setMembersDescription(JSON.stringify(editorState));
      // setFormInput({...formInput, description: JSON.stringify(editorState)});
    });
  }

  const trusteesTitleHandler = (e) => {
    setOurTrusteesTitle(e.target.value);
  }

  const trusteesTextHandler = (e) => {
    setOurTrusteesText(e.target.value);
  }

  const teamTitleHandler = (e) => {
    setOurTeamTitle(e.target.value);
  }

  const updatePage = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem('auth_id');
    const data = {
      user_id: user_id,
      intro_main_text: introMainText,
      intro_small_text: introSmallText,
      chart_title: chartTitle,
      chart_description: chartDescription,
      main_description: mainDescription,
      project_description: projectDescription,
      members_description: membersDescription,
      main_banner: banner,
      main_description_image: introImage,
      our_trustees: trusteesLogo,
      our_trustees_title: ourTrusteesTitle,
      our_trustees_text: ourTrusteesText,
      our_team_title: ourTeamTitle
    }
    axios.put(`/api/update-aboutpage/about`, data).then(res => {
      if (res.data.status === 200) {
        setAlert(true);
        setAlertType('success');
        setAlertContent(res.data.message);
        setError([]);
      }
      else if (res.data.status === 422) {
        setError(res.data.errors);
      }
      else {
        console.log(res.data.errors);
      }
    });
  }

  const [editorInitialConfig, setEditorInitialConfig] = useState([]);
    let editorConfig = {
        theme: ExampleTheme,
        onError(error) {
            throw error;
        },
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode
        ],
    };

    useEffect(() => {
      if (membersDescription) {
          console.log(membersDescription);
          editorConfig.editorState = membersDescription;
          setEditorInitialConfig(editorConfig);
      }
  }, [membersDescription]);

  const onChange = (editorState) => {
      editorState.read(() => {
        setMembersDescription(JSON.stringify(editorState));
      });
  }

  return (
    <MainLayout>
      <Grid>
        <Grid item>
          <Typography variant={"h6"} style={{ padding:20 }}>
            Update About page
          </Typography>
          <Divider />
          <Box component={"form"} encType={"multipart/form-data"} onSubmit={updatePage} className="su_form">
            <Grid container>
              <Grid item md={12} lg={3}></Grid>
              <Grid item md={12} lg={6}>
                <FormLabel>Banners (Dimension: 2000 × 691 px)</FormLabel>
                <ImageUploader setSelectedFiles={bannerHandler} />
                <Grid container spacing={2} sx={{ 'marginBottom': 2 }}>
                  {banner.map((element, index) => (
                    <Grid key={index} item xs={4} className="photo-preview">
                      <img src={`/storage/` + element} />
                    </Grid>
                  ))}
                </Grid>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Intro Main Text"
                    name="intro_main_text"
                    onChange={handleIntroMainText}
                    value={introMainText || ''}
                  />
                  <Typography variant="span">{error.intro_main_text}</Typography>
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    multiline
                    rows={3}
                    type='text'
                    fullWidth
                    label="Intro Small Text"
                    name="intro_small_text"
                    onChange={handleIntroSmallText}
                    value={introSmallText || ''}
                  />
                  <Typography variant="span">{error.intro_small_text}</Typography>
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    multiline
                    rows={3}
                    type='text'
                    fullWidth
                    label="Chart Title"
                    name="chart_title"
                    onChange={handleChartTitle}
                    value={chartTitle || ''}
                  />
                  <Typography variant="span">{error.chart_title}</Typography>
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    multiline
                    rows={3}
                    type='text'
                    fullWidth
                    label="Chart Description"
                    name="chart_description"
                    onChange={handleChartDescription}
                    value={chartDescription || ''}
                  />
                  <Typography variant="span">{error.chart_description}</Typography>
                </FormGroup>
                <FormGroup className="form-group">
                  <TextField
                    multiline
                    rows={3}
                    type='text'
                    fullWidth
                    label="Main Description"
                    name="main_description"
                    onChange={handleMainDescription}
                    value={mainDescription || ''}
                  />
                  <Typography variant="span">{error.main_description}</Typography>
                </FormGroup>


                <FormGroup className="form-group">
                  <TextField
                    multiline
                    rows={3}
                    type='text'
                    fullWidth
                    label="Project Description"
                    name="project_description"
                    onChange={handleProjectDescription}
                    value={projectDescription || ''}
                  />
                  <Typography variant="span">{error.project_description}</Typography>
                </FormGroup>


                <FormLabel>Banners (Dimension: 900 × 846 px)</FormLabel>
                <ImageUploader setSelectedFiles={introImageHandler} />
                <Grid container spacing={2} sx={{ 'marginBottom': 4 }}>
                  {introImage.map((element, index) => (
                    <Grid key={index} item xs={4} className="photo-preview">
                      <img src={`/storage/` + element} />
                    </Grid>
                  ))}
                </Grid>
                <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Trustees Title"
                    name="our_trustees_title"
                    onChange={trusteesTitleHandler}
                    value={ourTrusteesTitle || ''}
                  />
                  <Typography variant="span">{error.our_trustees_title}</Typography>
                </FormGroup>    
                
                <FormGroup className="form-group">
                  <TextField
                    multiline
                    rows={3}
                    type='text'
                    fullWidth
                    label="Our trustees"
                    name="our_trustees_text"
                    onChange={trusteesTextHandler}
                    value={ourTrusteesText || ''}
                  />
                  <Typography variant="span">{error.our_trustees_text}</Typography>
                </FormGroup>


                {/* <FormGroup className="form-group">
                  <TextField
                    type='text'
                    fullWidth
                    label="Team Title"
                    name="our_team_title"
                    onChange={teamTitleHandler}
                    value={ourTeamTitle || ''}
                  />
                  <Typography variant="span">{error.our_team_title}</Typography>
                </FormGroup> */}
                
                <div>
                  {/* <Editor onChange={handleMembersDescription } value={membersDescription || ''} /> */}
                  {editorInitialConfig.length !== 0 && <EditorEdit
                initialConfig={editorInitialConfig}
                onChange={onChange}
            />}

                </div>

                {/* <FormGroup className="form-group">
                  <TextField
                    multiline
                    rows={3}
                    type='text'
                    fullWidth
                    label="Members Description"
                    name="members_description"
                    onChange={handleMembersDescription}
                    value={membersDescription || ''}
                  />
                  <Typography variant="span">{error.members_description}</Typography>
                </FormGroup> */}

                <Button
                  fullWidth
                  variant={"outlined"}
                  type={"submit"}
                  className="user__theme-btn"
                >
                  Update Page
                </Button>

                {alert ? <Alert className="response-alert" severity={alertType}>{alertContent}</Alert> : <></>}

              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default UpdateAbout