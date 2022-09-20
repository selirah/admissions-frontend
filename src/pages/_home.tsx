import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Layout, Row, Col, Divider, Button, Select } from 'antd'
import { useDispatch } from 'react-redux'
import { appSelector } from '../helpers/appSelector'
import { AppDispatch } from '../helpers/appDispatch'
import { getSchoolRequest } from '../store/school'
import { getStudentsRequest } from '../store/students'
import { getProgrammesRequest } from '../store/programmes'
import { getTransfersRequest } from '../store/transfers'
import { isEmpty } from '../helpers/isEmpty'
import { getCurrentAcademicYears } from '../helpers/functions'
import { academicYears } from '../helpers/constants'
import ChartCard from '../components/home/ChartCard'
import BarChart from '../components/chart/BarChart'
import PieChart from '../components/chart/PieChart'
import { SyncOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { EmptyBox } from '../components/common/EmptyBox'
import { Spinner } from '../components/common/Spinner'
import { path } from '../helpers/path'
import {
  getAreaChartDataPoints,
  getBarAndPieChartDataPoints
} from '../helpers/analytics'
import academicActions from '../store/academics/actions'
// import { MonthlyArea } from '../components/home/MonthlyOverview';

const { currentYear, nextYear } = getCurrentAcademicYears()
const { getCoursesRequest } = academicActions

const { Content } = Layout
const { Option } = Select

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { school } = appSelector((state) => state.schoolStore)
  const { students } = appSelector((state) => state.studentsStore)
  const { programmes } = appSelector((state) => state.programmesStore)
  const { transfers, loading } = appSelector((state) => state.transfersStore)
  const { user } = appSelector((state) => state.auth)
  const { courses } = appSelector((state) => state.academicsStore)
  const [academicYear, setAcademicYear] = useState(currentYear + '-' + nextYear)
  const history = useHistory()

  useEffect(() => {
    if (isEmpty(school)) {
      dispatch(getSchoolRequest())
    }
    let payload = {
      academic_year: academicYear,
      school_id: user!.school_id
    }
    if (isEmpty(students)) {
      dispatch(getStudentsRequest(payload))
    }
    if (isEmpty(programmes)) {
      dispatch(getProgrammesRequest(payload))
    }
    if (isEmpty(transfers)) {
      dispatch(getTransfersRequest(payload))
    }
    if (isEmpty(courses)) {
      dispatch(getCoursesRequest(payload.school_id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (value: string) => {
    setAcademicYear(value)
    let payload = {
      academic_year: value,
      school_id: school !== null ? school.id : ''
    }
    dispatch(getStudentsRequest(payload))
    dispatch(getProgrammesRequest(payload))
    dispatch(getTransfersRequest(payload))
  }

  const onRefresh = () => {
    let payload = {
      academic_year: academicYear,
      school_id: school !== null ? school.id : ''
    }
    dispatch(getStudentsRequest(payload))
    dispatch(getProgrammesRequest(payload))
    dispatch(getTransfersRequest(payload))
  }

  const schoolLink = () => {
    history.push(path.school)
  }

  let content: React.ReactNode

  if (isEmpty(school)) {
    content = (
      <EmptyBox
        header="Students"
        description="Students is returning empty result"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      >
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => schoolLink()}
        >
          Create School
        </Button>
      </EmptyBox>
    )
  }

  if (loading) {
    content = <Spinner />
  } else {
    const { studentsAreaChart, programmesAreaChart, transferAreaChart } =
      getAreaChartDataPoints(students, programmes, transfers)
    const { bar, pie } = getBarAndPieChartDataPoints(students)
    content = (
      <>
        <Row gutter={20}>
          <ChartCard
            data={studentsAreaChart}
            title="Total Students"
            value={students.length}
          />
          <ChartCard
            data={programmesAreaChart}
            title="Total Programmes"
            value={programmes.length}
          />
          <ChartCard
            data={transferAreaChart}
            title="Total Transfers"
            value={transfers.length}
          />
        </Row>
        <Row gutter={20} style={{ marginTop: 20 }}>
          <Col span={12} md={12} xs={24} sm={24}>
            <BarChart info={bar} />
          </Col>
          <Col span={12} md={12} xs={24} sm={24}>
            <PieChart info={pie} />
          </Col>
        </Row>
      </>
    )
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Admissions Ghana | Home</title>
      </Helmet>
      <div className="padding-box">
        <Content className="site-layout-background site-content">
          <div className="margin-top">
            <Row>
              <Col span={24}>
                <Select defaultValue={academicYear} onChange={handleChange}>
                  {academicYears.map((academicYear) => (
                    <Option value={academicYear.value} key={academicYear.value}>
                      {academicYear.label}
                    </Option>
                  ))}
                </Select>
                <Button
                  style={{ float: 'right' }}
                  icon={<SyncOutlined />}
                  onClick={() => onRefresh()}
                >
                  Refresh
                </Button>
              </Col>
              <Divider />
            </Row>
            {content}
          </div>
        </Content>
      </div>
    </React.Fragment>
  )
}

export default Home
