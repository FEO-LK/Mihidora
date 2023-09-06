import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'Number of Submissions',
    },
  ],
  height: 600,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'rotate(-90deg) translate(0px, -10px)',
    },
    marginLeft: '40px'
  },
};
const dataset = [
  {
    projects: 59,
    resources: 57,
    elearning: 86,
    events: 21,
    month: 'Jan',
  },
  {
    projects: 50,
    resources: 52,
    elearning: 78,
    events: 28,
    month: 'Fev',
  },
  {
    projects: 47,
    resources: 53,
    elearning: 106,
    events: 41,
    month: 'Mar',
  },
  {
    projects: 54,
    resources: 56,
    elearning: 92,
    events: 73,
    month: 'Apr',
  },
  {
    projects: 57,
    resources: 69,
    elearning: 92,
    events: 99,
    month: 'May',
  },
  {
    projects: 60,
    resources: 63,
    elearning: 103,
    events: 144,
    month: 'June',
  },
  {
    projects: 59,
    resources: 60,
    elearning: 105,
    events: 319,
    month: 'July',
  },
  {
    projects: 65,
    resources: 60,
    elearning: 106,
    events: 249,
    month: 'Aug',
  },
  {
    projects: 51,
    resources: 51,
    elearning: 95,
    events: 131,
    month: 'Sept',
  },
  {
    projects: 60,
    resources: 65,
    elearning: 97,
    events: 55,
    month: 'Oct',
  },
  {
    projects: 67,
    resources: 64,
    elearning: 76,
    events: 48,
    month: 'Nov',
  },
  {
    projects: 61,
    resources: 70,
    elearning: 103,
    events: 25,
    month: 'Dec',
  },
];

const valueFormatter = (value) => `${value}`;

function SubmissionsByOrg(props) {
  return (
    <BarChart
      dataset={props.dataset ? props.dataset : dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      colors={['#d4c685', '#f7ef81', '#cfe795', '#a7d3a6', '#add2c2']}
      series={[
        { dataKey: 'projects', label: 'Projects', valueFormatter },
        { dataKey: 'resources', label: 'Resources', valueFormatter },
        { dataKey: 'elearning', label: 'E-Learning', valueFormatter },
        { dataKey: 'events', label: 'Events', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}


export default SubmissionsByOrg;