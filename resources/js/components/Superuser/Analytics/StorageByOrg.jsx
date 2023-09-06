import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography, FormControl, TextField, Button } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Autocomplete from '@mui/material/Autocomplete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

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

export default function SimpleCharts() {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Storage Usage By Organization',
            },
        },
    };
    const [state, setState] = useState({
        organization: {
            "id": 0,
            "org_name": "Organization"
        },
    });
    const [counters, setCounters] = useState({
        total: 0,
    });
    const [organizations, setOrganizations] = useState([]);
    const [chartConfig, setChartConfig] = useState({
        labels: ['-', '-', '-', '-', '-', '-', '-'],
        datasets: [
            {
                label: 'Storage Usage in Mb',
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
        title: 'Storage Usage By Organization'
    })
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
        // load storage usage
        getStorageByOrganization();
        // load org list
        loadOrganizations();
    }, []);

    const handleFilter = () => {
        console.log(state);
        setLoaders({ ...loaders, initialLoad: true });
        getUserStorageByOrganization({organization_id: state.organization.id});
    }

    // API calls
    const getUserStorageByOrganization = (data) => {
        axios.post(`/api/get-storage-by-users-by-org`, data).then(res => {
            if (res.data.status === 200) {
                setChartConfig({
                    ...chartConfig,
                    labels: res.data.user_list.map((user) => {
                        return user.name
                    }),
                    datasets: [
                        {
                            label: 'Storage Usage in Mb',
                            data: res.data.user_list.map((user) => {
                                return user.total_storage_mb
                            }),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }]
                })
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
    const getStorageByOrganization = () => {
        axios.get(`/api/get-storage-by-org`).then(res => {
            if (res.data.status === 200) {
                setChartConfig({
                    ...chartConfig,
                    labels: res.data.usage_by_organization.map((user) => {
                        return user.name
                    }),
                    datasets: [
                        {
                            label: 'Storage Usage in Mb',
                            data: res.data.usage_by_organization.map((user) => {
                                return user.total_storage_mb
                            }),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }]
                })
                setCounters({ total: res.data.total });
                setLoaders({ ...loaders, initialLoad: false });
                console.log(chartConfig);
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

    return (
        <Box sx={{ width: '100%', typography: 'body1' }} className="admin_forms">
            <Grid container spacing={2}>
                <Grid item xs={2} sx={styles.numbers}>
                    <Card variant="outlined" sx={{ border: '2px solid #8FA93B' }}>
                        <CardContent sx={{ padding: 1 }}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#8FA93B', mb: 0 }}>
                                <b>{Math.round((counters.total + Number.EPSILON) * 100) / 100
                                } Mb</b>
                            </Typography>
                            <Typography variant="subtitle" sx={styles.counterText}>
                                Total Storage Usage
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>

                </Grid>
                <Grid item xs={4} sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
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
                    <Button className="update-button" sx={{ ml: 2 }} onClick={handleFilter} >Filter</Button>
                </Grid>

            </Grid>
            <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle" sx={styles.counterText}>
                    {chartConfig.title}
                </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Bar options={options} data={chartConfig} />
            </Box>

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
    );
}