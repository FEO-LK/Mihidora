import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import MainLayout from "../BaseLayout";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { Unsubscribe } from "@mui/icons-material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
// import StorageCounter from './components/StorageCounter';

const styles = {
    cell: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    subscribed: {
        backgroundColor: '#93aa40',
        '& .MuiChip-deleteIcon': {
            color: '#ffffff',
        },
        '& .MuiChip-label': {
            color: '#ffffff',
        }
    },
    unsubscribed: {
        backgroundColor: '#ebebeb',
    }
}

const labels = {
    projects: 'Projects',
    data: 'Data',
    jobs: 'Jobs',
    elearning: 'E-Learning',
    events: 'Events',
    grants: 'Grants & RFPs',
    suppliers: 'Suppliers',
    resources: 'Resources',
}

function Subscriptions() {

    const [subscriptions, setSubscriptions] = useState({
        topics: []
    });
    const [loaders, setLoaders] = useState({
        topicList: true,
        update: false,
    });
    const [errors, setErrors] = useState({
        topicList: false,
        update: false,
        message: ''
    });
    const [state, setState] = useState({
        topics: []
    });
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const data = {
            'user_id': localStorage.getItem('auth_id')
        };
        getSubscriptions(data);
    }, [localStorage.getItem('auth_id')]);

    //API calls
    const unSubscribe = (data) => {
        setLoaders({ ...loaders, update: true });
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/unsubscribe', data).then(res => {
                console.log(res)
                if (res.status == 200) {
                    getSubscriptions({ 'user_id': localStorage.getItem('auth_id') });
                } else {
                    setLoaders({ ...loaders, update: false, message: 'An error occurred, please try again!' });
                }
            });
        });
    }
    
    const subscribe = (data) => {
        setLoaders({ ...loaders, update: true });
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/subscribe', data).then(res => {
                console.log(res)
                if (res.status == 200) {
                    getSubscriptions({ 'user_id': localStorage.getItem('auth_id') });
                } else {
                    setLoaders({ ...loaders, update: false, message: 'An error occurred, please try again!' });
                }
            });
        });
    }

    const getSubscriptions = (data) => {
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/get-subscriptions', data).then(res => {
                console.log(res)
                if (res.status == 200) {
                    setState({ topics: res.data.subscription });
                    setLoaders({ ...loaders, topicList: false, update: false });
                } else {
                    setLoaders({ ...loaders, topicList: false, update: false, message: 'There was an error loading the subscriptions!' });
                }
            });
        });
    }

    const handleUnsubscribe = (data) => {
        console.info(data);
        console.log(subscriptions);
        unSubscribe({
            'user_id': localStorage.getItem('auth_id'),
            'topic': data
        });
    };

    const handleSubscribe = (data) => {
        console.info(data);
        console.log(subscriptions);
        subscribe({
            'user_id': localStorage.getItem('auth_id'),
            'topic': data
        });
    };

    const handleClose = () => setOpen(false);

    return (
        <MainLayout>
            <Typography style={{ color: '#535353', fontSize: 17, fontWeight: 600, margin: '0 0 15px' }}>Subscriptions & Notifications</Typography>
            <Typography sx={{ fontSize: '12px' }} mt={1} mb={3}>Subscribed to topics you are interested and get notified when new content is added</Typography>
            {loaders.topicList ?
                [0, 1, 2, 3, 4, 5, 6, 7, 8.9].map((data) => (
                    <Container>
                        <Grid container mb={3} spacing={2}>
                            <Grid item xs={2}>
                                <Skeleton animation="wave" />
                            </Grid>
                            <Grid item xs={3}>
                                <Skeleton animation="wave" ml={3} />
                            </Grid>
                        </Grid>
                    </Container>
                ))

                : ""}
            <Container>
                {state.topics.map((data, key) => (
                    <Grid container mb={3} key={key}>
                        <Grid item xs={2} sx={styles.cell}>
                            <Typography sx={{ fontSize: '12px' }}> {labels[data.topic]} </Typography>
                        </Grid>
                        <Grid item>
                            {data.subscribed ? <Chip
                                sx={styles.subscribed}
                                label="Subscribed"
                                onClick={() => handleUnsubscribe(data.topic)}
                                onDelete={() => handleUnsubscribe(data.topic)}
                                deleteIcon={<DoneIcon />}
                            /> :
                                <Chip
                                    sx={styles.unsubscribed}
                                    label="Subscribe "
                                    onClick={() => handleSubscribe(data.topic)}
                                    onDelete={() => handleSubscribe(data.topic)}
                                    deleteIcon={<NotificationsOffIcon />}
                                />
                            }

                        </Grid>
                    </Grid>
                ))}
            </Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loaders.update}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </MainLayout>
    )
}

export default Subscriptions