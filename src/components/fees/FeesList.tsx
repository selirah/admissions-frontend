import React from 'react';
import { Fee } from '../../interfaces';
import { Button, Table, Space, Popconfirm, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

interface FeesListProps {
  fees: Fee[];
  deleteFee(fee: Fee): void;
  deleting: boolean;
}

export const FeesList: React.FC<FeesListProps> = ({
  fees,
  deleteFee,
  deleting,
}) => {
  const columns: any[] = [
    {
      title: 'Academic Year',
      dataIndex: 'academic_year',
      align: 'center',
      key: 'academic_year',
    },
    {
      title: 'Programme',
      dataIndex: 'programme',
      align: 'center',
      key: 'programme',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      align: 'center',
      key: 'amount',
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      align: 'center',
      key: 'created_at',
    },
    {
      title: 'Date Updated',
      dataIndex: 'updated_at',
      align: 'center',
      key: 'updated_at',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (fee: Fee) => (
        <Space>
          <Popconfirm
            placement="topLeft"
            title="Are you sure you want to delete fee?"
            onConfirm={() => deleteFee(fee)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              loading={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  let feesData: Fee[] = [];

  for (let fee of fees) {
    feesData.push({
      id: parseInt(`${fee.id}`),
      school_id: fee.school_id,
      academic_year: fee.academic_year,
      programme_id: parseInt(`${fee.id}`),
      programme: fee.programme,
      amount: parseFloat(`${fee.amount}`).toFixed(2),
      created_at: moment(fee.created_at, 'YYYY-MM-DD HH:mm:ss').format(
        'MMMM D, YYYY'
      ),
      updated_at: moment(fee.updated_at, 'YYYY-MM-DD HH:mm:ss').format(
        'MMMM D, YYYY'
      ),
      key: fee.id,
    });
  }

  return (
    <Row gutter={20}>
      <Col span={24}>
        <div>
          <Table
            dataSource={feesData}
            columns={columns}
            bordered
            pagination={{
              hideOnSinglePage: true,
              total: feesData.length,
              showTotal: (total, range) => {
                return `Showing ${range[0]} - ${range[1]} of ${total} results`;
              },
            }}
            className="students-table"
            scroll={{ x: true }}
          />
        </div>
      </Col>
    </Row>
  );
};
