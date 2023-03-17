import React from "react";
import {Container, Grid, Typography, Box, Link} from "@mui/material";
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

function Members() {
    return (
        <BaseLayout title={"Our Members"}>	

					<PageBanner image={bannerImage} />

					<Grid container className="about-intro">
						<Container>
							<Grid container>
								<Grid item sm={12} md={7} className="section-head" mb={5}>
									<Typography variant="h3" className="section-title"><Typography variant="span">Members</Typography>
									X is a platform that brings together lorem future that's just, prosperous, lorem ipsum vergos lavatne sombre</Typography> 
								</Grid>
								<Grid item sm={12} md={8} className="main-content" mb={5}>
									<Typography variant="body1">We're an international movement of ordinary people working to end the age of fossil fuels 
									and build a world of community-led renewable energy for all Here's how we get there:
									</Typography>
								</Grid>    
							</Grid>	
						</Container>
					</Grid>
			
        </BaseLayout>
    )
}

export default Members