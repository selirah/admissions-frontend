import React, { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { Layout, Row, Divider, message, Form } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { isEmpty } from '../helpers/isEmpty'
import { UploadOutlined } from '@ant-design/icons'
import AcademicsPane from '../components/academics/AcademicsPane'
import { messages } from '../helpers/messages'
import { path } from '../helpers/path'
import CoursesList from '../components/academics/CoursesList'
import CoursesDrawer from '../components/academics/CoursesDrawer'
import XLSX from 'xlsx'
import ResultsDrawer from '../components/academics/ResultsDrawer'
import {
  AcademicsPayload,
  CoursePayload,
  Course,
  Results,
  Academics as Aca,
  StudentsPayload,
  Std,
  Re
} from '../interfaces'
import { constants } from '../helpers/constants'
import ResultsList from '../components/academics/ResultsList'
import DetailsDrawer from '../components/academics/DetailsDrawer'
import { getCurrentAcademicYears } from '../helpers/functions'
import StudentsDrawer from '../components/academics/StudentsDrawer'
import academicActions from '../store/academics/actions'

const { currentYear, nextYear } = getCurrentAcademicYears()

const {
  clearBooleanStates,
  getCoursesRequest,
  uploadCoursesRequest,
  uploadResultsRequest,
  clearData,
  getResultsRequest,
  getAcademicsRequest,
  deleteResultRequest,
  publishResultRequest,
  publishStudentResultRequest,
  uploadStudentsRequest,
  sendNotificationRequest
} = academicActions

const { Content } = Layout

const Academics: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const academicsStore = appSelector((state) => state.academicsStore)
  const { programmes } = appSelector((state) => state.programmesStore)
  const { school } = appSelector((state) => state.schoolStore)
  const [showCoursesDrawer, setShowCoursesDrawer] = useState(false)
  const [showResultsDrawer, setShowResultsDrawer] = useState(false)
  const [showStudentsDrawer, setShowStudentsDrawer] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingCourses, setLoadingCourses] = useState(false)
  const history = useHistory()
  const resultsValues = {
    school_id: school !== null ? school.id : '',
    programme_id: '',
    year: 1,
    semester: 1,
    course_code: '',
    sheet: '',
    excel: ''
  }
  const [form] = Form.useForm()
  const [courseData, setCourseData] = useState<any[]>([])
  const [resultsData, setResultsData] = useState<any[]>([])
  const [studentsData, setStudentsData] = useState<any[]>([])
  const [isSubmit, setIsSubmit] = useState(false)
  const [error, setError] = useState<any>(null)
  const [sheetNumber, setSheetNumber] = useState(0)
  const [display, setDisplay] = useState('results')
  const [course, setCourse] = useState('')
  const [results, setResults] = useState<Results[]>([])
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false)
  const [academics, setAcademics] = useState<Aca[]>([])
  const [loadingAcademics, setLoadingAcademics] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [publishingStudent, setPublishingStudent] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [resultId, setResultId] = useState(0)
  const [result, setResult] = useState<Results | null>(null)
  const [academicId, setAcademicId] = useState(0)
  const [sendingNotification, setSendingNotification] = useState(false)
  const cousesValues = {
    school_id: school !== null ? school.id : '',
    sheet: '',
    excel: ''
  }
  const studentsValues = {
    school_id: school !== null ? school.id : '',
    programme_id: '',
    sheet: '',
    excel: '',
    academic_year: currentYear + '-' + nextYear
  }
  const [payload] = useState({
    course_code: course,
    school_id: school!.id
  })

  useEffect(() => {
    if (isEmpty(school)) {
      message.info(messages.setUpSchool)
      history.push(path.school)
    }
    dispatch(getResultsRequest(payload))
    dispatch(clearBooleanStates())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onShowCoursesDrawer = useCallback((value: boolean) => {
    setShowCoursesDrawer(value)
  }, [])

  const onShowResultsDrawer = useCallback(
    (value: boolean) => {
      dispatch(getCoursesRequest(school!.id))
      setShowResultsDrawer(value)
    },
    [school, dispatch]
  )

  const onShowStudentsDrawer = useCallback((value: boolean) => {
    setShowStudentsDrawer(value)
  }, [])

  useEffect(() => {
    const { uploadCoursesSuccess, page } = academicsStore
    if (uploadCoursesSuccess && page === constants.academics) {
      message.success(messages.uploadCourses, 10)
      form.resetFields()
      setCourseData([])
      onShowCoursesDrawer(false)
      dispatch(clearBooleanStates())
      dispatch(getCoursesRequest(school!.id))
    }
  }, [academicsStore, form, dispatch, onShowCoursesDrawer, school])

  useEffect(() => {
    const { uploadResultsSuccess, page } = academicsStore
    if (uploadResultsSuccess && page === constants.academics) {
      message.success(messages.uploadResults, 10)
      form.resetFields()
      setResultsData([])
      onShowResultsDrawer(false)
      dispatch(getResultsRequest(payload))
      dispatch(clearBooleanStates())
    }
  }, [academicsStore, form, dispatch, onShowResultsDrawer, school, payload])

  useEffect(() => {
    const { uploadStudentsSuccess, page } = academicsStore

    if (uploadStudentsSuccess && page === constants.academics) {
      message.success(messages.uploadStudents, 10)
      form.resetFields()
      setStudentsData([])
      onShowStudentsDrawer(false)
      dispatch(clearBooleanStates())
    }
  }, [academicsStore, form, dispatch, onShowStudentsDrawer, school])

  useEffect(() => {
    const { deleteSuccess, page } = academicsStore

    if (deleteSuccess && page === constants.academics) {
      message.success(messages.deleteResultSuccess, 5)
      dispatch(getResultsRequest(payload))
      dispatch(clearBooleanStates())
    }
  }, [academicsStore, payload, dispatch])

  useEffect(() => {
    const { publishingSuccess, publishingFailure, page, error } = academicsStore

    if (publishingSuccess && page === constants.academics) {
      message.success(messages.publishResultsSuccess, 5)
      dispatch(getResultsRequest(payload))
      dispatch(clearBooleanStates())
    }
    if (publishingFailure && page === constants.academics) {
      message.error(JSON.stringify(error), 5)
      dispatch(clearBooleanStates())
    }
  }, [academicsStore, dispatch, payload])

  useEffect(() => {
    const { sendNotificationSuccess, sendNotificationFailure, page, error } =
      academicsStore

    if (sendNotificationSuccess && page === constants.academics) {
      message.success(messages.sendSMSSuccess, 5)
      dispatch(clearBooleanStates())
    }

    if (sendNotificationFailure && page === constants.academics) {
      message.error(JSON.stringify(error), 5)
      dispatch(clearBooleanStates())
    }
  }, [academicsStore, dispatch])

  useEffect(() => {
    const {
      isSubmitting,
      error,
      publishing,
      publishingStudent,
      isDeleting,
      sendingNotification
    } = academicsStore
    setIsSubmit(isSubmitting)
    setError(error)
    setPublishing(publishing)
    setPublishingStudent(publishingStudent)
    setIsDeleting(isDeleting)
    setSendingNotification(sendingNotification)
  }, [academicsStore])

  useEffect(() => {
    const {
      loading,
      courses,
      results,
      academics,
      loadingAcademics,
      publishing,
      publishingStudent,
      loadingCourses
    } = academicsStore

    setLoading(loading)
    setCourses(courses)
    setResults(results)
    setLoadingAcademics(loadingAcademics)
    setAcademics(academics)
    setPublishing(publishing)
    setPublishingStudent(publishingStudent)
    setLoadingCourses(loadingCourses)
  }, [academicsStore])

  const onSearch = useCallback(
    (value: string) => {
      let filtered: Course[] = []
      if (value) {
        filtered = academicsStore.courses.filter((c) => {
          const coursecode = c.course_code.toLowerCase()
          const course = c.course.toLowerCase()
          return coursecode.includes(value) || course.includes(value)
        })
      } else {
        filtered = academicsStore.courses
      }
      setCourses(filtered)
    },
    [academicsStore]
  )

  const dispatchRefresh = useCallback(() => {
    dispatch(clearData())
    if (display === 'courses') {
      dispatch(getCoursesRequest(school!.id))
    } else if (display === 'results') {
      const payload = {
        course_code: '',
        school_id: school!.id
      }
      dispatch(getResultsRequest(payload))
    }
  }, [dispatch, school, display])

  const onSubmitCourses = useCallback(
    (values: any) => {
      if (courseData.length) {
        let courses: any[] = []
        courseData.map((d: any) => {
          courses.push({
            course_code: d['Course Code'],
            course: d['Course']
          })
          return courses
        })
        const payload: CoursePayload = {
          courses: courses,
          school_id: values.school_id
        }
        dispatch(uploadCoursesRequest(payload))
      } else {
        message.error(messages.emptyExcel, 5)
      }
    },
    [courseData, dispatch]
  )

  const onSubmitResults = useCallback(
    (values: any) => {
      if (resultsData.length) {
        let results: Re[] = []
        resultsData.map((d: any) => {
          results.push({
            index_no: `${d['Index Number']}`,
            total: d['Total'],
            grade: d['Grade']
          })
          return results
        })
        const payload: AcademicsPayload = {
          results: results,
          semester: values.semester,
          year: values.year,
          school_id: values.school_id,
          programme_id: values.programme_id,
          course_code: values.course_code
        }
        dispatch(uploadResultsRequest(payload))
      } else {
        message.error(messages.emptyExcel, 5)
      }
    },
    [resultsData, dispatch]
  )

  const onSubmitStudents = useCallback(
    (values: any) => {
      if (studentsData.length) {
        let students: Std[] = []
        studentsData.map((d: any) => {
          students.push({
            index_no: `${d['Index Number']}`,
            surname: d['Surname'],
            other_names: d['Other Names'],
            phone: d['Phone']
          })
          return students
        })
        const payload: StudentsPayload = {
          students: students,
          academic_year: values.academic_year,
          school_id: values.school_id,
          programme_id: values.programme_id
        }
        dispatch(uploadStudentsRequest(payload))
      } else {
        message.error(messages.emptyExcel, 5)
      }
    },
    [studentsData, dispatch]
  )

  const onShowDetailsDrawer = useCallback(
    (results: Results) => {
      setShowDetailsDrawer(true)
      setResult(results)
      dispatch(getAcademicsRequest(results.id))
    },
    [dispatch]
  )

  const onCloseDetailsDrawer = useCallback(() => {
    setShowDetailsDrawer(false)
  }, [])

  const onPublishResults = useCallback(
    (result: Results) => {
      setResultId(result.id)
      const payload = {
        id: result.id,
        school_id: school!.id
      }
      dispatch(publishResultRequest(payload))
    },
    [school, dispatch]
  )

  const deleteResult = useCallback(
    (result: Results) => {
      setResultId(result.id)
      dispatch(deleteResultRequest(result.id))
    },
    [dispatch]
  )

  const renderList = () => {
    if (display === 'courses') {
      return <CoursesList courses={courses} loading={loadingCourses} />
    } else if (display === 'results') {
      return (
        <ResultsList
          results={results}
          deleteResult={deleteResult}
          onShowDetailsDrawer={onShowDetailsDrawer}
          onPublishResults={onPublishResults}
          publishing={publishing}
          id={resultId}
          isDeleting={isDeleting}
          loading={loading}
        />
      )
    }
  }

  const handleSheetNumber = (e: any) => {
    setSheetNumber(parseInt(e.target.value))
  }

  const handleCourseExcel = async (info: any) => {
    const file: File = info.file.originFileObj
    await onHandleExcelFile(file, sheetNumber)
      .then((data: any) => {
        setCourseData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleResultsExcel = async (info: any) => {
    const file: File = info.file.originFileObj
    await onHandleExcelFile(file, sheetNumber)
      .then((data: any) => {
        setResultsData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleStudentsExcel = async (info: any) => {
    const file: File = info.file.originFileObj
    await onHandleExcelFile(file, sheetNumber)
      .then((data: any) => {
        setStudentsData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onHandleExcelFile = (file: File, sheetNumber: number) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        /* Parse data */
        const ab = e.target.result
        const wb = XLSX.read(ab, { type: 'array' })
        /* Get worksheet */
        const wsname =
          wb.SheetNames[sheetNumber === 0 ? sheetNumber : sheetNumber - 1]
        const ws = wb.Sheets[wsname]
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {
          header: 0,
          blankrows: false
        })
        resolve(data)
      }
      reader.onerror = (error) => reject(error)
      reader.readAsArrayBuffer(file)
    })
  }

  const beforeUpload = (file: File): boolean => {
    const isExcel =
      file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

    if (!isExcel) {
      message.error(messages.excelType, 5)
    }

    return isExcel
  }

  const uploadButton: React.ReactNode = (
    <div>
      <UploadOutlined />
      <div className="ant-upload-text">Choose a file</div>
    </div>
  )

  const onHandleDisplay = useCallback(
    (value: string) => {
      setDisplay(value)
      if (value === 'courses') {
        dispatch(getCoursesRequest(school!.id))
      } else if (value === 'results') {
        const payload = {
          course_code: course,
          school_id: school!.id
        }
        dispatch(getResultsRequest(payload))
      }
    },
    [school, dispatch, course]
  )

  const handleCourses = useCallback(
    (value: string) => {
      setCourse(value)
      const payload = {
        course_code: value,
        school_id: school!.id
      }
      dispatch(getResultsRequest(payload))
    },
    [dispatch, school]
  )

  const onPublishStudentResult = useCallback(
    (academics: Aca) => {
      setAcademicId(academics.id)
      const payload = {
        index_no: academics.index_no,
        school_id: school!.id
      }
      dispatch(publishStudentResultRequest(payload))
    },
    [dispatch, school]
  )

  const onSendNotification = useCallback(() => {
    dispatch(sendNotificationRequest(school!.id))
  }, [dispatch, school])

  return (
    <React.Fragment>
      <Helmet>
        <title>Admissions Ghana | Academics</title>
      </Helmet>
      <div className="padding-box">
        <Content className="site-layout-background site-content">
          <div className="margin-top">
            <Row>
              <AcademicsPane
                courses={courses}
                dispatchRefresh={dispatchRefresh}
                onSearch={onSearch}
                onShowCoursesDrawer={onShowCoursesDrawer}
                onShowResultsDrawer={onShowResultsDrawer}
                display={display}
                handleCourses={handleCourses}
                onHandleDisplay={onHandleDisplay}
                onShowStudentsDrawer={onShowStudentsDrawer}
                onSendNotification={onSendNotification}
                sending={sendingNotification}
                results={results}
              />
              <Divider />
            </Row>
            {renderList()}
          </div>
        </Content>
      </div>
      <CoursesDrawer
        form={form}
        Form={Form}
        onShowDrawer={onShowCoursesDrawer}
        onSubmit={onSubmitCourses}
        showDrawer={showCoursesDrawer}
        values={cousesValues}
        beforeUpload={beforeUpload}
        excelData={courseData}
        handleExcelSheet={handleCourseExcel}
        uploadButton={uploadButton}
        isSubmit={isSubmit}
        error={error}
        handleSheetNumber={handleSheetNumber}
      />
      <ResultsDrawer
        form={form}
        Form={Form}
        onShowDrawer={onShowResultsDrawer}
        onSubmit={onSubmitResults}
        showDrawer={showResultsDrawer}
        values={resultsValues}
        beforeUpload={beforeUpload}
        excelData={resultsData}
        handleExcelSheet={handleResultsExcel}
        uploadButton={uploadButton}
        isSubmit={isSubmit}
        programmes={programmes}
        error={error}
        handleSheetNumber={handleSheetNumber}
        courses={courses}
      />
      <DetailsDrawer
        academics={academics}
        loading={loadingAcademics}
        onCloseDrawer={onCloseDetailsDrawer}
        showDrawer={showDetailsDrawer}
        publishResult={publishingStudent}
        onPublishStudentResult={onPublishStudentResult}
        result={result}
        id={academicId}
      />
      <StudentsDrawer
        Form={Form}
        form={form}
        onShowDrawer={onShowStudentsDrawer}
        onSubmit={onSubmitStudents}
        showDrawer={showStudentsDrawer}
        values={studentsValues}
        beforeUpload={beforeUpload}
        excelData={studentsData}
        handleExcelSheet={handleStudentsExcel}
        uploadButton={uploadButton}
        isSubmit={isSubmit}
        programmes={programmes}
        error={error}
        handleSheetNumber={handleSheetNumber}
      />
    </React.Fragment>
  )
}

export default Academics
