'use client';
import * as React from 'react';
import { DefaultizedPieValueType } from '@mui/x-charts';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Xe máy', value: 400, color: '#008cff' },
  { label: 'Xe ô tô 4 chỗ', value: 300, color: '#00ba1f' },
  { label: 'Xe ô tô 7 chỗ', value: 300, color: '#ffaa00' },
];

const sizing = {
  margin: { right: 5 },
  width: 500,
  height: 500,
  legend: { hidden: false },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params: DefaultizedPieValueType) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

export default function CustomPieChart() {
  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}
