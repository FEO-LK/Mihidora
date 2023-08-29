import React, { useState, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Grid, Card, CardContent, Typography, FormControl, Select, MenuItem, InputLabel, TextField, Button } from '@mui/material';
import MainLayout from "../BaseLayout";
import axios from 'axios';
import swal from 'sweetalert';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { BarChart } from '@mui/x-charts/BarChart';
import Autocomplete from '@mui/material/Autocomplete';

const styles = {
    numbers: {
        '& .MuiPaper-root': {
            borderRadius: '16px'
        }
    },
    counterText: {
        fontSize: '12px'
    }
}

function AnalyticsSubmissions() {

    const [state, setState] = useState({
        organization: 1,
        start: Dayjs().subtract(30, 'day'),
        end: Dayjs(),
    });
    const [organizations, setOrganizations] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleFilter = () => {
        console.log(state);
    }

    //API calls
    const loadOrganizations = () => {

    }

    // input handlers
    const handleOrganizationSelect = (e) => {
        setState({
            ...state,
            organization: e.target.value
        });
    }
    const handleStartDateChange = (newDate) => {
        setState({
            ...state,
            start: newDate,
        });
    };
    const handleEndDateChange = (newDate) => {
        setState({
            ...state,
            end: newDate
        });
    };

    const renderInput = (props) => (
        <TextField {...props} variant="outlined" size="small" fullWidth />
    );

    return (
        <Box sx={{ width: '100%', typography: 'body1' }} className="admin_forms">
            <Grid container spacing={2}>
                <Grid item xs={2} sx={styles.numbers}>
                    <Card variant="outlined" sx={{ border: '2px solid #8FA93B' }}>
                        <CardContent sx={{ padding: 1 }}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#8FA93B', mb: 0 }}>
                                <b>332</b>
                            </Typography>
                            <Typography variant="subtitle" sx={styles.counterText}>
                                Total Registrations
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2} sx={styles.numbers}>
                    <Card variant="outlined" sx={{ border: '2px solid #8FA93B' }}>
                        <CardContent sx={{ padding: 1 }}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#8FA93B', mb: 0 }}>
                                <b>30</b>
                            </Typography>
                            <Typography variant="subtitle" sx={styles.counterText}>
                                This Month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2} sx={styles.numbers}>
                    <Card variant="outlined" sx={{ border: '2px solid #8FA93B' }}>
                        <CardContent sx={{ padding: 1, paddingBottom: '5px' }}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#8FA93B', mb: 0 }}>
                                <b>12</b>
                            </Typography>
                            <Typography variant="subtitle" sx={styles.counterText}>
                                This Week
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>

                </Grid>
            </Grid>

            <Box sx={{ mt: 7 }}>
                <Typography variant="body1" sx={{ mb: 3 }}>Submissions By Organization</Typography>

                <Grid container spacing={2} columns={16}>
                    <Grid item xs={3}>
                        <FormControl size="small" fullWidth>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                value={state.organization}
                                defaultValue={[]}
                                getOptionLabel={(option) => option.org_name}
                                options={organizations}
                                sx={{ 
                                    paddingTop: '0px',
                                    paddingBottom: '0px',
                                    '& .MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input':{
                                        padding: '0px 4px 0px 5px'
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} label="Organizations" />}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                renderInput={renderInput}
                                label="Start Date"
                                size="small"
                                value={state.start}
                                onChange={(newValue) => handleStartDateChange(newValue)}
                                inputFormat="DD/MM/YYYY"
                                disableFuture
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                renderInput={renderInput}
                                label="End Date"
                                value={state.end}
                                onChange={(newValue) => handleEndDateChange(newValue)}
                                inputFormat="DD/MM/YYYY"
                                minDate={state.start}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item style={{ display: "flex", alignItems: "center" }}>
                        <Button className="update-button" sx={{ ml: 2 }} onClick={handleFilter} >Filter</Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mt: 1 }}>
                <BarChart
                    xAxis={[
                        {
                            id: 'barCategories',
                            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            scaleType: 'band',
                        },
                    ]}
                    yAxis={[
                        { label: 'Total', }
                    ]}
                    series={[
                        {
                            data: [2, 5, 3, 8, 1, 9, 4, 7, 2, 5, 3, 7],
                        },
                    ]}
                    width={700}
                    height={500}
                    sx={{
                        '& .MuiBarElement-root': {
                            fill: '#5e7f3c'
                        }
                    }}
                />
            </Box>

            {/* <Box sx={{ mt: 7 }}>
                <Typography variant="body1" sx={{ mb: 3 }}>Submissions By Organisation & Individual</Typography>

                <Grid container spacing={2} columns={16}>
                    <Grid item xs={3}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Organization</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name="organization"
                                value={state.organization}
                                label="Organization"
                                onChange={handleChange}
                                sx={{
                                    '& .MuiBackdrop-root': {
                                        '&.Mui-focused': {
                                            color: '#93aa40'
                                        }
                                    }
                                }}
                            >
                                <MenuItem value={'Organization 1'}>Organization 1</MenuItem>
                                <MenuItem value={'Organization 2'}>Organization 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Individual</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name="individual"
                                value={state.individual}
                                label="Individual"
                                onChange={handleChange}
                                sx={{
                                    '& .MuiBackdrop-root': {
                                        '&.Mui-focused': {
                                            color: '#93aa40'
                                        }
                                    }
                                }}
                            >
                                <MenuItem value={'Individual 1'}>Individual 1</MenuItem>
                                <MenuItem value={'Individual 2'}>Individual 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                renderInput={renderInput}
                                label="Start Date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                inputFormat="DD/MM/YYYY"
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                renderInput={renderInput}
                                label="End Date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                inputFormat="DD/MM/YYYY"
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item style={{ display: "flex", alignItems: "center" }}>
                        <Button className="update-button" sx={{ ml: 2 }}>Filter</Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mt: 1 }}>
                <BarChart
                    xAxis={[
                        {
                            id: 'barCategories',
                            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            scaleType: 'band',
                        },
                    ]}
                    yAxis={[
                        { label: 'Total', }
                    ]}
                    series={[
                        {
                            data: [2, 5, 3, 8, 1, 9, 4, 7, 2, 5, 3, 7],
                        },
                    ]}
                    width={700}
                    height={500}
                    sx={{
                        '& .MuiBarElement-root': {
                            fill: '#5e7f3c'
                        }
                    }}
                />
            </Box> */}
        </Box>
    )
}

export default AnalyticsSubmissions;