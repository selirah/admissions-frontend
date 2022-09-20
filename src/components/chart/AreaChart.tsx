import React from 'react';
import { Line } from 'react-chartjs-2';

interface AreaChartProps {
  info: any;
}

const AreaChart: React.FC<AreaChartProps> = ({ info }) => {
  const { datasets, height, labels, options } = info;

  const data = {
    datasets,
    labels,
  };

  return (
    <div className="chart">
      <Line data={data} height={height} options={options} />
    </div>
  );
};

export default AreaChart;
