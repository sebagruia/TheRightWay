import React, { FC } from 'react';
import styles from './StatisticsChart.module.scss';

import { Pie, PieChart, Legend } from 'recharts';

import { Items } from '../../interfaces/item';

import { mapListItemsToChartData } from '../../utils';

interface IProps {
  isAnimationActive?: boolean;
  data: Items;
}

const StatisticsChart: FC<IProps> = ({ isAnimationActive = true, data }) => {
  const parsedData = mapListItemsToChartData(data);
  return (
    <div className={styles.chartWrapper}>
      <PieChart
        style={{ width: '100%', maxHeight: '60vh', aspectRatio: 1 }}
        margin={{ top: 15, right: 0, bottom: 0, left: 0 }}
        responsive
      >
        <Pie
          data={parsedData}
          innerRadius="70%"
          outerRadius="80%"
          cornerRadius="50%"
          fill="#8884d8"
          paddingAngle={1}
          dataKey="value"
          isAnimationActive={isAnimationActive}
          label={(entry) => `${entry.value}%`}
          labelLine={{ strokeWidth: 1 }}
        />
        <Legend iconSize={5} wrapperStyle={{ bottom: '-20px', fontSize: '14px' }} />
      </PieChart>
    </div>
  );
};

export default StatisticsChart;
