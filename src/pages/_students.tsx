import React, { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { Layout, Row, Divider, Button, message, Form } from 'antd'
import { useHistory } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { isEmpty } from '../helpers/isEmpty'
import { Spinner } from '../components/common/Spinner'
import {
  getStudentsRequest,
  createRequest,
  updateRequest,
  deleteRequest,
  clearBooleanStates,
  performStudentsActionsRequest,
  studentActionRequest,
  uploadStudentsRequest,
  exportStudentsRequest,
  clearDuplicates,
  clearStudents,
  getFeeStudentsRequest
} from '../store/students'
import {
  createTransferDuplicateRequest,
  clearBooleanStates as clearTransferBooleans
} from '../store/transfers'
import { getProgrammesRequest } from '../store/programmes'
import { EmptyBox } from '../components/common/EmptyBox'
import { Student, StudentAction, Duplicate } from '../interfaces'
import { constants } from '../helpers/constants'
import { messages } from '../helpers/messages'
import { path } from '../helpers/path'
import { academicYears } from '../helpers/constants'
import { getCurrentAcademicYears } from '../helpers/functions'
import { StudentForm } from '../components/students/StudentForm'
import { StudentsList } from '../components/students/StudentsList'
import { StudentPane } from '../components/students/StudentPane'
import { StudentUpload } from '../components/students/StudentUpload'
import { DownloadModal } from '../components/students/DownloadModal'
import { DuplicateModal } from '../components/students/DuplicateModal'

const { currentYear, nextYear } = getCurrentAcademicYears()

const { Content } = Layout

const Students: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const studentsStore = appSelector((state) => state.studentsStore)
  const transfersStore = appSelector((state) => state.transfersStore)
  const { programmes } = appSelector((state) => state.programmesStore)
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [showStudentFormModal, setShowStudentFormModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [addStudent, setAddStudent] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const { school } = appSelector((state) => state.schoolStore)
  const [academicYear, setAcademicYear] = useState(currentYear + '-' + nextYear)
  const [form] = Form.useForm()
  const history = useHistory()
  const [values] = useState<Student>({
    id: '',
    school_id: school !== null ? school.id : '',
    application_number: '',
    academic_year: academicYear,
    hall: '',
    other_names: '',
    phone: '',
    pin: '',
    programme_id: '',
    programme: '',
    status: '',
    surname: '',
    fee_receipt: 0,
    owing_fees: 0,
    receipt: '',
    created_at: '',
    updated_at: '',
    key: ''
  })
  const [performAction, setPerformAction] = useState(false)
  const [fileName, setFileName] = useState(
    'Choose Excel File (Must be .xls, .xlsx, .csv file)'
  )
  const [excel, setExcel] = useState<any>(null)
  const [upload, setUpload] = useState(false)
  const [exporting, setExporting] = useState(false)
  const initialValues = {
    school_id: school !== null ? school.id : '',
    programme_id: '',
    academic_year: academicYear,
    sheet: '',
    start_row: ''
  }
  const [downloadModal, setDownloadModal] = useState(false)
  const [receipts, setReceipts] = useState<string[]>([])
  const [showDuplicatesModal, setShowDuplicatesModal] = useState(false)
  const [duplicates, setDuplicates] = useState<Duplicate[]>([])
  const [feeType, setFeeType] = useState('')

  useEffect(() => {
    if (isEmpty(school)) {
      message.info(messages.setUpSchool)
      history.push(path.school)
    }
    dispatch(getStudentsRequest(values))
    if (isEmpty(programmes)) {
      const values = {
        school_id: school !== null ? school.id : '',
        academic_year: academicYear
      }
      dispatch(getProgrammesRequest(values))
    }
    dispatch(clearBooleanStates())
    dispatch(clearTransferBooleans())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const {
      students,
      loading,
      isSubmitting,
      success,
      deleteSuccess,
      failure,
      page,
      error,
      performAction,
      actionSuccess,
      actionFailure,
      upload,
      uploadSuccess,
      uploadFailure,
      duplicates,
      exportFailure,
      exporting,
      studentActionSuccess,
      studentActionFailure
    } = studentsStore
    setStudents(students)
    setLoading(loading)
    setIsSubmit(isSubmitting)
    setPerformAction(performAction)
    setUpload(upload)
    setExporting(exporting)
    setDuplicates(duplicates)
    if (success && page === constants.students) {
      switch (addStudent) {
        case true:
          message.success(messages.addStudentSuccess, 5)
          form.resetFields()
          dispatch(clearBooleanStates())
          break
        case false:
          message.success(messages.updateStudentSuccess, 5)
          dispatch(getStudentsRequest(values))
          dispatch(clearBooleanStates())
          break
      }
    }
    if (deleteSuccess && page === constants.students) {
      message.success(messages.deleteStudentSuccess, 5)
      dispatch(clearBooleanStates())
    }

    if (failure && page === constants.students) {
      message.error(JSON.stringify(error), 5)
      dispatch(clearBooleanStates())
    }

    if (actionSuccess && page === constants.students) {
      message.success(messages.studentsAction, 5)
      dispatch(clearBooleanStates())
      dispatch(getStudentsRequest(values))
    }

    if (actionFailure && page === constants.students) {
      message.error(JSON.stringify(error), 5)
      dispatch(clearBooleanStates())
    }

    if (studentActionSuccess && page === constants.students) {
      message.success(messages.studentsAction, 5)
      dispatch(clearBooleanStates())
      dispatch(getStudentsRequest(values))
    }

    if (studentActionFailure && page === constants.students) {
      message.error(JSON.stringify(error), 5)
      dispatch(clearBooleanStates())
    }

    if (uploadSuccess && page === constants.students) {
      message.success(messages.uploadStudents, 10)
      dispatch(clearBooleanStates())
      form.resetFields()
      dispatch(getStudentsRequest(values))
    }

    if (uploadFailure && page === constants.students) {
      message.error(JSON.stringify(error), 10)
      dispatch(clearBooleanStates())
    }

    if (exportFailure && page === constants.students) {
      message.error(JSON.stringify(error), 10)
      dispatch(clearBooleanStates())
    }
    if (duplicates.length > 0) {
      setShowDuplicatesModal(true)
    }
  }, [studentsStore, addStudent, dispatch, form, values])

  const onShowFormModal = useCallback(
    (isAddStudent: boolean, student: Student = values) => {
      setShowStudentFormModal(true)
      setAddStudent(isAddStudent)
      form.setFieldsValue(student)
    },
    [form, values]
  )

  const toggleUploadModal = useCallback(() => {
    dispatch(clearBooleanStates())
    setShowUploadModal(!showUploadModal)
  }, [dispatch, showUploadModal])

  const onCloseModal = useCallback(() => {
    dispatch(clearBooleanStates())
    setShowStudentFormModal(false)
  }, [dispatch])

  const handleChange = useCallback(
    (value: string) => {
      setAcademicYear(value)
      values.academic_year = value
      dispatch(getStudentsRequest(values))
    },
    [dispatch, values]
  )

  const onProgrammeSearch = useCallback(
    (value: number) => {
      let filtered: Student[] = []
      if (value) {
        studentsStore.students.map((s) => {
          if (s.programme_id === value) {
            filtered.push(s)
          }
          return filtered
        })
      } else {
        filtered = studentsStore.students
      }
      setStudents(filtered)
    },
    [studentsStore]
  )

  const onStatusSearch = useCallback(
    (value: number) => {
      let filtered: Student[] = []
      if (value > -1) {
        studentsStore.students.map((s) => {
          if (s.status === value) {
            filtered.push(s)
          }
          return filtered
        })
      } else {
        filtered = studentsStore.students
      }
      setStudents(filtered)
    },
    [studentsStore]
  )

  const dispatchRefresh = useCallback(
    (values: Student) => {
      dispatch(clearStudents())
      dispatch(getStudentsRequest(values))
    },
    [dispatch]
  )

  const onSearch = useCallback(
    (value: string) => {
      let filtered: Student[] = []
      if (value) {
        filtered = studentsStore.students.filter((s) => {
          const surname = s.surname.toLowerCase()
          const othernames = s.other_names.toLowerCase()
          const appNo = s.application_number
          const phone = s.phone
          return (
            surname.includes(value) ||
            othernames.includes(value) ||
            appNo.includes(value) ||
            phone.includes(value)
          )
        })
      } else {
        filtered = studentsStore.students
      }
      setStudents(filtered)
    },
    [studentsStore]
  )

  const onSubmit = useCallback(
    (values: Student) => {
      if (addStudent) {
        dispatch(createRequest(values))
      } else {
        if (values.fee_receipt) {
          values.fee_receipt = 1
        } else {
          values.fee_receipt = 0
        }
        if (values.owing_fees) {
          values.owing_fees = 1
        } else {
          values.owing_fees = 0
        }
        dispatch(updateRequest(values))
      }
    },
    [dispatch, addStudent]
  )

  const onValidateStudentClick = useCallback(
    (student: Student, action: string) => {
      if (action === 'VALIDATE') {
        student.fee_receipt = 1
      } else if (action === 'INVALIDATE') {
        student.fee_receipt = 0
      }
      dispatch(updateRequest(student))
    },
    [dispatch]
  )

  const handleExport = useCallback(
    (type: string) => {
      const payload = {
        type: type,
        students: students,
        school_id: school!.id,
        fee_type: feeType
      }
      dispatch(exportStudentsRequest(payload))
    },
    [dispatch, school, students, feeType]
  )

  const handleAction = useCallback(
    (action: string) => {
      const payload: StudentAction = {
        academicYear: academicYear,
        action: action,
        schoolId: school!.id,
        studentId: ''
      }
      dispatch(performStudentsActionsRequest(payload))
    },
    [dispatch, academicYear, school]
  )

  const handleStudentAction = useCallback(
    (student: Student, action: string) => {
      const payload: StudentAction = {
        academicYear: '',
        action: action,
        schoolId: '',
        studentId: student.id
      }
      dispatch(studentActionRequest(payload))
    },
    [dispatch]
  )

  const deleteStudent = useCallback(
    (student: Student) => {
      dispatch(deleteRequest(parseInt(`${student.id}`)))
    },
    [dispatch]
  )

  const onUploadFile = useCallback((info: any): void => {
    const { file } = info
    setExcel(file)
    setFileName(file.name)
  }, [])

  const onUploadStudents = useCallback(
    (values: any) => {
      if (!excel) {
        message.error(messages.selectExcel, 5)
      } else {
        const fd = new FormData()
        const schoolId: any = school!.id
        fd.append('excel', excel, excel.name)
        fd.append('programme_id', values.programme_id)
        fd.append('academic_year', values.academic_year)
        fd.append('sheet', values.sheet)
        fd.append('start_row', values.start_row)
        fd.append('school_id', schoolId)
        dispatch(uploadStudentsRequest(fd))
      }
    },
    [dispatch, excel, school]
  )

  const onToggleDownloadModal = useCallback(() => {
    setDownloadModal(!downloadModal)
  }, [downloadModal])

  const onDownloadFeeReceipt = useCallback(
    (student: Student) => {
      const receiptArray = student.receipt.split(',')
      setReceipts(receiptArray)
      onToggleDownloadModal()
    },
    [onToggleDownloadModal]
  )

  const onCloseDuplicatesModal = useCallback(() => {
    setShowDuplicatesModal(false)
    dispatch(clearDuplicates())
    dispatch(clearTransferBooleans())
  }, [dispatch])

  const onTransferDuplicatesClick = useCallback(() => {
    const payload = {
      duplicates: duplicates
    }
    dispatch(createTransferDuplicateRequest(payload))
  }, [dispatch, duplicates])

  let content: React.ReactNode

  if (loading) {
    content = <Spinner />
  }
  if (!loading && isEmpty(studentsStore.students)) {
    content = (
      <EmptyBox
        header="Students"
        description="Students is returning empty result"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => onShowFormModal(true)}
        >
          Add Student
        </Button>
      </EmptyBox>
    )
  }

  if (!loading && !isEmpty(studentsStore.students)) {
    content = (
      <StudentsList
        students={students}
        onShowFormModal={onShowFormModal}
        programmes={programmes}
        deleteStudent={deleteStudent}
        handleStudentAction={handleStudentAction}
        school={school!}
        onDownloadFeeReceipt={onDownloadFeeReceipt}
        onValidateStudentClick={onValidateStudentClick}
      />
    )
  }

  const onFeeStatusSearch = useCallback(
    (value: string) => {
      const payload = {
        school_id: school!.id,
        academic_year: academicYear,
        type: value
      }
      setFeeType(value)
      dispatch(getFeeStudentsRequest(payload))
    },
    [school, dispatch, academicYear]
  )

  return (
    <React.Fragment>
      <Helmet>
        <title>Admissions Ghana | Students</title>
      </Helmet>
      <div className="padding-box">
        <Content className="site-layout-background site-content">
          <div className="margin-top">
            <Row>
              <StudentPane
                academicYear={academicYear}
                academicYears={academicYears}
                dispatchRefresh={dispatchRefresh}
                handleChange={handleChange}
                onProgrammeSearch={onProgrammeSearch}
                onShowFormModal={onShowFormModal}
                onStatusSearch={onStatusSearch}
                programmes={programmes}
                values={values}
                onSearch={onSearch}
                handleAction={handleAction}
                handleExport={handleExport}
                performAction={performAction}
                toggleUploadModal={toggleUploadModal}
                exporting={exporting}
                school={school!}
                onFeeStatusSearch={onFeeStatusSearch}
              />
              <Divider />
              <StudentForm
                addStudent={addStudent}
                isSubmit={isSubmit}
                onCloseModal={onCloseModal}
                onSubmit={onSubmit}
                showStudentFormModal={showStudentFormModal}
                values={values}
                Form={Form}
                form={form}
                programmes={programmes}
                school={school!}
              />
              <StudentUpload
                Form={Form}
                form={form}
                isSubmit={upload}
                onUploadStudents={onUploadStudents}
                programmes={programmes}
                showUploadModal={showUploadModal}
                toggleUploadModal={toggleUploadModal}
                onUploadFile={onUploadFile}
                fileName={fileName}
                values={initialValues}
              />
              <DownloadModal
                downloadModal={downloadModal}
                onToggleDownloadModal={onToggleDownloadModal}
                receipts={receipts}
              />
              <DuplicateModal
                duplicates={duplicates}
                isTransferring={transfersStore.isSubmitting}
                onCloseDuplicatesModal={onCloseDuplicatesModal}
                onTransferDuplicatesClick={onTransferDuplicatesClick}
                showDuplicatesModal={showDuplicatesModal}
                success={transfersStore.success}
              />
            </Row>
            {content}
          </div>
        </Content>
      </div>
    </React.Fragment>
  )
}

export default Students
