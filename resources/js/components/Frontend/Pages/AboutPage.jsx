import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Typography, Box } from "@mui/material";
import BaseLayout from "../BaseLayout";
import PageBanner from "../components/PageBanner";

// import bannerImage from "../../../../images/aboutBanner.jpg";
// import aboutFEO_img from "../../../../images/about_img_1.jpg";
import ProjIMG from "../../../../images/project.jpg";

import facebook from "../../../../images/facebook.png";
import linkedin from "../../../../images/linked.png";
import twitter from "../../../../images/twit.png";

import LexicalEditorView from "../Elearning/LexicalEditorView";
import ExampleTheme from "../../Dashboard/LexicalEditor/themes/ExampleTheme";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";

const styles = {
	TopProject: {
		backgroundImage: `url(${"../../../../images/project.jpg"})`
	}
};

function AboutPage() {
	const pageTemplate = 'about';
	const [introMainText, setIntroMainText] = useState([]);
	const [introSmallText, setIntroSmallText] = useState([]);
	const [chartTitle, setChartTitle] = useState([]);
	const [chartDescription, setChartDescription] = useState([]);
	const [mainDescription, setMainDescription] = useState([]);
	const [projectDescription, setProjectDescription] = useState([]);
	const [membersDescription, setMembersDescription] = useState('');
	const [projectList, setProjectList] = useState([]);
	const [memberList, setMemberList] = useState([]);
	const [banner, setBanner] = useState([]); 
	const [introImage, setIntroImage] = useState([]); 
	const [trusteesLogo, setTrusteesLogo] = useState([]); 
	const [ourTrusteesTitle, setOurTrusteesTitle] = useState([]); 
	const [ourTrusteesText, setOurTrusteesText] = useState([]); 
	const [teamTitle, setOurTeamTitle] = useState([]); 
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
        editable: false,
    };

	useEffect(() => {
		getTemplateContent();
		getProjectList();
		getMemberList();

	}, []);

	const getTemplateContent = () => {
		axios.get(`/api/get-template/${pageTemplate}`).then(res => {
			if (res.data.status === 200) {
				//console.log(res.data.get_data[6].value);
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
				setOurTrusteesText(res.data.get_data[11].value);
				setOurTeamTitle(res.data.get_data[12].value);
			}
			else if (res.data.status === 404) {
				console.log(res.message);
			}
		});
	}

	const getProjectList = () => {
		axios.get(`/api/projects`).then(res => {
			if (res.data.status === 200) {
				setProjectList(res.data.projects);
			}
		});
	}

	const getMemberList = () => {
		axios.get(`/api/view-members`).then(res => {
			if (res.data.status === 200) {
				setMemberList(res.data.members);
			}
		});
	}

	useEffect(() => {
		if (membersDescription) {
			console.log(membersDescription);
			editorConfig.editorState = membersDescription;
			setEditorInitialConfig(editorConfig);
		}
	}, [membersDescription]);

	return (
		<BaseLayout title={"About Us"}>

			<PageBanner image={'/storage/'+banner} />

			<Grid container className="about-intro">
				<Container>
					<Grid container>
						<Grid item sm={12} md={7} className="section-head" mb={5}>
							<Typography variant="h3" className="section-title">
								<Typography variant="span">About Us</Typography>
								{introMainText}
							</Typography>
						</Grid>
						<Grid item sm={12} md={8} className="main-content" mb={5}>
							<Typography variant="body1">{introSmallText}</Typography>
						</Grid>
					</Grid>
				</Container>
			</Grid>

			<Grid className="statics-section">
				<Container>
					<Grid container>
						<Grid item sm={12} md={7} className="text-wrap">
							<Typography variant="h2" className="top-text">{chartTitle}</Typography>
							<Typography variant="body1">{chartDescription}</Typography>
							<ul>
								<li><i style={{ backgroundColor: '#bef4c0' }}></i>40% planting trees</li>
								<li><i style={{ backgroundColor: '#ac94f1' }}></i>35% cleanliness program</li>
								<li><i style={{ backgroundColor: '#fff0ca' }}></i>10% helping people</li>
								<li><i style={{ backgroundColor: '#f9cf64' }}></i>10% animal safety</li>
								<li><i style={{ backgroundColor: '#f48fbf' }}></i>5% feeding the poor</li>
							</ul>
						</Grid>
						<Grid item sm={12} md={5} className="graph">

						</Grid>
					</Grid>
				</Container>
			</Grid>

			<Grid className="about_feo-section">
				<Container>
					<Grid container>
						<Grid item sm={12} md={6} className="text-wrap">
							<Grid variant="div">
								<Typography variant="h2" className="title-text">About FEO</Typography>
								<Typography variant="body1">{mainDescription}</Typography>
							</Grid>
						</Grid>
						<Grid item sm={12} md={6} className="banner-image">
							<img src={'/storage/'+introImage} />
						</Grid>
					</Grid>
				</Container>
			</Grid>

			<Grid className="our_projects-section" style={{background: '#ecf1da'}}>
				<Container>
					<Grid container>
						<Grid item sm={12} md={6} className="text-wrap">
							<Grid variant="div">
								<Typography variant="h2" className="title-text">Our Projects</Typography>
								<Typography variant="body1">{projectDescription}</Typography>
								<Link to={'/organization/feosrilanka'} className="theme-btn">See more</Link>
							</Grid>
						</Grid>
						<Grid item sm={12} md={6} className="featured-project">
							<Grid container className="fea-project_wrap">
								{projectList.slice(0, 3).map((row, idx) => 
								<Box key={idx} variant="div" className="project-card">
									<Link to="#">
										<Box variant="div" className="card-image"><img src={ProjIMG} /></Box>
										<Box variant="div" className="card-text">
											<Typography variant="h5" className="proj-name">{row.project_title}</Typography>
											<Typography variant="body2">{row.overview}</Typography>
										</Box>
									</Link>
								</Box>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</Grid>

			<Container>
				<Grid className="trustees-wrap" sx={{ boxShadow: 3 }}>
					<Typography className="wrap-title">{ourTrusteesTitle}</Typography>
					<Typography variant="body2">{ourTrusteesText} ssss</Typography>
					{/* <ul>
						{trusteesLogo.map((item, idx) =>
							<li key={idx}><img src={'/storage/'+item} /></li>
						)}
					</ul> */}
				</Grid>
			</Container>

			<Grid className="our_members-section">
				<Container>
					<Grid container>
						<Grid item sm={12} md={12} className="sec_head">
							<Typography className="wrap-title">{teamTitle}</Typography>
							{/* <Typography>{membersDescription}</Typography> */}

							{editorInitialConfig.length !== 0 &&
                    <LexicalEditorView initialConfig={editorInitialConfig}/>}
						

						</Grid>
					</Grid>
					<Grid container>
						{memberList.map((row, idx) => 
							<Grid key={idx} item sm={12} md={3} className="member_card">
								<img src={'/storage/'+JSON.parse(row.photo)} />
								<Typography className="member-name">{row.name}</Typography>
								<Typography className="designation">{row.designation}</Typography>
								<ul>
									<li><a href={row.facebook_url} target="_target"><img src={facebook} /></a></li>
									<li><a href={row.linkedin_url} target="_target"><img src={linkedin} /></a></li>
									<li><a href={row.twitter_url} target="_target"><img src={twitter} /></a></li>
								</ul>
							</Grid>
						)}
					</Grid>

				</Container>
			</Grid>

		</BaseLayout>
	)
}

export default AboutPage