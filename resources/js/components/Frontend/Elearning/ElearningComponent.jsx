import React, {useEffect, useState} from 'react';
import {CardContent, CardMedia, Grid, Typography} from "@mui/material";

const ElearningComponent = (props) => {
    const { row, key } = props;

    const [organizationName, setOrganizationName] = useState('');

    const getOrganizationName = () => {
        axios.get(`/api/organization-name/${row.user_id}`).then(res => {
            if(res.data.status === 200) {
                setOrganizationName(res.data.organization[0].org_name);
            }
        });
    }

    useEffect(() => {
        getOrganizationName();
    },[]);


    return (
        <Grid item key={key} xs={4} className="organization_card">
            <div class="card-img">
                <CardMedia
                    component="img"
                    height="140"
                    //image={`/storage/`+JSON.parse(row.photos)}
                    image={JSON.parse(row.uploads)[0]? '/storage/'+ JSON.parse(row.uploads)[0] : "../../../images/project.jpg"}
                    alt="green iguana"
                />
            </div>
            <CardContent className="card_content">
                <Typography
                    variant="h5"
                    className="org_title"
                    style={{cursor:'pointer'}}
                    onClick={() => props.handleClick(row?.slug)}
                >
                    {row.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {row.overview}
                </Typography>
                <Typography className="org_name">{organizationName}</Typography>
            </CardContent>
        </Grid>
    )
};

export default ElearningComponent;
