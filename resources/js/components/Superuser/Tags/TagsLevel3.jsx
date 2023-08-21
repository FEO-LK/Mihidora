import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';


function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}

function TagsLevel3() {
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

    const [state, setState] = useState({
        level1: '',
        level2: '',
        tagLoad: false,
        l1Tags: [],
        l2Tags: [],
    })
    const [level1, setLevel1] = useState();
    const [level2, setLevel2] = useState();
    const [l2tags, setL2Tags] = useState([]);
    const [tagListLoading, setTagListLoading] = useState(true);
    const [tagList, setTagLists] = useState([]);
    const [status, setStatus] = useState({
        status: false,
        type: 'success',
        message: '',
    });
    const [input, setInput] = useState({
        tag_id: '',
        weight: ''
    });

    useEffect(() => {
        loadL1();
        loadTagList({
            level: 3
        });
    }, []);


    const handleErrorNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setStatus({ ...status, status: false, type: 'success', message: '' });
    };

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
                    loadTagList({
                        level: 3,
                        parent: level2
                    });
                } else {
                    setStatus({ ...status, status: true, type: 'error', message: res.data.message });
                }
            });
        });
    }

    const handleChangeLevel1 = (event) => {
        setState({
            ...state,
            level1: event.target.value
        })
        setLevel1(event.target.value)
        loadL2(event.target.value);
    };

    const handleChangeLevel2 = (event) => {
        setState({
            ...state,
            level2: event.target.value
        })
        setLevel2(event.target.value)
    };

    const filterTags = (event) => {
        event.preventDefault();
        console.log(level1, level2);
        let data = {
            level: 3,
            parent: level2
        };
        if (level2 === null || level2 === -1) {
            data = {
                level: 3
            }
        }
        console.log(data);
        loadTagList(data);
    }
    const loadL2 = (parent) => {
        setState({ ...state, tagLoad: true });
        const data = {
            level: 2,
            parent: parent
        }
        axios.post('/api/get-tags', data).then(res => {
            if (res.status == 200) {
                let l2tags = res.data.tags.map((tag) => {
                    return {
                        id: tag.id,
                        name: tag.name,
                        slug: tag.slug,
                        weight: { weight: tag.weight, id: tag.id },
                        update: { weight: tag.weight, id: tag.id },
                    };
                });
                setState({ ...state, tagLoad: false })
                setL2Tags(l2tags);
                setLevel2(null)
            }
        });
    }

    const loadL1 = () => {
        setState({ ...state, tagLoad: true });
        const data = {
            level: 1
        }
        axios.post('/api/get-tags', data).then(res => {
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
                setState({ ...state, l1Tags: tags, tagLoad: false });
            }
        });
    }

    const loadTagList = (data) => {
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
                    setTagListLoading(false);
                } else {
                    // set error;
                }
            });
        });
    }

    return (
        <Box className="admin_forms">
            <Grid container sx={{ mb: 2 }}>

                <Grid item>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <Select
                            value={level1}
                            onChange={handleChangeLevel1}
                            defaultValue="Select"
                        >
                            {state.l1Tags.map((tag) => {
                                return <MenuItem name={tag.name} key={tag.slug} value={tag.id}>{tag.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item sx={{ ml: 2 }}>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <Select
                            value={level2}
                            onChange={handleChangeLevel2}
                            defaultValue="Select"
                        >
                            {l2tags.map((tag) => {
                                return <MenuItem key={tag.slug} value={tag.id}>{tag.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item sx={{ ml: 2 }} style={{ display: "flex", alignItems: "center" }}>
                    <Button className="update-button" onClick={filterTags}>Filter</Button>
                </Grid>
                {state.tagLoad ? <CircularProgress color="success" /> : ''}
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
                loading={tagListLoading}
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

export default TagsLevel3;