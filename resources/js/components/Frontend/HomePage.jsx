import React, { useEffect, useState } from "react";
import {Grid, Box, Container, Typography, Link } from "@mui/material";
import BaseLayout from "./BaseLayout";
import ProjIMG from "../../../images/project.jpg";
import HomeCarousal from "../Frontend/components/HomeCarousal";

const styles = {
	TopProject: {
		backgroundImage: `url(${"../../../images/project.jpg"})`
	},
	ProjectsCard: {
		backgroundImage: `url(${"../../../images/projects.png"})`
	},
	DataCard: {
		backgroundImage: `url(${"../../../images/data.png"})`
	},
	ResourceCard: {
		backgroundImage: `url(${"../../../images/resource.png"})`
	},
	ElearningCard: {
		backgroundImage: `url(${"../../../images/elearning.png"})`
	}
};

function HomePage() {
	const pageTemplate = 'home';
	const [exploreTitle, setExploreTitle] = useState([]);
	const [projectDescription, setProjectDescription] = useState([]);
	const [dataDescription, setDataDescription] = useState([]);
	const [resourceDescription, setResourceDescription] = useState([]);
	const [elearningDescription, setElearningDescription] = useState([]);
	const [whatsonTitle, setWhatsonTitle] = useState([]);
	const [projectList, setProjectList] = useState([]);
	const [homeBanner, setHomeBanner] = useState([]);

	useEffect(() => {
		getTemplateContent();
		getProjectList();
		
	}, []);

	const getTemplateContent = () => {
    axios.get(`/api/get-template/${pageTemplate}`).then(res=> {
      if(res.data.status === 200) {
				setHomeBanner(JSON.parse(res.data.get_data[6].value));
				setExploreTitle(res.data.get_data[0].value);
				setProjectDescription(res.data.get_data[1].value);
				setDataDescription(res.data.get_data[2].value);
				setResourceDescription(res.data.get_data[3].value);
				setElearningDescription(res.data.get_data[4].value);
				setWhatsonTitle(res.data.get_data[5].value);
      }
      else if(res.data.status === 404) {
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

	return (
		<BaseLayout className="home-page" title={"Home page"}>	

			<div className='home_slider'>
				<HomeCarousal setSliders={homeBanner} />
			</div>

			<Grid container className="main-directions">
				<Container>
					<Grid container>
						<Grid item sm={12} md={7} className="section-head" mb={5}>
							<Typography variant="h3" className="section-title"><Typography variant="span">Explore</Typography>
							{exploreTitle}</Typography> 
						</Grid>

						<Grid item sm={12} md={7}>
							<Box variant="div" className="card main-card">
								<Link href="/projects">
									<Typography variant="i" className="icon" style={styles.ProjectsCard}></Typography>
									<Typography variant="h5" className="card-name">Organisations & Projects</Typography>
									<Typography variant="body2">{projectDescription}</Typography>
								</Link>
							</Box>
						</Grid>
						<Grid item sm={12} md={5}>
							<Box variant="div" className="card">
								<Link href="/datahub">
									<Typography variant="i" className="icon" style={styles.DataCard}></Typography>
									<Typography variant="h5" className="card-name">Data</Typography>
									<Typography variant="body2">{dataDescription}</Typography>
								</Link>
							</Box>
							<Box variant="div" className="card">
								<Link href="#">
									<Typography variant="i" className="icon" style={styles.ResourceCard}></Typography>
									<Typography variant="h5" className="card-name">Resource Pool</Typography>
									<Typography variant="body2">{resourceDescription}</Typography>
								</Link>
							</Box>
							<Box variant="div" className="card">
								<Link href="/elearning-materials">
									<Typography variant="i" className="icon" style={styles.ElearningCard}></Typography>
									<Typography variant="h5" className="card-name">E-learning</Typography>
									<Typography variant="body2">{elearningDescription}</Typography>
								</Link>
							</Box>
						</Grid>
					</Grid>	
				</Container>
			</Grid>

			<Grid container className="featured-project">
				<Container>
					<Grid container>
						<Grid item sm={12} md={7} className="section-head" mb={5}>
							<Typography variant="h3" className="section-title"><Typography variant="span">What's On</Typography>
							{whatsonTitle}</Typography> 
						</Grid>
						
						<Grid item sm={12} md={7}>
							{projectList.slice(0, 1).map((row, idx) => (
							<Box key={idx} variant="div" className="project-card main-card">
								<Link href={'project/'+row.slug}>
									<Box variant="div" className="card-image" style={styles.TopProject}></Box>
									<Typography variant="h5" className="proj-name">{row.project_title}</Typography>
								</Link>
							</Box>
							))}
						</Grid>
						<Grid item sm={12} md={5}>
							{projectList.slice(0, 3).map((row, idx) => 
								idx != 0 && (
								<Box key={idx} variant="div" className="project-card">
									<Link href={'project/'+row.slug}>
										<Box variant="div" className="card-image"><img src={ProjIMG} /></Box>
										<Box variant="div" className="card-text">
											<Typography variant="h5" className="proj-name">{row.project_title}</Typography>
											<Typography style={{overflow: 'hidden', whiteSpace: 'wrap', textOverflow: 'ellipsis', maxHeight: '4rem'}} variant="body2">{row.overview}</Typography>
										</Box>
									</Link>
								</Box>
								))}
							<Link href="/projects" className="theme-btn">See More</Link>
						</Grid>
					</Grid>	
				</Container>
			</Grid>

		</BaseLayout>
	)
}

export default HomePage