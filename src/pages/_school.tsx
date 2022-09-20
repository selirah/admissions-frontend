import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import {
  Layout,
  Row,
  Col,
  Divider,
  Button,
  message,
  Space,
  Upload,
  Form
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  UploadOutlined,
  LoadingOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { isEmpty } from '../helpers/isEmpty'
import {
  getSchoolRequest,
  getCategoriesRequest,
  createRequest,
  updateRequest,
  clearBooleanStates,
  addLogoRequest,
  addSignatureRequest
} from '../store/school'
import { EmptyBox } from '../components/common/EmptyBox'
import { School as S, Category } from '../interfaces'
import { Spinner } from '../components/common/Spinner'
import { SchoolForm } from '../components/school/SchoolForm'
import { constants } from '../helpers/constants'
import { getCurrentAcademicYears } from '../helpers/functions'
import { messages } from '../helpers/messages'
import { Detail } from '../components/school/Detail'

const { currentYear, nextYear } = getCurrentAcademicYears()

const { Content } = Layout

const School: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const schoolStore = appSelector((state) => state.schoolStore)
  const [school, setSchool] = useState<S | null>(null)
  const [loading, setLoading] = useState(false)
  const [showSchoolFormModal, setShowSchoolFormModal] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [addSchool, setAddSchool] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isSubmitLogo, setIsSubmitLogo] = useState(false)
  const [isSubmitSignature, setIsSubmitSignature] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [values, setValues] = useState<S>({
    school_name: '',
    category_id: '',
    email: '',
    phone: '',
    sender_id: '',
    region: '',
    town: '',
    address: '',
    letter_signatory: '',
    academic_year: currentYear + '-' + nextYear,
    created_at: '',
    id: '',
    logo: '',
    letter_signature: '',
    updated_at: '',
    fee_payment: 0,
    user_id: '',
    signatory_position: ''
  })
  const [form] = Form.useForm()

  useEffect(() => {
    const { school, loading, categories } = schoolStore
    if (isEmpty(school) && !loading) {
      dispatch(getSchoolRequest())
    }
    if (isEmpty(categories)) {
      dispatch(getCategoriesRequest())
    }
    dispatch(clearBooleanStates())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const {
      school,
      loading,
      error,
      isSubmitting,
      page,
      success,
      categories,
      logoSuccess,
      signatureSuccess,
      submitLogo,
      submitSignature
    } = schoolStore
    setSchool(school)
    setCategories(categories)
    setLoading(loading)
    setIsSubmit(isSubmitting)
    setIsSubmitLogo(submitLogo)
    setIsSubmitSignature(submitSignature)
    setError(error)
    if (success && page === constants.school) {
      switch (addSchool) {
        case true:
          message.success(messages.addSchoolSuccess, 5)
          form.resetFields()
          break
        case false:
          message.success(messages.updateSchoolSuccess, 5)
          break
      }
    }
    setValues(school!)
    if (logoSuccess && page === constants.school) {
      message.success(messages.logoSuccess, 5)
      dispatch(clearBooleanStates())
    }
    if (signatureSuccess && page === constants.school) {
      message.success(messages.signatureSuccess, 5)
      dispatch(clearBooleanStates())
    }
  }, [schoolStore, addSchool, dispatch, form])

  const onShowFormModal = () => {
    setShowSchoolFormModal(true)
    if (school) {
      setAddSchool(false)
    } else {
      setAddSchool(true)
    }
  }

  const onCloseModal = () => {
    dispatch(clearBooleanStates())
    setShowSchoolFormModal(false)
  }

  const beforeUpload = (file: File): boolean => {
    const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'

    if (!isJPGorPNG) {
      message.error(messages.imagePNGorJPG, 5)
    }

    const isLessThan1MB = file.size / 1024 / 1024 < 1
    if (!isLessThan1MB) {
      message.error(messages.image2MB, 5)
    }

    return isJPGorPNG && isLessThan1MB
  }

  const onUploadLogo = (info: any): void => {
    const { file } = info
    const fd = new FormData()
    fd.append('file', file, file.name)
    dispatch(addLogoRequest(fd))
  }

  const onUploadSignature = (info: any): void => {
    const { file } = info
    const fd = new FormData()
    fd.append('file', file, file.name)
    dispatch(addSignatureRequest(fd))
  }

  let content: React.ReactNode
  if (loading) {
    content = <Spinner />
  }
  if (!loading && isEmpty(school)) {
    content = (
      <EmptyBox
        header="School"
        description="Make sure you set up a school to begin"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => onShowFormModal()}
        >
          Create School
        </Button>
      </EmptyBox>
    )
  }

  if (!loading && school !== null && !isEmpty(categories)) {
    content = (
      <Detail
        school={school}
        categories={categories}
        onShowFormModal={onShowFormModal}
      />
    )
  }

  const onSubmit = (values: S) => {
    values.fee_payment = values.fee_payment ? 1 : 0
    if (addSchool) {
      dispatch(createRequest(values))
    }
    if (!addSchool) {
      values.id = school!.id
      dispatch(updateRequest(values))
    }
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Admissions Ghana | School</title>
      </Helmet>

      <Content className="site-layout-background site-content">
        <Row>
          <Col span={24}>
            <Space>
              <Button
                type="primary"
                icon={school === null ? <PlusOutlined /> : <EditOutlined />}
                onClick={() => onShowFormModal()}
              >
                {school === null ? 'Add School' : 'Edit School'}
              </Button>

              <Upload
                name="file"
                className="file-uploader"
                beforeUpload={beforeUpload}
                customRequest={onUploadLogo}
                showUploadList={false}
                accept={'.jpeg, .jpg, .png'}
              >
                <Button
                  type="default"
                  disabled={isSubmitLogo}
                  icon={isSubmitLogo ? <LoadingOutlined /> : <UploadOutlined />}
                >
                  {isSubmitLogo ? 'Uploading..' : 'Upload Logo (Less than 1MB)'}
                </Button>
              </Upload>
              <Upload
                name="file"
                className="file-uploader"
                beforeUpload={beforeUpload}
                customRequest={onUploadSignature}
                showUploadList={false}
                accept={'.jpeg, .jpg, .png'}
              >
                <Button
                  type="primary"
                  disabled={isSubmitSignature}
                  danger
                  icon={
                    isSubmitSignature ? <LoadingOutlined /> : <UploadOutlined />
                  }
                >
                  {isSubmitSignature
                    ? 'Uploading..'
                    : 'Upload Signature (Less than 1MB)'}
                </Button>
              </Upload>
            </Space>
            <Button
              style={{ float: 'right' }}
              onClick={() => dispatch(getSchoolRequest())}
            >
              Refresh
            </Button>
          </Col>
          <Divider />
          <Col span={24}>{content}</Col>

          <SchoolForm
            addSchool={addSchool}
            categories={categories}
            error={error}
            isSubmit={isSubmit}
            onSubmit={onSubmit}
            onCloseModal={onCloseModal}
            showSchoolFormModal={showSchoolFormModal}
            values={values}
            Form={Form}
            form={form}
          />
        </Row>
      </Content>
    </React.Fragment>
  )
}

export default School
