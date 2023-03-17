import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {Container, Grid, Button, Typography, Box, CardMedia, CardContent} from "@mui/material";
import BaseLayout from "../BaseLayout";
import ProjectOrganizationNavbar from "./ProjectOrganizationNavbar";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ProfileNavbar from "./ProfileNavbar";
//import { Button } from "bootstrap";

function OrganizationProfile(props) {
	const orgParams = useParams();
	const [organisationProfile, setOrganisationProfile] = useState([]);
    const [organizationDetails,setOrganizationDetails] = useState([]);
    const [tags, setTags] = useState([]);
	const [organizationCity, setOrganizationCity] = useState([]);
	const [organizationDistrict, setOrganizationDistrict] = useState([]);
	const [organizationLogo, setOrganizationLogo] = useState([]);
	const [organisationList, setOrganisationList] = useState([]);  

    useEffect(() => {
		getOrganisationProfileForUser();
        getOrganizationDetails();
    }, [props.slug], localStorage.getItem('auth_id'));


    const getOrganizationDetails = () => {
        axios.get(`/api/organization/${orgParams.slug}`).then(res => {
            if(res.data.status === 200) {
                setOrganizationDetails(res.data.get_data);
                setTags(res.data.tags);
				setOrganizationCity(res.data.organization_city);
				setOrganizationDistrict(res.data.organization_district);
				setOrganizationLogo(res.data.org_logo);
            }
        });
    }

	const tagDisplay = () => {
		return tags?.map((tag, index) => {
			var slug = tag.replaceAll(" ", "-");
			return <Link key={index} to={`/tag/${slug.toLowerCase()}`}>{'#'+tag}</Link>
		})
	}

	const getOrganisationProfileForUser = () => {
		axios.get(`/api/check-user-orgs/${orgParams.slug}`).then(res => {
			if(res.data.status === 200) {
				setOrganisationList(res.data.user_org_status);
			}
		});
	}

	const showRequestBtn = (id) => {
		console.log(localStorage);
		if(localStorage.getItem('auth_token')) {
		if(organisationList.length === 0){
			return <Button size="small" onClick={(e) => sendRequest(e,id)} className="request_status">Send Request</Button>
		}
		return organisationList.map((item, index) => {
			if(organisationList.length > 0 && item.organization_id === id){
				//return item.map((request_item, index)=>{
					if(item.status == 1){
						return <Button key={index} size="small" disabled className="request_status">Joined</Button>
					}
					else if(item.status == 2){
						return <Button key={index} size="small" disabled className="request_status">Request Pending</Button>
					}
					else if(item.status == 0 ){
						return <Button key={index} size="small" disabled className="request_status">Rejected</Button>
					}
					else {
						return <Button key={index} size="small" onClick={(e) => sendRequest(e,id)} className="request_status">send Request</Button>
					}
				//})
			}
		})
		}
	}

	const sendRequest = (e, id) => {
		e.preventDefault();
		const data= {
			organization_id: id,
		}
		console.log(id);
		e.currentTarget.innerText = 'Request Sent';
		e.currentTarget.disabled = true;
		//axios.get('sanctum/csrf-cookie').then(response => {
			axios.post('/api/send-user-request', data).then(res => {
				if(res.data.status === 200) {
					console.log('Sent');
				}
			});
		//});
	}

	const menuIcon = {
		color: '#c4c4c4',
		fontSize: 20,
		float: 'left',
		margin: '2px 5px 0px 0px'
	}

	return (

			<Container className="project-single">
				<Grid container>
					<Grid item sm={12} md={11} className="project-head">
						<Typography variant="h2" className="project-title">{organizationDetails.org_name}</Typography>
						{showRequestBtn(organizationDetails.id)}
						<Typography><LocationOnOutlinedIcon style={menuIcon} />
							{organizationCity === null ? '' : organizationCity.name_en},
							{organizationDistrict === null ? '' : organizationDistrict.name_en}
						</Typography>
						
					</Grid>
					<Grid item sm={12} md={12} className="body-content">
						<Grid container spacing={4}>
							<Grid item sm={12} md={8}>
								<Typography>{organizationDetails.description}.</Typography>
								<Typography className="org-location-title" style={{margin: '20px 0 10px'}}>Organization locations</Typography>
								<Typography><LocationOnOutlinedIcon style={menuIcon} /> {organizationDetails.address}</Typography>
							</Grid>
							<Grid item sm={12} md={4}>

								<img src= {organizationDetails.org_logo ? '/storage/'+ JSON.parse(organizationDetails.org_logo) : "../../../images/project.jpg" } /> 	

								<Grid className="contact-info">
									<Typography className="box-title">Key Contact Info</Typography>
									<ul>
										<li>{organizationDetails.contact_person}</li>
										<li>{organizationDetails.email}</li>
										<li>{organizationDetails.contact_number}</li>
									</ul>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Typography><SellOutlinedIcon style={menuIcon} />{tagDisplay()}</Typography>
				</Grid>
			</Container>

	)
}

export default OrganizationProfile
