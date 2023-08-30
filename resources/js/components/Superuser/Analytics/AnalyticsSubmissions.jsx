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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { axisClasses } from '@mui/x-charts';

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
    const [chartConfig, setChartConfig] = useState({
        xAxis: [{ scaleType: 'band', dataKey: 'week' }],
        data: [{
            projects: 0,
            data: 0,
            elearning: 0,
            resources: 0,
            events: 0,
            week: 'Jan',
        }],
        title: '',
        width: '100%',
    })
    const [state, setState] = useState({
        organization: {
            "id": 0,
            "org_name": "Organization"
        },
        start: Dayjs().subtract(30, 'day'),
        end: Dayjs(),
    });
    const [organizations, setOrganizations] = useState([]);
    const [counters, setCounters] = useState({
        projects: 0,
        data: 0,
        elearning: 0,
        resources: 0,
        events: 0,
    });
    const [loaders, setLoaders] = useState({
        initialLoad: true,
        durationLoad: false,
        filterLoad: false,
        breakdownLoad: false,
        loaderState: false,
    });
    const [errors, setError] = useState({
        error: false,
        errorMessage: ''
    });

    useEffect(() => {
        // load submission counts;
        loadSubmissionCounts();
        // load organization list
        loadOrganizations();
    }, []);

    const handleFilter = () => {
        console.log(state);
        let data = {
            start: {
                year: state.start.year(),
                month: state.start.month() + 1, // offset the month number 
                date: state.start.date()
            },
            end: {
                year: state.end.year(),
                month: state.end.month() + 1, // offset the month number 
                date: state.end.date()
            },
            organization_id: state.organization.id,
        }
        console.log(data);
        getSubmissionsByOrganization(data);
    }

    //API calls
    const loadSubmissionCounts = () => {
        axios.get(`/api/get-submission-counts`).then(res => {
            if (res.data.status === 200) {
                setCounters({
                    projects: res.data.projects,
                    data: res.data.data,
                    elearning: res.data.elearning,
                    resources: res.data.resources,
                    events: res.data.events,
                });
                setLoaders({ ...loaders, initialLoad: false });
            } else if (res.data.status === 404) {
                setError({ error: true, errorMessage: res.data.errors });
                setLoaders({ ...loaders, initialLoad: false });
            } else {
                setError({ error: true, errorMessage: res.data.errors });
                setLoaders({ ...loaders, initialLoad: false });
            }
        });
    }
    const getSubmissionsByOrganization = (data) => {
        setLoaders({ ...loaders, initialLoad: true });
        axios.post(`/api/get-submission-by-org-by-week`, data).then(res => {
            if (res.data.status === 200) {
                setChartConfig({
                    ...chartConfig, data: res.data.total.map((submission) => {
                        return {
                            projects: submission.projects,
                            data: submission.data,
                            elearning: submission.elearning,
                            resources: submission.resources,
                            events: submission.events,
                            week: submission.week,
                        }
                    }),
                    title: `Showing submissions from ${state.start.format('DD/MM/YYYY')} to ${state.end.format('DD/MM/YYYY')}`
                })
                setLoaders({ ...loaders, initialLoad: false });
            } else if (res.data.status === 404) {
                console.log(res.data);
                setError({ error: true, errorMessage: res.data.errors });
                setLoaders({ ...loaders, initialLoad: false });
            } else {
                console.log(res.data);
                setError({ error: true, errorMessage: res.data.errors });
                setLoaders({ ...loaders, initialLoad: false });
            }
        });
    }
    const loadOrganizations = () => {
        axios.get(`/api/list-organisations`).then(res => {
            if (res.data.status === 200) {
                setOrganizations(res.data.organizations);
                setLoaders({ ...loaders, initialLoad: false });
            } else if (res.data.status === 404) {
                setError({ error: true, errorMessage: res.data.errors });
                setLoaders({ ...loaders, initialLoad: false });
            } else {
                setError({ error: true, errorMessage: res.data.errors });
                setLoaders({ ...loaders, initialLoad: false });
            }
        });
    }

    // input handlers
    const handleOrganizationSelect = (event, newValue) => {
        setState({
            ...state,
            organization: newValue
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

    // Error message handle
    const handleErrorNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError({ error: false, errorMessage: '' });
    };
    // loading handlers
    const handleClose = () => setLoaders({ ...loaders, loaderState: false });

    // Error notification components
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    function SlideTransition(props) {
        return <Slide {...props} direction="left" />;
    }
    const valueFormatter = (value) => `${value}`;

    return (
        <Box sx={{ width: '100%', typography: 'body1' }} className="admin_forms">
            <Grid container spacing={2}>
                <Grid item xs={2} sx={styles.numbers}>
                    <Card variant="outlined" sx={{ border: '2px solid #8FA93B' }}>
                        <CardContent sx={{ padding: 1 }}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#8FA93B', mb: 0 }}>
                                <b>{counters.projects}</b>
                            </Typography>
                            <Typography variant="subtitle" sx={styles.counterText}>
                                No of Projects
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2} sx={styles.numbers}>
                    <Card variant="outlined" sx={{ border: '2px solid #8FA93B' }}>
                        <CardContent sx={{ padding: 1 }}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#8FA93B', mb: 0 }}>
                                <b>{counters.data}</b>
                            </Typography>
                            <Typography variant="subtitle" sx={styles.counterText}>
                                Data Submissions
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2} sx={styles.numbers}>
                    <Card variant="outlined" sx={{ border: '2px solid #8FA93B' }}>
                        <CardContent sx={{ padding: 1, paddingBottom: '5px' }}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#8FA93B', mb: 0 }}>
                                <b>{counters.elearning}</b>
                            </Typography>
                            <Typography variant="subtitle" sx={styles.counterText}>
                                E-Learning Submissions
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2} sx={styles.numbers}>
                    <Card variant="outlined" sx={{ border: '2px solid #8FA93B' }}>
                        <CardContent sx={{ padding: 1, paddingBottom: '5px' }}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#8FA93B', mb: 0 }}>
                                <b>{counters.resources}</b>
                            </Typography>
                            <Typography variant="subtitle" sx={styles.counterText}>
                                No of Resources
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2} sx={styles.numbers}>
                    <Card variant="outlined" sx={{ border: '2px solid #8FA93B' }}>
                        <CardContent sx={{ padding: 1, paddingBottom: '5px' }}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#8FA93B', mb: 0 }}>
                                <b>{counters.events}</b>
                            </Typography>
                            <Typography variant="subtitle" sx={styles.counterText}>
                                No of Events
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* <Grid item xs>

                </Grid> */}
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
                                onChange={handleOrganizationSelect}
                                defaultValue={[]}
                                getOptionLabel={(option) => option.org_name}
                                options={organizations}
                                sx={{
                                    paddingTop: '0px',
                                    paddingBottom: '0px',
                                    '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
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

            <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle" sx={styles.counterText}>
                    {chartConfig.title}
                </Typography>
            </Box>

            <Box sx={{ mt: 1 }}>
                <BarChart
                    dataset={chartConfig.data}
                    xAxis={[{ scaleType: 'band', dataKey: 'week' }]}
                    colors={['#d4c685', '#f7ef81', '#cfe795', '#a7d3a6', '#add2c2']}
                    series={[
                        { dataKey: 'projects', label: 'Projects', valueFormatter },
                        { dataKey: 'data', label: 'Data', valueFormatter },
                        { dataKey: 'elearning', label: 'E-Learning', valueFormatter },
                        { dataKey: 'resources', label: 'Resources', valueFormatter },
                        { dataKey: 'events', label: 'Events', valueFormatter },
                    ]}
                    yAxis={[
                        { label: 'No of Submissions', }
                    ]}
                    height={600}
                    sx={{
                        width: chartConfig.width,
                        '& .MuiChartsAxis-root.MuiChartsAxis-bottom .MuiChartsAxis-tickLabel, .MuiChartsAxis-root.MuiChartsAxis-bottom .MuiChartsAxis-label': {
                            textAnchor: 'end',
                            transform: 'rotate(-40deg)',
                        },
                        '& .MuiChartsAxis-line': {
                            stroke: '#93aa40'
                        },
                        '& .MuiChartsAxis-tick': {
                            stroke: '#93aa40'
                        },
                        marginLeft: '40px'
                    }}
                    margin={{ top: 80, right: 30, left: 40, bottom: 160 }}
                />

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={errors.error} autoHideDuration={5000}
                    onClose={handleErrorNotification}
                    TransitionComponent={SlideTransition}
                    key="Slide">
                    <Alert onClose={handleErrorNotification} severity="error" sx={{ width: '100%' }}>
                        {errors.errorMessage}
                    </Alert>
                </Snackbar>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loaders.initialLoad}
                    onClick={handleClose}
                >
                    <CircularProgress color="success" />
                </Backdrop>
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