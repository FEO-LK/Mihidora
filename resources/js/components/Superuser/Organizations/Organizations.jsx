import React, { useState, useEffect } from "react";
import { IconButton, Menu, MenuItem, Select, FormControl, InputLabel, ListItemIcon, TextField } from "@mui/material";
import MainLayout from "../BaseLayout";
import axios from 'axios';
import swal from 'sweetalert';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Organizations() {

    const columns = [
        { field: 'organization', headerName: 'Organization', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'reg', headerName: 'Registration', flex: 1 },
        { field: 'size', headerName: 'Size', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 1 },
        { field: 'joined', headerName: 'Joined', flex: 1 },
        {
            field: 'actions', headerName: '', flex: 1,
            renderCell: (params) => {
                return (
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <div className="action-button-div">
                            <IconButton
                                aria-controls="select-menu"
                                aria-haspopup="true"
                                onClick={handleOpenMenu}
                                color="primary"
                            >
                                <MoreVertIcon sx={{ color: '#85a129' }} />
                            </IconButton>
                            <Menu
                                id="select-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >
                                <MenuItem onClick={() => handleOptionSelect('Option 1')}>
                                    <ListItemIcon>
                                        <EditIcon />
                                    </ListItemIcon>
                                    Update
                                </MenuItem>
                                <MenuItem onClick={() => handleOptionSelect('Option 2')}>
                                    <ListItemIcon>
                                        <DeleteIcon />
                                    </ListItemIcon>
                                    Remove
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                );
            }
        },
    ];

    const rows = [
        { id: 1, organization: 'Organization', type: 'Academia', reg: '123456789', size: '11 - 30', email: 'organization@feo.lk', phone: '0112938475', joined: '2023-02-23 07:33:22' },
        { id: 2, organization: 'Organization', type: 'Academia', reg: '123456789', size: '11 - 30', email: 'organization@feo.lk', phone: '0112938475', joined: '2023-02-23 07:33:22' },
    ];


    const [selectedOption, setSelectedOption] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        handleCloseMenu();
    };

    return (
        <MainLayout>
            <DataGrid
                rows={rows}
                slots={{ toolbar: GridToolbar }}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </MainLayout>
    )
}

export default Organizations;