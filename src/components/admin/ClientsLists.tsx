import React from 'react';
import { Client } from '../../interfaces';
import { Tag, Button, Table, Popconfirm, Row, Col } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

interface ClientsListsProps {
  clients: Client[];
  impersonateClient(client: Client): void;
}

export const ClientsLists: React.FC<ClientsListsProps> = ({
  clients,
  impersonateClient,
}) => {
  const columns: any[] = [
    {
      title: 'School Name',
      dataIndex: 'school_name',
      align: 'left',
      key: 'school_name',
      sorter: (a: Client, b: Client) =>
        a.school_name.length - b.school_name.length,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      align: 'left',
      key: 'category',
      sorter: (a: Client, b: Client) => a.category.length - b.category.length,
      responsive: ['sm'],
    },
    {
      title: 'Region',
      dataIndex: 'region',
      align: 'left',
      key: 'region',
      sorter: (a: Client, b: Client) => a.region.length - b.region.length,
      responsive: ['sm'],
    },
    {
      title: 'Town',
      dataIndex: 'town',
      align: 'left',
      key: 'town',
      sorter: (a: Client, b: Client) => a.town.length - b.town.length,
      responsive: ['sm'],
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      align: 'left',
      key: 'phone',
      responsive: ['sm'],
    },
    {
      title: 'Students',
      dataIndex: 'total_students',
      align: 'center',
      key: 'total_students',
      sorter: (a: Client, b: Client) => a.total_students - b.total_students,
    },
    {
      title: 'Pending',
      dataIndex: 'total_students_pending',
      align: 'center',
      key: 'total_students_pending',
      sorter: (a: Client, b: Client) =>
        a.total_students_pending - b.total_students_pending,
      render: (pending: number) => {
        return (
          <Tag color="#868686" style={{ width: '50%' }}>
            {pending}
          </Tag>
        );
      },
    },
    {
      title: 'Accessed',
      dataIndex: 'total_students_accessed',
      align: 'center',
      key: 'total_students_accessed',
      sorter: (a: Client, b: Client) =>
        a.total_students_accessed - b.total_students_accessed,
      render: (accessed: number) => {
        return (
          <Tag color="#41b883" style={{ width: '50%' }}>
            {accessed}
          </Tag>
        );
      },
    },
    {
      title: 'Blocked',
      dataIndex: 'total_students_blocked',
      align: 'center',
      key: 'total_students_blocked',
      sorter: (a: Client, b: Client) =>
        a.total_students_blocked - b.total_students_blocked,
      render: (blocked: number) => {
        return (
          <Tag color="#ff2e2e" style={{ width: '50%' }}>
            {blocked}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (client: Client) => {
        return (
          <Popconfirm
            placement="topLeft"
            title="Are you sure you want to enter client's account?"
            onConfirm={() => impersonateClient(client)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              className="success"
              icon={<CheckCircleOutlined />}
            >
              Enter Account
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  let dataSource: Client[] = [];
  clients.map((c) => {
    dataSource.push({
      category: c.category.toUpperCase(),
      created_at: moment(c.created_at, 'YYYY-MM-DD HH:mm:ss').format(
        'MMMM D, YYYY'
      ),
      id: c.id,
      key: c.id,
      phone: c.phone,
      region: c.region.toUpperCase(),
      school_name: c.school_name.toUpperCase(),
      total_students: c.total_students,
      total_students_accessed: c.total_students_accessed,
      total_students_blocked: c.total_students_blocked,
      total_students_pending: c.total_students_pending,
      town: c.town.toUpperCase(),
      user_id: c.user_id,
    });
    return dataSource;
  });
  return (
    <Row gutter={20}>
      <Col span={24}>
        <div>
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={{
              hideOnSinglePage: true,
              total: dataSource.length,
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
