import React from 'react'
import { FormGroup, TextField, Autocomplete, Chip } from "@mui/material"

export default function ExtraTags(props) {

  const handleTagInput = (e) => {
    props.getExtraTags(e);
  }

  const extraTags = [
    { title: 'Gender' },
    { title: 'People with Disabilities' },
    { title: 'Elderly' },
    { title: 'Ethnic minorities' },
    { title: 'Low income' },
    { title: 'Youth' },
    { title: 'Public Sector' },
    { title: 'Public university or training college' },
    { title: 'Government and semi-government' },
    { title: 'agency' },
    { title: 'Private Sector' },
    { title: 'Large corporation' },
    { title: 'SME' },
    { title: 'Research organisation' },
    { title: 'Media' },
    { title: 'SDG01 - No Poverty'}, { title: 'SDG02 – Zero Hunger'}, { title: 'SDG03 – Good Health and Wellbeing'}, { title: 'SDG04 – Quality Education'}, { title: 'SDG05 – Gender Equality'}, { title: 'SDG06 – Clean Water and Sanitation'}, { title: 'SDG07 – Affordable and Clean Energy'}, { title: 'SDG08 – Decent Work and Economic Growth'}, { title: 'SDG09 – Industry, Innovation and Infrastructure'}, { title: 'SDG10 – Reduced Inequalities'}, { title: 'SDG11 – Sustainable Cities and Communities'}, { title: 'SDG12 – Responsible Consumption and Production'}, { title: 'SDG13 – Climate Action'}, { title: 'SDG14 – Life Below Water'}, { title: 'SDG15 – Life On Land'}, { title: 'SDG16 – Peace, Justice and Strong Institutions '}
  ];

  return (
  <FormGroup className="form-group" style={{marginTop: 32}}>
    <Autocomplete
      multiple
      id="tags-filled"
      options={extraTags.map((option) => option.title)}
      onChange={(event, value) => handleTagInput(value)}
      // freeSolo
      value={props.setExtraTag}
      renderTags={(value, getTagProps) =>
        value?.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Extra Tags"
          name="extra_tags"
        />
      )}
    />
  </FormGroup>
  )
}
