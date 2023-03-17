import React from 'react'
import { FormGroup, TextField, Autocomplete, Chip } from "@mui/material"

export default function TagsSelector(props) {

    const handleTagInput = (e) => {
        props.setTags(e);
    }

    return (
        <FormGroup className="form-group" style={{marginBottom:'2em'}}>
            <Autocomplete
                multiple
                id="tags-filled"
                options={props.tags?.map((option) => option.title)}
                onChange={(event, value) => handleTagInput(value)}
                // freeSolo
                value={props.selectedTags}
                renderTags={(value, getTagProps) =>
                    value?.map((option, index) => (
                        <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.label}
                        name={props.label}
                    />
                )}
            />
        </FormGroup>
    )
}
