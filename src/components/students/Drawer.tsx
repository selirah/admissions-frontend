import React, { Fragment, useState, useCallback, useEffect } from 'react'
import { Drawer, Table, Row, Col, Button, message, Space } from 'antd'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../helpers/appDispatch'
import { appSelector } from '../../helpers/appSelector'
import { Student } from '../../interfaces/Student'
import { DownloadModal } from './DownloadModal'
import {
  updateRequest,
  getReceiptStudentsRequest,
  clearBooleanStates
} from '../../store/students/actions'
import { getCurrentAcademicYears } from '../../helpers/functions'

const { currentYear, nextYear } = getCurrentAcademicYears()

interface Props {
  toggleDrawer: boolean
  onToggleDrawer: () => void
}

const DrawerComponent: React.FC<Props> = (props) => {
  const { toggleDrawer, onToggleDrawer } = props
  const dispatch: AppDispatch = useDispatch()
  const studentStore = appSelector((state) => state.studentsStore)
  const { school } = appSelector((state) => state.schoolStore)
  const [downloadModal, setDownloadModal] = useState(false)
  const [receipts, setReceipts] = useState<string[]>([])
  const [submit, setSubmit] = useState(false)
  const [academicYear] = useState(currentYear + '-' + nextYear)
  const [id, setId] = useState<any>('')

  const onSetStudentReceipts = (student: Student) => {
    const receiptArray = student.receipt.split(',')
    setReceipts(receiptArray)
    onToggleDownloadModal()
  }

  const onToggleDownloadModal = useCallback(() => {
    setDownloadModal(!downloadModal)
  }, [downloadModal])

  const onValidateStudentClick = useCallback(
    (student: Student) => {
      setId(student.id)
      student.fee_receipt = 1
      dispatch(updateRequest(student))
    },
    [dispatch]
  )

  useEffect(() => {
    const { isSubmitting, success } = studentStore
    setSubmit(isSubmitting)
    if (success) {
      message.success('Student has been granted permission to print letter', 5)
      dispatch(clearBooleanStates())
      const payload = {
        school_id: school!.id,
        academic_year: academicYear
      }
      dispatch(getReceiptStudentsRequest(payload))
    }
  }, [studentStore, dispatch, academicYear, school])

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
      title: 'Academic Year',
      dataIndex: 'academic_year',
      align: 'center',
      key: 'academic_year'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (student: Student) => (
        <Space>
          <Button type="primary" onClick={() => onSetStudentReceipts(student)}>
            Receipts
          </Button>
          <Button
            type="primary"
            onClick={() => onValidateStudentClick(student)}
            loading={submit && student.id === id}
            className="success"
          >
            Grant Letter Access
          </Button>
        </Space>
      )
    }
  ]

  return (
    <Fragment>
      <Drawer
        width={1000}
        placement="right"
        closable
        onClose={onToggleDrawer}
        visible={toggleDrawer}
      >
        <Row style={{ marginTop: '50px' }}>
          <Col span={24}>
            <Table
              dataSource={studentStore.receiptsStudents}
              columns={columns}
              bordered
              pagination={{
                hideOnSinglePage: true,
                total: studentStore.receiptsStudents.length,
                showTotal: (total, range) => {
                  return `Showing ${range[0]} - ${range[1]} of ${total} results`
                }
              }}
              className="students-table"
              scroll={{ x: true }}
              rowKey="id"
            />
          </Col>
        </Row>
      </Drawer>
      <DownloadModal
        downloadModal={downloadModal}
        onToggleDownloadModal={onToggleDownloadModal}
        receipts={receipts}
      />
    </Fragment>
  )
}

export default DrawerComponent
