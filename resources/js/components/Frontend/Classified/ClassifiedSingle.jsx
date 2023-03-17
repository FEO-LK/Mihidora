import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import BaseLayout from "../BaseLayout";
import PageBanner from "../components/PageBanner";

import bannerImage from "../../../../images/aboutBanner.jpg";
// import LocationMap from "./components/LocationMap";

function ClassifiedSingle(props) {
	const projParams = useParams();

	useEffect(() => {
		getClassifiedProfile();
		
	}, [projParams.slug]);

  const getClassifiedProfile = () => {
    axios.get(`/api/classified/${projParams.slug}`).then(res=> {
      if(res.data.status === 200) {
				// setProjectProfile(res.data.get_data);
				// setProjectImages(res.data.get_data.images);
				// setLocation(JSON.parse(res.data.get_data.locations));
      }
      else if(res.data.status === 404) {
        console.log(res.message);
      }
    });
  }

	return (
		<BaseLayout title={"Project"}>	
			<Container className="project-single">
				<Grid container spacing={2}>

					<Grid item sm={12} className="project-banner">
						<PageBanner image={bannerImage}/>
					</Grid>

					<Grid item sm={12} md={8}>
						<Grid container>

							ftfuffufuf

						</Grid>
					</Grid>
					<Grid item sm={12} md={4}>
	
						hjygyjjgj

					</Grid>
				</Grid>
			</Container>
		</BaseLayout>
	)
}

export default ClassifiedSingle