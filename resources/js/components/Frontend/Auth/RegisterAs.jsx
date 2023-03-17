import React from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import { Container, CssBaseline, Link, Grid, Box, Typography } from "@mui/material";

import Logo from "../../../../images/logo.jpg";

const styles = {
	authBackground: {
		backgroundImage: `url(${"../../../images/auth_bg.jpg"})`
	},
	orgIcon: {
		backgroundImage: `url(${"../../../images/organisation.png"})`
	},
	userIcon: {
		backgroundImage: `url(${"../../../images/individual-user.png"})`
	}
};

function RegisterAs() {
    const navigate = useNavigate();

    return (
		<div className="auth_layout_wrap" style={styles.authBackground}>
		<React.Fragment>
			<CssBaseline />
			<Container>
				<Grid container height="100vh" direction="row" alignItems="center">
					<Grid item xs={7} className="login-form-left">

					</Grid>
					<Grid item xs={12} md={5} className="login-form">
						<div className="form_wrap">    
							<Link href="/"><img src={Logo} className="brand" /></Link>
							<Typography className="description-txt">If you are a member of an organisation, select the 'Individual user' option. If you are registering a new organisation, select the "Organisation' option</Typography>
							<Grid container 
								direction="column"
								alignItems="center"
								justify="center"
							>
								<Grid item>
									<Link href="user-registration" className="icon-button">
										<Box variant="div" className="icon" style={styles.userIcon}></Box>
										<Typography variant="span">Individual User</Typography>
									</Link>
									<Link href="/organisation-registration" className="icon-button">
										<Box variant="div" className="icon" style={styles.orgIcon}></Box>
										<Typography variant="span">Organisation</Typography>
									</Link>
								</Grid>
							</Grid>
							<Typography className="other_option-link" style={{marginTop:"30px"}}>Already have an account?
									<NavLink to="/login">
											<span style={{marginLeft:"4px"}}>Login</span>
									</NavLink>
							</Typography>
						</div>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
		</div>
    );
}

export default RegisterAs;