import React, { Fragment } from 'react'
import { Academics, Results } from '../../interfaces'
import { Button, Drawer, Row, Col, Table, Space, Tag } from 'antd'

interface Props {
  loading: boolean
  showDrawer: boolean
  onCloseDrawer: () => void
  academics: Academics[]
  publishResult: boolean
  onPublishStudentResult: (academics: Academics) => void
  result: Results | null
  id: number
}

const DetailsDrawer: React.FC<Props> = (props) => {
  const {
    loading,
    onCloseDrawer,
    showDrawer,
    academics,
    publishResult,
    onPublishStudentResult,
    result,
    id
  } = props

  const columns: any[] = [
    {
      title: 'Index Number',
      dataIndex: 'index_no',
      align: 'left',
      key: 'index_no'
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      align: 'left',
      key: 'surname',
      sorter: (a: Academics, b: Academics) =>
        a.surname.length - b.surname.length
    },
    {
      title: 'Other Names',
      dataIndex: 'other_names',
      align: 'left',
      key: 'other_names',
      sorter: (a: Academics, b: Academics) =>
        a.other_names.length - b.other_names.length
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      align: 'left',
      key: 'phone'
    },
    {
      title: 'Year',
      dataIndex: 'year',
      align: 'left',
      key: 'year'
    },
    {
      title: 'Semester',
      dataIndex: 'semester',
      align: 'left',
      key: 'semester'
    },
    {
      title: 'Course Code',
      dataIndex: 'course_code',
      align: 'left',
      key: 'course_code'
    },
    {
      title: 'Total',
      dataIndex: 'total',
      align: 'left',
      key: 'total'
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      align: 'left',
      key: 'grade'
    },
    {
      title: 'Status',
      dataIndex: 'owing_fees',
      align: 'left',
      key: 'owing_fees',
      render: (owing: number) => {
        let color: string, meaning: string

        switch (owing) {
          case 0:
            color = '#41b883'
            meaning = 'NOT OWING'
            break
          case 1:
            color = '#ff2e2e'
            meaning = 'OWING'
            break
          default:
            color = '#41b883'
            meaning = 'NOT OWING'
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
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (academics: Academics) => {
        return (
          <Space>
            {result && result.published === 0 ? (
              <Button
                type="dashed"
                loading={publishResult && academics.id === id}
                onClick={() => onPublishStudentResult(academics)}
                disabled={academics.owing_fees === 1}
              >
                PUBLISH
              </Button>
            ) : academics.owing_fees === 0 ? (
              <Tag
                color="success"
                style={{ borderRadius: '10px', fontSize: '12px' }}
              >
                PUBLISHED
              </Tag>
            ) : (
              <Button
                type="dashed"
                loading={publishResult && academics.id === id}
                onClick={() => onPublishStudentResult(academics)}
                disabled={academics.owing_fees === 1}
              >
                PUBLISH
              </Button>
            )}
          </Space>
        )
      }
    }
  ]

  let data: any[] = []

  academics.length &&
    academics.map((c) => {
      data.push({
        id: c.id,
        key: c.id,
        surname: c.surname,
        other_names: c.other_names,
        phone: c.phone,
        semester: c.semester,
        year: c.year,
        index_no: c.index_no,
        course_code: c.course_code,
        total: c.total,
        grade: c.grade,
        owing_fees: c.owing_fees
      })
      return data
    })

  return (
    <Fragment>
      <Drawer
        width={1500}
        placement="right"
        closable
        onClose={onCloseDrawer}
        visible={showDrawer}
        title="Results"
      >
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
      </Drawer>
    </Fragment>
  )
}

export default DetailsDrawer
