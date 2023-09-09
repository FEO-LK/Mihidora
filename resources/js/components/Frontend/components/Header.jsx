import React from "react";
//import { Link } from "react-router-dom";
import { Link, withRouter, useNavigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, List, ListItem, ListItemButton, ListItemText, Menu, Grid, Typography } from "@mui/material";
import OffcanvasMenu from '../components/OffcanvasMenu';
import LogoutLink from '../../../components/Dashboard/components/LogoutLink';
import Logo from "../../../../images/logo.jpg";
import menuImg from "../../../../images/menu-img.jpg";




const isLogin = () => {
	if (localStorage.getItem('auth_token')) {
		if (localStorage.getItem('user_role') == 2) {
			return <div className="auth-link-wrap"><Link to="/dashboard" className="theme-btn login-btn">My Profile</Link></div>
		} else if (localStorage.getItem('user_role') == 1) {
			// return <div className="auth-link-wrap"><Link to="" className="theme-btn login-btn">Logout</Link></div>
			return <LogoutLink/>;
		} else {
			// return <div className="auth-link-wrap"><Link to="" className="theme-btn login-btn">Logout</Link></div>
			return <LogoutLink/>;
		}
	} else {
		return <div className="auth-link-wrap"><Link to="/organisation-registration" className="theme-btn signup-btn">Sign Up</Link>
			<Link to="/login" className="theme-btn login-btn">Login</Link></div>
	}
}


