import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import {
  Layout,
  Row,
  Col,
  Divider,
  Button,
  message,
  Space,
  Select,
  Input,
  Form
} from 'antd'
import { PlusOutlined, SyncOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { isEmpty } from '../helpers/isEmpty'
import {
  getProgrammesRequest,
  createRequest,
  updateRequest,
  // deleteRequest,
  clearBooleanStates
} from '../store/programmes'
import { switchMenu } from '../store/admin'
import { EmptyBox } from '../components/common/EmptyBox'
import { Programme } from '../interfaces'
import { Spinner } from '../components/common/Spinner'
import { ProgrammeForm } from '../components/programmes/ProgrammeForm'
import { ProgrammesList } from '../components/programmes/ProgrammesList'
import { constants } from '../helpers/constants'
import { messages } from '../helpers/messages'
import { path } from '../helpers/path'
import { academicYears } from '../helpers/constants'
import { getCurrentAcademicYears } from '../helpers/functions'

const { currentYear, nextYear } = getCurrentAcademicYears()

const { Search } = Input
const { Option } = Select
const { Content } = Layout

const Programmes: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const programmesStore = appSelector((state) => state.programmesStore)
  const [programmes, setProgrammes] = useState<Programme[]>([])
  const [loading, setLoading] = useState(false)
  const [showProgrammeFormModal, setShowProgrammeFormModal] = useState(false)
  const [addProgramme, setAddProgramme] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const { school } = appSelector((state) => state.schoolStore)
  const [academicYear, setAcademicYear] = useState(currentYear + '-' + nextYear)
  const [values] = useState<Programme>({
    id: '',
    school_id: school !== null ? school.id : '',
    programme: '',
    academic_year: academicYear,
    total: '',
    created_at: '',
    updated_at: '',
    key: ''
  })
  const [form] = Form.useForm()
  const history = useHistory()

  useEffect(() => {
    if (isEmpty(school)) {
      message.info(messages.setUpSchool)
      history.push(path.school)
    }
    const { programmes, loading } = programmesStore
    if (isEmpty(programmes) && !loading) {
      dispatch(getProgrammesRequest(values))
    }
    dispatch(clearBooleanStates())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { programmes, loading, isSubmitting, success, deleteSuccess, page } =
      programmesStore
    setProgrammes(programmes)
    setLoading(loading)
    setIsSubmit(isSubmitting)

    if (success && page === constants.programmes) {
      switch (addProgramme) {
        case true:
          message.success(messages.addProgrammeSuccess, 5)
          form.resetFields()
          dispatch(clearBooleanStates())
          break
        case false:
          message.success(messages.updateProgrammeSuccess, 5)
          dispatch(clearBooleanStates())
          break
      }
    }
    if (deleteSuccess && page === constants.programmes) {
      message.success(messages.deleteProgrammeSuccess, 5)
      dispatch(clearBooleanStates())
    }
  }, [programmesStore, addProgramme, dispatch, academicYear, school, form])

  const onShowFormModal = (
    isAddProgramme: boolean,
    programme: Programme = values
  ) => {
    setShowProgrammeFormModal(true)
    setAddProgramme(isAddProgramme)
    form.setFieldsValue(programme)
  }

  const onCloseModal = () => {
    dispatch(clearBooleanStates())
    setShowProgrammeFormModal(false)
  }

  const handleChange = (value: string) => {
    setAcademicYear(value)
    values.academic_year = value
    dispatch(getProgrammesRequest(values))
  }

  const onSubmit = (values: Programme) => {
    if (addProgramme) {
      const programme = programmes.find(
        (p) =>
          p.programme.toLocaleLowerCase() ===
          values.programme.toLocaleLowerCase()
      )
      if (programme !== undefined) {
        message.error(messages.programmeExist, 5)
      } else {
        dispatch(createRequest(values))
      }
    } else {
      dispatch(updateRequest(values))
    }
  }

  const onSearch = (value: string) => {
    let filtered: Programme[] = []
    if (value) {
      filtered = programmesStore.programmes.filter((p) => {
        const id = `${p.id}`
        const name = p.programme.toLowerCase()
        return id.includes(value) || name.includes(value)
      })
    } else {
      filtered = programmesStore.programmes
    }
    setProgrammes(filtered)
  }

  const switchToStudents = (menu: string) => {
    dispatch(switchMenu(menu))
    history.push(path.students)
  }

  let content: React.ReactNode

  if (loading) {
    content = <Spinner />
  }
  if (!loading && isEmpty(programmesStore.programmes)) {
    content = (
      <EmptyBox
        header="Programmes"
        description="Programmes is returning empty result"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => onShowFormModal(true)}
        >
          Add Programme
        </Button>
      </EmptyBox>
    )
  }

  if (!loading && !isEmpty(programmesStore.programmes)) {
    content = (
      <ProgrammesList
        programmes={programmes}
        onShowFormModal={onShowFormModal}
        switchToStudents={switchToStudents}
      />
    )
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Admissions Ghana | Programmes</title>
      </Helmet>
      <div className="padding-box">
        <Content className="site-layout-background site-content">
          <div className="margin-top">
            <Row>
              <Col span={24} md={24} xs={24} sm={24}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => onShowFormModal(true)}
                >
                  Add Programme
                </Button>
                <Space style={{ float: 'right' }}>
                  <Search
                    placeholder="search by ID and name"
                    onSearch={onSearch}
                  />
                  <Select
                    defaultValue={academicYear}
                    style={{ width: 120 }}
                    onChange={handleChange}
                  >
                    {academicYears.map((academicYear) => (
                      <Option
                        value={academicYear.value}
                        key={academicYear.value}
                      >
                        {academicYear.label}
                      </Option>
                    ))}
                  </Select>
                  <Button
                    type="default"
                    onClick={() => dispatch(getProgrammesRequest(values))}
                    icon={<SyncOutlined />}
                  >
                    Refresh List
                  </Button>
                </Space>
              </Col>
              <Divider />
              <ProgrammeForm
                addProgramme={addProgramme}
                isSubmit={isSubmit}
                onCloseModal={onCloseModal}
                onSubmit={onSubmit}
                showProgrammeFormModal={showProgrammeFormModal}
                values={values}
                Form={Form}
                form={form}
              />
            </Row>
            {content}
          </div>
        </Content>
      </div>
    </React.Fragment>
  )
}

export default Programmes
