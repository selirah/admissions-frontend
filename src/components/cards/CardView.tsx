import React from 'react';
import { Card } from 'antd';
import AreaChart from '../chart/AreaChart';
import CountUp from 'react-countup';

interface CardViewProps {
  value: number;
  title: string;
  data: any;
}

const CardView: React.FC<CardViewProps> = ({ data, title, value }) => {
  return (
    <Card className="stats-padding">
      <div className="ecard">
        <div className="card-chunk">
          <h1>
            <CountUp end={value} separator="," />
          </h1>
          <p>{title}</p>
        </div>
        <div className="card-chunk">
          <AreaChart info={data} />
        </div>
      </div>
    </Card>
  );
};

export default CardView;
