import React from 'react'
import { FormGroup, TextField, Autocomplete, Chip } from "@mui/material"

export default function SubjectTags(props) {

  const handleTagInput = (e) => {
    props.getSubjectTags(e);
  }

  const subjectTags = [
    { title: 'Policy and Administration' },
    { title: 'Education and Awareness Raising' },
    { title: 'Legislation / Legal Research and Action' },
    { title: 'Science' },
    { title: 'Economics' },
    { title: "Engineering and Information Technology" },
    { title: 'Finance and Accounting' },
    { title: 'Public Health' }

  ];

  return (
  <FormGroup className="form-group" style={{marginTop: 32}}>
    <Autocomplete
      multiple
      id="tags-filled"
      options={subjectTags.map((option) => option.title)}
      onChange={(event, value) => handleTagInput(value)}
      // freeSolo
      value={props.setSubjectTag}
      renderTags={(value, getTagProps) =>
        value?.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Subject Tags"
          name="subject_tags"
        />
      )}
    />
  </FormGroup>
  )
}
