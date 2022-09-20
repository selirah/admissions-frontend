import React from 'react';
import { Button, Input, Select } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

interface AdminPaneProps {
  handleChange(value: string): void;
  academicYears: any[];
  dispatchRefresh(): void;
  academicYear: string;
  onSearch(value: string): void;
}

const { Search } = Input;
const { Option } = Select;

export const AdminPane: React.FC<AdminPaneProps> = ({
  academicYears,
  dispatchRefresh,
  handleChange,
  academicYear,
  onSearch,
}) => {
  return (
    <div className="pane-container">
      <div className="actions">
        <div>
          <Search
            placeholder="search by school name, region, phone, town"
            onSearch={onSearch}
          />
        </div>
        <div>
          <Select defaultValue={academicYear} onChange={handleChange}>
            {academicYears.map((academicYear) => (
              <Option value={academicYear.value} key={academicYear.value}>
                {academicYear.label}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Button
            type="default"
            onClick={() => dispatchRefresh()}
            icon={<SyncOutlined />}
          >
            Refresh List
          </Button>
        </div>
      </div>
    </div>
  );
};
