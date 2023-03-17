import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import BaseLayout from "./BaseLayout";
import PageBanner from "./components/PageBanner";

import bannerImage from "../../../images/aboutBanner.jpg";

function DatasetSingle(props) {
	const projParams = useParams();
	const [projectProfile, setProjectProfile] = useState([]);
	const [projectImages, setProjectImages] = useState([]);

	useEffect(() => {
		// if(localStorage.getItem('auth_token')) {
		// 	getProjectProfileForUser();
		// }
		// else {
		 	getProjectProfile();
		//}
		
	}, [projParams.slug, localStorage.getItem('auth_id')]);

  const getProjectProfile = () => {
    axios.get(`/api/project/${projParams.slug}`).then(res=> {
      if(res.data.status === 200) {
				setProjectProfile(res.data.get_data);
				setProjectImages(res.data.photoList);
      }
      else if(res.data.status === 404) {
        console.log(res.message);
      }
    });
  }

	const tagDisplay = () => {
		return projectProfile.tags?.map((tag, index) => {
			return <Link key={index} to={`/tag/${tag.slug.en}`} style={{"display": "block"}}>{'#'+tag.name.en} </Link>
		})
	}

	const photoList = () => {
		return projectImages?.map((image, index) => {
			return <img src={'/uploads/'+image.filename} />
		})
	}

	//const getProjectProfileForUser = () => {
		// axios.get(`/api/view-organisations`).then(res => {
		// 	if(res.data.status === 200) {
		// 		setOrganisationList(res.data.organizations);
		// 	}
		// });
	//}

	//const showRequestBtn = (id) =>{
		// return organisationList?.map((item, key) => {
		// 	if(item?.organization_user?.length > 0 && item.id === id){
		// 		return item.organization_user.map((request_item, index)=>{	
		// 			if(request_item.status == 1){
		// 				return <Button key={index} size="small" disabled>Joined</Button>
		// 			}else if(request_item.status == 2){
		// 				return <Button key={index} size="small" disabled>Request Pending</Button>
		// 			}else if(request_item.status == 0 ){
		// 				return <Button key={index} size="small" disabled>Rejected</Button>
		// 			}
		// 		})
		// 	}
		// 	else{
		// 		if(item?.organization_user?.length == 0 && item.id === id){
		// 			return <Button key={key} size="small" onClick={(e) => sendRequest(e,id)}>send Request</Button>		
		// 		}
		// 	}
		// })
	//}

	//const sendRequest = (e, id) => {
    // e.preventDefault();
		// const data= {
		// 	organization_id: id,
		// }
		// e.currentTarget.innerText = 'Request Sent';
		// e.currentTarget.disabled = true;
		// axios.get('sanctum/csrf-cookie').then(response => { 
		// 	axios.post('/api/send-user-request', data).then(res => {
		// 		if(res.data.status === 200) {
		// 			console.log('Sent');
		// 		}
		// 	});
		// });
  //} 

	return (
		<BaseLayout title={"Project"}>	

			<div className="banner-title">
				<PageBanner image={bannerImage}/>
			</div>
			<Container>
				<Grid container>
					<Grid item sm={12} md={3}>
						Sidebar
					</Grid>
					<Grid item sm={12} md={9}>
						<Grid container spacing={2}>
							<h4 style={{'width': '100%'}}>Dataset Single Title: {projectProfile.project_title}
							<br/>
							<span sx={{ m: 1 }}>Description: {projectProfile.description}</span></h4>
							
							<Typography style={{'marginRight': '10px'}}>Tags: </Typography>
							{tagDisplay()}
							{photoList()}
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</BaseLayout>
	)
}

export default DatasetSingle