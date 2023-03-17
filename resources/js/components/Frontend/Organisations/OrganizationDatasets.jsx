import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Grid, Typography, CardActions, CardContent } from "@mui/material";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import ProjectOrganizationNavbar from "../Organisations/ProjectOrganizationNavbar";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BaseLayout from "../BaseLayout";
import OrganizationProfile from "./OrganizationProfile";
import ProfileNavbar from "./ProfileNavbar";

function OrganizationDatasets(props) {
	const orgParams = useParams();
	// const [organisationDataset, setOrganisationDataset] = useState([]);

	const organisationDataset = ["Dog", "Bird", "Cat", "Mouse", "Horse", "Rat", "Elephent", "Fish"];

	useEffect(() => {
		getOrganisationDataset();
	}, [orgParams.slug, localStorage.getItem('auth_id')]);

	const getOrganisationDataset = () => {
		axios.get(`/api/organization-profile-dataset/${orgParams.slug}`).then(res => {
			if (res.data.status === 200) {
				setOrganisationDataset(res.data.dataset);
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
		<BaseLayout title={"Datasets"}>

			<div className="topic-title-section">
				<Container>
					<Grid container>
						<Grid item sm={12} md={6} className="title-and-description">
							<Typography variant="h1">Organisations and Projects</Typography>
							<Typography>All in one page for Sri Lanka's data sets of environmental organisations</Typography>
						</Grid>
					</Grid>
				</Container>
			</div>

			<ProjectOrganizationNavbar />

			<OrganizationProfile />

			<Container >
				<Grid container>
					<ProfileNavbar />

					<Grid item sm={12} md={12} className="profile-body">
						{organisationDataset.map((row) => (
							<Grid item key={row.id} xs={12} className="data_card" >
								<Typography className="last_update">Last updated 16th December 2022</Typography>
								<Link to={`/dataset/${row.slug}`} className="card_title">
									{row.title}
								</Link>
								<Typography variant="body2" color="text.secondary">
									Lizards are a widespread group of squamate reptiles, with over 6,000
									species, ranging across all continents except Antarctica
								</Typography>
								<ul className="card_tags">
									<li><a href=""><ArticleOutlinedIcon style={menuIcon} /> CSV</a></li>
									<li><a href=""><SettingsApplicationsOutlinedIcon style={menuIcon} /> API</a></li>
									<li><a href=""><LocationOnOutlinedIcon style={menuIcon} /> Map</a></li>
								</ul>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Container>

		</BaseLayout>
	)
}

export default OrganizationDatasets