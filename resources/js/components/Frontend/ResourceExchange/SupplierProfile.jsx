import React, {useEffect, useState} from 'react';
import BaseLayout from "../BaseLayout";
import {Box, Container, Grid, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {postedDateFormat} from "../components/timeFormatFunctions";
import ExampleTheme from "../../Dashboard/LexicalEditor/themes/ExampleTheme";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import LexicalEditorView from "../Elearning/LexicalEditorView";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ImageCarousal from "../../Frontend/components/ImageCarousal";
import ResourceExchangeNavbar from "../../Frontend/ResourceExchange/ResourceExchangeNavbar";

function SupplierProfile() {

    const [supplierProfile, setSupplierProfile] = useState([]);
    const [district, setDistrict] = useState([]);
    const [organization, setOrganization] = useState([]);
    const [projectImages, setProjectImages] = useState([]);
    const [projectFiles, setProjectFiles] = useState([]);
    const [editorInitialConfig, setEditorInitialConfig] = useState([]);

    const params = useParams();

    useEffect(() => {
        getSupplierProfile();

    }, [params.slug]);

    const getSupplierProfile = () => {
        axios.get(`/api/resource-exchange-supplier/${params.slug}`).then(res => {
            if (res.data.status === 200) {
                setSupplierProfile(res.data.profile);
                setDistrict(res.data.district);
                setOrganization(res.data.organization);
                setProjectFiles(JSON.parse(res.data.profile.photos));
                setProjectImages(JSON.parse(res.data.profile.uploads));
            }
        });
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
        if (supplierProfile?.description) {
            editorConfig.editorState = supplierProfile?.description;
            setEditorInitialConfig(editorConfig);
        }
    }, [supplierProfile?.description]);

    return (
        <BaseLayout title={"Projects"}>

            <div className="topic-title-section" style={{borderBottom: '1px solid'}}>
                <Container>
                    <Grid container>
                        <Grid item sm={12} md={12} className="title-and-description">
                            <Typography variant="h1" style={{marginBottom: 0}}>Resource Exchange /
                                Suppliers</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            <ResourceExchangeNavbar />

            <Container>
                <h3>Resource Hub - Green Suppliers</h3>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    style={{marginBottom:'3em'}}
                >
                    <Grid item sm={12} md={9} style={{padding:'.5em .5em 0em 0em'}}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Grid md={8}>
                                <h1 style={{marginTop: 0}}>{supplierProfile?.title}</h1>
                            </Grid>
                            <Grid md={4} style={{marginTop:'1em'}}>
                                <Typography variant="p">
                                    Location : {district?.name_en}
                                    <span style={{display:'flex', flexDirection: 'column', fontSize:'.8em'}}>
                                        Posted {Math.round(Math.abs(new Date() - new Date(supplierProfile?.created_at))/(36e5*24))} days ago
                                    </span>
                                </Typography>
                            </Grid>
                        </Grid>
                        
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Grid md={12} style={{paddingRight: '.5em'}}>
                             
                                {editorInitialConfig.length !== 0 &&
                                <LexicalEditorView initialConfig={editorInitialConfig}/>}
                            </Grid>
                            <Grid md={12} style={{marginTop: '20px'}}>
                                <ImageCarousal setSliders={projectImages} />
                                {/* {projectImages?.map((row, key) => (
                                    <img src={`/storage/`+row} />
                                ))} */}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} md={3} style={{padding:'.5em .5em 2em 1em', background: '#f1f4f9'}}>
                        <Grid item sm={12}>
                            <Box className="card-logo" style={{ backgroundImage: `url('https://cdn.logojoy.com/wp-content/uploads/20200605160200/coral-reef-alliance-envronment-logo.png')` }}></Box>
                        </Grid>
                        <Grid item sm={12}>
                            <h4>{organization?.org_name}</h4>
                            <p>{projectFiles?.contact_email_focalpoint}</p>
                            <p>{projectFiles?.contact_number}</p>

                            <Typography variant="h1" className="org_title" style={{paddingTop:'1em', fontSize:'18px', fontWeight: 'bold'}}>Downloads</Typography>    
                            {projectFiles?.map((topic, key) => (
                            <a href={`/storage/`+topic} style={{display:'flex'}}>
                                    <CheckRoundedIcon style={{alignSelf:'center', marginRight:'.7em'}}/>
                                    <p item key={key} style={{fontSize: '14px'}}>{topic}</p>
                                </a>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </BaseLayout>
    );
}

export default SupplierProfile;
