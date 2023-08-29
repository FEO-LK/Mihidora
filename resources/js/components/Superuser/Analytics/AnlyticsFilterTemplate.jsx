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
import Link from '@mui/material/Link';

const styles = {
    numbers: {
        '& .MuiPaper-root': {
            borderRadius: '16px'
        }
    },
    counterText: {
        fontSize: '12px'
    },
    breakdownBorder: {
        borderBottom: 'solid 2px black'
    },
    noBreakdownBorder: {
        borderBottom: 'none'
    }
}

function Registrations() {
    const [state, setState] = useState({
        duration: '',
        start: Dayjs(),
        end: Dayjs().add(30, 'day'),
        breakdown: 'week'
    });

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDurationSelection = (e) => {
        setState({
            ...state,
            duration: e.target.value
        });
    }

    const handleStartDateChange = (newDate) => {
        let newEnd = newDate.add(7, 'day');
        setState({
            ...state,
            start: newDate,
            end: newEnd
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

    const handleBreakdown = (value) => {
        setState({
            ...state,
            breakdown: value
        });
    }

    const handleFilter = () => {
        console.log(state);
        console.log(state.start.year(), state.start.month(), state.start.date());
        console.log(state.end.year(), state.end.month(), state.end.date());
    }

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
                <Typography variant="body1" sx={{ mb: 3 }}>New Registrations</Typography>

                <Grid container spacing={2} columns={16}>
                    <Grid item xs={3}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name="dateRange"
                                value={state.duration}
                                label="Duration"
                                onChange={handleDurationSelection}
                                sx={{
                                    '& .MuiBackdrop-root': {
                                        '&.Mui-focused': {
                                            color: '#93aa40'
                                        }
                                    }
                                }}
                            >
                                <MenuItem value={7}>Last 7 days</MenuItem>
                                <MenuItem value={30}>Last 30 days</MenuItem>
                                <MenuItem value={90}>Last 6 months</MenuItem>
                                <MenuItem value={360}>Last 1 year</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                renderInput={renderInput}
                                label="Start Date"
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
                    <Grid item style={{ display: "flex", alignItems: "center" }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                typography: 'body1',
                                '& > :not(style) ~ :not(style)': {
                                    ml: 2,
                                },
                            }}
                        >
                            <Link href="#" style={state.breakdown == 'week' ? styles.breakdownBorder : styles.noBreakdownBorder } underline="none" onClick={() => handleBreakdown('week')}>
                                Week
                            </Link>
                            <Link href="#" style={state.breakdown == 'month' ? styles.breakdownBorder : styles.noBreakdownBorder } underline="none" onClick={() => handleBreakdown('month')}>
                                Month
                            </Link>
                            <Link href="#" style={state.breakdown == 'year' ? styles.breakdownBorder : styles.noBreakdownBorder } underline="none" onClick={() => handleBreakdown('year')}>
                                Year
                            </Link>
                        </Box>
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