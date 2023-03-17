import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import BaseLayout from "../BaseLayout";
import ProjectOrganizationNavbar from "../Organisations/ProjectOrganizationNavbar";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocationMap from "../components/LocationMap";
import ImageCarousal from "../../Frontend/components/ImageCarousal";
import LexicalEditorView from "../Elearning/LexicalEditorView";
import ExampleTheme from "../../Dashboard/LexicalEditor/themes/ExampleTheme";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";

function ProjectSingle(props) {
	const projParams = useParams();
	const [locations, setLocation] = useState([]);
	const [projectProfile, setProjectProfile] = useState([]);
	const [projectImages, setProjectImages] = useState([]);
	const [projectOrganization, setProjectOrganization] = useState([]);
	const [organizationCity, setOrganizationCity] = useState([]);
	const [organizationType, setOrganizationType] = useState([]);
	const [projectCity, setProjectCity] = useState([]);
	const [projectDistrict, setProjectDistrict] = useState([]);
	const [projectList, setProjectList] = useState([]);
    const [editorInitialConfig, setEditorInitialConfig] = useState([]);
	const [fileList, setFiles] = useState([]);

    useEffect(() => {
		// if(localStorage.getItem('auth_token')) {
		// 	getProjectProfileForUser();
		// }
		// else {
		getProjectProfile();
		getProjectList();
		//}

	}, [projParams.slug, localStorage.getItem('auth_id')]);

	const getProjectProfile = () => {
		axios.get(`/api/project/${projParams.slug}`).then(res => {
			if (res.data.status === 200) {
				setProjectProfile(res.data.get_data);
				setProjectImages(res.data.get_data.images);
				setLocation(JSON.parse(res.data.get_data.locations));
				setProjectOrganization(res.data.project_org);
				setProjectCity(res.data.project_city);
				setProjectDistrict(res.data.project_district);
				setOrganizationCity(res.data.organization_city);
				setOrganizationType(res.data.organization_type);
				setFiles(JSON.parse(res.data.uploads));
			}
			else if (res.data.status === 404) {
				console.log(res.message);
			}
		});
	}

	const getProjectList = () => {
		axios.get(`/api/projects`).then(res => {
			if(res.data.status === 200) {
				setProjectList(res.data.projects);
			}
		});
	}

	const menuIcon = {
		color: '#c4c4c4',
		fontSize: 20,
		float: 'left',
		margin: '2px 5px 0px 0px'
	}

	const tagDisplay = () => {
		return projectProfile.tags?.map((tag, index) => {
			return <Link key={index} to={`/tag/${tag.slug.en}`}>{'#' + tag.name.en} </Link>
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
        if (projectProfile.description) {
            editorConfig.editorState = projectProfile.description;
            setEditorInitialConfig(editorConfig);
        }
    }, [projectProfile.description]);

	return (
		<BaseLayout title={"Projects"}>

			<div className="topic-title-section">
				<Container>
					<Grid container>
						<Grid item sm={12} md={6} className="title-and-description">
							<Typography variant="h1">Organisations & Projects</Typography>
					
						</Grid>
					</Grid>
				</Container>
			</div>

			<ProjectOrganizationNavbar />

			<Container className="project-single">
				<Grid container>
					<Grid item sm={12} md={11} className="project-head">
						<Typography variant="h2" className="project-title">{projectProfile.project_title}</Typography>
						<Typography><LocationOnOutlinedIcon style={menuIcon} />
						{projectCity === null ? '' : projectCity.name_en}, {projectDistrict === null ? '' : projectDistrict.name_en}</Typography>
					</Grid>

					<Grid item xs={12} className="data_card card-row resource-card random-org-card" >
						<Grid container>
							{/* <Grid item sm={12} md={1}>
								<Box className="card-logo" style={{ backgroundImage: `url('https://cdn.logojoy.com/wp-content/uploads/20200605160200/coral-reef-alliance-envronment-logo.png')` }}></Box>
							</Grid> */}
							<Grid item sm={12} md={12} className="card-content">
								<Grid container className="description">
									<Grid item sm={12} md={6}>
										<Typography variant="h5" className="card_title" fontSize={'14px'}>{projectOrganization.org_name}</Typography>
										<Typography variant="body2" color="text.secondary">
										{organizationType.type} in {projectCity === null ? '' : projectCity.name_en}
										</Typography>
									</Grid>
									<Grid item sm={12} md={6}>
										<Link to={'/organization/'+projectOrganization.slug} className="theme-btn">More About {projectOrganization.org_name}</Link>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>

					<Grid item sm={12} md={12} style={{ margin: '0 0px 35px' }}></Grid>

					<Grid item sm={12} md={12} className="body-content">
						<Grid container spacing={4}>
							{projectImages?.length > 0 ? (
								<Grid item sm={12} md={8} className="post-carousal">
									<ImageCarousal setSliders={projectImages} />
								</Grid>
							) : (
								<></>
							)}
							<Grid item sm={12} md={4} style={{ display: 'flex', alignItems: 'center' }}>
								<div>
									{/* <Typography variant="h4" className="sub-title">Some Title</Typography> */}
									<Typography>{projectProfile.overview}</Typography>
								</div>

							</Grid>
							
						</Grid>
					</Grid>

					<Grid item sm={12} md={12} className="body-content">
						<Grid container spacing={4}>
							<Grid item sm={12} md={8}>
								{/*<Typography>{projectProfile.description}</Typography>*/}
                                {editorInitialConfig.length !== 0 && <LexicalEditorView initialConfig={editorInitialConfig}/>}
                            </Grid>
							<Grid item sm={12} md={4}>
								<div className="related-box">
									<Typography className="box-title">Related Content</Typography>
									<ul>
									{projectList.slice(0, 5).map((row, key) => (
										<li key={row.id}><Link to={`/project/`+row.slug}>{row.project_title}</Link></li>
									))}
									</ul>
								</div>
							</Grid>
						</Grid>
					</Grid>

					<Grid item sm={12} md={12} >
						<LocationMap zoom={8} center={{ lat: 7.873054, lng: 80.771797 }} listLangLat={locations} />
					</Grid>

					 <Grid item sm={10}>				
					<Typography style={{display: 'block', marginBottom: 12}}><strong>Files</strong></Typography>    
                            {fileList?.map((item, key) => {
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

					<Grid item sm={12} md={12} className="tag-box">
						<Typography style={{ 'marginRight': '10px' }}>Tags: </Typography>
						{tagDisplay()}
					</Grid>

				</Grid>
			</Container>
		</BaseLayout>
	)
}

export default ProjectSingle
