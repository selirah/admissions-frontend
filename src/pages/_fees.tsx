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
  Form
} from 'antd'
import { PlusOutlined, SyncOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { isEmpty } from '../helpers/isEmpty'
import {
  getFeesRequest,
  createRequest,
  deleteRequest,
  clearBooleanStates
} from '../store/fees'
import { getProgrammesRequest } from '../store/programmes'
import { EmptyBox } from '../components/common/EmptyBox'
import { Fee, Programme } from '../interfaces'
import { Spinner } from '../components/common/Spinner'
import { FeeForm } from '../components/fees/FeeForm'
import { FeesList } from '../components/fees/FeesList'
import { constants } from '../helpers/constants'
import { messages } from '../helpers/messages'
import { path } from '../helpers/path'
import { getCurrentAcademicYears } from '../helpers/functions'
import { academicYears } from '../helpers/constants'

const { currentYear, nextYear } = getCurrentAcademicYears()

const { Content } = Layout
const { Option } = Select

const Fees: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const feesStore = appSelector((state) => state.feesStore)
  const programmesStore = appSelector((state) => state.programmesStore)
  const [fees, setFees] = useState<Fee[]>([])
  const [loading, setLoading] = useState(false)
  const [showFeeFormModal, setShowFeeFormModal] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const { school } = appSelector((state) => state.schoolStore)
  const [academicYear, setAcademicYear] = useState(currentYear + '-' + nextYear)
  const [programmes, setProgrammes] = useState<Programme[]>([])
  const [values] = useState<Fee>({
    id: '',
    school_id: school !== null ? parseInt(`${school.id}`) : 0,
    programme: '',
    academic_year: academicYear,
    created_at: '',
    updated_at: '',
    key: 0,
    amount: '',
    programme_id: ''
  })
  const history = useHistory()
  const [success, setSuccess] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (isEmpty(school)) {
      message.info(messages.setUpSchool)
      history.push(path.school)
    }
    const { fees, loading } = feesStore
    const { programmes } = programmesStore
    if (isEmpty(fees) && !loading) {
      dispatch(getFeesRequest(values))
    }
    if (isEmpty(programmes)) {
      const payload: Programme = {
        id: 0,
        school_id: school !== null ? parseInt(`${school.id}`) : 0,
        programme: '',
        academic_year: academicYear,
        created_at: '',
        updated_at: '',
        key: 0,
        total: 0
      }
      dispatch(getProgrammesRequest(payload))
    }
    dispatch(clearBooleanStates())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const {
      fees,
      loading,
      isSubmitting,
      success,
      deleteSuccess,
      page,
      isDeleting
    } = feesStore
    const { programmes } = programmesStore
    setFees(fees)
    setLoading(loading)
    setIsSubmit(isSubmitting)
    setProgrammes(programmes)
    setIsDelete(isDeleting)

    if (success && page === constants.fees) {
      setSuccess(success)
      message.success(messages.addFeeSuccess, 5)
      dispatch(clearBooleanStates())
    }
    if (deleteSuccess && page === constants.fees) {
      message.success(messages.deleteFeeSuccess, 5)
      dispatch(clearBooleanStates())
    }
  }, [feesStore, dispatch, programmesStore])

  const onShowFormModal = () => {
    setShowFeeFormModal(true)
  }

  const onCloseModal = () => {
    dispatch(clearBooleanStates())
    setShowFeeFormModal(false)
  }

  const handleChange = (value: string) => {
    setAcademicYear(value)
    values.academic_year = value
    dispatch(getFeesRequest(values))
  }

  const onSubmit = (values: Fee) => {
    values.school_id = parseInt(`${school!.id}`)
    values.academic_year = academicYear
    dispatch(createRequest(values))
  }

  const deleteFee = (fee: Fee) => {
    dispatch(deleteRequest(parseInt(`${fee.id}`)))
  }

  let content: React.ReactNode

  if (loading) {
    content = <Spinner />
  }

  if (!loading && isEmpty(fees)) {
    content = (
      <EmptyBox
        header="Fees"
        description="Fees is returning empty result"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => onShowFormModal()}
        >
          Add Fee
        </Button>
      </EmptyBox>
    )
  }

  if (!loading && !isEmpty(fees)) {
    content = <FeesList fees={fees} deleteFee={deleteFee} deleting={isDelete} />
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Admissions Ghana | Fees</title>
      </Helmet>
      <div className="padding-box">
        <Content className="site-layout-background site-content">
          <div className="margin-top">
            <Row>
              <Col span={24}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => onShowFormModal()}
                >
                  Add Fee
                </Button>
                <Space style={{ float: 'right' }}>
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
                    onClick={() => dispatch(getFeesRequest(values))}
                    icon={<SyncOutlined />}
                  >
                    Refresh List
                  </Button>
                </Space>
              </Col>
              <Divider />
              <FeeForm
                isSubmit={isSubmit}
                onCloseModal={onCloseModal}
                onSubmit={onSubmit}
                showFeeFormModal={showFeeFormModal}
                values={values}
                programmes={programmes}
                success={success}
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

export default Fees
