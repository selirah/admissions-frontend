import React, { useState, useEffect } from 'react'
import { Layout, Form, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { LoginForm } from '../components/auth/LoginForm'
import { Login as Auth } from '../interfaces'
import { loginRequest, clearAuthState } from '../store/auth'
import { path } from '../helpers/path'
import bg from '../images/bg.png'
import { TrainingModal } from '../components/trainings/TrainingModal'
import { messages } from '../helpers/messages'
import {
  getTainingSchoolsRequest,
  getTrainingsRequest,
  registerTrainingRequest,
  clearBooleanStates
} from '../store/trainings'
import { constants } from '../helpers/constants'

const currentYear = new Date().getFullYear()

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const auth = appSelector((state) => state.auth)
  const { Content } = Layout
  const [values] = useState<Auth>({
    email: '',
    password: ''
  })
  const [isSubmit, setIsSubmit] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showTrainingModal, setShowTrainingModal] = useState(false)
  const [form] = Form.useForm()
  const [imageUrlOne, setImageUrlOne] = useState('')
  const [imageUrlTwo, setImageUrlTwo] = useState('')
  const [pictureOne, setPictureOne] = useState<any>(null)
  const [pictureTwo, setPictureTwo] = useState<any>(null)
  const initialValues = {
    training_id: '',
    school_id: '',
    name_one: '',
    name_two: '',
    phone_one: '',
    phone_two: ''
  }
  const trainingStore = appSelector((state) => state.trainingsStore)

  useEffect(() => {
    dispatch(clearAuthState())
    dispatch(clearBooleanStates())
    dispatch(getTrainingsRequest({ year: currentYear }))
    dispatch(getTainingSchoolsRequest())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { isSubmitting, error, isAuthenticated, user } = auth
    setIsSubmit(isSubmitting)
    setError(error)
    if (isAuthenticated) {
      const { role } = user!
      switch (role) {
        case 'ADMIN':
          window.location.href = path.home
          break
        case 'SUPER':
          window.location.href = path.clients
          break
        default:
          window.location.href = path.home
          break
      }
    }

    if (trainingStore.success && trainingStore.page === constants.login) {
      form.resetFields()
      dispatch(clearBooleanStates())
      setImageUrlOne('')
      setImageUrlTwo('')
      message.success(messages.registeredTraining, 5)
    }

    if (trainingStore.failure && trainingStore.page === constants.login) {
      message.error(JSON.stringify(trainingStore.error), 5)
    }
  }, [auth, trainingStore, form, dispatch])

  const onSubmit = (values: Auth) => {
    dispatch(loginRequest(values))
  }

  const onToggleTrainingModal = () => {
    setShowTrainingModal(!showTrainingModal)
  }

  const beforeUpload = (file: File): boolean => {
    const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'

    if (!isJPGOrPNG) {
      message.error(messages.photoType, 5)
    }

    const isLessThan2MB = file.size / 1024 / 1024 < 2
    if (!isLessThan2MB) {
      message.error(messages.photoSize, 5)
    }

    return isJPGOrPNG && isLessThan2MB
  }

  const getBase64 = (img: File, callback: Function) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const handleChangePicOne = (info: any): void => {
    setPictureOne(info.file.originFileObj)
    getBase64(info.file.originFileObj, (imageUrl: any) => {
      setImageUrlOne(imageUrl)
    })
  }

  const handleChangePicTwo = (info: any): void => {
    setPictureTwo(info.file.originFileObj)
    getBase64(info.file.originFileObj, (imageUrl: any) => {
      setImageUrlTwo(imageUrl)
    })
  }

  const uploadButton: React.ReactNode = (
    <div>
      {trainingStore.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Choose a file</div>
    </div>
  )

  const onSubmitTraining = (values: any) => {
    const fd = new FormData()
    if (pictureOne) {
      fd.append('picture_one', pictureOne, pictureOne.name)
    }
    if (pictureTwo) {
      fd.append('picture_two', pictureTwo, pictureTwo.name)
    }
    fd.append('school_id', values.school_id)
    fd.append('training_id', values.training_id)
    fd.append('name_one', values.name_one)
    fd.append('name_two', values.name_two)
    fd.append('phone_one', values.phone_one)
    fd.append('phone_two', values.phone_two)
    dispatch(registerTrainingRequest(fd))
  }

  return (
    <Layout>
      <Helmet>
        <title>Admissions Ghana | Login</title>
      </Helmet>
      <Content
        style={{
          background: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <LoginForm
          values={values}
          onSubmit={onSubmit}
          isSubmit={isSubmit}
          error={error}
          onToggleTrainingModal={onToggleTrainingModal}
          trainings={trainingStore.trainings}
        />
        <TrainingModal
          Form={Form}
          form={form}
          isSubmit={trainingStore.isSubmitting}
          onSubmit={onSubmitTraining}
          onToggleTrainingModal={onToggleTrainingModal}
          showTrainingModal={showTrainingModal}
          values={initialValues}
          schools={trainingStore.schools}
          trainings={trainingStore.trainings}
          beforeUpload={beforeUpload}
          handleChangePicOne={handleChangePicOne}
          handleChangePicTwo={handleChangePicTwo}
          imageUrlOne={imageUrlOne}
          imageUrlTwo={imageUrlTwo}
          uploadButton={uploadButton}
        />
      </Content>
    </Layout>
  )
}

export default Login
