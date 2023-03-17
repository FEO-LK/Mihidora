import React, {useEffect, useState} from "react";
import { Container, Grid, CardMedia } from "@mui/material";
import {Link, useParams} from "react-router-dom";
import BaseLayout from "../BaseLayout";
import ExampleTheme from "../../Dashboard/LexicalEditor/themes/ExampleTheme";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import LexicalEditorView from "../Elearning/LexicalEditorView";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SimpleImageSlider from "react-simple-image-slider";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ImageCarousal from "../../Frontend/components/ImageCarousal";

function DataHubSingle() {

    const [datahubProfile, setDatahubProfile] = useState([]);
    const [datahubImages, setDatahubImages] = useState([]);
    const [datahubDoc, setDatahubDoc] = useState([]);
    const [editorInitialConfig, setEditorInitialConfig] = useState([]);
    const [tags, setTags] = useState([]);

    const params = useParams();

    useEffect(() => {
        getDatahubProfile();

    }, [params.slug]);

    const getDatahubProfile = () => {
        axios.get(`/api/datahub-single/${params.slug}`).then(res => {
            if(res.data.status === 200) {
                setDatahubProfile(res.data.get_data);
                setTags(res.data.tags);
                setDatahubImages(JSON.parse(res.data.get_data.photos));
                setDatahubDoc(JSON.parse(res.data.get_data.uploads));      
            }
        });
    }

    const menuIcon = {
        fontSize: 25,
        float: 'left',
        margin: '0px 8px 0px 0px'
    }

    const contentListStyle = {
      cursor:'auto', 
      fontSize:'14px', 
      display:'flex', 
      alignItems: 'center'
    }

    const filesStyle = {
        display: 'block', 
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis',
        color: 'black',
        fontSize: '14px'
    }

    const tagDisplay = () => {
		return tags?.map((tag, index) => {
			var slug = tag.replaceAll(" ", "-");
			return <Link key={index} to={`/tag/${slug.toLowerCase()}`}>{'#'+tag}</Link>
		})
	}
    
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
        editable: false,
    };

    useEffect(() => {
        if (datahubProfile?.description) {
            editorConfig.editorState = datahubProfile?.description;
            setEditorInitialConfig(editorConfig);
        }
    }, [datahubProfile?.description]);
    const images = [
    { url: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" },
    { url: "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80" },
    ];

    const learning_outcomes = ['Environmental Management, Waste Generation Concepts & Environmental Impact Assessment (EIA)','Able to know the concept of environmental management and sustainable development',
                            'Know the environmental management system', 'Able to learn Environment significance']

    return (
        <BaseLayout title={"E-Learning Materials"} >
            <div style={{position:'relative'}} className="organization_card">
                <Container >
                    <div style={{display:'flex', position:'absolute', top:'1.5em'}}>
                        <div
                            style={{
                                backgroundColor:'green',
                                height:'2px', width:'40px',
                                alignSelf:'center',
                                marginRight:'1em'
                            }} 
                        />
                        <p style={{color:'white', fontSize:'.85em'}}>Explore Datahub Materials</p>
                    </div>
                    <div className="elearning-description">
                        <h2>{datahubProfile?.title}</h2>
                        <p className="elearning-description-p" style={{fontSize:'.85em', fontWeight:'normal'}}>{datahubProfile?.overview}</p>
                    </div>
                </Container>
                <div className="banner-title">
                    <div style={{backgroundColor:'#0b0706', height:'20em', width:'100%'}}></div>
                </div>
                <Grid item>
                    <div className="detail-grid">
                        <Container>
                                <Card item
                                    className="organization_card"
                                    style={{width:'22%', position:'absolute', right:'5vw',top:'6.25em', borderRadius:'10px'}} >                                <CardContent style={{padding: '0px'}}>
                                    <Link to={``}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image="../../../images/project.jpg"
                                            //image={`/storage/`+JSON.parse(datahubProfile.uploads)[0]}
                                            alt="green iguana"
                                        />
                                        {/*<ImageCarousal setSliders={datahubImages} />*/}
                                    </Link>
                                    <div style={{padding: '16px'}}>
                                        <ul className="card_tags" style={{display:'flex', flexFlow:'column'}}>
                                            <li style={{marginBottom:'.4em'}}><a href="" style={contentListStyle}>Author: {datahubProfile?.author} </a></li>
                                            <li style={{marginBottom:'.4em'}}><a href="" style={contentListStyle}>Email: {datahubProfile?.email} </a></li>
                                            <li><a href="" style={contentListStyle}>Phone: {datahubProfile?.phone} </a></li>
                                        </ul> 
                                    </div>
                                </CardContent>
                            </Card>
                        </Container>
                        <Container>
                            <Card style={{boxShadow: '0px 4px 64px 0px #00000026', borderRadius: '10px',padding: '16px', marginTop: '20px', marginBottom:'20px'}}>
                                <CardContent style={{padding: '0px'}}>
                                    <Typography variant="h1" className="org_title" style={{fontSize:'18px', fontWeight: 'bold'}}>Files</Typography>
                                    {/* {datahubDoc.map((item, key) => { */}
                                    <div style={{marginTop: '10px'}}>
                                        {datahubDoc?.map((item, key) => {
                                            // var fileName = item.split('/');
                                            return <Grid item sm={12} md={12}>
                                                <a key={key} href={`/storage/`+item} target="_blank" style={{display: 'block', marginBottom: '.6em'}}>
                                                    <Typography style={filesStyle}>
                                                        <FileDownloadRoundedIcon style={menuIcon} />
                                                        {/* {fileDisplay()} */}
                                                        {item.split('/')[1]}
                                                    </Typography>
                                                </a>
                                            </Grid>    
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </Container>
                    </div>
                </Grid>

                <Grid container spacing={1} className="elearning-outcome">
                    <Grid item md={9} xs={12}>
                        {datahubImages.length !== 0 && ( 
                            <Container maxWidth='lg' minHeight='400px' style={{display: 'flex', justifyContent: 'center'}}>
                               {datahubImages?.length > 0 ? (
                                <ImageCarousal setSliders={datahubImages} />
                                ) : (
                                    <></>
                                )}
                            </Container>
                        )}   
                    </Grid>
                </Grid>
                 
                
            </div>
            <Container style={{paddingBottom:'2em'}}>
                <div style={{width:'57vw'}}>
                    <h2>Description</h2>
                    {editorInitialConfig.length !== 0 &&
                    <LexicalEditorView initialConfig={editorInitialConfig}/>}
                    <h2>Tags</h2>
                    <Typography><SellOutlinedIcon style={menuIcon} />{tagDisplay()}</Typography>
                </div>
            </Container>
        </BaseLayout>
    )
}

export default DataHubSingle;