function Header() {
	const [anchorExploreNav, setAnchorExploreNav] = React.useState(null);
	const [anchorProjectNav, setAnchorProjectNav] = React.useState(true);
	const [anchorDataNav, setAnchorDataNav] = React.useState(false);
	const [anchorResourceNav, setResourceNav] = React.useState(false);
	const [anchorElearningeNav, setElearningNav] = React.useState(false);
	const [anchorWhatsonNav, setAnchorWhatsonNav] = React.useState(null);

	const navigate = useNavigate();

	const logoutSubmit = (e) => {
		e.preventDefault();

		axios.post('/api/logout').then(res => {
			if (res.data.status === 200) {
				localStorage.removeItem('auth_id');
				localStorage.removeItem('auth_token');
				localStorage.removeItem('auth_name');
				localStorage.clear();
				console.log(localStorage.getItem('auth_id'));
				navigate('/login');
			}
		});
	}

	const handleExploreClick = (event) => {
		if (anchorExploreNav !== event.currentTarget) {
			setAnchorExploreNav(event.currentTarget);
		}
	}
	function handleExploreClose() {
		setAnchorExploreNav(null);
	}

	const handleProjectClick = () => {
		setAnchorProjectNav(true);
		setAnchorDataNav(false);
		setResourceNav(false);
		setElearningNav(false);
	}

	const handleDataClick = () => {
		setAnchorDataNav(true);
		setAnchorProjectNav(false);
		setResourceNav(false);
		setElearningNav(false);
	}

	const handleResourceClick = () => {
		setResourceNav(true);
		setAnchorProjectNav(false);
		setAnchorDataNav(false);
		setElearningNav(false);
	}

	const handlElearningClick = () => {
		setElearningNav(true);
		setResourceNav(false);
		setAnchorProjectNav(false);
		setAnchorDataNav(false);
	}

	const handleWhatsonClick = (event) => {
		if (anchorWhatsonNav !== event.currentTarget) {
			setAnchorWhatsonNav(event.currentTarget);
		}
	}
	function handleWhatsonClose() {
		setAnchorWhatsonNav(null);
	}

	return (
		<AppBar position={"static"} className="site-header">

			<OffcanvasMenu />

			<Toolbar>
				<Container>
					<Link to="/"><img src={Logo} className="brand" /></Link>

					{isLogin()}

					<nav className="main-menu-wrap">
						<List>
							<ListItem disablePadding>
								<ListItemButton component="a" to="/topics">
									<ListItemText primary="Topics" />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton component="a"
									onClick={handleExploreClick}
									onMouseEnter={handleExploreClick}
									onMouseLeave={anchorExploreNav == false}
								>
									<ListItemText primary="Explore" />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton component="a"
									onClick={handleWhatsonClick}
									onMouseEnter={handleWhatsonClick}
									onMouseLeave={anchorWhatsonNav == false}
								>
									<ListItemText primary="What's on" />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton component="a" to="/about">
									<ListItemText primary="About us" />
								</ListItemButton>
							</ListItem>
						</List>
					</nav>

					<Menu
						className="explore-submenu"
						anchorEl={anchorExploreNav}
						open={Boolean(anchorExploreNav)}
						MenuListProps={{ onMouseLeave: handleExploreClose }}
					>
						<Container>
							<Grid container py={8} className="mega-menu">
								<Grid item sm={12} md={3} className="nav-links">
									<Typography fontWeight={600} fontSize={20}>Explore</Typography>
									<List>
										<ListItem disablePadding>
											<ListItemButton component="a"
												onMouseEnter={handleProjectClick}
											>
												<ListItemText primary="Organisations & Projects" />
											</ListItemButton>
										</ListItem>
										<ListItem disablePadding>
											<ListItemButton component="a"
												onMouseEnter={handleDataClick}
											>
												<ListItemText primary="Data" />
											</ListItemButton>
										</ListItem>
										<ListItem disablePadding>
											<ListItemButton component="a"
												onMouseEnter={handleResourceClick}
											>
												<ListItemText primary="Resource Exchange" />
											</ListItemButton>
										</ListItem>
										<ListItem disablePadding>
											<ListItemButton component="a"
												to="/elearning-materials"
												onMouseEnter={handlElearningClick}
											>
												<ListItemText primary="E-learning" />
											</ListItemButton>
										</ListItem>
									</List>
								</Grid>
								<Grid item sm={12} md={9} className="nav-content">

									{anchorProjectNav === true && (
										<Grid container flex sx={{ alignItems: 'center' }} spacing={4}>
											<Grid item sm={12} md={4}>
												<ul>
													<li><Link to="/projects">Projects</Link></li>
													<li><Link to="/organizations">Organisations</Link></li>
												</ul>
											</Grid>
											<Grid item sm={12} md={4}>
												<img src={menuImg} />
											</Grid>
											<Grid item sm={12} md={4}></Grid>
										</Grid>
									)}
									{anchorDataNav === true && (
										<Grid container flex sx={{ alignItems: 'center' }} spacing={4}>
											<Grid item sm={12} md={4}>
												<ul>
													<li><Link to="/datahub">Data Catalogue</Link></li>
													{/* <li><Link to="/">All Data Sets</Link></li> */}
												</ul>
											</Grid>
											<Grid item sm={12} md={4}>
												<img src={menuImg} />
											</Grid>
											<Grid item sm={12} md={4} mt={0}>
												<Typography >All in one page for Sri Lanka's environmental Data</Typography>
											</Grid>
										</Grid>
									)}
									{anchorResourceNav === true && (
										<Grid container flex sx={{ alignItems: 'center' }} spacing={4}>
											<Grid item sm={12} md={4}>
												<ul>
													<li><Link to="/resource-exchange/jobs">Jobs</Link></li>
													<li><Link to="/resource-exchange/grants-and-proposals">Grants and RFPs</Link></li>
													<li><Link to="/resource-exchange/suppliers">Suppliers</Link></li>
													<li><Link to="/resource-exchange/resource-sharing">Resource pool</Link></li>
												</ul>
											</Grid>
											<Grid item sm={12} md={4}>
												<img src={menuImg} />
											</Grid>
											<Grid item sm={12} md={4} mt={0}>
												<Typography>All in one page for Sri Lanka's environmental Resources</Typography>
											</Grid>
										</Grid>
									)}
									{anchorElearningeNav === true && (
										<Grid container flex sx={{ alignItems: 'center' }} spacing={4}>
											<Grid item sm={12} md={4}>

											</Grid>
											<Grid item sm={12} md={4}>
												<img src={menuImg} />
											</Grid>
											<Grid item sm={12} md={4} mt={0}>
												<Typography>All in one page for Sri Lanka's environmental education programs</Typography>
											</Grid>
										</Grid>
									)}

								</Grid>
							</Grid>
						</Container>
					</Menu>
					{/* Explore sub menu */}

					<Menu
						className="explore-submenu"
						anchorEl={anchorWhatsonNav}
						open={Boolean(anchorWhatsonNav)}
						MenuListProps={{ onMouseLeave: handleWhatsonClose }}
					>
						<Container>
							<Grid container py={8} className="mega-menu">
								<Grid item sm={12} md={3} className="nav-links">
									<Typography fontWeight={600} fontSize={20}>What's On</Typography>
									<List>
										<ListItem disablePadding>
											<ListItemButton component="a"
												to="/whatson/events"
												onMouseEnter={handleProjectClick}
											>
												<ListItemText primary="Events" />
											</ListItemButton>
										</ListItem>
										<ListItem disablePadding>
											<ListItemButton component="a"
												to="/whatson/volunteer-opportunities"
												onMouseEnter={handleDataClick}
											>
												<ListItemText primary="Volunteer Opportunities" />
											</ListItemButton>
										</ListItem>
										<ListItem disablePadding>
											<ListItemButton component="a"
												to="/whatson/media-and-advocacy"
												onMouseEnter={handleResourceClick}
											>
												<ListItemText primary="Media and Advocacy" />
											</ListItemButton>
										</ListItem>
									</List>
								</Grid>
								<Grid item sm={12} md={9} className="nav-content">

									{anchorProjectNav === true && (
										<Grid container flex sx={{ alignItems: 'center' }} spacing={4}>
											<Grid item sm={12} md={4}>
												<img src={menuImg} />
											</Grid>
											<Grid item sm={12} md={8}></Grid>
										</Grid>
									)}
									{anchorDataNav === true && (
										<Grid container flex sx={{ alignItems: 'center' }} spacing={4}>
											<Grid item sm={12} md={4}>
												<img src={menuImg} />
											</Grid>
											<Grid item sm={12} md={8} mt={0}>
												<Typography >All in one page for Sri Lanka's environmental Data</Typography>
											</Grid>
										</Grid>
									)}
									{anchorResourceNav === true && (
										<Grid container flex sx={{ alignItems: 'center' }} spacing={4}>
											<Grid item sm={12} md={4}>
												<img src={menuImg} />
											</Grid>
											{/* <Grid item sm={12} md={4}>
												<img src={menuImg} />
											</Grid> */}
											<Grid item sm={12} md={8} mt={0}>
												<Typography>All in one page for Sri Lanka's environmental Data</Typography>
											</Grid>
										</Grid>
									)}
									{anchorElearningeNav === true && (
										<Grid container flex sx={{ alignItems: 'center' }} spacing={4}>
											<Grid item sm={12} md={4}>

											</Grid>
											<Grid item sm={12} md={4}>
												<img src={menuImg} />
											</Grid>
											<Grid item sm={12} md={4} mt={0}>
												<Typography>All in one page for Sri Lanka's environmental Data</Typography>
											</Grid>
										</Grid>
									)}

								</Grid>
							</Grid>
						</Container>
					</Menu>
					{/* Whatson sub menu */}

				</Container>
			</Toolbar>
		</AppBar>
	)
}

export default Header