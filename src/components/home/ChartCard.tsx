import React from 'react';
import { Col } from 'antd';
import CardView from '../cards/CardView';

interface ChartCardProps {
  data: any;
  title: string;
  value: number;
}

const ChartCard: React.FC<ChartCardProps> = ({ data, title, value }) => {
  return (
    <Col span={8} sm={24} md={8} xs={24}>
      <CardView title={title} value={value} data={data} />
    </Col>
  );
};

export default ChartCard;
