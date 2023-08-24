import React, { useState, useEffect } from "react";
import { IconButton, Menu, MenuItem, Select, FormControl, InputLabel, ListItemIcon, TextField } from "@mui/material";
import MainLayout from "../BaseLayout";
import axios from 'axios';
import swal from 'sweetalert';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function Projects() {

    const columns = [
        { field: 'project', headerName: 'Project', flex: 1 },
        { field: 'location', headerName: 'Location', flex: 1 },
        { field: 'tags', headerName: 'Tags', flex: 1,
        renderCell: (params) => (
            <ul style={{paddingLeft: '0'}}>
              {params.value.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          ),
         },
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
                                        <RemoveCircleIcon />
                                    </ListItemIcon>
                                    Unpublish
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
        { id: 1, project: 'Project 1', location: 'Colombo', tags: ['#Flora', '#Water'] },
        { id: 2, project: 'Project 2', location: 'Kandy', tags: ['#Flora', '#Water'] },
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

export default Projects;