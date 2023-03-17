import React, { useEffect, useState } from "react";
import {Container, Grid, Typography, CardActions, CardContent, CardMedia, Button, TextField,  } from "@mui/material";
import { Link } from "react-router-dom";
import BaseLayout from "../BaseLayout";
import PageBanner from "../components/PageBanner";

import bannerImage from "../../../../images/aboutBanner.jpg";
import MenuTab from "./MenuTab";
import FilterSideBar from "./FilterSideBar";

function Whatson() {
	const [projectList, setProjectList] = useState([]);
	const [searchEvent, setSearchEvent] = useState([]);

	useEffect(() => {
        getProjectList();

    }, []);

    const getProjectList = () => {
        axios.get(`/api/projects`).then(res => {
            if(res.data.status === 200) {
                setProjectList(res.data.projects);
            }
        });
    }

    const eventSearchInput = (e) => {
        e.persist();
        setSearchEvent(e.target.value);
    }

    const addYourEventBtn = () => {
        if(localStorage.getItem('user_role') == 2) {
            return <Link to={'/dashboard'} className="theme-btn small-btn add_event-btn">Add your event</Link>
        }else if(localStorage.getItem('user_role') == 1){
           
        }else {
            return <Link to={'/login'} className="theme-btn small-btn add_event-btn">Add your event</Link>
        }
    }

    return (
        <BaseLayout title={"Whats On"}>
            <Container className="whatson-list">
                <Grid container>
                    <Grid item sm={12}>
                        <MenuTab />
                    </Grid>
                    <Grid item sm={12} md={3}>
                        <FilterSideBar />
                    </Grid>
                    <Grid item sm={12} md={9} className="list-wrap">
                        <Grid container spacing={2} className="search_bar">
                            <Grid item sm={12} md={9}>
                                <TextField
                                    type='text'
                                    name="search_event"
                                    size="small"
                                    placeholder="Search Event"
                                    onChange={eventSearchInput}
                                    value={searchEvent}></TextField>
                                <Button
                                    fullWidth
                                    variant={"outlined"}
                                    type={"button"}
                                    className="theme-btn ligth-btn small-btn">
                                    Search
                                </Button>
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <Link to={'/'} className="theme-btn small-btn add_event-btn">{addYourEventBtn()}</Link>
                            </Grid>
                        </Grid>
                        <div className="promo-banner" style={{margin: '20px 0 0'}}>
                            <PageBanner image={bannerImage}/>
                        </div>
                        <Grid container spacing={2}>
                            <Grid item sm={12} md={12}>
                                <Typography variant="span" className="item-count">Showing 23 Events.</Typography>
                            </Grid>
                            {projectList.map((row) => (
                                <Grid item key={row.id} xs={4} className="organization_card" >
                                    <div class="card-img">
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            //image="../../../images/project.jpg"
                                            image={JSON.parse(row.uploads)[0]? '/storage/'+ JSON.parse(row.uploads)[0] : "../../../images/project.jpg"}
                                            alt="Whats on"
                                        />
                                        <Typography variant="span" className="event_date">Today at 5.30 PM</Typography>
                                    </div>
                                    <CardContent className="card_content">
                                        <Typography variant="h5" className="org_title">
                                            {row.project_title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                            species, ranging across all continents except Antarctica
                                        </Typography>
                                        <Typography className="venue">Hikkaduwa, Galle</Typography>
                                        <CardActions className="card_action">
                                            <Link to={`/project/${row.id}`} className="theme-btn">Find Out More</Link>
                                            {/* {showRequestBtn(row.id)} */}
                                        </CardActions>
                                    </CardContent>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </BaseLayout>
    )
}

export default Whatson
