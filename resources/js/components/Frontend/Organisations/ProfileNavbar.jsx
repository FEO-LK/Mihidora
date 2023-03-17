import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Typography, Grid } from "@mui/material"

export default function ProfileNavbar() {
  const orgParams = useParams();
  const [organisationProfile, setOrganisationProfile] = useState([]);

  useEffect(() => {
    getOrganisationProfile();
	}, [orgParams.slug, localStorage.getItem('auth_id')]);

  const getOrganisationProfile = () => {
		axios.get(`/api/organization/${orgParams.slug}`).then(res => {
			if (res.data.status === 200) {
				setOrganisationProfile(res.data.get_data);
			}
			else if (res.data.status === 404) {
				console.log(res.message);
			}
		});
	}
  
  return (
    <Grid item sm={12} md={12} className="profile-navigation">
      <ul className="org-sub-menu">
        <li><Link to={`/organization/${orgParams.slug}`}>Projects</Link></li>
        <li><Link to={`/${orgParams.slug}/datasets`}>Datasets</Link></li>
        <li><Link to={`/${orgParams.slug}/resources`}>Resources</Link></li>
      </ul>
    </Grid>
  )
}
