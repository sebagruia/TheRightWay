import React, { FC } from 'react';
import styles from './StatisticsChart.module.scss';

import { Pie, PieChart, Legend } from 'recharts';

const data = [
  { name: 'Peste', value: 400, fill: '#1e63a0ff' },
  { name: 'Paste', value: 300, fill: '#00C49F' },
  { name: 'Patiseri', value: 300, fill: '#FFBB28' },
  { name: 'Fructe', value: 200, fill: '#FF8042' },
  { name: 'Peste', value: 400, fill: '#1e63a0ff' },
  { name: 'Paste', value: 300, fill: '#00C49F' },
  { name: 'Patiseriecu cele mai bune', value: 300, fill: '#FFBB28' },
  { name: 'Peste', value: 400, fill: '#1e63a0ff' },
  { name: 'Paste', value: 300, fill: '#00C49F' },
  { name: 'Patiseri', value: 300, fill: '#FFBB28' },
  { name: 'Fructe', value: 200, fill: '#FF8042' },
  { name: 'Peste', value: 400, fill: '#1e63a0ff' },
  { name: 'Paste', value: 300, fill: '#00C49F' },
  { name: 'Patiseriecu cele mai bune', value: 300, fill: '#FFBB28' },
];

interface IProps {
  isAnimationActive?: boolean;
}

const StatisticsChart: FC<IProps> = ({ isAnimationActive = true }) => {
  return (
    <div className={styles.chartWrapper}>
      <PieChart
        style={{ width: '100%', maxHeight: '60vh', aspectRatio: 1 }}
        margin={{ top: 15, right: 0, bottom: 0, left: 0 }}
        responsive
      >
        <Pie
          data={data}
          innerRadius="70%"
          outerRadius="80%"
          cornerRadius="50%"
          fill="#8884d8"
          paddingAngle={1}
          dataKey="value"
          isAnimationActive={isAnimationActive}
          label={true}
          labelLine={{ strokeWidth: 1 }}
        />
        <Legend iconSize={5} wrapperStyle={{ bottom: '-20px', fontSize: '14px' }} />
      </PieChart>
    </div>
  );
};

export default StatisticsChart;
