import React from 'react';
import { Spin } from 'antd';

interface SpinnerProps {}

export const Spinner: React.FC<SpinnerProps> = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '10rem' }}>
      <Spin size="default" spinning />
    </div>
  );
};

export const ModalSpinner: React.FC<SpinnerProps> = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <Spin size="default" spinning />
    </div>
  );
};
