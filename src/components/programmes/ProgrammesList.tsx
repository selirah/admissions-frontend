import React from 'react';
import { Programme } from '../../interfaces';
import { Tag, Button, Table, Space, Row, Col } from 'antd';
import { /*DeleteOutlined,*/ EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { path } from '../../helpers/path';

interface ProgrammesListProps {
  programmes: Programme[];
  onShowFormModal(isAddProgramme: boolean, programme: Programme): void;
  switchToStudents(menu: string): void;
}

export const ProgrammesList: React.FC<ProgrammesListProps> = ({
  programmes,
  onShowFormModal,
  switchToStudents,
}) => {
  const columns: any[] = [
    {
      title: 'Programme ID',
      dataIndex: 'id',
      align: 'center',
      key: 'id',
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: 'Programme Name',
      dataIndex: 'programme',
      align: 'left',
      key: 'programme',
      sorter: (a: any, b: any) => a.programme.length - b.programme.length,
    },
    {
      title: 'Total Students (Per Academic Year)',
      dataIndex: 'total',
      align: 'center',
      key: 'total',
      sorter: (a: any, b: any) => a.id - b.id,
      render: (total: number) => {
        let tag: React.ReactNode;
        if (total === 0) {
          tag = (
            <Tag color="green" key={total} style={{ cursor: 'pointer' }}>
              {total}
            </Tag>
          );
        } else if (total !== 0 && total <= 100) {
          tag = (
            <Tag
              color="geekblue"
              key={total}
              style={{ cursor: 'pointer' }}
              onClick={() => switchToStudents(path.students)}
            >
              {total}
            </Tag>
          );
        } else if (total > 100) {
          tag = (
            <Tag
              color="volcano"
              key={total}
              style={{ cursor: 'pointer' }}
              onClick={() => switchToStudents(path.students)}
            >
              {total}
            </Tag>
          );
        }

        return tag;
      },
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      align: 'left',
      key: 'created_at',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (programme: Programme) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              onShowFormModal(false, programme);
            }}
          >
            Edit
          </Button>
          {/* <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => console.log(programme)}
          >
            Delete
          </Button> */}
        </Space>
      ),
    },
  ];

  let programmesData: Programme[] = [];

  for (let programme of programmes) {
    programmesData.push({
      id: programme.id,
      key: programme.id,
      programme: programme.programme,
      school_id: programme.school_id,
      total: programme.total,
      created_at: moment(programme.created_at, 'YYYY-MM-DD HH:mm:ss').format(
        'MMMM D, YYYY'
      ),
      updated_at: moment(programme.updated_at, 'YYYY-MM-DD HH:mm:ss').format(
        'MMMM D, YYYY'
      ),
      academic_year: programme.academic_year,
    });
  }

  return (
    <Row gutter={20}>
      <Col span={24}>
        <div>
          <Table
            dataSource={programmesData}
            columns={columns}
            bordered
            pagination={{
              hideOnSinglePage: true,
              total: programmesData.length,
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
