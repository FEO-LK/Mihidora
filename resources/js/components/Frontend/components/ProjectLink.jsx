import React from "react";
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';


const styles = {
    boxLayout: {
        textAlign: 'center'
    },
    linkText: {
        fontSize: '12px'
    }
}

function ProjectLink(props) {

    return (
        <Link to={props.link} className="iconLink">
        <Box style={styles.boxLayout}>
            <div className={props.visited ? 'iconWrapperVisited' : 'iconWrapperActive'}>
                {/* <NaturePeopleIcon fontSize="small" className="iconActive" /> */}
                { props.icon }
            </div>
            <Typography sx={styles.linkText}>{props.name}</Typography>
        </Box>
        </Link>
    )
}

export default ProjectLink