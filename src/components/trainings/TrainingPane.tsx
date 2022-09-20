import React from 'react';
import { Button, Input, Select, DatePicker } from 'antd';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { Training } from '../../interfaces';

interface TrainingPaneProps {
  handleChange(value: string): void;
  years: any[];
  dispatchRefresh(values: Training): void;
  year: string;
  onSearch(value: string): void;
  onDateSearch(value: any): void;
  values: Training;
  onShowFormModal(value: boolean): void;
}

const { Search } = Input;
const { Option } = Select;

export const TrainingPane: React.FC<TrainingPaneProps> = ({
  years,
  dispatchRefresh,
  handleChange,
  year,
  onSearch,
  onDateSearch,
  onShowFormModal,
  values,
}) => {
  return (
    <div className="pane-container">
      <div className="filter">
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => onShowFormModal(true)}
          >
            Create Training
          </Button>
        </div>
      </div>
      <div className="actions">
        <div>
          <Search placeholder="search by location" onSearch={onSearch} />
        </div>
        <div>
          <DatePicker placeholder="Select date" onChange={onDateSearch} />
        </div>
        <div>
          <Select defaultValue={year} onChange={handleChange}>
            {years.map((year) => (
              <Option value={year.value} key={year.value}>
                {year.label}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Button
            type="default"
            onClick={() => dispatchRefresh(values)}
            icon={<SyncOutlined />}
          >
            Refresh List
          </Button>
        </div>
      </div>
    </div>
  );
};
