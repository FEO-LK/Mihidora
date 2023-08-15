import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import MainLayout from "../BaseLayout";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
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

const columns = [
    { field: 'organization',headerName: 'Organization', flex: 1},
    { field: 'reg', headerName: 'Registration', flex: 1 },
    { field: 'contact', headerName: 'Contact Person', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'joined',headerName: 'Joined', flex: 1},
    { field: 'reviewed',headerName: 'Reviewed On', flex: 1},
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
  };

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}

function RejectedUsers() {

    const [UserList, setUserList] = useState([
            { id: 1, organization: '', type: '', reg: '', contact: '', email: '', phone:'', joined:'' },
            { id: 2, organization: '', type: '', reg: '', contact: '', email: '', phone:'', joined:'' },
            { id: 3, organization: '', type: '', reg: '', contact: '', email: '', phone:'', joined:'' },
    ]);
    const [Loading, setLoading] = useState([true]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selected, setSelected] = useState({});
    const [actionLoader, setActionLoader] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const orgTypes = [
        'None',
        'CSO/NGO',
        'Academia',
        'Research Institution',
        'Private sector',
        'Media',
        'Donor'
    ];

      useEffect(() => {
            getAllUsers();
        }, []);

    const getAllUsers = () => {
        axios.get('/api/view-rejected-accounts').then(res => {
        if(res.status == 200) {
            setLoading(false);
            console.log(res.data);
            let users = res.data.accounts.map((user) => {
                return { 
                    id: user.id,
                    organization: user.org_name,
                    reg: user.reg_number,
                    contact: user.name,
                    email: user.email,
                    phone: user.contact_number,
                    joined: user.created_at,
                    user_id: user.user_id,
                    reviewed: user.reviewed_on
                 };
            });
            setUserList(users);
            
        }
        });
    }

    const handleCellClick = (e) => {
        console.log(e);
        setSelected(e.row);
        handleOpen();
        // row.contact,email,id,joined,organization,phone,reg,type
    }

    const handleApprove = (organization) => {
        console.log(selected);
        setActionLoader(true);
        axios.put(`/api/activate-account/${selected.user_id}`).then(res => {
            if (res.data.status === 200) {
                setActionLoader(false);
                setOpen(false);
                setSuccessMessage('User Approved!')
                setSuccess(true);
                getAllUsers();
            }
            else if (res.data.status === 422) {
                setErrorMessage(res.data.errors);
                setError(true);
            }
            else {
                setErrorMessage(res.data.errors);
                setError(true);
            }
        });
    }

    const handleReject = (organization) => {
        console.log(selected);
        setActionLoader(true);
        const data = {
            user_id: selected.user_id,
            organization_id : selected.id,
        };
        axios.post(`/api/remove-account`, data).then(res => {
            if (res.data.status === 200) {
                setActionLoader(false);
                setOpen(false);
                setSuccessMessage('User Removed!')
                setSuccess(true);
                getAllUsers();
            }
            else if (res.data.status === 422) {
                setErrorMessage(res.data.message);
                setError(true);
            }
            else {
                setErrorMessage(res.data.message);
                setError(true);
            }
        });
    }

    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSuccess(false);
      };

    const handleErrorNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
        setError(false);
    };

    return (
        <Box>
            <DataGrid
                rows={UserList}
                sx={{
                    '& .MuiButton-root': {
                        textTransform: 'capitalize'
                    }
                }}
                slots={{ toolbar: GridToolbar }}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 20, { value: UserList.length > 0 ? UserList.length : 1, label: 'All' }]}
                loading={Loading}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                { actionLoader ? 
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                        onClick={handleClose}
                    >
                        <CircularProgress color="success" />
                    </Backdrop>
                :  ''
                }

                <Card sx={{ maxWidth: 345 }} className="card-on-modal">
                    <CardContent>
                        <Typography variant="caption" display="block" style={{ marginTop:'24px', fontWeight:700 }}>
                            Organization
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" component="div">
                        {selected.organization}
                        </Typography>
                        <Divider />
                        
                        <Typography variant="caption" display="block" style={{ marginTop:'24px', fontWeight:700 }}>
                            Type
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" component="div">
                        {selected.type}
                        </Typography>
                        <Divider />
                        
                        <Typography variant="caption" display="block" style={{ marginTop:'24px', fontWeight:700 }}>
                            Registration Number
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" component="div">
                        {selected.reg}
                        </Typography>
                        <Divider />


                        <Typography variant="caption" display="block" style={{ marginTop:'24px', fontWeight:700 }}>
                            Contact Person
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {selected.contact}
                        </Typography>
                        <Divider />

                        <Typography variant="caption" display="block" style={{ marginTop:'24px', fontWeight:700 }}>
                            Email
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {selected.email}
                        </Typography>
                        <Divider />

                        <Typography variant="caption" display="block" style={{ marginTop:'24px', fontWeight:700 }}>
                            Mobile
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {selected.phone}
                        </Typography>
                        <Divider />

                        <Typography variant="caption" display="block" style={{ marginTop:'24px', fontWeight:700 }}>
                            Joined on
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {selected.joined}
                        </Typography>


                    </CardContent>
                    <CardActions className="verificationModalActions">
                        <Button className='admin-button-generic' onClick={handleReject} variant="outlined" color="error" size="small">Reject</Button>
                        <Button className='admin-button-generic admin-button-green' onClick={handleApprove} variant="contained" color="success" size="small">Approve</Button>
                    </CardActions>
                    </Card>
                
                </Box>
            </Modal>

            <Snackbar 
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
                open={success} autoHideDuration={5000} 
                onClose={handleNotificationClose}
                TransitionComponent={SlideTransition}
                key="Slide">
                <Alert onClose={handleNotificationClose} severity="success" sx={{ width: '100%' }}>
                    { successMessage }
                </Alert>
            </Snackbar>
            
            <Snackbar 
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
                open={error} autoHideDuration={5000} 
                onClose={handleErrorNotification}
                TransitionComponent={SlideTransition}
                key="Slide">
                <Alert onClose={handleErrorNotification} severity="error" sx={{ width: '100%' }}>
                    { errorMessage }
                </Alert>
            </Snackbar>

        </Box>
    )
}

export default RejectedUsers