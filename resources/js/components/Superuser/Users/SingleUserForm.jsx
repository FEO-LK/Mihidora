import React, { useState, useEffect } from "react";
import { Grid, Typography, FormGroup, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import MainLayout from "../BaseLayout";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const styles = {
    grid: {
        marginTop: '10px',
    }
};

function SingleUserForm(props) {
    const pageParams = useParams();
    const [user, setUser] = useState({
        errorList: {
            name: { status: false, message: '' },
            email: { status: false, message: '' },
            orgName: { status: false, message: '' },
            regNumber: { status: false, message: '' },
            description: { status: false, message: '' },
            orgSize: { status: false, message: '' },
            website: { status: false, message: '' },
            address: { status: false, message: '' },
        }
    });

    useEffect(() => {
        console.log(props.id);
    }, [pageParams.id]);

    const updateMember = (e) => {
        e.preventDefault();
        console.log('updated');
    }

    return (
        <Grid container style={styles.grid}>
            <div className="form_wrap admin_forms" style={{ margin: 'auto', padding: "0 25px", width: '100%' }}>
                <Box component={"form"} encType={"multipart/form-data"} onSubmit={updateMember}>
                    <Grid item lg={6}>
                        <FormGroup className="form-group">
                            <TextField
                                error={user.errorList.name.status}
                                type="text"
                                id="standard-error-helper-text"
                                label="Name"
                                name="name"
                                required
                                defaultValue="Name"
                                helperText={user.errorList.name.message}
                                variant="standard"
                            />
                        </FormGroup>
                        <FormGroup className="form-group">
                            <TextField
                                error={user.errorList.email.status}
                                type="email"
                                id="standard-error-helper-text"
                                label="Email"
                                name="email"
                                required
                                defaultValue="Email"
                                helperText={user.errorList.email.message}
                                variant="standard"
                            />
                        </FormGroup>
                        <Typography variant="subtitle1" gutterBottom sx={{ marginTop: '20px' }}>
                            Organization Details
                        </Typography>
                        <Divider sx={{ marginBottom: '20px' }} />
                        <FormGroup className="form-group">
                            <TextField
                                error={user.errorList.orgName.status}
                                type="text"
                                id="standard-error-helper-text"
                                label="Organisation Name"
                                name="orgName"
                                required
                                defaultValue="Organisation Name"
                                helperText={user.errorList.orgName.message}
                                variant="standard"
                            />
                        </FormGroup>
                        <FormGroup className="form-group">
                            <TextField
                                error={user.errorList.regNumber.status}
                                type="text"
                                id="standard-error-helper-text"
                                label="Registration Number"
                                name="regNumber"
                                required
                                defaultValue="Registration Number"
                                helperText={user.errorList.regNumber.message}
                                variant="standard"
                            />
                        </FormGroup>
                        <FormGroup className="form-group">
                            <TextField
                                error={user.errorList.description.status}
                                type="text"
                                id="standard-error-helper-text"
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                defaultValue="Description"
                                helperText={user.errorList.description.message}
                                variant="standard"
                            />
                        </FormGroup>
                        <FormGroup className="form-group">
                            <TextField
                                error={user.errorList.address.status}
                                type="text"
                                id="standard-error-helper-text"
                                label="Address"
                                name="website"
                                required
                                defaultValue="Address"
                                helperText={user.errorList.address.message}
                                variant="standard"
                            />
                        </FormGroup>
                        <FormGroup className="form-group">
                            <TextField
                                error={user.errorList.website.status}
                                type="text"
                                id="standard-error-helper-text"
                                label="Website"
                                name="website"
                                required
                                defaultValue="Registration Number"
                                helperText={user.errorList.website.message}
                                variant="standard"
                            />
                        </FormGroup>
                        <Button
                            fullWidth
                            variant={"outlined"}
                            type={"submit"}
                            className="form-submit-button"
                        >
                            Update Profile
                        </Button>

                    </Grid>
                    <Grid item lg={6}>

                    </Grid>
                </Box>
            </div>
        </Grid>
    )
}

export default SingleUserForm