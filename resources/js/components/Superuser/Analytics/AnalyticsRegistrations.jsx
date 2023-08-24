import React, { useState, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Grid, Card, CardContent, Typography, FormControl, Select, MenuItem, InputLabel, TextField, Button } from '@mui/material';
import MainLayout from "../BaseLayout";
import axios from 'axios';
import swal from 'sweetalert';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { BarChart } from '@mui/x-charts/BarChart';

function Registrations() {

    const [state, setState] = useState({
        dateRange: '',
    });

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleStartDateChange = (newDate) => {
        setStartDate(newDate);
    };

    const handleEndDateChange = (newDate) => {
        setEndDate(newDate);
    };

    const renderInput = (props) => (
        <TextField {...props} variant="outlined" size="small" fullWidth />
    );

    return (
        <Box sx={{ width: '100%', typography: 'body1' }} className="admin_forms">
            <Grid container spacing={5}>
                <Grid item xs={2}>
                    <Card variant="outlined" sx={{ border: '2px solid #8FA93B' }}>
                        <CardContent sx={{ pb: 0 }}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#8FA93B' }}>
                                <b>332</b>
                            </Typography>
                            <Typography variant="body1">
                                Total Registrations
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card variant="outlined" sx={{ border: '2px solid #8FA93B' }}>
                        <CardContent sx={{ pb: 0 }}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#8FA93B' }}>
                                <b>30</b>
                            </Typography>
                            <Typography variant="body1">
                                This Month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card variant="outlined" sx={{ border: '2px solid #8FA93B' }}>
                        <CardContent sx={{ pb: 0 }}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#8FA93B' }}>
                                <b>12</b>
                            </Typography>
                            <Typography variant="body1">
                                This Week
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Box sx={{ mt: 7 }}>
                <Typography variant="body1" sx={{ mb: 3 }}>New Registrations</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Date Range</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name="dateRange"
                                value={state.dateRange}
                                label="Date Range"
                                onChange={handleChange}
                                sx={{
                                    '& .MuiBackdrop-root': {
                                        '&.Mui-focused': {
                                            color: '#93aa40'
                                        }
                                    }
                                }}
                            >
                                <MenuItem value={'Last 7 days'}>Last 7 days</MenuItem>
                                <MenuItem value={'Last 30 days'}>Last 30 days</MenuItem>
                                <MenuItem value={'Last 6 months'}>Last 6 months</MenuItem>
                                <MenuItem value={'Last 1 year'}>Last 1 year</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={2}>
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

                    <Grid item xs={2}>
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
            </Box>
        </Box>
    )
}

export default Registrations;