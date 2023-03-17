import React, {useEffect, useState} from 'react'
import { FormControl, Select, MenuItem } from '@mui/material'
import TagsSelector from "../Whatson/TagsSelector";
import {tagsExtra} from "../Projects/ProjectList";

export default function FilterSideBar(props) {
    const [districtList, setDistrictList] = useState([]);

    const handleDistrictsChange = (event) => {
        props.setDistrict(event.target.value);
    };

    useEffect(() => {
        getDistrictList();
    }, [localStorage.getItem('auth_id')]);

    const getDistrictList = () => {
        axios.get(`/api/districts`).then(res => {
            if (res.data.status === 200) {
                setDistrictList(res.data.districts);
                props.setDistrict(`26`);
            }
            else if (res.data.status === 404) {
                console.log(res.message, "message");
            }
        });
    }

    const handleViewChange = (event) => {
        props.setView(event.target.value);
    }

    return (
        <div className='filter-sidebar'>
            <div className='filter-widget'>
                <h4>View</h4>
                <FormControl fullWidth sx={{ mb: 1 }}>
                    <Select
                        value={props.view}
                        onChange={handleViewChange}
                        size="small"
                    >
                        <MenuItem value={'list'}>List</MenuItem>
                        <MenuItem value={'map'}>Map</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className='filter-widget'>
                <h4>Location</h4>

                <FormControl fullWidth sx={{ mb: 1 }}>
                    <Select
                        value={props.district}
                        onChange={handleDistrictsChange}
                        size="small"
                    >
                        {districtList.map(row => <MenuItem key={row.id}
                                                           value={row.id}>{row.name_en}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>

           
                {/*<h4>Theamtic Areas</h4>*/}
                {/*<FormGroup style={{marginBottom: '20px'}}>*/}
                {/*    <FormControlLabel control={<Checkbox defaultChecked />} label="Adaptation inance" />*/}
                {/*    <FormControlLabel control={<Checkbox />} label="Aquaculture" />*/}
                {/*    <FormControlLabel control={<Checkbox />} label="Business" />*/}
                {/*</FormGroup>*/}

                {/*<h4>Subject Areas</h4>*/}
                {/*<FormGroup style={{marginBottom: '20px'}}>*/}
                {/*    <FormControlLabel control={<Checkbox defaultChecked />} label="Adaptation inance" />*/}
                {/*    <FormControlLabel control={<Checkbox />} label="Aquaculture" />*/}
                {/*    <FormControlLabel control={<Checkbox />} label="Business" />*/}
                {/*</FormGroup>*/}

                {/*<h4>Extra Tags</h4>*/}
                {/*<FormGroup>*/}
                {/*    <FormControlLabel control={<Checkbox defaultChecked />} label="Adaptation inance" />*/}
                {/*    <FormControlLabel control={<Checkbox />} label="Aquaculture" />*/}
                {/*    <FormControlLabel control={<Checkbox />} label="Business" />*/}
                {/*</FormGroup>*/}
                
                {!props.resourceExchange && (<> 
                    <div className='filter-widget'>
                    <TagsSelector
                    tags={props.thematicTags}
                    label='Thematic Tags'
                    setTags={props.setThematicTags}
                    selectedTags={props.selectedThematicTags}
                />
                <TagsSelector
                    tags={props.subjectTags}
                    label='Subject Tags'
                    setTags={props.setSubjectTags}
                    selectedTags={props.selectedSubjectTags}
                />
                <TagsSelector
                    tags={props.extraTags}
                    label='Extra Tags'
                    setTags={props.setExtraTags}
                    selectedTags={props.selectedExtraTags}
                />
                </div>
                 </>)}
                
            
        </div>
    )
}

