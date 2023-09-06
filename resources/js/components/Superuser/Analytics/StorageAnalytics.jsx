import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from '@mui/material';
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
                text: 'Storage Usage By Users',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [10, 12, 0, 3, 13, 1, 2],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
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
        title: 'Storage Usage By Users'
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
        getStorageByUser();
    }, []);

    const getStorageByUser = () => {
        axios.get(`/api/get-users-files`).then(res => {
            if (res.data.status === 200) {
                setChartConfig({
                    ...chartConfig,
                    labels: res.data.usage.map((user) => {
                        return user.name
                    }),
                    datasets: [
                        {
                            label: 'Storage Usage in Mb',
                            data: res.data.usage.map((user) => {
                                return user.total_storage_mb
                            }),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }]
                })
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