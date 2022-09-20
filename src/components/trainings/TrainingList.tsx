import React from 'react';
import { Training } from '../../interfaces';
import {
  Tag,
  Button,
  Table,
  Space,
  Popconfirm,
  Row,
  Col,
  Menu,
  Dropdown,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  DownOutlined,
} from '@ant-design/icons';
import moment from 'moment';

interface TrainingListProps {
  trainings: Training[];
  onShowFormModal(isAddTraining: boolean, training: Training): void;
  deleteTraining(training: Training): void;
  handleTrainingAction(training: Training, action: string): void;
  onShowListModal(training: Training): void;
  exporting: boolean;
  id: number;
}

export const TrainingList: React.FC<TrainingListProps> = ({
  deleteTraining,
  handleTrainingAction,
  onShowFormModal,
  trainings,
  onShowListModal,
  exporting,
  id,
}) => {
  const columns: any = [
    {
      title: 'Year',
      dataIndex: 'year',
      align: 'center',
      key: 'year',
      sorter: (a: Training, b: Training) => a.year.length - b.year.length,
    },
    {
      title: 'Venue',
      dataIndex: 'location',
      align: 'left',
      key: 'location',
      sorter: (a: Training, b: Training) =>
        a.location.length - b.location.length,
    },
    {
      title: 'Date & Time',
      dataIndex: 'date_time',
      align: 'left',
      key: 'location',
      render: (dateTime: string) => {
        let time = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format(
          'MMMM D, YYYY (h:mm a)'
        );
        return <span>{time.toUpperCase()}</span>;
      },
    },
    {
      title: 'Registered',
      dataIndex: 'list_total',
      align: 'left',
      key: 'list_total',
      sorter: (a: Training, b: Training) => a.list_total - b.list_total,
      render: (total: number, record: Training) => {
        if (total > 0) {
          return (
            <Tag
              color="green"
              style={{ fontSize: '12px', cursor: 'pointer' }}
              onClick={() => onShowListModal(record)}
            >
              {total}
            </Tag>
          );
        } else {
          return (
            <Tag color="geekblue" style={{ fontSize: '12px' }}>
              {total}
            </Tag>
          );
        }
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (training: Training) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="1"
              icon={<FileExcelOutlined />}
              onClick={() => handleTrainingAction(training, 'EXCEL')}
            >
              Excel
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<FilePdfOutlined />}
              onClick={() => handleTrainingAction(training, 'PDF')}
            >
              PDF
            </Menu.Item>
          </Menu>
        );
        return (
          <Space>
            {training.list_total > 0 ? (
              <>
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  style={{ fontSize: '12px' }}
                  className="success"
                  onClick={() => onShowListModal(training)}
                >
                  View List
                </Button>
                <Dropdown overlay={menu}>
                  <Button
                    type="dashed"
                    loading={exporting && training.id === id}
                  >
                    Export List
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </>
            ) : null}

            <Button
              type="dashed"
              icon={<EditOutlined />}
              style={{ fontSize: '12px' }}
              className="success-dashed"
              onClick={() => onShowFormModal(false, training)}
            >
              Edit
            </Button>
            <Popconfirm
              placement="topLeft"
              title="Are you sure you want to delete this training? All data under this training would be lost"
              onConfirm={() => deleteTraining(training)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                style={{ fontSize: '12px' }}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  let dataSource: Training[] = [];

  trainings.map((t) => {
    dataSource.push({
      created_at: t.created_at,
      date: moment(new Date(t.date_time)),
      date_time: t.date_time,
      id: t.id,
      key: t.id,
      list_total: t.list_total,
      location: t.location.toUpperCase(),
      updated_at: t.updated_at,
      year: t.year,
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
