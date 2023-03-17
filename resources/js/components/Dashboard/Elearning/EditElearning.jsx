import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import MainLayout from "../BaseLayout";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import MenuTab from './MenuTab';
import FileUploader from '../components/FileUploader';
import ImageUploader from '../components/ImageUploader';
import ThematicTags from '../components/ThematicTags'
import SubjectTags from "../components/SubjectTags"
import ExtraTags from "../components/ExtraTags"
import moment from "moment"
import EditorEdit from "../LexicalEditor/EditorEdit";
import ExampleTheme from "../LexicalEditor/themes/ExampleTheme";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import DeleteIcon from '@mui/icons-material/Delete';

function EditElearning(props) {
    const datasetParams = useParams();
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertContent, setAlertContent] = useState('');
    const [formInput, setFormInput] = useState({
        title: '',
        description: '',
        overview:'',
        author: '',
        date: '',
        phone: '',
        email: ''
    });
    const [error, setError] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [projectList, setProjectList] = useState([]);
    const [linkProject, setLinkProject] = useState("");
    const [photos, setPhotos] = useState([]);
    const [files, setFiles] = useState([]);
    const [tags_thematic, setTags_thematic] = useState([]);
    const [tags_subject, setTags_subject] = useState([]);
    const [tags_extra, setTags_extra] = useState([]);
    const [whatYouWillLearn, setWhatYouWillLearn] = useState([]);
    const [Content, setContent] = useState([]);

    useEffect(() => {
        getElearningData();
        getProjectList();

    }, [datasetParams.slug, localStorage.getItem('auth_id')]);

    const getElearningData = () => {
        axios.get(`/api/edit-education/${datasetParams.slug}`).then(res => {
            if (res.data.status === 200) {
              //  setWhatYouWillLearn(JSON.parse(res.data.get_data.social_media));
                setFormInput(res.data.get_data);
                setStartDate(res.data.get_data.date);
                setPhotos(res.data.get_data.photos);
                setWhatYouWillLearn(JSON.parse(res.data.get_data.what_you_will_learn) || [{what_you_will_learn:''}]);
                setContent(JSON.parse(res.data.get_data.contents) || [{contents:''}]);
                setFiles(res.data.get_data.uploads);
                setLinkProject(res.data.get_data.project_id);
                setTags_thematic(res.data.get_data.tags.filter(element => element.type == 1).map(element => element.name.en));
                setTags_subject(res.data.get_data.tags.filter(element => element.type == 2).map(element => element.name.en));
                setTags_extra(res.data.get_data.tags.filter(element => element.type == 3).map(element => element.name.en));
            }
            else if (res.data.status === 404) {
                console.log(res.message, "message");
            }
        });
    }

    const getProjectList = () => {
        axios.get(`/api/projects-by-organization/`).then(res => {
            if (res.data.status === 200) {
                setProjectList(res.data.projects);
            }
            else if (res.data.status === 404) {
                console.log(res.message, "message");
            }
        });
    }

    const selectLinkProject = (event) => {
        setLinkProject(event.target.value);
    }

    const handleInput = (e) => {
        e.persist();
        setFormInput({ ...formInput, [e.target.name]: e.target.value });
    }

    const handleStartDate = (value) => {
        var start_date = moment(value.$d).format("YYYY-MM-DD");
        setStartDate(start_date);
    };

    const getMediaFiles = (e) => {
        setPhotos(e);
    }

    const getImages = (e) => {
        setFiles(e);
    }

    const tagsThematic = (value) => {
        setTags_thematic(value);
    }

    const tagsSubject = (value) => {
        setTags_subject(value);
    }

    const tagsExtra = (value) => {
        setTags_extra(value);
    }

  const handleDocRemove = (e) => {
    setFiles(files.filter(p => p !== e));
  }

  const handleImageRemove = (e) => {
    setPhotos(photos.filter(p => p !== e));
  }

     //whatyouwilllearn

     const addWhatYouWillLearnFields = () => {
        let newfield = { what_you_will_learn: '' }
        setWhatYouWillLearn([...whatYouWillLearn, newfield])
      }
      const removeWhatYouWillLearnFields = (index) => {
        let data = [...whatYouWillLearn];
        data.splice(index, 1)
        setWhatYouWillLearn(data)
      }
      const handleWhatYouWillLearnChange = (index, event) => {
        let data = [...whatYouWillLearn];
        data[index][event.target.name] = event.target.value;
        setWhatYouWillLearn(data);
      }
      
      //--
    
         //content
    
         const addContentFields = () => {
          let newfield1 = { content: '' }
          setContent([...Content, newfield1])
        }
        const removeContentFields = (index1) => {
          let data1 = [...Content];
          data1.splice(index1, 1)
          setContent(data1)
        }
        const handleContentChange = (index1, event1) => {
          let data1 = [...Content];
          data1[index1][event1.target.name] = event1.target.value;
          setContent(data1);
        }
        
        //--

  const updateElearningMaterial = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem('auth_id');
    const data = {
      user_id: user_id,
      project_id:	linkProject,
      title: formInput.title,
      type:	2,
      overview: formInput.overview,
      description: formInput.description,
      uploads: files,
      photos: photos,
      date: startDate,
      author:	formInput.author,
      phone: formInput.phone,
      email: formInput.email,
      what_you_will_learn : whatYouWillLearn,
      contents : Content,
      tags_thematic: tags_thematic,
      tags_subject: tags_subject,
      tags_extra: tags_extra
    }
    axios.put(`/api/update-education/${datasetParams.slug}`, data).then(res => {
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
        if (formInput?.description) {
            editorConfig.editorState = formInput?.description;
            setEditorInitialConfig(editorConfig);
        }
    }, [formInput?.description]);

    const onChange = (editorState) => {
        editorState.read(() => {
            setFormInput({...formInput, description: JSON.stringify(editorState)});
        });
    }
    return (
        <MainLayout title={"Edit E-learning Material"}>
            <MenuTab/>
            <Box component={"form"} onSubmit={updateElearningMaterial}>
                <Grid container>
                    <Grid item xs={8}>
    
            <FormGroup className="form-group">
              <TextField
                type='text'
                fullWidth
                label="Title"
                name="title"
                onChange={handleInput}
                value={formInput.title}
              />
              <Typography variant="span">{error.title}</Typography>
            </FormGroup>
            <FormControl className="form-group">
              <InputLabel id="project-label">Project</InputLabel>
              <Select
                labelId="project-label"
                id="project"
                value={linkProject}
                label="Project"
                onChange={selectLinkProject}
              >
                {projectList.map(row => <MenuItem key={row.id} value={row.id}>{row.project_title}</MenuItem>)}
              </Select>
            </FormControl>

            <FormGroup className="form-group">
                <TextField
                    multiline
                    rows={4}
                    type='text'
                    fullWidth
                    label="Overview"
                    name="overview"
                    inputProps={{
                        maxLength: 198,
                    }}
                    onChange={handleInput}
                    value={formInput.overview || ''}
                />
                <Typography variant="span">{error.overview}</Typography>
            </FormGroup>
            
                        
            {editorInitialConfig.length !== 0 && <EditorEdit
                initialConfig={editorInitialConfig}
                onChange={onChange}
            />}

<FormControl className="sep-label-form for-dynamic-fields">
              <FormLabel id="what_you_learn">What you will learn</FormLabel>
              {whatYouWillLearn?.map((input, index) => {
                return (
                  <div key={index} className="form-group dynamic-field">
                    <TextField 
                      fullWidth
                      type='text'
                      size="small"
                      name='what_you_will_learn'
                      value={input.what_you_will_learn || ''}
                      onChange={event => handleWhatYouWillLearnChange(index, event)}
                    />
                    {
                      index ?
                        <button type="button" className="button remove" onClick={() => removeWhatYouWillLearnFields(index)}><DeleteIcon /></button>
                      : null
                    }
                  </div>
                )
              })}
            <Button onClick={() => addWhatYouWillLearnFields()}>Add New Field</Button>
            </FormControl>

            <FormControl className="sep-label-form for-dynamic-fields">
              <FormLabel id="content">Content</FormLabel>
              {Content?.map((input, index) => {
                return (
                  <div key={index} className="form-group dynamic-field">
                    <TextField 
                      fullWidth
                      type='text'
                      size="small"
                      name='content'
                      value={input.content || ''}
                      onChange={event => handleContentChange(index, event)}
                    />
                    {
                      index ?
                        <button type="button" className="button remove" onClick={() => removeContentFields(index)}><DeleteIcon /></button>
                      : null
                    }
                  </div>
                )
              })}
            <Button onClick={() => addContentFields()}>Add New Field</Button>
            </FormControl>
            
            <FormLabel>File</FormLabel>
            <FileUploader setSelectedFiles={getImages}  files={files}/>
            <Grid container spacing={2} sx={{'marginBottom': 6}}>
              {files.map((item, index) => {
                var fileName = item.split('/');
                return <Grid key={index} item xs={2} className="doc-preview">
                    <Button onClick={() => handleDocRemove(item)} className="remove-btn">
                      <img src={`../../../../images/remove-icon.png`} />
                    </Button>
                    <Typography style={{width: 'calc(100% - 20px)', wordBreak: 'break-all', fontSize: 13, lineHeight: 1.2, textAlign: 'center', top: '96%', position: 'absolute'}}>{fileName[1]}</Typography>
                    <img src={`../../../../images/unknown-icon.png`} />
                </Grid>
              })}
            </Grid>

            <FormLabel>Photos</FormLabel>
            <ImageUploader setSelectedFiles={getMediaFiles}  />
            <Grid container spacing={2} sx={{'marginBottom': 8}}>
              {photos.map((element, index) => (
                <Grid key={index} item xs={4} className="photo-preview">
                  <Button onClick={() => handleImageRemove(element)} className="remove-btn">
                    <img src={`../../../../images/remove-icon.png`} />
                  </Button>
                  <img src={`/storage/`+element} />
                </Grid>
              ))}
            </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormGroup className="form-group">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="Date"
                                            inputFormat="YYYY-MM-DD"
                                            value={startDate}
                                            onChange={handleStartDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <Typography variant="span">{error.start_date}</Typography>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={6}></Grid>
                        </Grid>
                        <FormGroup className="form-group">
                            <TextField
                                type='text'
                                fullWidth
                                label="Author"
                                name="author"
                                onChange={handleInput}
                                value={formInput.author}
                            />
                            <Typography variant="span">{error.author}</Typography>
                        </FormGroup>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormGroup className="form-group">
                                    <TextField
                                        type='text'
                                        fullWidth
                                        label="Phone"
                                        name="phone"
                                        onChange={handleInput}
                                        value={formInput.phone}
                                    />
                                    <Typography variant="span">{error.phone}</Typography>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={6}>
                                <FormGroup className="form-group">
                                    <TextField
                                        type='text'
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        onChange={handleInput}
                                        value={formInput.email}
                                    />
                                    <Typography variant="span">{error.email}</Typography>
                                </FormGroup>
                            </Grid>
                        </Grid>

                        <ThematicTags getThematicTags={tagsThematic} setThematicTag={tags_thematic}/>

                        <SubjectTags getSubjectTags={tagsSubject} setSubjectTag={tags_subject}/>

                        <ExtraTags getExtraTags={tagsExtra} setExtraTag={tags_extra}/>

                        <Button
                            fullWidth
                            variant={"outlined"}
                            type={"submit"}
                            className="user__theme-btn">
                            Update Material
                        </Button>

                        {alert ? <Alert className="response-alert" severity={alertType}>{alertContent}</Alert> : <></>}

                    </Grid>
                </Grid>
            </Box>
        </MainLayout>
    )
}

export default EditElearning
