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
                text: 'Storage Usage By Organization',
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [10, 12, 0, 3, 13, 1, 2],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
        title: 'Storage Usage By Organization'
    })

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
        </Box>
    );
}