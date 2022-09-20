import React from 'react'
import { Course } from '../../interfaces'
import moment from 'moment'
import { Table, Row, Col } from 'antd'

interface Props {
  courses: Course[]
  loading: boolean
}

const CoursesList: React.FC<Props> = (props) => {
  const { courses, loading } = props
  const columns: any[] = [
    {
      title: 'Course Code',
      dataIndex: 'course_code',
      align: 'left',
      key: 'course_code',
      sorter: (a: Course, b: Course) =>
        a.course_code.length - b.course_code.length
    },
    {
      title: 'Course',
      dataIndex: 'course',
      align: 'left',
      key: 'course',
      sorter: (a: Course, b: Course) => a.course.length - b.course.length
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      align: 'left',
      key: 'created_at'
    }
  ]

  let data: any[] = []

  courses.length &&
    courses.map((c) => {
      data.push({
        id: c.id,
        key: c.id,
        course_code: c.course_code,
        course: c.course,
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

export default CoursesList
