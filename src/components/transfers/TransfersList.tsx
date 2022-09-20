import React from 'react';
import { Transfer } from '../../interfaces';
import {
  Tag,
  Button,
  Table,
  Space,
  Popconfirm,
  Menu,
  Dropdown,
  Row,
  Col,
} from 'antd';
import {
  DeleteOutlined,
  DownOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';

interface TransfersListProps {
  transfers: Transfer[];
  deleteTransfer(transfer: Transfer): void;
  handleAction(transfer: Transfer, action: string): void;
  schoolId: number | string;
  performAction: boolean;
}

export const TransfersList: React.FC<TransfersListProps> = ({
  deleteTransfer,
  handleAction,
  transfers,
  schoolId,
  performAction,
}) => {
  const columns: any[] = [
    {
      title: 'Surname',
      dataIndex: 'surname',
      align: 'left',
      key: 'surname',
      sorter: (a: any, b: any) => a.surname.length - b.surname.length,
    },
    {
      title: 'Others',
      dataIndex: 'other_names',
      align: 'left',
      key: 'other_names',
      sorter: (a: any, b: any) => a.other_names.length - b.other_names.length,
    },
    {
      title: 'App #',
      dataIndex: 'application_number',
      align: 'center',
      key: 'application_number',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      align: 'center',
      key: 'phone',
    },
    {
      title: 'School (From)',
      dataIndex: 'source_school_name',
      align: 'left',
      key: 'source_school_name',
      sorter: (a: any, b: any) =>
        a.source_school_name.length - b.source_school_name.length,
    },
    {
      title: 'School (To)',
      dataIndex: 'destination_school_name',
      align: 'left',
      key: 'destination_school_name',
      sorter: (a: any, b: any) =>
        a.destination_school_name.length - b.destination_school_name.length,
    },
    {
      title: 'Programme (From)',
      dataIndex: 'source_programme_name',
      align: 'left',
      key: 'source_programme_name',
      sorter: (a: any, b: any) =>
        a.source_programme_name.length - b.source_programme_name.length,
    },
    {
      title: 'Programme (To)',
      dataIndex: 'destination_programme_name',
      align: 'left',
      key: 'destination_programme_name',
      sorter: (a: any, b: any) =>
        a.destination_programme_name.length -
        b.destination_programme_name.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: (status: number) => {
        let color: string, meaning: string;

        switch (status) {
          case 1:
            color = '#41b883';
            meaning = 'GRANTED';
            break;
          case 2:
            color = '#ff2e2e';
            meaning = 'DENIED';
            break;
          default:
            color = '#868686';
            meaning = 'PENDING';
            break;
        }
        return <Tag color={color}>{meaning}</Tag>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      align: 'center',
      key: 'created_at',
      responsive: ['md'],
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (transfer: Transfer) => {
        const actions = (
          <Menu>
            <Menu.Item
              key="1"
              onClick={() => handleAction(transfer, 'grant')}
              icon={<CheckCircleOutlined />}
            >
              Grant Request
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => handleAction(transfer, 'deny')}
              icon={<StopOutlined />}
            >
              Deny Request
            </Menu.Item>
          </Menu>
        );

        return (
          <Space>
            {(transfer.status === 0 || transfer.status === 2) &&
            transfer.destination_school !== schoolId ? (
              <Dropdown overlay={actions}>
                <Button type="default" loading={performAction}>
                  Actions <DownOutlined />
                </Button>
              </Dropdown>
            ) : null}
            {transfer.destination_school === schoolId &&
            transfer.status !== 1 ? (
              <Popconfirm
                placement="topLeft"
                title="Are you sure you want to delete this transfer request? All data under this student would be lost"
                onConfirm={() => deleteTransfer(transfer)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            ) : null}
          </Space>
        );
      },
    },
  ];

  let dataSource: Transfer[] = [];
  transfers.map((transfer) => {
    dataSource.push({
      id: transfer.id,
      key: transfer.id,
      surname: transfer.surname,
      other_names: transfer.other_names,
      application_number: transfer.application_number,
      phone: transfer.phone,
      academic_year: transfer.academic_year,
      created_at: moment(transfer.created_at, 'YYYY-MM-DD HH:mm:ss').format(
        'MMMM D, YYYY'
      ),
      destination_programme: transfer.destination_programme,
      destination_school: transfer.destination_school,
      destination_programme_name: transfer.destination_programme_name.toUpperCase(),
      programme_id: transfer.programme_id,
      source_school: transfer.source_school,
      status: transfer.status,
      student_id: transfer.student_id,
      updated_at: transfer.updated_at,
      destination_school_name: transfer.destination_school_name.toUpperCase(),
      source_programme: transfer.source_programme,
      source_programme_name: transfer.source_programme_name.toUpperCase(),
      source_school_name: transfer.source_school_name.toUpperCase(),
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
