import React from 'react'
import { Student, Programme, School } from '../../interfaces'
import {
  Tag,
  Button,
  Table,
  Space,
  Popconfirm,
  Menu,
  Dropdown,
  Row,
  Col
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  DownOutlined,
  PhoneOutlined,
  StopOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  StopFilled
} from '@ant-design/icons'
import moment from 'moment'
import { getProgramme } from '../../helpers/functions'

interface StudentsListProps {
  students: Student[]
  onShowFormModal(isAddStudent: boolean, student: Student): void
  programmes: Programme[]
  deleteStudent(student: Student): void
  handleStudentAction(student: Student, action: string): void
  school: School
  onDownloadFeeReceipt(student: Student): void
  onValidateStudentClick(student: Student, action: string): void
}

export const StudentsList: React.FC<StudentsListProps> = ({
  students,
  onShowFormModal,
  programmes,
  deleteStudent,
  handleStudentAction,
  school,
  onDownloadFeeReceipt,
  onValidateStudentClick
}) => {
  const columns: any[] = [
    {
      title: 'Surname',
      dataIndex: 'surname',
      align: 'left',
      key: 'surname',
      sorter: (a: Student, b: Student) => a.surname.length - b.surname.length
    },
    {
      title: 'Others',
      dataIndex: 'other_names',
      align: 'left',
      key: 'other_names',
      sorter: (a: Student, b: Student) =>
        a.other_names.length - b.other_names.length
    },
    {
      title: 'App #',
      dataIndex: 'application_number',
      align: 'center',
      key: 'application_number'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      align: 'center',
      key: 'phone'
    },
    {
      title: 'Programme',
      dataIndex: 'programme',
      align: 'left',
      key: 'programme'
      // ellipsis: true,
    },
    {
      title: 'Academic Year',
      dataIndex: 'academic_year',
      align: 'center',
      key: 'academic_year'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: (status: number) => {
        let color: string, meaning: string

        switch (status) {
          case 1:
            color = '#41b883'
            meaning = 'ACCESSED'
            break
          case 2:
            color = '#ff2e2e'
            meaning = 'BLOCKED'
            break
          default:
            color = '#868686'
            meaning = 'PENDING'
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
      title: 'Fee Status',
      dataIndex: 'fee_receipt',
      align: 'center',
      key: 'fee_receipt',
      render: (fee_receipt: number) => {
        if (school.fee_payment === 1) {
          let color: string, meaning: string
          switch (fee_receipt) {
            case 1:
              color = '#41b883'
              meaning = 'PAID'
              break
            default:
              color = '#ff2e2e'
              meaning = 'UNPAID'
              break
          }
          return (
            <Tag color={color} style={{ fontSize: '12px' }}>
              {meaning}
            </Tag>
          )
        } else {
          return (
            <Tag color="#868686" style={{ fontSize: '12px' }}>
              Not Set
            </Tag>
          )
        }
      }
    },
    {
      title: 'Owing Fees',
      dataIndex: 'owing_fees',
      align: 'center',
      key: 'owing_fees',
      render: (owingFees: any) => {
        let color: string, meaning: string

        switch (parseInt(owingFees)) {
          case 0:
            color = '#41b883'
            meaning = 'NO'
            break
          case 1:
            color = '#ff2e2e'
            meaning = 'YES'
            break
          default:
            color = '#41b883'
            meaning = 'NO'
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
      render: (student: Student) => {
        const actions = (
          <Menu>
            <Menu.Item
              key="1"
              onClick={() => onShowFormModal(false, student)}
              icon={<EditOutlined />}
            >
              Edit
            </Menu.Item>
            {student.status === 2 ? (
              <Menu.Item
                key="2"
                onClick={() => handleStudentAction(student, 'unblock')}
                icon={<CheckCircleOutlined />}
              >
                Unblock
              </Menu.Item>
            ) : null}
            {student.status === 0 ? (
              <>
                <Menu.Item
                  key="3"
                  onClick={() => handleStudentAction(student, 'block')}
                  icon={<StopOutlined />}
                >
                  Block
                </Menu.Item>
                <Menu.Item
                  key="4"
                  onClick={() => handleStudentAction(student, 'sms')}
                  icon={<PhoneOutlined />}
                >
                  SMS
                </Menu.Item>
              </>
            ) : null}
            {/* {school.fee_payment === 1 && student.fee_receipt === 1 ? ( */}
            {school.fee_payment === 1 && student.receipt ? (
              <>
                <Menu.Item
                  key="5"
                  onClick={() => onDownloadFeeReceipt(student)}
                  icon={<DownloadOutlined />}
                >
                  Download Fee Receipt
                </Menu.Item>
                <Menu.Item
                  key="6"
                  onClick={() =>
                    onValidateStudentClick(
                      student,
                      student.fee_receipt === 0 ? 'VALIDATE' : 'INVALIDATE'
                    )
                  }
                  icon={
                    student.fee_receipt === 0 ? (
                      <CheckCircleOutlined />
                    ) : (
                      <StopFilled />
                    )
                  }
                >
                  {student.fee_receipt === 0
                    ? 'Grant Letter Access'
                    : 'Revoke Letter Access'}
                </Menu.Item>
              </>
            ) : null}
          </Menu>
        )

        return (
          <Space>
            <Dropdown overlay={actions}>
              <Button
                type="dashed"
                style={{ fontSize: '12px' }}
                className={`${student.receipt ? 'success-dashed' : null}`}
              >
                Actions <DownOutlined />
              </Button>
            </Dropdown>
            <Popconfirm
              placement="topLeft"
              title="Are you sure you want to delete this Student? All data under this student would be lost"
              onConfirm={() => deleteStudent(student)}
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
        )
      }
    }
  ]

  let dataSource: Student[] = []

  students.map((student) => {
    dataSource.push({
      id: student.id,
      key: student.id,
      surname: student.surname,
      other_names: student.other_names,
      academic_year: student.academic_year,
      application_number: student.application_number,
      created_at: moment(student.created_at, 'YYYY-MM-DD HH:mm:ss')
        .format('MMMM D, YYYY')
        .toUpperCase(),
      fee_receipt: student.fee_receipt,
      hall: student.hall,
      phone: student.phone,
      pin: student.pin,
      programme: getProgramme(
        programmes,
        student.programme_id
      ).programme.toUpperCase(),
      programme_id: student.programme_id,
      receipt: student.receipt,
      school_id: student.school_id,
      owing_fees: student.owing_fees,
      status: student.status,
      updated_at: student.updated_at
    })
    return dataSource
  })

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
                return `Showing ${range[0]} - ${range[1]} of ${total} results`
              }
            }}
            className="students-table"
            scroll={{ x: true }}
          />
        </div>
      </Col>
    </Row>
  )
}
