import React, { useState } from "react";
import {Container, Grid, Typography, TextField, Button, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import BaseLayout from "../BaseLayout";
import FilterSideBar from "./FilterSideBar";
import ProjectOrganizationNavbar from "./ProjectOrganizationNavbar";
import Map from "./../components/Map";

function OrganizationMap() {
	const [searchKeyword, setSearchKeyword] = useState([]);
	const [organisationList, setOrganisationList] = useState([]);
	const [sortBy, setSortBy] = useState('Most Relevant');
	// const [organisationList, setOrganisationList] = useState([]);

	// useEffect(() => {
	// 	if(localStorage.getItem('auth_token')) {
	// 		getUserOrganisationList();
	// 	}
	// 	else {
	// 	 	getOrganisationList();
	// 	}

	const ListSearchInput = (e) => {
		e.persist();
    setSearchKeyword(e.target.value);
	}

	const stringSearch = (e) => {
		axios.get(`/api/organisation-map/`).then(res => {
			if(res.data.status === 200) {
				console.log(res);
				let result = organisationList.filter((el) => {
					let filterVal = el.org_name.toLowerCase()
					return filterVal.indexOf(searchKeyword) !== -1
				})
				setOrganisationList(result);
			}
		});
	}

	return (
		<BaseLayout title={"Organization Map"}>

		<div className="topic-title-section">
			<Container>
				<Grid container>
					<Grid item sm={12} md={6} className="title-and-description">
						<Typography variant="h1">Organisations & Projects</Typography>
						<Typography>All in one page for Sri Lanka's environmental organisations</Typography>
					</Grid>
					<Grid item sm={12} md={6} className="add-org-link">
						<Typography>
							Do you work on ernviromental issues in Sri Lanka?
							<Link to={'/'} className="theme-btn" style={{padding: '15px 25px', marginLeft: '5px'}}>Add Your Org</Link>
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</div>

		<ProjectOrganizationNavbar />

		<Container className="organization-list">
			<Grid container>
				<Grid item sm={12} md={3}>
					<FilterSideBar
                        mapLocation={'organization-map'}
                        listLocation={'organizations'}
                    />
				</Grid>
				<Grid item sm={12} md={9} className="list-wrap">
					<Grid container spacing={2} className="search_bar">
						<Grid item sm={12} md={12}>
							<TextField
								type='text'
								name="list_search"
								size="small"
								placeholder="Search Organisation"
								onChange={ListSearchInput}
								value={searchKeyword}
							>
							</TextField>
							<Button
								fullWidth
								variant={"outlined"}
								type={"button"}
								className="theme-btn ligth-btn small-btn"
								onClick={stringSearch}
								style={{float: 'right'}}>
								Search
							</Button>
						</Grid>
						<Grid item sm={12} md={12} mb={3}>
							<Grid container>
								<Grid item sm={12} md={4}>
									<Typography variant="span" className="item-count">{organisationList?.length} organisations.</Typography>
								</Grid>
								<Grid item sm={12} md={8} sx={{ flexDirection: 'row-reverse' }} className="grid-switch">
									<Select
										value={sortBy}
										//onChange={handleDistrictsChange}
										size="small"
									>
										<MenuItem value='Most Relevant'>Most Relevant</MenuItem>
									</Select>
									<Typography style={{fontSize: '12px', marginTop: '12px', marginRight: '5px'}}>Sort by: </Typography>
									{/* <Link to={`/organizations`} style={{marginRight: '10px'}}>Grid View</Link>
									<Link to={`/organization-map`}>Map View</Link>
									<Typography style={{fontSize: '12px', marginTop: '12px', marginRight: '5px'}}>View: </Typography> */}
								</Grid>
							</Grid>
						</Grid>
					</Grid>

					<Map />

				</Grid>
			</Grid>
		</Container>
	</BaseLayout>

	)
}

export default OrganizationMap
