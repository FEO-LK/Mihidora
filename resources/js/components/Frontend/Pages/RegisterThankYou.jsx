import React from "react";
import { styled } from '@mui/material/styles';
import { Container, Grid, Typography, Box, Link } from "@mui/material";
import BaseLayout from "../BaseLayout";
import PageBanner from "../components/PageBanner";
import ButtonBase from '@mui/material/ButtonBase';

import bannerImage from "../../../../images/aboutBanner.jpg";
import aboutFEO_img from "../../../../images/about_img_1.jpg";
import ProjIMG from "../../../../images/project.jpg";

const styles = {
	TopProject: {
		backgroundImage: `url(${"../../../../images/thank-you.png"})`
	}
};

const images = [
	{
		url: '../../../../images/projects-illustration.png',
		title: 'Projects',
		width: '40%',
	},
	{
		url: '../../../../images/data-illustration.png',
		title: 'Data',
		width: '30%',
	},
	{
		url: '../../../../images/projects-illustration.png',
		title: 'Resources',
		width: '30%',
	},
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
	position: 'relative',
	height: 200,
	[theme.breakpoints.down('sm')]: {
		width: '100% !important', // Overrides inline-style
		height: 100,
	},
	'&:hover, &.Mui-focusVisible': {
		zIndex: 1,
		'& .MuiImageBackdrop-root': {
			opacity: 0.15,
		},
		'& .MuiImageMarked-root': {
			opacity: 0,
		},
		'& .MuiTypography-root': {
			border: '4px solid currentColor',
		},
	},
}));

const ImageSrc = styled('span')({
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundSize: 'cover',
	backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundColor: theme.palette.common.black,
	opacity: 0.4,
	transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
	height: 3,
	width: 18,
	backgroundColor: theme.palette.common.white,
	position: 'absolute',
	bottom: -2,
	left: 'calc(50% - 9px)',
	transition: theme.transitions.create('opacity'),
}));

function RegisterThankYou() {
	return (
		<BaseLayout title={"Thank You"}>

			{/* <PageBanner image={bannerImage} /> */}

			<Grid container className="about-intro">
				<Container>
					<Grid container className="thank-you-page" style={styles.TopProject}>
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
							</Typography>
							<Typography variant="body1" gutterBottom>
								If you have any questions or need further assistance, feel free to reach out to our support team at mihidorafeo@gmail.com.
							</Typography>
							<Typography variant="body1" gutterBottom>
								- Mihidora Team
							</Typography>
						</Grid>
					</Grid>
					<Grid container className="thank-you-page">
						<Grid item sm={12} md={8} className="main-content" mb={5}>
							<Typography variant="body1" gutterBottom>
								Checkout the latest 
								<Link href="#"> Projects </Link> 
								from Mihidora Community
							</Typography>
							{/* <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
								{images.map((image) => (
									<ImageButton
										focusRipple
										key={image.title}
										style={{
											width: image.width,
										}}
									>
										<ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
										<ImageBackdrop className="MuiImageBackdrop-root" />
										<Image>
											<Typography
												component="span"
												variant="subtitle1"
												color="inherit"
												sx={{
													position: 'relative',
													p: 4,
													pt: 2,
													pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
												}}
											>
												{image.title}
												<ImageMarked className="MuiImageMarked-root" />
											</Typography>
										</Image>
									</ImageButton>
								))}
							</Box> */}
						</Grid>
					</Grid>
				</Container>
			</Grid>

		</BaseLayout>
	)
}

export default RegisterThankYou