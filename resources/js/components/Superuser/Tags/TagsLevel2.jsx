import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



function TagsLevel2() {

    const [level, setLevel] = useState('');
    const handleChange = (event) => {
        console.log(event.target.value);
        setLevel(event.target.value);
    };

    const [level1, setLevel1] = useState([]);

    const columns = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'slug', headerName: 'Slug', flex: 1 },
        {
            field: 'weight', headerName: 'Weight', flex: 1,
            width: 150, minWidth: 150, maxWidth: 150,
            renderCell: (params) => {
                return <TextField
                    name={params.value.id}
                    defaultValue={params.value.weight}
                    id="outlined-basic"
                    onChange={(e) => {
                        handleInput(e);
                    }}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }} />;
            }
        },
        {
            field: 'update', headerName: '', flex: 1,
            renderCell: (params) => {
                return <Button value={params.value} className="update-button" onClick={(e) => {
                    updateWeight(e);
                }}>Update</Button>;
            }
        },
    ];

    const [tagList, setTagList] = useState([]);
    const [Loading, setLoading] = useState([true]);
    const [input, setInput] = useState({
        tag_id: '',
        weight: ''
    });
    const [status, setStatus] = useState({
        status: false,
        type: 'success',
        message: '',
    });
    useEffect(() => {
        getL1Tags();
        getTags();
    }, []);
    const handleInput = (e) => {
        e.persist();
        setInput({
            tag_id: e.target.name,
            weight: e.target.value
        })
    }
    const updateWeight = (e) => {
        e.preventDefault();
        console.log(input);
        const data = {
            "tag_id": input.tag_id,
            "weight": input.weight
        };
        console.log(data);
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/update-weight', data).then(res => {
                console.log(res)
                if (res.status == 200) {
                    setStatus({ ...status, status: true, type: 'success', message: 'Tag updated!' });
                    getTags();
                } else {
                    setStatus({ ...status, status: true, type: 'error', message: res.data.message });
                }
            });
        });
    }

    const getTags = () => {
        const data = {
            'level': 2
        };
        axios.post('/api/get-tags', data).then(res => {
            if (res.status == 200) {
                setLoading(false);
                console.log(res.data);
                let tags = res.data.tags.map((tag) => {
                    return {
                        id: tag.id,
                        name: tag.name,
                        slug: tag.slug,
                        weight: { weight: tag.weight, id: tag.id },
                        update: { weight: tag.weight, id: tag.id },
                    };
                });
                setTagList(tags);
            }
        });
    }

    const getL1Tags = () => {
        const data = {
            'level': 1
        };
        axios.post('/api/get-tags', data).then(res => {
            if (res.status == 200) {
                // setLoading(false);
                console.log(res.data);
                let l1tags = res.data.tags.map((tag) => {
                    return {
                        id: tag.id,
                        name: tag.name,
                        slug: tag.slug,
                        weight: { weight: tag.weight, id: tag.id },
                        update: { weight: tag.weight, id: tag.id },
                    };
                });
                setLevel1(l1tags);
            }
        });
    }

    const handleErrorNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setStatus({ ...status, status: false, type: 'success', message: '' });
    };

    const filterTags = () => {
        let data = {
            'level': 2,
            'parent': level
        };
        if(level === '-1'){
            data = {
                'level': 2,
            };  
        }
        console.log(data);
        axios.post('/api/get-tags', data).then(res => {
            if (res.status == 200) {
                // setLoading(false);
                let tags = res.data.tags.map((tag) => {
                    return {
                        id: tag.id,
                        name: tag.name,
                        slug: tag.slug,
                        weight: { weight: tag.weight, id: tag.id },
                        update: { weight: tag.weight, id: tag.id },
                    };
                });
                setTagList(tags);
            }
        });
    }
    return (
        <Box className="admin_forms">
            <Grid container sx={{ mb: 2 }}>
                <Grid item>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <Select
                            value={level}
                            onChange={handleChange}
                        >
                            <MenuItem value='-1'>Any</MenuItem>
                            {level1.map((tag) => {
                                return <MenuItem value={tag.id}>{tag.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sx={{ ml: 2 }} style={{ display: "flex", alignItems: "center" }}>
                    <Button className="update-button" onClick={filterTags}>Filter</Button>
                </Grid>
            </Grid>

            <DataGrid
                rows={tagList}
                slots={{ toolbar: GridToolbar }}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                sx={{
                    '& .MuiDataGrid-virtualScroller' : {
                        minHeight:'300px'
                    }
                }}
                loading={Loading}
                pageSizeOptions={[5, 10, 20, { value: tagList.length > 0 ? tagList.length : 1, label: 'All' }]}
            />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={status.status} autoHideDuration={5000}
                onClose={handleErrorNotification}
                TransitionComponent={SlideTransition}
                key="Slide">
                <Alert onClose={handleErrorNotification} severity={status.type} sx={{ width: '100%' }}>
                    {status.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default TagsLevel2;