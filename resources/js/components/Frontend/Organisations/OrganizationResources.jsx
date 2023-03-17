import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Grid, Typography, Box } from "@mui/material";
import BaseLayout from "./../BaseLayout";
import ProjectOrganizationNavbar from "../Organisations/ProjectOrganizationNavbar";
import ProfileNavbar from "./ProfileNavbar";
import OrganizationProfile from "./OrganizationProfile";

function OrganizationResources(props) {
	const orgParams = useParams();
	//const [organisationEvents, setOrganisationEvents] = useState([]);

	useEffect(() => {
		getOrganisationEvents();

	}, [orgParams.slug, localStorage.getItem('auth_id')]);

	const organisationEvents = ["Dog", "Bird", "Cat", "Mouse", "Horse", "Rat", "Elephent", "Fish"];

	const getOrganisationEvents = () => {
		axios.get(`/api/organization-profile-events/${orgParams.slug}`).then(res => {
			if (res.data.status === 200) {
				setOrganisationEvents(res.data.events);
			}
			else if (res.data.status === 404) {
				console.log(res.message);
			}
		});
	}

	return (
		<BaseLayout title={"Datasets"}>

			<div className="topic-title-section">
				<Container>
					<Grid container>
						<Grid item sm={12} md={6} className="title-and-description">
							<Typography variant="h1">Organisations & Projects</Typography>
							<Typography>All in one page for Sri Lanka's environmental resources</Typography>
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
						{organisationEvents.map((row, key) => (
							<Grid item key={key} xs={12} className="data_card card-row resource-card" >
								<Grid container>
									<Grid item sm={12} md={1}>
										<Box className="card-logo" style={{ backgroundImage: `url('https://cdn.logojoy.com/wp-content/uploads/20200605160200/coral-reef-alliance-envronment-logo.png')` }}></Box>
									</Grid>
									<Grid item sm={12} md={11} className="card-content">
										<Typography variant="h5" className="card_title">Some Project Name</Typography>
										<Grid container className="description">
											<Grid item sm={12} md={10}>
												<Typography variant="body2" color="text.secondary">
													Environment Inc, CSO in Jaffna
												</Typography>
											</Grid>
										</Grid>
										<Typography variant="p" className="modified-date">
											Location : Colombo
											<span>Last updated : 13 October 2021</span>
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Container>

		</BaseLayout>
	)
}

export default OrganizationResources