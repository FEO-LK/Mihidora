import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';


function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}


const rows = [
    { id: 1, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 2, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 3, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
    { id: 4, name: 'Lewis Hamilton', slug: 'lewis@mercedesamg.com', weight: 1 },
];

function TagsLevel4() {

    const [l1TagList, setL1TagList] = useState([]);
    const [l2TagList, setL2TagList] = useState([]);
    const [l3TagList, setL3TagList] = useState([]);
    const [tagLoad, setTagLoad] = useState(true);
    const [tagList, setTagLists] = useState([]);
    // Dropdown states
    const [state, setState] = useState({
        level1: '',
        level2: '',
        level3: '',
    })
    // alert states
    const [status, setStatus] = useState({
        status: false,
        type: 'success',
        message: '',
    });
    // row input states
    const [input, setInput] = useState({
        tag_id: '',
        weight: ''
    });

    useEffect(() => {
        loadl1Filters({ 'level': 1 });
        loadTaglist({
            level: 4
        });
    }, []);


    const columns = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'slug', headerName: 'Slug', flex: 1 },
        {
            field: 'weight', headerName: 'Weight', flex: 1,
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

    // handle filter submission 
    const handleFilter = () => {
        console.log(state);
        if (state.level3 === '') {
            setStatus({ ...status, status: true, type: 'error', message: 'Please select Level 3 tag' });
            return;
        }
        loadTaglist({
            level: 4,
            parent: state.level3,
        });
    }

    // loading tags
    const loadTaglist = (data) => {
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/get-tags', data).then(res => {
                console.log(res)
                if (res.status == 200) {
                    let tags = res.data.tags.map((tag) => {
                        return {
                            id: tag.id,
                            name: tag.name,
                            slug: tag.slug,
                            weight: { weight: tag.weight, id: tag.id },
                            update: { weight: tag.weight, id: tag.id },
                        };
                    });
                    setTagLists(tags);
                    setTagLoad(false);
                } else {
                    setStatus({ ...status, status: true, type: 'error', message: 'There was an error loading the tag list' });
                }
            });
        });
    }

    // Loading Filters
    const loadl1Filters = (data) => {
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/get-tags', data).then(res => {
                console.log(res)
                if (res.status == 200) {
                    setL1TagList(res.data.tags);
                    setState({ ...state, level2: '' });
                } else {
                    setStatus({ ...status, status: true, type: 'error', message: res.data.message });
                }
            });
        });
    }
    const loadl2Filters = (data) => {
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/get-tags', data).then(res => {
                console.log(res)
                if (res.status == 200) {
                    setL2TagList(res.data.tags);
                } else {
                    setStatus({ ...status, status: true, type: 'error', message: res.data.message });
                }
            });
        });
    }
    const loadl3Filters = (data) => {
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/get-tags', data).then(res => {
                console.log(res)
                if (res.status == 200) {
                    setL3TagList(res.data.tags);
                } else {
                    setStatus({ ...status, status: true, type: 'error', message: res.data.message });
                }
            });
        });
    }

    // handle tag weight update
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
                    refreshTags();
                } else {
                    setStatus({ ...status, status: true, type: 'error', message: res.data.message });
                }
            });
        });
    }

    const refreshTags = () => {
        if(state.level1 == ''){
            loadTaglist({level: 4});
            return;
        }
        if(state.level2 == '') {
            loadTaglist({level:4, parent: state.level1});
            return;
        }
        if(state.level3 == '') {
            loadTaglist({level:4, parent: state.level2});
            return;
        }
        loadTaglist({level:4, parent: state.level3});
    }

    // handle dropdown changes
    const handleChangeLevel1 = (event) => {
        setState({
            ...state,
            level1: event.target.value,
            level2: '',
            level3: ''
        })
        console.log(event.target.value);
        loadl2Filters({
            level: 2,
            parent: event.target.value
        });
    };

    const handleChangeLevel2 = (event) => {
        setState({
            ...state,
            level2: event.target.value,
            level3: ''
        })
        loadl3Filters({
            level: 3,
            parent: event.target.value,
        });
    };

    const handleChangeLevel3 = (event) => {
        setState({
            ...state,
            level3: event.target.value
        })
    };
    const handleErrorNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setStatus({ ...status, status: false, type: 'success', message: '' });
    };

    // handle row inputs
    const handleInput = (e) => {
        e.persist();
        setInput({
            tag_id: e.target.name,
            weight: e.target.value
        })
    }

    return (
        <Box className="admin_forms">

            <Grid container sx={{ mb: 2 }}>

                <Grid item>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <Select
                            value={state.level1}
                            onChange={handleChangeLevel1}
                            key={0}
                        >
                            <MenuItem value={''}>None</MenuItem>
                            {l1TagList.map((tag) => {
                                return <MenuItem key={tag.slug} value={tag.id}>{tag.name}</MenuItem>
                            })}

                        </Select>
                    </FormControl>
                </Grid>

                <Grid item sx={{ ml: 2 }}>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <Select
                            value={state.level2}
                            onChange={handleChangeLevel2}

                        >
                            <MenuItem key={0} value={''}>None</MenuItem>
                            {l2TagList.map((tag) => {
                                return <MenuItem key={tag.slug} value={tag.id}>{tag.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item sx={{ ml: 2 }}>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <Select
                            value={state.level3}
                            onChange={handleChangeLevel3}
                        >
                            <MenuItem key={0} value={''}>None</MenuItem>
                            {l3TagList.map((tag) => {
                                return <MenuItem key={tag.slug} value={tag.id}>{tag.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item sx={{ ml: 2 }} style={{ display: "flex", alignItems: "center" }}>
                    <Button
                        onClick={handleFilter}
                        className="update-button">Filter</Button>
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
                loading={tagLoad}
                sx={{
                    '& .MuiDataGrid-virtualScroller': {
                        minHeight: '300px'
                    }
                }}
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

export default TagsLevel4;