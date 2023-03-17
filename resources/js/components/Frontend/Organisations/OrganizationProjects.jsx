import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Grid, Typography, CardActions, CardContent, CardMedia } from "@mui/material";
import BaseLayout from "./../BaseLayout";
import PageBanner from "./../components/PageBanner";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import OrganizationProfile from "./OrganizationProfile";
import ProjectOrganizationNavbar from "../Organisations/ProjectOrganizationNavbar";
import ProfileNavbar from "./ProfileNavbar";

import bannerImage from "../../../../images/aboutBanner.jpg";

function OrganizationProjects(props) {
	const orgParams = useParams();
	const [organisationProjects, setOrganisationProjects] = useState([]);

	useEffect(() => {
		getOrganisationProjects();
    // getOrganizationDetails();
	}, [orgParams.slug]);

	const getOrganisationProjects = () => {
		axios.get(`/api/organization-profile-projects/${orgParams.slug}`).then(res => {
			if (res.data.status === 200) {
				setOrganisationProjects(res.data.projects);
			}
			else if (res.data.status === 404) {
				console.log(res.message);
			}
		});
	}

	const menuIcon = {
		color: '#c4c4c4',
		fontSize: 18,
		float: 'left',
		margin: '4px 5px 0px 0px'
	}

	return (
		<BaseLayout title={"Projects"}>

			<div className="topic-title-section">
				<Container>
					<Grid container>
						<Grid item sm={12} md={6} className="title-and-description">
							<Typography variant="h1">Organisations and Projects</Typography>
							<Typography>All in one page for Sri Lanka's environmental resources</Typography>
						</Grid>
					</Grid>
				</Container>
			</div>

			<ProjectOrganizationNavbar />

			<OrganizationProfile slug={orgParams.slug}/>

			<Container >
				<Grid container>

					<ProfileNavbar />

					<Grid item sm={12} md={12} className="profile-body">
						<Grid container spacing={2}>
							{organisationProjects.map((row, key) => (
								<Grid item key={key} xs={4} className="organization_card" >
									<Link to={`/project/` + row.slug}>
									{row.photos !== '' &&
										<CardMedia
											component="img"
											height="140"
											image={`/storage/`+JSON.parse(row.photos)}
											alt="green iguana"
										/>
										}
										<CardContent className="card_content">
											<Typography variant="span" className="main-tag">DISTRICT</Typography>
											<Typography variant="h5" className="org_title">{row.project_title}</Typography>
											<ul className="card_tags">
												<li><a href=""><LocationOnOutlinedIcon style={menuIcon} /> Colomo, Western Province</a></li>
											</ul>
											<ul className="related-tags">
												<li><Link to=''>#Airquality</Link></li>
												<li><Link to=''>#Airquality</Link></li>
											</ul>
										</CardContent>
									</Link>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</Container>

		</BaseLayout>





		// <BaseLayout title={"Organization Profile"}>
		// 	<div className="org_profile">
		// 		<div className="banner-title">
		// 			<PageBanner image={bannerImage} />
		// 		</div>
		// 		<Container className="organization-profile">
		// 			<Grid container spacing={2} className="dp-row">
		// 				<Grid item sm={12} md={3}>
		// 					<div className="display-profile-img"></div>
		// 				</Grid>
		// 				<ProfileNavbar />
		// 			</Grid>
		// 			<Grid container spacing={2}>
		// 				<Grid item sm={12} md={3}>
		// 					<div className="content_block-wrap widget-wrap">
		// 						<Typography className="widget_title">Intro</Typography>
		// 					</div>
		// 				</Grid>
		// 				<Grid item sm={12} md={9} className="profile-body">
		// 					<div className="content_block-wrap content-wrap">
		// 						<Grid container spacing={2}>
		// 							{organisationProjects.map((row) => (
		// 								<Grid item key={row.id} xs={4} className="organization_card" >
		// 									<CardMedia
		// 										component="img"
		// 										height="140"
		// 										image="../../../images/project.jpg"
		// 										alt="green iguana"
		// 									/>
		// 									<CardContent className="card_content">
		// 										<Typography variant="h5" className="org_title">
		// 											{row.project_title}
		// 										</Typography>
		// 										<Typography variant="body2" color="text.secondary">
		// 										Lizards are a widespread group of squamate reptiles, with over 6,000
		// 										species, ranging across all continents except Antarctica
		// 										</Typography>
		// 										<CardActions className="card_action">
		// 											<Link to={`/project/${row.slug}`} className="theme-btn">Learn More</Link>
		// 										</CardActions>
		// 									</CardContent>
		// 								</Grid>
		// 							))}
		// 						</Grid>
		// 					</div>
		// 				</Grid>
		// 			</Grid>
		// 		</Container>
		// 	</div>
		// </BaseLayout>
	)
}

export default OrganizationProjects
