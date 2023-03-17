import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import BaseLayout from "./../BaseLayout";
import PageBanner from "./../components/PageBanner";
import ProfileNavbar from "./ProfileNavbar";

import bannerImage from "../../../../images/aboutBanner.jpg";

function OrganizationClassified(props) {
	const orgParams = useParams();
	const [organisationProfile, setOrganisationProfile] = useState([]);

	useEffect(() => {
		// if (localStorage.getItem('auth_token')) {
		// 	getOrganisationProfileForUser();
		// }
		//else {
			getOrganisationClassified();
		//}

	}, [orgParams.slug, localStorage.getItem('auth_id')]);

	const getOrganisationClassified = () => {
		axios.get(`/api/organization-profile-dataset/${orgParams.slug}`).then(res => {
			if (res.data.status === 200) {
				setOrganisationDataset(res.data.dataset);
			}
			else if (res.data.status === 404) {
				console.log(res.message);
			}
		});
	}

	return (
		<BaseLayout title={"Organization Profile"}>
			<div className="org_profile">
				<div className="banner-title">
					<PageBanner image={bannerImage} />
				</div>
				<Container className="organization-profile">
					<Grid container spacing={2} className="dp-row">
						<Grid item sm={12} md={3}>
							<div className="display-profile-img"></div>
						</Grid>
						<ProfileNavbar />
					</Grid>
					<Grid container spacing={2}>
						<Grid item sm={12} md={3}>
							<div className="content_block-wrap widget-wrap">
								<Typography className="widget_title">Intro</Typography>
								<Typography>{organisationProfile.description}</Typography>
							</div>
						</Grid>
						<Grid item sm={12} md={9} className="profile-body">
							<div className="content_block-wrap content-wrap">Classified</div>
						</Grid>
					</Grid>
				</Container>
			</div>
		</BaseLayout>
	)
}

export default OrganizationClassified