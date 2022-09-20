import React from 'react'
import { Results } from '../../interfaces'
import moment from 'moment'
import {
  Table,
  Row,
  Col,
  Tag,
  Space,
  Button,
  Popconfirm,
  Dropdown,
  Menu
} from 'antd'
import {
  DeleteOutlined,
  DownOutlined,
  EyeOutlined,
  NotificationOutlined
} from '@ant-design/icons'

interface Props {
  results: Results[]
  deleteResult(result: Results): void
  onShowDetailsDrawer(result: Results): void
  onPublishResults(result: Results): void
  publishing: boolean
  isDeleting: boolean
  id: number
  loading: boolean
}

const ResultsList: React.FC<Props> = (props) => {
  const {
    results,
    deleteResult,
    onShowDetailsDrawer,
    onPublishResults,
    publishing,
    isDeleting,
    id,
    loading
  } = props

  const columns: any[] = [
    {
      title: 'Course Code',
      dataIndex: 'course_code',
      align: 'left',
      key: 'course_code',
      sorter: (a: Results, b: Results) =>
        a.course_code.length - b.course_code.length
    },
    {
      title: 'Course',
      dataIndex: 'course',
      align: 'left',
      key: 'course',
      sorter: (a: Results, b: Results) => a.course.length - b.course.length
    },
    {
      title: 'Programme',
      dataIndex: 'programme',
      align: 'left',
      key: 'programme',
      sorter: (a: Results, b: Results) =>
        a.programme.length - b.programme.length
    },
    {
      title: 'Semester',
      dataIndex: 'semester',
      align: 'left',
      key: 'semester'
    },
    {
      title: 'Year',
      dataIndex: 'year',
      align: 'left',
      key: 'year'
    },
    {
      title: 'Status',
      dataIndex: 'published',
      align: 'center',
      key: 'published',
      render: (published: number) => {
        let color: string, meaning: string

        switch (published) {
          case 1:
            color = '#41b883'
            meaning = 'PUBLISHED'
            break
          case 0:
            color = '#868686'
            meaning = 'NOT PUBLISHED'
            break
          default:
            color = '#868686'
            meaning = 'NOT PUBLISHED'
            break
        }
        return (
          <Tag color={color} style={{ borderRadius: '10px', fontSize: '12px' }}>
            {meaning}
          </Tag>
        )
      }
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      align: 'left',
      key: 'created_at'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (result: Results) => {
        const actions = (
          <Menu>
            <Menu.Item
              key="1"
              onClick={() => onShowDetailsDrawer(result)}
              icon={<EyeOutlined />}
            >
              View Details
            </Menu.Item>
            {result.published === 0 ? (
              <Menu.Item
                key="2"
                onClick={() => onPublishResults(result)}
                icon={<NotificationOutlined />}
                title="Publish for students who do not owe fees"
              >
                Publish
              </Menu.Item>
            ) : null}
          </Menu>
        )
        return (
          <Space>
            <Dropdown overlay={actions}>
              <Button
                type="primary"
                style={{ fontSize: '12px' }}
                loading={publishing && result.id === id}
              >
                Actions <DownOutlined />
              </Button>
            </Dropdown>
            {result.published === 0 ? (
              <Popconfirm
                placement="topLeft"
                title="Are you sure you want to delete results? All data under this results would be lost"
                onConfirm={() => deleteResult(result)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  style={{ fontSize: '12px' }}
                  loading={isDeleting && result.id === id}
                >
                  Delete
                </Button>
              </Popconfirm>
            ) : null}
          </Space>
        )
      }
    }
  ]

  let data: any[] = []

  results.length &&
    results.map((c) => {
      data.push({
        id: c.id,
        key: c.id,
        course_code: c.course_code,
        course: c.course,
        programme: c.programme,
        semester: c.semester,
        year: c.year,
        published: c.published,
        created_at: moment(c.created_at, 'YYYY-MM-DD HH:mm:ss').format(
          'MMMM D, YYYY'
        )
      })
      return data
    })

  return (
    <Row gutter={20}>
      <Col span={24}>
        <div>
          <Table
            dataSource={data}
            columns={columns}
            bordered
            pagination={{
              hideOnSinglePage: true,
              total: data.length,
              showTotal: (total, range) => {
                return `Showing ${range[0]} - ${range[1]} of ${total} results`
              }
            }}
            className="students-table"
            scroll={{ x: true }}
            loading={loading}
          />
        </div>
      </Col>
    </Row>
  )
}

export default ResultsList
