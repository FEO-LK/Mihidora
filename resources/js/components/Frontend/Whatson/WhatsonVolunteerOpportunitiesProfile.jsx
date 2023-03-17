import React, {useEffect, useState} from 'react';
import BaseLayout from "../BaseLayout";
import {
    Container,
    Grid,
    Typography
} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import PageBanner from "../components/PageBanner";
import bannerImage from "../../../../images/aboutBanner.jpg";
import { LocationOn } from "@mui/icons-material";
import {createEventDateFormat} from "../components/timeFormatFunctions";
import LocationMap from "../components/LocationMap";
import ExampleTheme from "../../Dashboard/LexicalEditor/themes/ExampleTheme";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import LexicalEditorView from "../Elearning/LexicalEditorView";
import WhatsOnNavbar from "../../Frontend/Whatson/WhatsOnNavbar"; 
import ImageCarousal from "../../Frontend/components/ImageCarousal";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

function WhatsonVolunteerOpportunitiesProfile() {

    const [volunteerOpportunityProfile, setVolunteerOpportunityProfile] = useState([]);
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [locations, setLocation] = useState([]);
    const [editorInitialConfig, setEditorInitialConfig] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [evFiles, setEvFiles] = useState([]);

    const params = useParams();
    useEffect(() => {
        getVolunteerOpportunityProfile();

    }, [params.slug]);

    const getVolunteerOpportunityProfile = () => {
        axios.get(`/api/whatson-volunteer-opportunities/${params.slug}`).then(res => {
            if(res.data.status === 200) {
                setVolunteerOpportunityProfile(res.data.profile);
                setLocation(JSON.parse(res.data.profile[0]?.locations));
                setCity(res.data.city);
                setDistrict(res.data.district);
                setImageList(JSON.parse(res.data.profile[0].photos));
                setEvFiles(JSON.parse(res.data.profile[0].uploads)); 
            }
        });
    }

    const menuIcon = {
        fontSize: 25,
        float: 'left',
        margin: '0px 8px 0px 0px'
    }

    const filesStyle = {
        display: 'block', 
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis',
        color: 'black',
        fontSize: '14px'
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

    const addYourVolunteerOpBtn = () => {
        if(localStorage.getItem('user_role') == 2) {
            return <Link to={'/dashboard'} className="theme-btn small-btn add_event-btn">Add your volunteer opportunities</Link>
        }else if(localStorage.getItem('user_role') == 1){
           
        }else {
            return <Link to={'/login'} className="theme-btn small-btn add_event-btn">Add your volunteer opportunities</Link>
        }
    }

    useEffect(() => {
        if (volunteerOpportunityProfile[0]?.description) {
            editorConfig.editorState = volunteerOpportunityProfile[0]?.description;
            setEditorInitialConfig(editorConfig);
        }
    }, [volunteerOpportunityProfile[0]?.description]);

    return (
        <BaseLayout title={"Projects"}>

            <div className="topic-title-section" style={{paddingBottom: '1em'}}>
                <Container>
                    <Grid container>
                        <Grid item sm={12} md={6} className="title-and-description">
                            <Typography variant="h1" style={{marginBottom: 0}}>What's On / Volunteer Opportunities</Typography>
                        </Grid>
                        <Grid item sm={12} md={6} className="add-org-link">
                            <Typography style={{display:'flex'}}>
                                <p>
                                    Do you have an environmental volunteer opportunities that's coming up?
                                </p>
                                {addYourVolunteerOpBtn()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
                <Container style={{marginTop:'1em', marginBottom: '2em'}}>
                    <Typography variant="p">
                        All in one page for Sri Lanka's environmental volunteer opportunities
                    </Typography>
                </Container>
    
                <WhatsOnNavbar />
            </div>

            <Container className="organization-list" style={{marginTop:'1em', marginBottom:'2em'}}>
                <Grid container marginBottom>
                    
                {imageList?.length > 0 ? (
                    <ImageCarousal setSliders={imageList} />
                    ) : (
                        <></>
                    )}
                    
                    <div className="promo-banner" style={{margin: '0px 0 0'}}>
                    </div>

                    <Grid style={{display:'flex', marginTop: 20}}>
                       
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={6}>
                        <Grid item sm={12}>
                        <h1>{volunteerOpportunityProfile[0]?.title}</h1>
                            <LocationOn style={{paddingBottom:'3px'}}/>
                        <a>{city?.name_en}, {district?.name_en}</a>
                        </Grid>
                        <Grid item sm={10}>
                    
                            {editorInitialConfig.length !== 0 &&
                            <LexicalEditorView initialConfig={editorInitialConfig}/>}
                        
                            <p>From: {createEventDateFormat(volunteerOpportunityProfile[0]?.start_date_time)}</p>
                            <p>To: {createEventDateFormat(volunteerOpportunityProfile[0]?.end_time_time)}</p>
                           
                            <br />

                            <Typography style={{display: 'block', marginBottom: 12}}><strong>Files</strong></Typography>    
                            {evFiles?.map((item, key) => {
                                // var fileName = item.split('/');
                                return <Grid item sm={12} md={12}>
                                    <a key={key} href={`/storage/`+item} target="_blank" style={{display: 'block', marginBottom: '.6em'}}>
                                        <Typography style={filesStyle}>
                                            <FileDownloadRoundedIcon style={menuIcon} />
                                            <Link to={`/storage/`+item} target="_blank">{item}</Link>
                                        </Typography>
                                    </a>
                                </Grid>    
                            })}
                        </Grid>
                    </Grid>
                    <Grid item sm={6}>
                        <div>
                            <LocationMap zoom={8} center={{ lat: 7.873054, lng: 80.771797 }} listLangLat={locations} />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </BaseLayout>
    );
}

export default WhatsonVolunteerOpportunitiesProfile;
