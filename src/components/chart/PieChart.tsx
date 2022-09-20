import React from 'react';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  info: any;
}

const PieChart: React.FC<PieChartProps> = ({ info }) => {
  const { data } = info;
  return (
    <div className="chart">
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
