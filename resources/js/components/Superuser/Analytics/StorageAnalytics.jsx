import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function SimpleCharts() {
  return (
    <BarChart
      yAxis={[
        {
          id: 'barCategories',
          data: ['bar A', 'bar B', 'bar C'],
          scaleType: 'band',
        },
      ]}
      dataset={[2, 5, 3]}
      width={500}
      height={300}
      layout='horizontal'
    />
  );
}