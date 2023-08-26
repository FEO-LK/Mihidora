import React from "react";
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';

const styles = {
    boxLayout: {
        textAlign: 'center'
    },
    linkText: {
        fontSize: '12px'
    }
}

function ELearningLink(props) {

    return (
        <Link to={props.link} className="iconLink">
        <Box style={styles.boxLayout}>
            <div className="iconWrapperActive">
                <NaturePeopleIcon fontSize="small" className="iconActive" />
            </div>
            <Typography sx={styles.linkText}>Topics</Typography>
        </Box>
        </Link>
    )
}

export default ELearningLink