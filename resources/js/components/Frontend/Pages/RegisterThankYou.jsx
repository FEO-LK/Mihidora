import React from "react";
import { Container, Grid, Typography, Box, Link } from "@mui/material";
import BaseLayout from "../BaseLayout";
import PageBanner from "../components/PageBanner";

import bannerImage from "../../../../images/aboutBanner.jpg";
import aboutFEO_img from "../../../../images/about_img_1.jpg";
import ProjIMG from "../../../../images/project.jpg";

const styles = {
	TopProject: {
		backgroundImage: `url(${"../../../../images/project.jpg"})`
	}
};

function RegisterThankYou() {
	return (
		<BaseLayout title={"Thank You"}>

			{/* <PageBanner image={bannerImage} /> */}

			<Grid container className="about-intro">
				<Container>
					<Grid container>
						<Grid item sm={12} md={7} className="section-head" mb={5}>
							<Typography variant="h3" className="section-title"><Typography variant="span">Thank You!</Typography>
								Thank you for joining Mihidora!</Typography>
						</Grid>
						<Grid item sm={12} md={8} className="main-content" mb={5}>
							<Typography variant="body1" gutterBottom>
								Thank you for registering with Mihidora. We're excited to have you join our community! Your registration has been received, and we're in the process of verifying your information.
							</Typography>
							<Typography variant="body1" gutterBottom>
								A Mihidora representative will contact you regarding your registration.
								If you have any questions or need further assistance, feel free to reach out to our support team at mihidorafeo@gmail.com.
							</Typography>
							<Typography variant="body1" gutterBottom>
								If you have any questions or need further assistance, feel free to reach out to our support team at mihidorafeo@gmail.com.
							</Typography>
							<Typography variant="body1" gutterBottom>
								- Mihidora Team
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</Grid>

		</BaseLayout>
	)
}

export default RegisterThankYou